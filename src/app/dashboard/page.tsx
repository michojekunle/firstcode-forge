"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAppStore, Challenge } from "@/lib/store";
import { useAuth } from "@/components/providers/auth-provider";
import {
  Sparkles,
  Clock,
  Zap,
  CheckCircle2,
  ArrowRight,
  RotateCcw,
  Code2,
  Loader2,
  Github,
} from "lucide-react";
import { cn } from "@/lib/utils";

const difficultyColors = {
  easy: "text-green-500 bg-green-500/10",
  medium: "text-yellow-500 bg-yellow-500/10",
  hard: "text-red-500 bg-red-500/10",
};

// Auth modal component
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
            <h3 className="text-lg font-bold">Sign in to save progress</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Create an account to save your generated challenge and track your
              progress.
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

export default function DashboardPage() {
  const router = useRouter();
  const { user, signInWithGithub, signInWithGoogle } = useAuth();
  const {
    profile,
    challenge,
    setChallenge,
    isGenerating,
    setIsGenerating,
    resetProfile,
  } = useAppStore();
  const [error, setError] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const generateChallengeFromAPI = useCallback(async () => {
    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch("/api/generate-challenge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profile,
          userId: user?.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate challenge");
      }

      const data: Challenge = await response.json();
      setChallenge(data);
    } catch (err) {
      console.error(err);
      setError("Failed to generate challenge. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  }, [profile, user, setChallenge, setIsGenerating]);

  useEffect(() => {
    // If no profile, redirect to onboarding
    if (!profile.experienceLevel) {
      router.push("/onboarding");
      return;
    }

    // Generate challenge if not already generated
    if (!challenge && !isGenerating) {
      generateChallengeFromAPI();
    }
  }, [profile, challenge, isGenerating, router, generateChallengeFromAPI]);

  const handleRegenerate = () => {
    setChallenge(null as unknown as Challenge);
    // Logic will be handled by useEffect since challenge becomes null
  };

  const handleStartOver = () => {
    resetProfile();
    router.push("/onboarding");
  };

  const handleStartChallenge = () => {
    if (!challenge) return;

    if (!user || challenge.id.startsWith("temp-")) {
      setShowAuthModal(true);
      return;
    }

    router.push(`/challenges/${challenge.id}`);
  };

  if (!profile.experienceLevel) {
    return null;
  }

  return (
    <div className="min-h-screen px-4 py-24">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Your Personalized Challenge
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Welcome to Your{" "}
            <span className="text-gradient-primary">Learning Journey</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Based on your profile, we&apos;ve crafted a unique challenge just
            for you.
          </p>
        </motion.div>

        {/* Loading State */}
        {isGenerating && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Loader2 className="w-12 h-12 text-primary" />
            </motion.div>
            <p className="mt-4 text-muted-foreground">
              AI is crafting your personalized challenge...
            </p>
          </motion.div>
        )}

        {/* Error State */}
        {error && !isGenerating && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="p-8 text-center">
              <p className="text-red-500 mb-4">{error}</p>
              <Button onClick={handleRegenerate}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            </Card>
          </motion.div>
        )}

        {/* Challenge Display */}
        {challenge && !isGenerating && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-8" hover={false}>
              {/* Challenge Header */}
              <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{challenge.title}</h2>
                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className={cn(
                        "px-3 py-1 rounded-full text-xs font-medium capitalize",
                        difficultyColors[challenge.difficulty],
                      )}
                    >
                      {challenge.difficulty}
                    </span>
                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {challenge.estimatedTime}
                    </span>
                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Code2 className="w-4 h-4" />
                      {challenge.language}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-muted-foreground mb-8 leading-relaxed">
                {challenge.description}
              </p>

              {/* Skills */}
              <div className="mb-8">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  Skills You&apos;ll Learn
                </h3>
                <div className="flex flex-wrap gap-2">
                  {challenge.skills.map((skill, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="px-3 py-1.5 rounded-lg bg-muted text-sm font-medium"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Steps */}
              <div className="mb-8">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  Implementation Steps
                </h3>
                <div className="space-y-3">
                  {challenge.steps.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="flex items-start gap-3 p-3 rounded-lg bg-muted/50"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                        {index + 1}
                      </span>
                      <span className="text-sm">{step}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                <Button glow className="group" onClick={handleStartChallenge}>
                  Start Challenge
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button variant="outline" onClick={handleRegenerate}>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Generate New Challenge
                </Button>
                <Button variant="ghost" onClick={handleStartOver}>
                  Retake Survey
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Profile Summary */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8"
        >
          <Card hover={false} className="p-6">
            <h3 className="font-semibold mb-4">Your Profile</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Level</span>
                <p className="font-medium capitalize">
                  {profile.experienceLevel}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">Language</span>
                <p className="font-medium capitalize">
                  {profile.preferredLanguage}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">Interests</span>
                <p className="font-medium capitalize">
                  {profile.interests.slice(0, 2).join(", ")}
                  {profile.interests.length > 2 &&
                    ` +${profile.interests.length - 2}`}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">Style</span>
                <p className="font-medium capitalize">
                  {profile.learningStyle}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

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
