import { NextRequest, NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabase-server";
import OpenAI from "openai";
import { z } from "zod";

// Zod schema for validating AI response - prevents hallucinations
const ChallengeSchema = z.object({
  id: z.string(),
  title: z.string().min(5).max(100),
  description: z.string().min(20).max(500),
  difficulty: z.enum(["easy", "medium", "hard"]),
  skills: z.array(z.string()).min(2).max(6),
  steps: z.array(z.string()).min(3).max(8),
  estimatedTime: z.string(),
  projectType: z.string(),
});

type ChallengeResponse = z.infer<typeof ChallengeSchema>;

// Project ideas database - used to ensure uniqueness and quality
const PROJECT_IDEAS: Record<string, string[]> = {
  Flutter: [
    "Habit Tracker with Statistics",
    "Recipe Keeper with Photo Gallery",
    "Expense Tracker with Charts",
    "Workout Timer with Voice Guidance",
    "Meditation App with Breathing Exercises",
    "Language Flashcards with Spaced Repetition",
    "Plant Care Reminder",
    "Book Reading Tracker",
    "Mood Journal with Insights",
    "Personal Finance Dashboard",
  ],
  "Systems Design": [
    "URL Shortener with Analytics",
    "Real-time Chat System",
    "Video Streaming Platform",
    "E-commerce Inventory System",
    "Social Media Feed",
    "Ride-sharing Matching System",
    "Food Delivery Tracker",
    "Notification Service",
    "Search Autocomplete Engine",
    "Rate Limiter Service",
  ],
  JavaScript: [
    "Interactive Quiz Game",
    "Markdown Note Editor",
    "Pomodoro Timer",
    "Weather Dashboard",
    "Todo List with Drag-and-Drop",
    "Image Gallery with Lightbox",
    "Calculator with History",
    "Password Generator",
    "Color Palette Creator",
    "Typing Speed Test",
  ],
};

function getOpenAI(): OpenAI | null {
  if (!process.env.OPENAI_API_KEY) {
    return null;
  }
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

// Survey can be old format or new PostCourseSurvey format
interface SurveyInput {
  experienceLevel?: string;
  interests?: string[];
  goals?: string[];
  learningStyle?: string;
  buildIdea?: string;
  confidence?: number;
}

// Generate a unique challenge based on course and survey
async function generateChallengeWithAI(
  courseId: string,
  userSurvey: SurveyInput,
): Promise<ChallengeResponse | null> {
  const openai = getOpenAI();
  if (!openai) return null;

  // Get relevant project ideas for the course
  const language = courseId.includes("flutter")
    ? "Flutter"
    : courseId.includes("systems")
      ? "Systems Design"
      : "JavaScript";
  const projectIdeas = PROJECT_IDEAS[language] || PROJECT_IDEAS.JavaScript;

  // Pick 3 random project ideas to suggest
  const suggestedProjects = projectIdeas
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  // Map confidence to difficulty
  const confidenceLevel = userSurvey.confidence || 3;
  const difficultyHint =
    confidenceLevel <= 2 ? "easy" : confidenceLevel <= 3 ? "medium" : "hard";

  // Build context from both survey formats
  const interestsStr = userSurvey.interests?.join(", ") || "general";
  const buildIdea = userSurvey.buildIdea || "";
  const level =
    userSurvey.experienceLevel ||
    (confidenceLevel <= 2
      ? "beginner"
      : confidenceLevel <= 3
        ? "intermediate"
        : "advanced");

  const prompt = `Generate a unique coding challenge based on:

COURSE: ${courseId}
USER LEVEL: ${level}
INTERESTS: ${interestsStr}
${buildIdea ? `USER'S BUILD IDEA: ${buildIdea}` : ""}
DIFFICULTY TARGET: ${difficultyHint}

SUGGESTED PROJECT IDEAS (pick ONE or create similar):
${suggestedProjects.map((p, i) => `${i + 1}. ${p}`).join("\n")}

RULES:
1. Challenge must be PRACTICAL and BUILD SOMETHING REAL
2. Steps must be SPECIFIC and ACTIONABLE
3. Difficulty based on user level: beginner=easy, intermediate=medium, advanced=hard
4. Skills must match what was taught in the course
5. DO NOT create vague or generic challenges

Return ONLY valid JSON matching this schema:
{
  "id": "unique-kebab-case-id",
  "title": "Clear Project Title",
  "description": "What you'll build and learn (2-3 sentences)",
  "difficulty": "easy|medium|hard",
  "skills": ["skill1", "skill2", "skill3"],
  "steps": ["Step 1: Specific action", "Step 2: Next action", ...],
  "estimatedTime": "2-3 hours",
  "projectType": "app|tool|system|game"
}`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a coding instructor creating personalized project challenges. Return ONLY valid JSON, no markdown or explanation.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 800,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) return null;

    // Extract JSON from response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return null;

    const parsed = JSON.parse(jsonMatch[0]);

    // Validate with Zod - this prevents hallucinations by ensuring structure
    const validated = ChallengeSchema.parse(parsed);
    return validated;
  } catch (error) {
    console.error("AI generation error:", error);
    return null;
  }
}

// Fallback challenges when AI fails
function getFallbackChallenge(
  courseId: string,
  level: string,
): ChallengeResponse {
  const language = courseId.includes("flutter")
    ? "Flutter"
    : courseId.includes("systems")
      ? "Systems Design"
      : "JavaScript";

  const fallbacks: Record<string, ChallengeResponse[]> = {
    Flutter: [
      {
        id: "flutter-habit-tracker",
        title: "Build a Habit Tracker",
        description:
          "Create a beautiful habit tracking app with progress charts. Track daily habits, view streaks, and celebrate milestones with animations.",
        difficulty: "easy",
        skills: ["StatefulWidget", "ListView", "Local Storage", "Charts"],
        steps: [
          "Set up a new Flutter project with the habit tracker template",
          "Create a Habit model class with name, frequency, and completion status",
          "Build the main screen with a list of habits using ListView.builder",
          "Implement add/edit/delete functionality for habits",
          "Add a completion toggle with animated feedback",
          "Create a statistics page with a simple progress chart",
        ],
        estimatedTime: "3-4 hours",
        projectType: "app",
      },
      {
        id: "flutter-expense-dashboard",
        title: "Personal Expense Dashboard",
        description:
          "Build a full-featured expense tracking app with charts, categories, and monthly insights. Learn data visualization and state management.",
        difficulty: "medium",
        skills: ["Provider", "Charts", "SQLite", "Animations", "Date Handling"],
        steps: [
          "Set up project with provider and sqflite packages",
          "Design the database schema for expenses and categories",
          "Create the expense entry form with category selection",
          "Build the main dashboard with total spending summary",
          "Implement pie chart showing category breakdown",
          "Add monthly comparison bar chart",
          "Create expense list with filtering and search",
        ],
        estimatedTime: "5-6 hours",
        projectType: "app",
      },
    ],
    "Systems Design": [
      {
        id: "design-rate-limiter",
        title: "Design a Rate Limiting Service",
        description:
          "Architect a production-grade rate limiter that protects APIs from abuse. Learn token bucket algorithm, distributed rate limiting, and Redis integration.",
        difficulty: "medium",
        skills: ["Token Bucket", "Redis", "Distributed Systems", "API Design"],
        steps: [
          "Define rate limiting requirements (requests per second, per user)",
          "Compare rate limiting algorithms (token bucket vs sliding window)",
          "Design the in-memory rate limiter for single server",
          "Extend to distributed rate limiting with Redis",
          "Handle edge cases (burst traffic, graceful degradation)",
          "Design the API response format (rate limit headers)",
        ],
        estimatedTime: "2-3 hours",
        projectType: "system",
      },
    ],
  };

  const challenges = fallbacks[language] || fallbacks.Flutter;
  const index =
    level === "beginner"
      ? 0
      : level === "advanced"
        ? Math.min(1, challenges.length - 1)
        : 0;

  return challenges[index];
}

export async function POST(request: NextRequest) {
  try {
    const { courseId, userId, userName, userAvatar, userSurvey } =
      await request.json();

    if (!courseId) {
      return NextResponse.json({ error: "Missing courseId" }, { status: 400 });
    }

    // Determine difficulty from survey confidence
    const confidenceLevel = userSurvey?.confidence || 3;
    const level =
      userSurvey?.experienceLevel ||
      (confidenceLevel <= 2
        ? "beginner"
        : confidenceLevel <= 3
          ? "intermediate"
          : "advanced");

    // Try AI generation first
    let challenge = await generateChallengeWithAI(
      courseId,
      userSurvey || {
        experienceLevel: "beginner",
        interests: [],
        goals: [],
        learningStyle: "hands-on",
      },
    );

    // Fall back to curated challenges if AI fails
    if (!challenge) {
      challenge = getFallbackChallenge(courseId, level);
    }

    // Save to database — auto-publish as public
    const supabase = getServerSupabase();
    if (supabase && userId) {
      const { data: savedChallenge, error } = await supabase
        .from("challenges")
        .insert({
          course_id: courseId,
          user_id: userId,
          user_name: userName || "Anonymous",
          user_avatar: userAvatar || null,
          title: challenge.title,
          description: challenge.description,
          difficulty: challenge.difficulty,
          skills: challenge.skills,
          steps: challenge.steps,
          estimated_time: challenge.estimatedTime,
          project_type: challenge.projectType,
          is_public: true,
        })
        .select()
        .single();

      if (error) {
        console.error("DB save error:", error);
      }

      if (savedChallenge) {
        challenge = { ...challenge, id: savedChallenge.id };
      }
    }

    return NextResponse.json({
      success: true,
      challenge,
    });
  } catch (error) {
    console.error("Challenge generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate challenge" },
      { status: 500 },
    );
  }
}
