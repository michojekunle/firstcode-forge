"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/components/providers/auth-provider";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Code2,
  Trophy,
  Star,
  Zap,
  Play,
  Users,
  MessageSquare,
  Heart,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { use } from "react";

// Sample challenge data (will be replaced with Supabase)
const challengeData: Record<
  string,
  {
    id: string;
    title: string;
    description: string;
    fullDescription: string;
    difficulty: "easy" | "medium" | "hard";
    language: string;
    estimatedTime: string;
    skills: string[];
    completions: number;
    rating: number;
    emoji: string;
    requirements: string[];
    hints: string[];
  }
> = {
  "counter-app": {
    id: "counter-app",
    title: "Build a Counter App",
    description:
      "Create a simple counter application with increment, decrement, and reset functionality.",
    fullDescription: `In this challenge, you'll build a fully functional counter application from scratch. This is a foundational exercise that teaches you state management in Flutter.

You'll learn:
- How StatefulWidget works under the hood
- The setState() pattern and why it triggers rebuilds
- Handling button press events
- Building a clean, minimal UI

The goal isn't just to make it work—it's to understand WHY it works.`,
    difficulty: "easy",
    language: "Flutter",
    estimatedTime: "30 mins",
    skills: ["StatefulWidget", "setState", "Button Actions", "UI Layout"],
    completions: 234,
    rating: 4.8,
    emoji: "🔢",
    requirements: [
      "Display a counter starting at 0",
      "Increment button increases count by 1",
      "Decrement button decreases count by 1",
      "Reset button sets count back to 0",
      "Prevent negative numbers (optional)",
    ],
    hints: [
      "Start with a StatefulWidget since you need mutable state",
      "The counter value should live in the State class",
      "Use Column or Row to arrange your buttons",
    ],
  },
  "todo-list": {
    id: "todo-list",
    title: "Todo List with Persistence",
    description: "Build a full-featured todo list that persists data locally.",
    fullDescription: `Create a todo list application that saves your tasks locally. This challenge teaches you CRUD operations and local persistence.

You'll master:
- SharedPreferences for simple data persistence
- Working with Lists and dynamic UI
- Implementing add, edit, complete, and delete operations
- Building smooth animations for list changes`,
    difficulty: "medium",
    language: "Flutter",
    estimatedTime: "2 hours",
    skills: ["SharedPreferences", "ListView", "CRUD Operations", "Animations"],
    completions: 156,
    rating: 4.9,
    emoji: "✅",
    requirements: [
      "Add new todo items with a text input",
      "Mark items as complete/incomplete",
      "Delete items with swipe or button",
      "Persist data when app closes",
      "Show empty state when no todos",
    ],
    hints: [
      "Use shared_preferences package for persistence",
      "Store todos as JSON strings",
      "AnimatedList provides smooth add/remove animations",
    ],
  },
};

// Sample submissions data
const submissions = [
  {
    id: "sub-1",
    userId: "user-1",
    userName: "Sarah Chen",
    userAvatar: "https://i.pravatar.cc/150?u=sarah",
    completedAt: "2 hours ago",
    likes: 24,
    comments: 5,
    story:
      "This was my first Flutter project! I learned so much about setState...",
  },
  {
    id: "sub-2",
    userId: "user-2",
    userName: "Marcus Johnson",
    userAvatar: "https://i.pravatar.cc/150?u=marcus",
    completedAt: "5 hours ago",
    likes: 18,
    comments: 3,
    story: "Added some extra animations to make it feel more polished.",
  },
  {
    id: "sub-3",
    userId: "user-3",
    userName: "Priya Patel",
    userAvatar: "https://i.pravatar.cc/150?u=priya",
    completedAt: "1 day ago",
    likes: 42,
    comments: 8,
    story: "Implemented a custom theme switcher as a bonus feature!",
  },
];

const difficultyConfig = {
  easy: { color: "text-green-500", bg: "bg-green-500/10", label: "Beginner" },
  medium: {
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
    label: "Intermediate",
  },
  hard: { color: "text-red-500", bg: "bg-red-500/10", label: "Advanced" },
};

export default function ChallengeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { user } = useAuth();

  const challenge = challengeData[id] || challengeData["counter-app"];
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
            <span className="text-5xl">{challenge.emoji}</span>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${difficulty.bg} ${difficulty.color}`}
                >
                  {difficulty.label}
                </span>
                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  {challenge.estimatedTime}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold">
                {challenge.title}
              </h1>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Code2 className="w-4 h-4" />
              {challenge.language}
            </span>
            <span className="flex items-center gap-1">
              <Trophy className="w-4 h-4" />
              {challenge.completions} completed
            </span>
            <span className="flex items-center gap-1 text-yellow-500">
              <Star className="w-4 h-4 fill-current" />
              {challenge.rating}
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
                {challenge.fullDescription}
              </p>
            </Card>

            {/* Requirements */}
            <Card hover={false} className="p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                Requirements
              </h2>
              <ul className="space-y-3">
                {challenge.requirements.map((req, i) => (
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
                    <span className="text-muted-foreground">{req}</span>
                  </motion.li>
                ))}
              </ul>
            </Card>

            {/* Hints (collapsible) */}
            <Card hover={false} className="p-6">
              <details className="group">
                <summary className="cursor-pointer text-lg font-semibold flex items-center gap-2 list-none">
                  <span className="transition-transform group-open:rotate-90">
                    💡
                  </span>
                  Hints (click to reveal)
                </summary>
                <ul className="mt-4 space-y-2 text-muted-foreground">
                  {challenge.hints.map((hint, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-primary">→</span>
                      {hint}
                    </li>
                  ))}
                </ul>
              </details>
            </Card>

            {/* Submissions section */}
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Community Solutions
              </h2>
              <div className="space-y-4">
                {submissions.map((sub, i) => (
                  <motion.div
                    key={sub.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  >
                    <Card hover className="p-4">
                      <div className="flex items-start gap-4">
                        <img
                          src={sub.userAvatar}
                          alt={sub.userName}
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className="font-medium">{sub.userName}</span>
                            <span className="text-xs text-muted-foreground">
                              {sub.completedAt}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                            {sub.story}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Heart className="w-4 h-4" />
                              {sub.likes}
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageSquare className="w-4 h-4" />
                              {sub.comments}
                            </span>
                            <Link
                              href={`/challenges/${id}/submissions/${sub.id}`}
                              className="text-primary hover:underline flex items-center gap-1 ml-auto"
                            >
                              View Solution
                              <ExternalLink className="w-3 h-3" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
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
              <h3 className="font-semibold mb-4">Skills You'll Practice</h3>
              <div className="flex flex-wrap gap-2">
                {challenge.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-lg bg-muted text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </Card>

            {/* CTA */}
            <Card
              hover={false}
              className="p-6 bg-gradient-to-br from-primary/10 to-transparent border-primary/20"
            >
              <h3 className="font-semibold mb-2">Ready to start?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {user
                  ? "Jump in and start building. Share your solution when you're done!"
                  : "Sign in to track progress and share your solution."}
              </p>
              <Button glow className="w-full group">
                <Play className="w-4 h-4 mr-2" />
                Start Challenge
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
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
    </div>
  );
}
