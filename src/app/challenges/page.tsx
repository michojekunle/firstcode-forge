"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/components/providers/auth-provider";
import { LikeButton } from "@/components/social/LikeButton";
import {
  Sparkles,
  Code2,
  Zap,
  Trophy,
  Clock,
  Users,
  ArrowRight,
  Github,
  LogIn,
  Lock,
  Star,
  Filter,
  Loader2,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface FeedChallenge {
  id: string;
  course_id: string;
  user_id: string;
  user_name: string;
  user_avatar?: string;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  skills: string[];
  steps: string[];
  estimated_time?: string;
  project_type?: string;
  is_public: boolean;
  likes_count: number;
  submissions_count: number;
  comments_count: number;
  is_liked?: boolean;
  created_at: string;
}

const difficultyConfig = {
  easy: { color: "text-green-500", bg: "bg-green-500/10", label: "Beginner" },
  medium: {
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
    label: "Intermediate",
  },
  hard: { color: "text-red-500", bg: "bg-red-500/10", label: "Advanced" },
};

const courseLabels: Record<string, { label: string; emoji: string }> = {
  "flutter-fundamentals": { label: "Flutter Fundamentals", emoji: "📱" },
  "flutter-advanced": { label: "Flutter Advanced", emoji: "🚀" },
  "dsa-fundamentals": { label: "DSA Fundamentals", emoji: "🧮" },
  "systems-design": { label: "Systems Design", emoji: "🏗️" },
};

const projectTypeEmojis: Record<string, string> = {
  app: "📱",
  tool: "🔧",
  system: "🏗️",
  game: "🎮",
  Algorithm: "🧮",
  "Mobile App": "📱",
  "System Design": "🏗️",
  Creative: "🎨",
};

function formatTimeAgo(dateStr: string): string {
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

// Sign-in banner for unauthenticated users
function SignInBanner({ onSignIn }: { onSignIn: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 rounded-xl border border-primary/20 bg-primary/5 flex items-center justify-between gap-4 mb-8"
    >
      <div className="flex items-center gap-3">
        <Lock className="w-5 h-5 text-primary" />
        <p className="text-sm">
          <span className="font-medium">Sign in</span> to start challenges,
          submit solutions, and interact with the community
        </p>
      </div>
      <Button size="sm" onClick={onSignIn} className="shrink-0 gap-1.5">
        <LogIn className="w-4 h-4" />
        Sign In
      </Button>
    </motion.div>
  );
}

// Auth modal
function AuthModal({
  isOpen,
  onClose,
  onGithub,
  onGoogle,
}: {
  isOpen: boolean;
  onClose: () => void;
  onGithub: () => void;
  onGoogle: () => void;
}) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-sm mx-4 p-6 bg-card border border-border rounded-2xl shadow-2xl"
        >
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-bold">Sign in to continue</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Create challenges, submit solutions, and join the community
            </p>
          </div>

          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full gap-2"
              onClick={onGithub}
            >
              <Github className="w-4 h-4" />
              Continue with GitHub
            </Button>
            <Button
              variant="outline"
              className="w-full gap-2"
              onClick={onGoogle}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Challenge card component
function ChallengeCard({
  challenge,
  index,
  userId,
}: {
  challenge: FeedChallenge;
  index: number;
  userId?: string;
}) {
  const diff = difficultyConfig[challenge.difficulty];
  const course = courseLabels[challenge.course_id];
  const emoji =
    projectTypeEmojis[challenge.project_type || ""] || course?.emoji || "🎯";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link href={`/challenges/${challenge.id}`}>
        <Card
          hover
          className="p-5 h-full group transition-all duration-300 hover:border-primary/30"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{emoji}</span>
              <div>
                <h3 className="font-bold text-base group-hover:text-primary transition-colors line-clamp-1">
                  {challenge.title}
                </h3>
                <div className="flex items-center gap-2 mt-0.5">
                  <span
                    className={cn(
                      "text-xs font-medium px-2 py-0.5 rounded-full",
                      diff.bg,
                      diff.color,
                    )}
                  >
                    {diff.label}
                  </span>
                  {course && (
                    <span className="text-xs text-muted-foreground">
                      {course.emoji} {course.label}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {challenge.description}
          </p>

          {/* Skills */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {challenge.skills?.slice(0, 4).map((skill) => (
              <span
                key={skill}
                className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-border">
            <div className="flex items-center gap-4">
              <div onClick={(e) => e.preventDefault()}>
                <LikeButton
                  initialCount={challenge.likes_count}
                  isLiked={challenge.is_liked}
                  targetType="challenge"
                  targetId={challenge.id}
                  userId={userId}
                  size="sm"
                />
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <MessageCircle className="w-3.5 h-3.5" />
                <span>{challenge.comments_count}</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Code2 className="w-3.5 h-3.5" />
                <span>{challenge.submissions_count} submissions</span>
              </div>
            </div>

            {/* Author */}
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center text-[10px] font-bold text-primary">
                {challenge.user_name?.charAt(0)?.toUpperCase() || "?"}
              </div>
              <span className="text-xs text-muted-foreground">
                {challenge.user_name} · {formatTimeAgo(challenge.created_at)}
              </span>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}

export default function ChallengesPage() {
  const { user, signInWithGithub, signInWithGoogle } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [challenges, setChallenges] = useState<FeedChallenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [courseFilter, setCourseFilter] = useState("all");
  const [feedFilter, setFeedFilter] = useState<"all" | "mine">("all");

  const fetchFeed = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (courseFilter !== "all") params.set("course", courseFilter);
      if (feedFilter === "mine" && user) {
        params.set("filter", "mine");
        params.set("userId", user.id);
      }
      if (user) params.set("userId", user.id);

      const res = await fetch(`/api/challenges/feed?${params.toString()}`);
      const data = await res.json();
      setChallenges(data.challenges || []);
    } catch (error) {
      console.error("Failed to load feed:", error);
    } finally {
      setLoading(false);
    }
  }, [courseFilter, feedFilter, user]);

  useEffect(() => {
    fetchFeed();
  }, [fetchFeed]);

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Trophy className="w-6 h-6 text-yellow-500" />
            <h1 className="text-3xl md:text-4xl font-bold">Challenge Feed</h1>
          </div>
          <p className="text-muted-foreground max-w-lg mx-auto">
            AI-generated challenges from the community. Complete a course to get
            your own, then see what others built.
          </p>
        </motion.div>

        {/* Sign-in banner */}
        {!user && <SignInBanner onSignIn={() => setShowAuthModal(true)} />}

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap items-center gap-3 mb-6"
        >
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Filter className="w-4 h-4" />
            <span className="font-medium">Filter:</span>
          </div>

          {/* Feed filter */}
          <div className="flex gap-1 bg-muted/50 rounded-lg p-0.5">
            {(["all", "mine"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFeedFilter(f)}
                disabled={f === "mine" && !user}
                className={cn(
                  "px-3 py-1.5 rounded-md text-xs font-medium transition-all",
                  feedFilter === f
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                  f === "mine" && !user && "opacity-50 cursor-not-allowed",
                )}
              >
                {f === "all" ? "All Challenges" : "My Challenges"}
              </button>
            ))}
          </div>

          {/* Course filter */}
          <div className="flex gap-1 bg-muted/50 rounded-lg p-0.5 overflow-x-auto">
            <button
              onClick={() => setCourseFilter("all")}
              className={cn(
                "px-3 py-1.5 rounded-md text-xs font-medium transition-all shrink-0",
                courseFilter === "all"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              All Courses
            </button>
            {Object.entries(courseLabels).map(([key, { label, emoji }]) => (
              <button
                key={key}
                onClick={() => setCourseFilter(key)}
                className={cn(
                  "px-3 py-1.5 rounded-md text-xs font-medium transition-all shrink-0",
                  courseFilter === key
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {emoji} {label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="flex items-center gap-6 mb-6 text-sm text-muted-foreground"
        >
          <div className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-yellow-500" />
            <span>{challenges.length} challenges</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4 text-primary" />
            <span>
              {challenges.reduce((s, c) => s + c.submissions_count, 0)} total
              submissions
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Star className="w-4 h-4 text-orange-500" />
            <span>
              {challenges.reduce((s, c) => s + c.likes_count, 0)} likes
            </span>
          </div>
        </motion.div>

        {/* Challenge grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        ) : challenges.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Sparkles className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No challenges yet</h3>
            <p className="text-muted-foreground text-sm max-w-sm mx-auto mb-4">
              Complete a course to generate your first AI challenge. It will
              appear here for everyone to see and attempt.
            </p>
            <Link href="/learn">
              <Button glow className="gap-1.5">
                Browse Courses
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {challenges.map((challenge, i) => (
              <ChallengeCard
                key={challenge.id}
                challenge={challenge}
                index={i}
                userId={user?.id}
              />
            ))}
          </div>
        )}

        {/* CTA for completing courses */}
        {challenges.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-12 text-center"
          >
            <Card
              hover={false}
              className="p-6 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border-primary/20 inline-block"
            >
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary" />
                <p className="text-sm">
                  <span className="font-medium">Want your own challenge?</span>{" "}
                  Complete any course to get a personalized AI challenge.
                </p>
                <Link href="/learn">
                  <Button size="sm" variant="outline" className="gap-1.5 ml-2">
                    Browse Courses
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </Card>
          </motion.div>
        )}
      </div>

      {/* Auth modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onGithub={() => {
          setShowAuthModal(false);
          signInWithGithub();
        }}
        onGoogle={() => {
          setShowAuthModal(false);
          signInWithGoogle();
        }}
      />
    </div>
  );
}
