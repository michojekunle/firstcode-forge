import { NextRequest, NextResponse } from "next/server";
import { generateChallenge } from "@/lib/ai";
import { UserProfile } from "@/lib/store";
import { getServerSupabase } from "@/lib/supabase-server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const profile: UserProfile = body.profile || body; // Handle both wrapped and unwrapped
    const userId = body.userId;

    // Validate required fields
    if (!profile.experienceLevel || !profile.preferredLanguage) {
      return NextResponse.json(
        { error: "Missing required profile fields" },
        { status: 400 },
      );
    }

    // Generate challenge content
    const challengeContent = await generateChallenge(profile);

    // Save to database if user is authenticated
    let savedChallenge = { ...challengeContent, id: "temp-" + Date.now() };

    if (userId) {
      const supabase = getServerSupabase();
      if (supabase) {
        const { data, error } = await supabase
          .from("challenges")
          .insert({
            user_id: userId,
            title: challengeContent.title,
            description: challengeContent.description,
            difficulty: challengeContent.difficulty,
            skills: challengeContent.skills,
            steps: challengeContent.steps,
            language: challengeContent.language,
            estimated_time: challengeContent.estimatedTime,
            is_public: true,
          })
          .select()
          .single();

        if (error) {
          console.error("Error saving challenge to DB:", error);
        } else if (data) {
          savedChallenge = {
            ...challengeContent,
            id: data.id,
          };
        }
      }
    }

    return NextResponse.json(savedChallenge);
  } catch (error) {
    console.error("Error generating challenge:", error);
    return NextResponse.json(
      { error: "Failed to generate challenge" },
      { status: 500 },
    );
  }
}
