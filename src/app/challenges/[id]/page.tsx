"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/components/providers/auth-provider";
import { LikeButton } from "@/components/social/LikeButton";
import {
  CommentSection,
  type Comment,
} from "@/components/social/CommentSection";
import { BlurOverlay } from "@/components/social/BlurOverlay";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Code2,
  Zap,
  Play,
  Users,
  ExternalLink,
  CheckCircle2,
  Loader2,
  Github,
  Send,
} from "lucide-react";
import Link from "next/link";
import { use, useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

interface ChallengeDetail {
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
  created_at: string;
}

interface Submission {
  id: string;
  challenge_id: string;
  user_id: string;
  user_name?: string;
  user_avatar?: string;
  code?: string;
  story?: string;
  github_link?: string;
  is_public: boolean;
  likes: number;
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

// Sample challenge for when DB isn't configured
const sampleChallenge: ChallengeDetail = {
  id: "sample",
  course_id: "flutter-fundamentals",
  user_id: "user-1",
  user_name: "Sarah Chen",
  title: "Build a Habit Tracker",
  description:
    "Create a beautiful habit tracking app with progress charts, streak animations, and daily reminders. Apply everything you learned about state management and UI composition.",
  difficulty: "medium",
  skills: ["StatefulWidget", "Animations", "Local Storage", "Charts"],
  steps: [
    "Design the habit card component with checkbox and streak counter",
    "Implement local storage for persistence using SharedPreferences",
    "Build the main screen with a scrollable list of habits",
    "Add completion animation with confetti effect",
    "Create a statistics page with weekly progress chart",
    "Implement daily reminder notifications",
  ],
  estimated_time: "3 hours",
  project_type: "app",
  is_public: true,
  created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
};

const sampleSubmissions: Submission[] = [
  {
    id: "sub-1",
    challenge_id: "sample",
    user_id: "user-2",
    user_name: "Marcus Johnson",
    user_avatar: "https://i.pravatar.cc/150?u=marcus",
    story:
      "This was my first Flutter project! I learned so much about setState and how the widget tree works.",
    is_public: true,
    likes: 24,
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "sub-2",
    challenge_id: "sample",
    user_id: "user-3",
    user_name: "Priya Patel",
    user_avatar: "https://i.pravatar.cc/150?u=priya",
    story:
      "Added some extra animations to make it feel more polished. The confetti on streak completion was fun to build!",
    github_link: "https://github.com/example/habit-tracker",
    is_public: true,
    likes: 42,
    created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
];

function formatTimeAgo(dateStr: string): string {
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function ChallengeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { user } = useAuth();

  const [challenge, setChallenge] = useState<ChallengeDetail | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [submitStory, setSubmitStory] = useState("");
  const [submitGithub, setSubmitGithub] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const fetchChallenge = useCallback(async () => {
    setLoading(true);
    try {
      // Try to fetch from API
      const [challengeRes, submissionsRes, commentsRes, likesRes] =
        await Promise.all([
          fetch(`/api/challenges/feed?course=all&limit=100`),
          fetch(
            `/api/submissions?challengeId=${id}${user ? `&userId=${user.id}` : ""}`,
          ),
          fetch(`/api/challenges/${id}/comments`),
          fetch(
            `/api/challenges/${id}/likes${user ? `?userId=${user.id}` : ""}`,
          ),
        ]);

      // Find the specific challenge from the feed
      const feedData = await challengeRes.json();
      const found = feedData.challenges?.find(
        (c: ChallengeDetail) => c.id === id,
      );

      if (found) {
        setChallenge(found);
      } else {
        setChallenge(sampleChallenge);
      }

      const subData = await submissionsRes.json();
      if (subData.submissions?.length > 0) {
        setSubmissions(subData.submissions);
        if (user) {
          setHasSubmitted(
            subData.submissions.some((s: Submission) => s.user_id === user.id),
          );
        }
      } else {
        setSubmissions(sampleSubmissions);
      }

      const commentData = await commentsRes.json();
      setComments(commentData.comments || []);

      const likeData = await likesRes.json();
      setLikesCount(likeData.count || 0);
      setIsLiked(likeData.isLiked || false);
    } catch {
      setChallenge(sampleChallenge);
      setSubmissions(sampleSubmissions);
    } finally {
      setLoading(false);
    }
  }, [id, user]);

  useEffect(() => {
    fetchChallenge();
  }, [fetchChallenge]);

  const handleSubmit = async () => {
    if (!user || !submitStory.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          challengeId: id,
          userId: user.id,
          story: submitStory,
          githubLink: submitGithub || null,
          isPublic: true,
          userName:
            user.user_metadata?.full_name ||
            user.user_metadata?.name ||
            "Anonymous",
          userAvatar: user.user_metadata?.avatar_url || null,
        }),
      });

      if (res.ok) {
        setHasSubmitted(true);
        setShowSubmitForm(false);
        setSubmitStory("");
        setSubmitGithub("");
        fetchChallenge();
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handlePostComment = async (content: string, parentId?: string) => {
    if (!user) return;
    try {
      const res = await fetch(`/api/challenges/${id}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          userName:
            user.user_metadata?.full_name ||
            user.user_metadata?.name ||
            "Anonymous",
          userAvatar: user.user_metadata?.avatar_url || null,
          content,
          parentId,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setComments((prev) => [...prev, data.comment]);
      }
    } catch (err) {
      console.error("Failed to post comment:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!challenge) return null;

  const difficulty = difficultyConfig[challenge.difficulty];

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link
            href="/challenges"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Challenges
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-start gap-4 mb-4">
            <span className="text-5xl">🎯</span>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${difficulty.bg} ${difficulty.color}`}
                >
                  {difficulty.label}
                </span>
                {challenge.estimated_time && (
                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {challenge.estimated_time}
                  </span>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold">
                {challenge.title}
              </h1>
              <p className="text-sm text-muted-foreground mt-2 flex items-center gap-2">
                by {challenge.user_name} · {formatTimeAgo(challenge.created_at)}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <LikeButton
              initialCount={likesCount}
              isLiked={isLiked}
              targetType="challenge"
              targetId={challenge.id}
              userId={user?.id}
            />
            <span className="flex items-center gap-1">
              <Code2 className="w-4 h-4" />
              {submissions.length} submissions
            </span>
          </div>
        </motion.div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Challenge details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Description */}
            <Card hover={false} className="p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                About This Challenge
              </h2>
              <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                {challenge.description}
              </p>
            </Card>

            {/* Steps */}
            <Card hover={false} className="p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                Steps
              </h2>
              <ul className="space-y-3">
                {challenge.steps?.map((step, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-muted-foreground">{step}</span>
                  </motion.li>
                ))}
              </ul>
            </Card>

            {/* Challenge comments */}
            <Card hover={false} className="p-6">
              <CommentSection
                targetType="challenge"
                targetId={challenge.id}
                comments={comments}
                userId={user?.id}
                userName={
                  user?.user_metadata?.full_name || user?.user_metadata?.name
                }
                userAvatar={user?.user_metadata?.avatar_url}
                onPostComment={handlePostComment}
              />
            </Card>

            {/* Submissions section */}
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Community Solutions ({submissions.length})
              </h2>
              <div className="space-y-4">
                {submissions.map((sub, i) => {
                  const isOwn = user && sub.user_id === user.id;
                  const shouldBlur = !hasSubmitted && !isOwn;

                  return (
                    <motion.div
                      key={sub.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                    >
                      <Card
                        hover={!shouldBlur}
                        className="p-4 relative overflow-hidden"
                      >
                        {shouldBlur && (
                          <BlurOverlay
                            onSubmitClick={() => setShowSubmitForm(true)}
                          />
                        )}

                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center text-sm font-bold text-primary shrink-0">
                            {sub.user_name?.charAt(0)?.toUpperCase() || "?"}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <span className="font-medium">
                                {sub.user_name || "Anonymous"}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {formatTimeAgo(sub.created_at)}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
                              {sub.story}
                            </p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <LikeButton
                                initialCount={sub.likes || 0}
                                targetType="submission"
                                targetId={sub.id}
                                userId={user?.id}
                                size="sm"
                              />
                              {sub.github_link && (
                                <a
                                  href={sub.github_link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-primary hover:underline flex items-center gap-1"
                                >
                                  <Github className="w-3.5 h-3.5" />
                                  View Code
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Right: Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Skills */}
            <Card hover={false} className="p-6">
              <h3 className="font-semibold mb-4">
                Skills You&apos;ll Practice
              </h3>
              <div className="flex flex-wrap gap-2">
                {challenge.skills?.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-lg bg-muted text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </Card>

            {/* Submit CTA */}
            <Card
              hover={false}
              className="p-6 bg-gradient-to-br from-primary/10 to-transparent border-primary/20"
            >
              {hasSubmitted ? (
                <>
                  <div className="flex items-center gap-2 text-primary mb-2">
                    <CheckCircle2 className="w-5 h-5" />
                    <h3 className="font-semibold">Submitted!</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Great job! You can now see all community solutions.
                  </p>
                </>
              ) : (
                <>
                  <h3 className="font-semibold mb-2">Ready to start?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {user
                      ? "Build your solution and share your story. You'll unlock community solutions after submitting."
                      : "Sign in to submit your solution and see what others built."}
                  </p>
                  <Button
                    glow
                    className="w-full group"
                    onClick={() => setShowSubmitForm(true)}
                    disabled={!user}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Submit Solution
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </>
              )}
            </Card>

            {/* Resources */}
            <Card hover={false} className="p-6">
              <h3 className="font-semibold mb-4">Helpful Resources</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    href="https://flutter.dev/docs"
                    target="_blank"
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Flutter Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://dart.dev/guides"
                    target="_blank"
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Dart Language Guide
                  </Link>
                </li>
              </ul>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Submit solution modal */}
      <AnimatePresence>
        {showSubmitForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
            onClick={() => setShowSubmitForm(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg bg-card border border-border rounded-2xl shadow-2xl p-6"
            >
              <h3 className="text-lg font-bold mb-1">Share Your Solution</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Tell everyone about your experience building this challenge
              </p>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Your Story *
                  </label>
                  <textarea
                    value={submitStory}
                    onChange={(e) => setSubmitStory(e.target.value)}
                    placeholder="What did you build? What did you learn? Any challenges you overcame?"
                    className="w-full h-24 px-4 py-3 rounded-xl border border-border bg-muted/30 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">
                    GitHub Link (optional)
                  </label>
                  <div className="flex items-center gap-2">
                    <Github className="w-4 h-4 text-muted-foreground" />
                    <input
                      value={submitGithub}
                      onChange={(e) => setSubmitGithub(e.target.value)}
                      placeholder="https://github.com/..."
                      className="flex-1 px-3 py-2 rounded-lg border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowSubmitForm(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    glow
                    onClick={handleSubmit}
                    disabled={!submitStory.trim() || submitting}
                    className="flex-1 gap-1.5"
                  >
                    {submitting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                    Submit
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
