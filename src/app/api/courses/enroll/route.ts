import { NextRequest, NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabase-server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: NextRequest) {
  try {
    const supabase = getServerSupabase();

    if (!supabase) {
      return NextResponse.json(
        { error: "Database not configured" },
        { status: 503 },
      );
    }

    const { courseId, userId } = await request.json();

    if (!courseId || !userId) {
      return NextResponse.json(
        { error: "Missing courseId or userId" },
        { status: 400 },
      );
    }

    // Check if already enrolled
    const { data: existing } = await supabase
      .from("enrollments")
      .select("*")
      .eq("user_id", userId)
      .eq("course_id", courseId)
      .single();

    if (existing) {
      return NextResponse.json({
        success: true,
        message: "Already enrolled",
        enrollment: existing,
      });
    }

    // Create enrollment
    const { data: enrollment, error: enrollError } = await supabase
      .from("enrollments")
      .insert({
        user_id: userId,
        course_id: courseId,
        progress: 0,
        completed_lessons: [],
        enrolled_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (enrollError) {
      console.error("Enrollment error:", enrollError);
      return NextResponse.json({ error: "Failed to enroll" }, { status: 500 });
    }

    // Increment course enrollment count
    await supabase.rpc("increment_enrollments", { course: courseId });

    return NextResponse.json({
      success: true,
      enrollment,
    });
  } catch (error) {
    console.error("Enroll error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// Update progress
export async function PATCH(request: NextRequest) {
  try {
    const supabase = getServerSupabase();

    if (!supabase) {
      return NextResponse.json(
        { error: "Database not configured" },
        { status: 503 },
      );
    }

    const { courseId, userId, progress, completedLessons } =
      await request.json();

    if (!courseId || !userId) {
      return NextResponse.json(
        { error: "Missing courseId or userId" },
        { status: 400 },
      );
    }

    const updateData: Record<string, unknown> = {};
    if (progress !== undefined) updateData.progress = progress;
    if (completedLessons !== undefined)
      updateData.completed_lessons = completedLessons;

    // Check if course is complete (progress = 100)
    if (progress === 100) {
      updateData.completed_at = new Date().toISOString();
    }

    const { data, error } = await supabase
      .from("enrollments")
      .update(updateData)
      .eq("user_id", userId)
      .eq("course_id", courseId)
      .select()
      .single();

    if (error) {
      console.error("Progress update error:", error);
      return NextResponse.json(
        { error: "Failed to update progress" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      enrollment: data,
    });
  } catch (error) {
    console.error("Progress update error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
