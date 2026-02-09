import { NextRequest, NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabase-server";

// Toggle like on a submission
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

    const { id: submissionId } = await params;
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: "userId required" }, { status: 400 });
    }

    // Check if already liked
    const { data: existing } = await supabase
      .from("submission_likes")
      .select("id")
      .eq("submission_id", submissionId)
      .eq("user_id", userId)
      .single();

    if (existing) {
      await supabase.from("submission_likes").delete().eq("id", existing.id);

      return NextResponse.json({ liked: false });
    } else {
      await supabase.from("submission_likes").insert({
        submission_id: submissionId,
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

    const { id: submissionId } = await params;
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    const { count } = await supabase
      .from("submission_likes")
      .select("*", { count: "exact", head: true })
      .eq("submission_id", submissionId);

    let isLiked = false;
    if (userId) {
      const { data } = await supabase
        .from("submission_likes")
        .select("id")
        .eq("submission_id", submissionId)
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
