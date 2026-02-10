import OpenAI from "openai";
import Groq from "groq-sdk";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { UserProfile, Challenge } from "./store";

// Initialize clients (lazy load)
let openaiClient: OpenAI | null = null;
let groqClient: Groq | null = null;
let geminiClient: GoogleGenerativeAI | null = null;

function getClients() {
  if (!openaiClient && process.env.OPENAI_API_KEY) {
    openaiClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

  if (!groqClient && process.env.GROQ_API_KEY) {
    groqClient = new Groq({ apiKey: process.env.GROQ_API_KEY });
  }

  if (!geminiClient && process.env.GEMINI_API_KEY) {
    geminiClient = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  }

  return { openai: openaiClient, groq: groqClient, gemini: geminiClient };
}

// Fallback challenges when AI is not available
const fallbackChallenges: Record<string, Omit<Challenge, "id">> = {
  Flutter: [
    {
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
  ],
  "Systems Design": [
    {
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

function getFallbackChallenge(profile: UserProfile): Omit<Challenge, "id"> {
  const language = profile.preferredLanguage || "default";
  // @ts-ignore
  const challenges = fallbackChallenges[language] || fallbackChallenges.default;

  // Pick based on experience level
  let index = 0;
  if (profile.experienceLevel === "intermediate") index = 1;
  if (profile.experienceLevel === "advanced")
    index = Math.min(2, challenges.length - 1);

  return challenges[index % challenges.length];
}

const SYSTEM_PROMPT = `You are an expert coding instructor. Generate a personalized coding challenge based on the user profile.
Respond ONLY with a raw JSON object (no markdown, no backticks, no comments).
Format:
{
  "title": "Challenge Title",
  "description": "Description...",
  "difficulty": "easy|medium|hard",
  "language": "Language",
  "estimatedTime": "2-4 hours",
  "skills": ["skill1", "skill2"],
  "steps": ["step1", "step2"]
}`;

function buildPrompt(profile: UserProfile) {
  return `User Profile:
- Level: ${profile.experienceLevel}
- Language: ${profile.preferredLanguage}
- Interests: ${profile.interests.join(", ")}
- Goals: ${profile.goals.join(", ")}
- Learning Style: ${profile.learningStyle}

Generate a unique challenge that matches their skill level and interests.`;
}

async function tryGroq(prompt: string): Promise<string | null> {
  const { groq } = getClients();
  if (!groq) return null;
  try {
    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: prompt },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 1024,
    });
    return completion.choices[0]?.message?.content || null;
  } catch (e) {
    console.error("Groq generation failed:", e);
    return null;
  }
}

async function tryGemini(prompt: string): Promise<string | null> {
  const { gemini } = getClients();
  if (!gemini) return null;
  try {
    const model = gemini.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent([SYSTEM_PROMPT, prompt]);
    return result.response.text();
  } catch (e) {
    console.error("Gemini generation failed:", e);
    return null;
  }
}

async function tryOpenAI(prompt: string): Promise<string | null> {
  const { openai } = getClients();
  if (!openai) return null;
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: prompt },
      ],
      temperature: 0.8,
    });
    return response.choices[0]?.message?.content || null;
  } catch (e) {
    console.error("OpenAI generation failed:", e);
    return null;
  }
}

function parseResponse(content: string): Omit<Challenge, "id"> | null {
  try {
    // Remove markdown code blocks if present (Groq/Gemini sometimes add them despite instructions)
    const clean = content
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
    // Validate if it looks like JSON
    if (!clean.startsWith("{")) return null;
    return JSON.parse(clean);
  } catch (e) {
    console.error("Failed to parse JSON:", content);
    return null;
  }
}

export async function generateChallenge(
  profile: UserProfile,
): Promise<Omit<Challenge, "id">> {
  const prompt = buildPrompt(profile);
  let content: string | null = null;
  let provider = "fallback";

  // 1. Try Groq (Fastest & Free-ish)
  if (!content) {
    content = await tryGroq(prompt);
    if (content) provider = "groq";
  }

  // 2. Fallback to Gemini
  if (!content) {
    content = await tryGemini(prompt);
    if (content) provider = "gemini";
  }

  // 3. Fallback to OpenAI
  if (!content) {
    content = await tryOpenAI(prompt);
    if (content) provider = "openai";
  }

  if (content) {
    const parsed = parseResponse(content);
    if (parsed) {
      console.log(`Generated challenge using ${provider}`);
      return parsed;
    }
  }

  // 4. Ultimate Fallback
  console.warn("All AI models failed, using curated fallback");
  return getFallbackChallenge(profile);
}
