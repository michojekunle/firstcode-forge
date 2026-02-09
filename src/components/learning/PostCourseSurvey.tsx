"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Sparkles, ArrowRight, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SurveyResult {
  interests: string[];
  buildIdea: string;
  confidence: number;
}

interface PostCourseSurveyProps {
  courseTitle: string;
  onComplete: (result: SurveyResult) => void;
  onDismiss: () => void;
}

const interestOptions: { label: string; icon: string }[] = [
  { label: "UI Design", icon: "🎨" },
  { label: "Business Logic", icon: "⚙️" },
  { label: "Architecture", icon: "🏗️" },
  { label: "Animations", icon: "✨" },
  { label: "Data & APIs", icon: "📡" },
  { label: "Performance", icon: "⚡" },
  { label: "Testing", icon: "🧪" },
  { label: "Deployment", icon: "🚀" },
];

const confidenceLabels = [
  "Just starting",
  "Getting there",
  "Comfortable",
  "Confident",
  "Ready to ship",
];

export function PostCourseSurvey({
  courseTitle,
  onComplete,
  onDismiss,
}: PostCourseSurveyProps) {
  const [step, setStep] = useState(0);
  const [interests, setInterests] = useState<string[]>([]);
  const [buildIdea, setBuildIdea] = useState("");
  const [confidence, setConfidence] = useState(3);

  const toggleInterest = (label: string) => {
    setInterests((prev) =>
      prev.includes(label) ? prev.filter((i) => i !== label) : [...prev, label],
    );
  };

  const handleSubmit = () => {
    onComplete({ interests, buildIdea, confidence });
  };

  const canProceed =
    step === 0
      ? interests.length > 0
      : step === 1
        ? buildIdea.trim().length > 0
        : true;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="w-full max-w-lg bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-border bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <h3 className="font-bold text-lg">Quick Survey</h3>
              </div>
              <button
                onClick={onDismiss}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Help us generate the perfect challenge for you after{" "}
              <span className="text-foreground font-medium">{courseTitle}</span>
            </p>
          </div>

          {/* Progress dots */}
          <div className="flex justify-center gap-2 px-6 pt-4">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  i === step
                    ? "w-8 bg-primary"
                    : i < step
                      ? "w-4 bg-primary/40"
                      : "w-4 bg-muted",
                )}
              />
            ))}
          </div>

          {/* Content */}
          <div className="px-6 py-6 min-h-[240px]">
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div
                  key="step-0"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <h4 className="font-semibold text-base">
                    What excited you most? 🎯
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Pick all that sparked your interest
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {interestOptions.map((opt) => (
                      <button
                        key={opt.label}
                        onClick={() => toggleInterest(opt.label)}
                        className={cn(
                          "flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-medium transition-all text-left",
                          interests.includes(opt.label)
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border bg-muted/30 text-muted-foreground hover:border-primary/50",
                        )}
                      >
                        <span>{opt.icon}</span>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <h4 className="font-semibold text-base">
                    What would you build next? 💡
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Describe an app or feature you&apos;d love to create
                  </p>
                  <textarea
                    value={buildIdea}
                    onChange={(e) => setBuildIdea(e.target.value)}
                    placeholder="e.g., A habit tracker with streak animations and daily reminders..."
                    className="w-full h-28 px-4 py-3 rounded-xl border border-border bg-muted/30 text-foreground placeholder:text-muted-foreground text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  />
                  <p className="text-xs text-muted-foreground text-right">
                    {buildIdea.length}/200
                  </p>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h4 className="font-semibold text-base">
                    How confident are you now? 💪
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    We&apos;ll match the challenge difficulty to your level
                  </p>

                  <div className="space-y-4 pt-2">
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={confidence}
                      onChange={(e) => setConfidence(parseInt(e.target.value))}
                      className="w-full accent-primary"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      {confidenceLabels.map((label, i) => (
                        <span
                          key={label}
                          className={cn(
                            "transition-colors",
                            i + 1 === confidence &&
                              "text-primary font-semibold",
                          )}
                        >
                          {label}
                        </span>
                      ))}
                    </div>

                    <motion.div
                      key={confidence}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-center py-3"
                    >
                      <span className="text-4xl">
                        {["🌱", "🌿", "🌲", "🔥", "🚀"][confidence - 1]}
                      </span>
                      <p className="text-sm font-medium mt-2">
                        {confidenceLabels[confidence - 1]}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="px-6 pb-6 flex items-center justify-between">
            {step > 0 ? (
              <Button
                variant="outline"
                onClick={() => setStep(step - 1)}
                className="gap-1"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            ) : (
              <Button variant="outline" onClick={onDismiss}>
                Skip
              </Button>
            )}

            {step < 2 ? (
              <Button
                onClick={() => setStep(step + 1)}
                disabled={!canProceed}
                glow
                className="gap-1"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} glow className="gap-1">
                <Sparkles className="w-4 h-4" />
                Generate Challenge
              </Button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
