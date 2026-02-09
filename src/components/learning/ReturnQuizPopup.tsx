"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, CheckCircle2, XCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  topic: string;
}

interface ReturnQuizPopupProps {
  question: QuizQuestion;
  onDismiss: () => void;
  onComplete: (correct: boolean) => void;
}

export function ReturnQuizPopup({
  question,
  onDismiss,
  onComplete,
}: ReturnQuizPopupProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const isCorrect = selectedIndex === question.correctIndex;

  const handleSubmit = () => {
    if (selectedIndex === null) return;
    setSubmitted(true);
    onComplete(selectedIndex === question.correctIndex);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          onClick={onDismiss}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />

        {/* Card */}
        <motion.div
          className="relative w-full max-w-md rounded-2xl border border-border bg-card shadow-2xl shadow-primary/10 overflow-hidden"
          initial={{ scale: 0.9, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 20, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border/50 bg-primary/5">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">
                Quick Check
              </span>
              <span className="text-xs text-muted-foreground">
                — from your reading
              </span>
            </div>
            <button
              onClick={onDismiss}
              className="p-1 rounded-lg hover:bg-muted transition-colors"
              aria-label="Dismiss quiz"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>

          {/* Question */}
          <div className="p-5">
            <h3 className="text-base font-semibold text-foreground mb-4 leading-snug">
              {question.question}
            </h3>

            {/* Options */}
            <div className="space-y-2">
              {question.options.map((option, index) => {
                const isSelected = selectedIndex === index;
                const isAnswer = index === question.correctIndex;
                const showCorrect = submitted && isAnswer;
                const showWrong = submitted && isSelected && !isAnswer;

                return (
                  <motion.button
                    key={index}
                    onClick={() => !submitted && setSelectedIndex(index)}
                    disabled={submitted}
                    className={cn(
                      "w-full text-left p-3 rounded-xl border-2 transition-all duration-200 text-sm",
                      !submitted && isSelected
                        ? "border-primary bg-primary/10 text-foreground"
                        : !submitted
                          ? "border-border/50 hover:border-primary/30 hover:bg-muted/50 text-foreground"
                          : showCorrect
                            ? "border-green-500 bg-green-500/10 text-green-700 dark:text-green-400"
                            : showWrong
                              ? "border-red-500 bg-red-500/10 text-red-700 dark:text-red-400"
                              : "border-border/30 text-muted-foreground opacity-60",
                    )}
                    whileHover={!submitted ? { scale: 1.01 } : {}}
                    whileTap={!submitted ? { scale: 0.99 } : {}}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          "w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold flex-shrink-0",
                          !submitted && isSelected
                            ? "border-primary bg-primary text-primary-foreground"
                            : !submitted
                              ? "border-muted-foreground/30"
                              : showCorrect
                                ? "border-green-500 bg-green-500 text-white"
                                : showWrong
                                  ? "border-red-500 bg-red-500 text-white"
                                  : "border-muted-foreground/20",
                        )}
                      >
                        {submitted && showCorrect ? (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        ) : submitted && showWrong ? (
                          <XCircle className="w-3.5 h-3.5" />
                        ) : (
                          String.fromCharCode(65 + index)
                        )}
                      </span>
                      <span>{option}</span>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Result / Explanation */}
            <AnimatePresence>
              {submitted && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  className="mt-4 overflow-hidden"
                >
                  <div
                    className={cn(
                      "p-3 rounded-xl text-sm",
                      isCorrect
                        ? "bg-green-500/10 border border-green-500/30"
                        : "bg-amber-500/10 border border-amber-500/30",
                    )}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {isCorrect ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                          <span className="font-semibold text-green-600 dark:text-green-400">
                            Correct! 🎉
                          </span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 text-amber-500" />
                          <span className="font-semibold text-amber-600 dark:text-amber-400">
                            Not quite
                          </span>
                        </>
                      )}
                    </div>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      {question.explanation}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-4 border-t border-border/50 bg-muted/30">
            <button
              onClick={onDismiss}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              {submitted ? "Close" : "Skip"}
            </button>
            {!submitted ? (
              <Button
                size="sm"
                onClick={handleSubmit}
                disabled={selectedIndex === null}
                className="text-xs"
              >
                Check Answer
              </Button>
            ) : (
              <Button size="sm" onClick={onDismiss} className="text-xs">
                Continue Learning
              </Button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
