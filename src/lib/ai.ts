import OpenAI from "openai";
import { UserProfile, Challenge } from "./store";

// Lazy initialization to avoid issues during build
let openaiClient: OpenAI | null = null;

function getOpenAI(): OpenAI {
  if (!openaiClient) {
    openaiClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
  return openaiClient;
}

export async function generateChallenge(
  profile: UserProfile,
): Promise<Challenge> {
  const openai = getOpenAI();

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
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content:
          "You are a helpful coding instructor that generates personalized coding challenges. Always respond with valid JSON.",
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
    throw new Error("No response from AI");
  }

  // Parse the JSON response
  const jsonMatch = content.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("Invalid JSON response from AI");
  }

  return JSON.parse(jsonMatch[0]) as Challenge;
}
