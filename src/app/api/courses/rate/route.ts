import { NextRequest, NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabase-server";

export async function POST(request: NextRequest) {
  try {
    const supabase = getServerSupabase();

    if (!supabase) {
      return NextResponse.json(
        { error: "Database not configured" },
        { status: 503 },
      );
    }

    const { courseId, userId, rating, review } = await request.json();

    if (!courseId || !userId || !rating) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 },
      );
    }

    // Upsert rating (update if exists, insert if not)
    const { data, error } = await supabase
      .from("ratings")
      .upsert(
        {
          user_id: userId,
          course_id: courseId,
          rating,
          review: review || null,
          created_at: new Date().toISOString(),
        },
        { onConflict: "user_id,course_id" },
      )
      .select()
      .single();

    if (error) {
      console.error("Rating error:", error);
      return NextResponse.json(
        { error: "Failed to submit rating" },
        { status: 500 },
      );
    }

    // Recalculate average rating for the course
    const { data: allRatings } = await supabase
      .from("ratings")
      .select("rating")
      .eq("course_id", courseId);

    if (allRatings && allRatings.length > 0) {
      const avgRating =
        allRatings.reduce((sum, r) => sum + r.rating, 0) / allRatings.length;

      await supabase.from("course_stats").upsert(
        {
          course_id: courseId,
          avg_rating: Math.round(avgRating * 10) / 10,
          total_ratings: allRatings.length,
        },
        { onConflict: "course_id" },
      );
    }

    return NextResponse.json({
      success: true,
      rating: data,
    });
  } catch (error) {
    console.error("Rating error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// Get user's rating for a course
export async function GET(request: NextRequest) {
  try {
    const supabase = getServerSupabase();

    if (!supabase) {
      return NextResponse.json(
        { error: "Database not configured" },
        { status: 503 },
      );
    }

    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get("courseId");
    const userId = searchParams.get("userId");

    if (!courseId) {
      return NextResponse.json({ error: "Missing courseId" }, { status: 400 });
    }

    // Get course ratings
    const { data: ratings } = await supabase
      .from("ratings")
      .select("*")
      .eq("course_id", courseId)
      .order("created_at", { ascending: false });

    // If userId provided, get their specific rating
    let userRating = null;
    if (userId) {
      const { data } = await supabase
        .from("ratings")
        .select("*")
        .eq("course_id", courseId)
        .eq("user_id", userId)
        .single();
      userRating = data;
    }

    return NextResponse.json({
      ratings: ratings || [],
      userRating,
    });
  } catch (error) {
    console.error("Get ratings error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
