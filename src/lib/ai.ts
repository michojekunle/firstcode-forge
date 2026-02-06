import OpenAI from "openai";
import { UserProfile, Challenge } from "./store";

// Lazy initialization to avoid issues during build
let openaiClient: OpenAI | null = null;

function getOpenAI(): OpenAI | null {
  if (!process.env.OPENAI_API_KEY) {
    console.warn("OPENAI_API_KEY not set - using fallback challenges");
    return null;
  }
  if (!openaiClient) {
    openaiClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
  return openaiClient;
}

// Fallback challenges when AI is not available
const fallbackChallenges: Record<string, Challenge[]> = {
  Flutter: [
    {
      id: "flutter-counter",
      title: "Build a Smart Counter App",
      description:
        "Create an interactive counter with animations, sound effects, and haptic feedback. Learn state management fundamentals while building something delightful.",
      difficulty: "easy",
      language: "Flutter",
      estimatedTime: "1-2 hours",
      skills: ["StatefulWidget", "setState", "Animations", "GestureDetector"],
      steps: [
        "Set up a new Flutter project with the counter template",
        "Add increment and decrement buttons with custom styling",
        "Implement animated number transitions",
        "Add a shake-to-reset feature using device sensors",
        "Polish with haptic feedback and sound effects",
      ],
    },
    {
      id: "flutter-weather",
      title: "Weather Dashboard App",
      description:
        "Build a beautiful weather app that fetches real-time data. Practice HTTP requests, JSON parsing, and creating dynamic UIs.",
      difficulty: "medium",
      language: "Flutter",
      estimatedTime: "3-4 hours",
      skills: [
        "HTTP Requests",
        "JSON Parsing",
        "FutureBuilder",
        "Custom Widgets",
      ],
      steps: [
        "Set up project and add http package",
        "Create weather API service with OpenWeatherMap",
        "Design the main weather display UI",
        "Add 5-day forecast with horizontal scrolling",
        "Implement pull-to-refresh and loading states",
      ],
    },
    {
      id: "flutter-notes",
      title: "Notes App with Local Storage",
      description:
        "Build a full-featured notes app with CRUD operations and local persistence. Master state management and data storage patterns.",
      difficulty: "medium",
      language: "Flutter",
      estimatedTime: "3-4 hours",
      skills: ["SharedPreferences", "ListView", "CRUD", "Search & Filter"],
      steps: [
        "Set up project with shared_preferences package",
        "Create Note model and storage service",
        "Build the notes list with dismissible cards",
        "Implement add/edit note screen with form validation",
        "Add search functionality and categories",
      ],
    },
  ],
  "Systems Design": [
    {
      id: "sd-url-shortener",
      title: "Design a URL Shortener",
      description:
        "Architect a URL shortening service like bit.ly. Think through databases, caching, and scaling strategies.",
      difficulty: "medium",
      language: "Systems Design",
      estimatedTime: "1-2 hours",
      skills: ["Database Design", "Caching", "Load Balancing", "API Design"],
      steps: [
        "Define functional and non-functional requirements",
        "Estimate storage and traffic needs",
        "Design the URL encoding algorithm",
        "Plan database schema and caching strategy",
        "Diagram the full system architecture",
      ],
    },
  ],
  default: [
    {
      id: "generic-todo",
      title: "Build a Todo List Application",
      description:
        "Create a full-featured todo app with persistence. A classic project that teaches fundamental concepts.",
      difficulty: "easy",
      language: "JavaScript",
      estimatedTime: "2-3 hours",
      skills: ["DOM Manipulation", "Local Storage", "Event Handling", "CSS"],
      steps: [
        "Set up HTML structure with input and list",
        "Add JavaScript for creating todo items",
        "Implement complete and delete functionality",
        "Add local storage persistence",
        "Style with CSS and add animations",
      ],
    },
  ],
};

function getFallbackChallenge(profile: UserProfile): Challenge {
  const language = profile.preferredLanguage || "default";
  const challenges = fallbackChallenges[language] || fallbackChallenges.default;

  // Pick based on experience level
  let index = 0;
  if (profile.experienceLevel === "intermediate") index = 1;
  if (profile.experienceLevel === "advanced")
    index = Math.min(2, challenges.length - 1);

  return challenges[index % challenges.length];
}

export async function generateChallenge(
  profile: UserProfile,
): Promise<Challenge> {
  const openai = getOpenAI();

  // Use fallback if OpenAI is not available
  if (!openai) {
    return getFallbackChallenge(profile);
  }

  try {
    const prompt = `You are an expert coding instructor. Based on the following user profile, generate a personalized coding challenge that will help them learn and build something meaningful.

User Profile:
- Experience Level: ${profile.experienceLevel}
- Preferred Language: ${profile.preferredLanguage}
- Interests: ${profile.interests.join(", ")}
- Goals: ${profile.goals.join(", ")}
- Learning Style: ${profile.learningStyle}

Generate a unique, engaging coding challenge that:
1. Matches their skill level
2. Incorporates their interests
3. Uses their preferred programming language
4. Helps them build a portfolio-worthy project
5. Can be completed in 2-4 hours

Respond with a JSON object in this exact format:
{
  "id": "unique-id",
  "title": "Challenge Title",
  "description": "A compelling description of what they'll build and why it matters",
  "difficulty": "easy|medium|hard",
  "language": "programming language",
  "estimatedTime": "2-4 hours",
  "skills": ["skill1", "skill2", "skill3"],
  "steps": [
    "Step 1: ...",
    "Step 2: ...",
    "Step 3: ...",
    "Step 4: ...",
    "Step 5: ..."
  ]
}`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful coding instructor that generates personalized coding challenges. Always respond with valid JSON only, no markdown formatting.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.8,
      max_tokens: 1000,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      console.warn("No response from AI, using fallback");
      return getFallbackChallenge(profile);
    }

    // Parse the JSON response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.warn("Invalid JSON response from AI, using fallback");
      return getFallbackChallenge(profile);
    }

    return JSON.parse(jsonMatch[0]) as Challenge;
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    return getFallbackChallenge(profile);
  }
}
