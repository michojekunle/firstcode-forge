import { NextRequest, NextResponse } from "next/server";
import { generateChallenge } from "@/lib/ai";
import { UserProfile } from "@/lib/store";

export async function POST(request: NextRequest) {
  try {
    const profile: UserProfile = await request.json();

    // Validate required fields
    if (!profile.experienceLevel || !profile.preferredLanguage) {
      return NextResponse.json(
        { error: "Missing required profile fields" },
        { status: 400 },
      );
    }

    const challenge = await generateChallenge(profile);

    return NextResponse.json(challenge);
  } catch (error) {
    console.error("Error generating challenge:", error);
    return NextResponse.json(
      { error: "Failed to generate challenge" },
      { status: 500 },
    );
  }
}
