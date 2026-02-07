import { NextRequest, NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabase-server";

// Hardcoded courses for when database is not available
const fallbackCourses = [
  {
    id: "flutter-fundamentals",
    title: "Flutter Fundamentals",
    description:
      "Master Flutter from first principles. Build beautiful, natively compiled applications.",
    icon: "💙",
    total_lessons: 6,
  },
  {
    id: "flutter-advanced",
    title: "Flutter Advanced",
    description:
      "State management, animations, and architecture patterns for production apps.",
    icon: "🚀",
    total_lessons: 6,
  },
  {
    id: "systems-design",
    title: "Systems Design",
    description:
      "Design scalable systems. From load balancers to distributed databases.",
    icon: "🏗️",
    total_lessons: 5,
  },
  {
    id: "dsa-fundamentals",
    title: "DSA Fundamentals",
    description:
      "Data Structures & Algorithms from first principles. Big O, arrays, trees, and more.",
    icon: "🧮",
    total_lessons: 7,
  },
];

const fallbackStats: Record<
  string,
  { avg_rating: number; total_ratings: number; total_enrollments: number }
> = {
  "flutter-fundamentals": {
    avg_rating: 4.8,
    total_ratings: 234,
    total_enrollments: 1250,
  },
  "flutter-advanced": {
    avg_rating: 4.9,
    total_ratings: 156,
    total_enrollments: 820,
  },
  "systems-design": {
    avg_rating: 4.7,
    total_ratings: 189,
    total_enrollments: 945,
  },
  "dsa-fundamentals": {
    avg_rating: 4.8,
    total_ratings: 120,
    total_enrollments: 680,
  },
};

export async function GET(request: NextRequest) {
  try {
    const supabase = getServerSupabase();

    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get("courseId");

    // If no Supabase, return fallback data
    if (!supabase) {
      if (courseId) {
        const course = fallbackCourses.find((c) => c.id === courseId);
        const stats = fallbackStats[courseId] || {
          avg_rating: 0,
          total_ratings: 0,
          total_enrollments: 0,
        };

        return NextResponse.json({
          course,
          stats,
          source: "fallback",
        });
      }

      return NextResponse.json({
        courses: fallbackCourses.map((course) => ({
          ...course,
          stats: fallbackStats[course.id] || {
            avg_rating: 0,
            total_ratings: 0,
            total_enrollments: 0,
          },
        })),
        source: "fallback",
      });
    }

    // Get from database
    if (courseId) {
      const { data: course } = await supabase
        .from("courses")
        .select("*")
        .eq("id", courseId)
        .single();

      const { data: stats } = await supabase
        .from("course_stats")
        .select("*")
        .eq("course_id", courseId)
        .single();

      // Fallback to hardcoded if not in DB
      if (!course) {
        const fallbackCourse = fallbackCourses.find((c) => c.id === courseId);
        const fallbackStat = fallbackStats[courseId];

        return NextResponse.json({
          course: fallbackCourse,
          stats: fallbackStat || {
            avg_rating: 0,
            total_ratings: 0,
            total_enrollments: 0,
          },
          source: "fallback",
        });
      }

      return NextResponse.json({
        course,
        stats: stats || {
          avg_rating: 0,
          total_ratings: 0,
          total_enrollments: 0,
        },
        source: "database",
      });
    }

    // Get all courses
    const { data: courses } = await supabase
      .from("courses")
      .select("*")
      .order("created_at", { ascending: true });

    const { data: allStats } = await supabase.from("course_stats").select("*");

    const statsMap = new Map(allStats?.map((s) => [s.course_id, s]) || []);

    // Merge DB courses with fallback ones
    const mergedCourses = [...fallbackCourses].map((fallback) => {
      const dbCourse = courses?.find((c) => c.id === fallback.id);
      const dbStats = statsMap.get(fallback.id);

      return {
        ...(dbCourse || fallback),
        stats: dbStats ||
          fallbackStats[fallback.id] || {
            avg_rating: 0,
            total_ratings: 0,
            total_enrollments: 0,
          },
      };
    });

    return NextResponse.json({
      courses: mergedCourses,
      source: courses?.length ? "database" : "fallback",
    });
  } catch (error) {
    console.error("Stats error:", error);

    // Return fallback on error
    return NextResponse.json({
      courses: fallbackCourses.map((course) => ({
        ...course,
        stats: fallbackStats[course.id] || {
          avg_rating: 0,
          total_ratings: 0,
          total_enrollments: 0,
        },
      })),
      source: "fallback",
    });
  }
}
