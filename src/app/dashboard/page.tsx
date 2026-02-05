"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAppStore, Challenge } from "@/lib/store";
import {
  Sparkles,
  Clock,
  Zap,
  CheckCircle2,
  ArrowRight,
  RotateCcw,
  Code2,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const difficultyColors = {
  easy: "text-green-500 bg-green-500/10",
  medium: "text-yellow-500 bg-yellow-500/10",
  hard: "text-red-500 bg-red-500/10",
};

export default function DashboardPage() {
  const router = useRouter();
  const {
    profile,
    challenge,
    setChallenge,
    isGenerating,
    setIsGenerating,
    resetProfile,
  } = useAppStore();
  const [error, setError] = useState<string | null>(null);

  const generateChallengeFromAPI = useCallback(async () => {
    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch("/api/generate-challenge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
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
  }, [profile, setChallenge, setIsGenerating]);

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
    generateChallengeFromAPI();
  };

  const handleStartOver = () => {
    resetProfile();
    router.push("/onboarding");
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
                <Button glow className="group">
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
    </div>
  );
}
