import { NextRequest, NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabase-server";

// Create a new submission
export async function POST(request: NextRequest) {
  try {
    const supabase = getServerSupabase();

    if (!supabase) {
      return NextResponse.json(
        { error: "Database not configured" },
        { status: 503 },
      );
    }

    const { challengeId, userId, code, story, githubLink, isPublic } =
      await request.json();

    if (!challengeId || !userId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const { data: submission, error } = await supabase
      .from("submissions")
      .insert({
        challenge_id: challengeId,
        user_id: userId,
        code: code || "",
        story: story || "",
        github_link: githubLink || null,
        is_public: isPublic || false,
        likes: 0,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error("Submission error:", error);
      return NextResponse.json(
        { error: "Failed to create submission" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      submission,
    });
  } catch (error) {
    console.error("Submission error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// Get submissions (public only unless user is owner)
export async function GET(request: NextRequest) {
  try {
    const supabase = getServerSupabase();

    if (!supabase) {
      // Return sample submissions when DB not configured
      return NextResponse.json({
        submissions: [
          {
            id: "sample-1",
            challenge_id: "flutter-counter",
            user_id: "user-1",
            user_name: "Sarah Chen",
            user_avatar: "https://i.pravatar.cc/150?u=sarah",
            story: "This was my first Flutter project!",
            likes: 24,
            created_at: new Date().toISOString(),
          },
        ],
        source: "sample",
      });
    }

    const { searchParams } = new URL(request.url);
    const challengeId = searchParams.get("challengeId");
    const userId = searchParams.get("userId");
    const publicOnly = searchParams.get("public") !== "false";

    let query = supabase
      .from("submissions")
      .select("*")
      .order("created_at", { ascending: false });

    if (challengeId) {
      query = query.eq("challenge_id", challengeId);
    }

    if (publicOnly && !userId) {
      query = query.eq("is_public", true);
    }

    if (userId) {
      // User can see their own + public submissions
      query = query.or(`is_public.eq.true,user_id.eq.${userId}`);
    }

    const { data: submissions, error } = await query.limit(50);

    if (error) {
      console.error("Get submissions error:", error);
      return NextResponse.json(
        { error: "Failed to get submissions" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      submissions: submissions || [],
      source: "database",
    });
  } catch (error) {
    console.error("Get submissions error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// Toggle submission visibility
export async function PATCH(request: NextRequest) {
  try {
    const supabase = getServerSupabase();

    if (!supabase) {
      return NextResponse.json(
        { error: "Database not configured" },
        { status: 503 },
      );
    }

    const { submissionId, userId, isPublic } = await request.json();

    if (!submissionId || !userId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Verify ownership
    const { data: existing } = await supabase
      .from("submissions")
      .select("user_id")
      .eq("id", submissionId)
      .single();

    if (!existing || existing.user_id !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { data: submission, error } = await supabase
      .from("submissions")
      .update({ is_public: isPublic })
      .eq("id", submissionId)
      .select()
      .single();

    if (error) {
      console.error("Update submission error:", error);
      return NextResponse.json(
        { error: "Failed to update submission" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      submission,
    });
  } catch (error) {
    console.error("Update submission error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
