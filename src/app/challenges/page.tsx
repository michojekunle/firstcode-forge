"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/providers/auth-provider";
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
  Play,
  Star,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";

// Sample challenges data (will be replaced with Supabase data later)
const challenges = [
  {
    id: "counter-app",
    title: "Build a Counter App",
    description:
      "Create a simple counter application with increment, decrement, and reset functionality. Learn state management fundamentals.",
    difficulty: "easy" as const,
    language: "Flutter",
    estimatedTime: "30 mins",
    skills: ["StatefulWidget", "setState", "Button Actions"],
    completions: 234,
    rating: 4.8,
    emoji: "🔢",
    gradient: "from-green-500/20 to-emerald-500/20",
  },
  {
    id: "todo-list",
    title: "Todo List with Persistence",
    description:
      "Build a full-featured todo list that persists data locally. Add, edit, complete, and delete tasks with smooth animations.",
    difficulty: "medium" as const,
    language: "Flutter",
    estimatedTime: "2 hours",
    skills: ["SharedPreferences", "ListView", "CRUD Operations"],
    completions: 156,
    rating: 4.9,
    emoji: "✅",
    gradient: "from-yellow-500/20 to-orange-500/20",
  },
  {
    id: "weather-app",
    title: "Weather Dashboard",
    description:
      "Create a beautiful weather app that fetches real-time data from an API. Display current conditions and forecasts.",
    difficulty: "medium" as const,
    language: "Flutter",
    estimatedTime: "3 hours",
    skills: ["HTTP Requests", "JSON Parsing", "Async/Await"],
    completions: 98,
    rating: 4.7,
    emoji: "🌤️",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    id: "chat-ui",
    title: "Real-time Chat Interface",
    description:
      "Build a chat UI with message bubbles, animations, and keyboard handling. Focus on performance with long lists.",
    difficulty: "hard" as const,
    language: "Flutter",
    estimatedTime: "4 hours",
    skills: ["CustomScrollView", "Animations", "Performance"],
    completions: 45,
    rating: 4.9,
    emoji: "💬",
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    id: "system-design-url",
    title: "Design a URL Shortener",
    description:
      "Think through the architecture of a URL shortening service like bit.ly. Consider scale, storage, and caching.",
    difficulty: "hard" as const,
    language: "Systems Design",
    estimatedTime: "1 hour",
    skills: ["Databases", "Caching", "Load Balancing"],
    completions: 67,
    rating: 4.8,
    emoji: "🔗",
    gradient: "from-rose-500/20 to-red-500/20",
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

// Sign-in banner for unauthenticated users
function SignInBanner({ onSignIn }: { onSignIn: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="glass rounded-2xl px-6 py-4 flex items-center gap-4 shadow-xl border border-primary/20">
        <div className="flex items-center gap-2 text-primary">
          <Lock className="w-5 h-5" />
          <span className="font-medium">Sign in to track your progress</span>
        </div>
        <Button size="sm" onClick={onSignIn} glow>
          <LogIn className="w-4 h-4 mr-2" />
          Sign In
        </Button>
      </div>
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
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-card rounded-2xl p-8 max-w-md w-full border border-border shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.1 }}
              className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center"
            >
              <Sparkles className="w-8 h-8 text-primary" />
            </motion.div>
            <h2 className="text-2xl font-bold mb-2">Welcome to Challenges</h2>
            <p className="text-muted-foreground">
              Sign in to start challenges, track progress, and share your
              solutions.
            </p>
          </div>

          <div className="space-y-3">
            <Button
              className="w-full gap-2"
              variant="outline"
              onClick={onGithub}
            >
              <Github className="w-5 h-5" />
              Continue with GitHub
            </Button>
            <Button
              className="w-full gap-2"
              variant="outline"
              onClick={onGoogle}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </Button>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-6">
            By signing in, you agree to our Terms of Service
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Individual challenge card - takes full viewport
function ChallengeCard({
  challenge,
  index,
  isAuthenticated,
  onStartChallenge,
}: {
  challenge: (typeof challenges)[0];
  index: number;
  isAuthenticated: boolean;
  onStartChallenge: () => void;
}) {
  const difficulty = difficultyConfig[challenge.difficulty];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="min-h-[600px] max-h-[900px] h-[90vh] flex items-center justify-center px-4 py-8 snap-start"
    >
      <div
        className={`w-full max-w-2xl p-8 md:p-12 rounded-3xl bg-gradient-to-br ${challenge.gradient} border border-border relative overflow-hidden`}
      >
        {/* Background decoration */}
        <div className="absolute -right-10 -top-10 text-[120px] opacity-10 rotate-12">
          {challenge.emoji}
        </div>

        {/* Difficulty badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${difficulty.bg} ${difficulty.color} text-sm font-bold mb-6`}
        >
          <Zap className="w-4 h-4" />
          {difficulty.label}
        </motion.div>

        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {challenge.title}
        </h2>

        {/* Description */}
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          {challenge.description}
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {challenge.skills.map((skill, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="px-3 py-1.5 rounded-lg bg-background/50 text-sm font-medium border border-border"
            >
              {skill}
            </motion.span>
          ))}
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap items-center gap-6 mb-8 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {challenge.estimatedTime}
          </span>
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

        {/* Action buttons */}
        <div className="flex flex-wrap gap-4">
          <Button size="lg" glow className="group" onClick={onStartChallenge}>
            <Play className="w-5 h-5 mr-2" />
            {isAuthenticated ? "Start Challenge" : "Sign In to Start"}
          </Button>
          <Link href={`/challenges/${challenge.id}`}>
            <Button size="lg" variant="outline" className="group">
              View Details
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function ChallengesPage() {
  const { user, isLoading, signInWithGithub, signInWithGoogle } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleStartChallenge = () => {
    if (!user) {
      setShowAuthModal(true);
    }
    // If authenticated, would navigate to challenge
  };

  return (
    <div className="min-h-screen">
      {/* Hero section */}
      <section className="relative min-h-[60vh] flex items-center justify-center pt-24 pb-8 px-4">
        {/* Background */}
        <div className="absolute inset-0 -z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-primary/10 blur-[150px]"
          />
        </div>

        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-2"
          >
            <Trophy className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Coding Challenges
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            Learn by <span className="text-gradient-primary">Building</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-xl mx-auto mb-8"
          >
            Hands-on coding challenges designed to reinforce first-principles
            thinking. Build real projects and share your solutions.
          </motion.p>

          {user && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground"
            >
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                {user.user_metadata?.avatar_url ? (
                  <img
                    src={user.user_metadata.avatar_url}
                    alt=""
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <Users className="w-4 h-4 text-primary" />
                )}
              </div>
              Welcome back, {user.user_metadata?.name || user.email}
            </motion.div>
          )}

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 flex flex-col items-center gap-2"
          >
            <span className="text-sm text-muted-foreground">
              Scroll to explore
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronDown className="w-5 h-5 text-muted-foreground" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Challenges list with scroll snap */}
      <div className="snap-y snap-mandatory">
        {challenges.map((challenge, index) => (
          <ChallengeCard
            key={challenge.id}
            challenge={challenge}
            index={index}
            isAuthenticated={!!user}
            onStartChallenge={handleStartChallenge}
          />
        ))}
      </div>

      {/* Sign in banner for unauthenticated users */}
      {!isLoading && !user && (
        <SignInBanner onSignIn={() => setShowAuthModal(true)} />
      )}

      {/* Auth modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onGithub={signInWithGithub}
        onGoogle={signInWithGoogle}
      />
    </div>
  );
}
