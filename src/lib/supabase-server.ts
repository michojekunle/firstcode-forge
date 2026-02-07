import { createClient } from "@supabase/supabase-js";

// Server-side Supabase client (uses service key for admin operations)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

export function getServerSupabase() {
  if (!supabaseUrl || !supabaseServiceKey) {
    console.warn("Supabase server config not set - database features disabled");
    return null;
  }

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

// Type definitions for database tables
export interface Course {
  id: string;
  title: string;
  description: string;
  icon: string;
  total_lessons: number;
  created_at: string;
}

export interface CourseStats {
  course_id: string;
  avg_rating: number;
  total_ratings: number;
  total_enrollments: number;
  avg_completion_hours: number;
}

export interface Enrollment {
  user_id: string;
  course_id: string;
  progress: number;
  completed_lessons: number[];
  enrolled_at: string;
  completed_at: string | null;
}

export interface Rating {
  id: string;
  user_id: string;
  course_id: string;
  rating: number;
  review: string;
  created_at: string;
}

export interface Challenge {
  id: string;
  course_id: string;
  user_id: string;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  skills: string[];
  steps: string[];
  created_at: string;
}

export interface Submission {
  id: string;
  challenge_id: string;
  user_id: string;
  code: string;
  story: string;
  github_link: string;
  is_public: boolean;
  likes: number;
  created_at: string;
}

export interface UserSurvey {
  user_id: string;
  experience_level: string;
  preferred_language: string;
  interests: string[];
  goals: string[];
  learning_style: string;
}
