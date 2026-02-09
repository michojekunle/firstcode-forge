import { NextRequest, NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabase-server";

// Get comments for a challenge
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const supabase = getServerSupabase();
    if (!supabase) {
      return NextResponse.json({ comments: [] });
    }

    const { id: challengeId } = await params;

    const { data: comments, error } = await supabase
      .from("challenge_comments")
      .select("*")
      .eq("challenge_id", challengeId)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Get comments error:", error);
      return NextResponse.json(
        { error: "Failed to get comments" },
        { status: 500 },
      );
    }

    return NextResponse.json({ comments: comments || [] });
  } catch (error) {
    console.error("Get comments error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// Create a comment
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const supabase = getServerSupabase();
    if (!supabase) {
      return NextResponse.json(
        { error: "Database not configured" },
        { status: 503 },
      );
    }

    const { id: challengeId } = await params;
    const { userId, userName, userAvatar, content, parentId } =
      await request.json();

    if (!userId || !content?.trim()) {
      return NextResponse.json(
        { error: "userId and content required" },
        { status: 400 },
      );
    }

    const { data: comment, error } = await supabase
      .from("challenge_comments")
      .insert({
        challenge_id: challengeId,
        user_id: userId,
        user_name: userName || "Anonymous",
        user_avatar: userAvatar || null,
        content: content.trim(),
        parent_id: parentId || null,
      })
      .select()
      .single();

    if (error) {
      console.error("Create comment error:", error);
      return NextResponse.json(
        { error: "Failed to create comment" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, comment });
  } catch (error) {
    console.error("Create comment error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
