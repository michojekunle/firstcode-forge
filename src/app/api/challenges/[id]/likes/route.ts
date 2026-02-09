import { NextRequest, NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabase-server";

// Toggle like on a challenge
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
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: "userId required" }, { status: 400 });
    }

    // Check if already liked
    const { data: existing } = await supabase
      .from("challenge_likes")
      .select("id")
      .eq("challenge_id", challengeId)
      .eq("user_id", userId)
      .single();

    if (existing) {
      // Unlike
      await supabase.from("challenge_likes").delete().eq("id", existing.id);

      return NextResponse.json({ liked: false });
    } else {
      // Like
      await supabase.from("challenge_likes").insert({
        challenge_id: challengeId,
        user_id: userId,
      });

      return NextResponse.json({ liked: true });
    }
  } catch (error) {
    console.error("Like toggle error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// Get like count + user's like status
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const supabase = getServerSupabase();
    if (!supabase) {
      return NextResponse.json({ count: 0, isLiked: false });
    }

    const { id: challengeId } = await params;
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    const { count } = await supabase
      .from("challenge_likes")
      .select("*", { count: "exact", head: true })
      .eq("challenge_id", challengeId);

    let isLiked = false;
    if (userId) {
      const { data } = await supabase
        .from("challenge_likes")
        .select("id")
        .eq("challenge_id", challengeId)
        .eq("user_id", userId)
        .single();
      isLiked = !!data;
    }

    return NextResponse.json({ count: count || 0, isLiked });
  } catch (error) {
    console.error("Get likes error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
