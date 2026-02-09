import { NextRequest, NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabase-server";

// Sample challenges for when DB isn't configured
const sampleChallenges = [
  {
    id: "sample-1",
    course_id: "flutter-fundamentals",
    user_id: "user-1",
    user_name: "Sarah Chen",
    user_avatar: "https://i.pravatar.cc/150?u=sarah",
    title: "Build a Habit Tracker",
    description:
      "Create a beautiful habit tracking app with streak animations, daily reminders, and weekly progress charts. Focus on smooth state management and clean UI patterns.",
    difficulty: "medium",
    skills: ["StatefulWidget", "Animations", "Local Storage", "Charts"],
    steps: [
      "Design the habit card component",
      "Implement streak counter logic",
      "Add daily check-in animation",
      "Build weekly progress chart",
      "Add local notification reminders",
    ],
    estimated_time: "3 hours",
    project_type: "Mobile App",
    is_public: true,
    likes_count: 24,
    submissions_count: 8,
    comments_count: 5,
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "sample-2",
    course_id: "dsa-fundamentals",
    user_id: "user-2",
    user_name: "Alex Rivera",
    user_avatar: "https://i.pravatar.cc/150?u=alex",
    title: "LRU Cache Implementation",
    description:
      "Implement a Least Recently Used cache with O(1) get and put operations using a hash map and doubly linked list.",
    difficulty: "hard",
    skills: ["Hash Maps", "Linked Lists", "Time Complexity", "Design"],
    steps: [
      "Design the doubly linked list node",
      "Create the hash map structure",
      "Implement get with O(1) lookup",
      "Implement put with eviction",
      "Add comprehensive test cases",
    ],
    estimated_time: "2 hours",
    project_type: "Algorithm",
    is_public: true,
    likes_count: 42,
    submissions_count: 15,
    comments_count: 12,
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "sample-3",
    course_id: "systems-design",
    user_id: "user-3",
    user_name: "Maya Johnson",
    user_avatar: "https://i.pravatar.cc/150?u=maya",
    title: "Design a URL Shortener",
    description:
      "Design a complete URL shortening service like bit.ly. Consider scalability, analytics tracking, and custom alias support.",
    difficulty: "medium",
    skills: ["Databases", "Hashing", "API Design", "Caching"],
    steps: [
      "Define the data model and schema",
      "Design the shortening algorithm",
      "Plan the redirect flow with caching",
      "Add click analytics tracking",
      "Consider rate limiting and abuse prevention",
    ],
    estimated_time: "1.5 hours",
    project_type: "System Design",
    is_public: true,
    likes_count: 38,
    submissions_count: 11,
    comments_count: 7,
    created_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "sample-4",
    course_id: "flutter-advanced",
    user_id: "user-4",
    user_name: "Daniel Kim",
    user_avatar: "https://i.pravatar.cc/150?u=daniel",
    title: "Custom Paint Music Visualizer",
    description:
      "Build a real-time audio visualizer using CustomPainter with smooth waveform animations and gradient effects.",
    difficulty: "hard",
    skills: ["CustomPainter", "Animations", "Audio", "Performance"],
    steps: [
      "Set up audio stream input",
      "Create the CustomPainter canvas",
      "Implement waveform rendering",
      "Add gradient color effects",
      "Optimize with RepaintBoundary",
    ],
    estimated_time: "4 hours",
    project_type: "Creative",
    is_public: true,
    likes_count: 56,
    submissions_count: 6,
    comments_count: 9,
    created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
];

// Public challenge feed
export async function GET(request: NextRequest) {
  try {
    const supabase = getServerSupabase();

    if (!supabase) {
      // Return sample data when DB isn't configured
      const { searchParams } = new URL(request.url);
      const courseFilter = searchParams.get("course");

      let filtered = sampleChallenges;
      if (courseFilter && courseFilter !== "all") {
        filtered = filtered.filter((c) => c.course_id === courseFilter);
      }

      return NextResponse.json({
        challenges: filtered,
        source: "sample",
        total: filtered.length,
      });
    }

    const { searchParams } = new URL(request.url);
    const courseFilter = searchParams.get("course");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const userId = searchParams.get("userId");
    const filter = searchParams.get("filter"); // "all" | "mine"

    let query = supabase
      .from("challenges")
      .select("*", { count: "exact" })
      .eq("is_public", true)
      .order("created_at", { ascending: false })
      .range((page - 1) * limit, page * limit - 1);

    if (courseFilter && courseFilter !== "all") {
      query = query.eq("course_id", courseFilter);
    }

    if (filter === "mine" && userId) {
      query = query.eq("user_id", userId);
    }

    const { data: challenges, error, count: total } = await query;

    if (error) {
      console.error("Feed error:", error);
      return NextResponse.json(
        { error: "Failed to load feed" },
        { status: 500 },
      );
    }

    // Enrich with counts
    const enriched = await Promise.all(
      (challenges || []).map(async (challenge) => {
        const [likesRes, submissionsRes, commentsRes] = await Promise.all([
          supabase
            .from("challenge_likes")
            .select("*", { count: "exact", head: true })
            .eq("challenge_id", challenge.id),
          supabase
            .from("submissions")
            .select("*", { count: "exact", head: true })
            .eq("challenge_id", challenge.id),
          supabase
            .from("challenge_comments")
            .select("*", { count: "exact", head: true })
            .eq("challenge_id", challenge.id),
        ]);

        // Check if current user liked it
        let isLiked = false;
        if (userId) {
          const { data } = await supabase
            .from("challenge_likes")
            .select("id")
            .eq("challenge_id", challenge.id)
            .eq("user_id", userId)
            .single();
          isLiked = !!data;
        }

        return {
          ...challenge,
          likes_count: likesRes.count || 0,
          submissions_count: submissionsRes.count || 0,
          comments_count: commentsRes.count || 0,
          is_liked: isLiked,
        };
      }),
    );

    return NextResponse.json({
      challenges: enriched,
      source: "database",
      total: total || 0,
      page,
      limit,
    });
  } catch (error) {
    console.error("Feed error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
