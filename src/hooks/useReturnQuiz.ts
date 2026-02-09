"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getRecentReadMoreClicks,
  clearReadMoreClick,
} from "@/components/learning/ReadMoreLink";
import { getQuizQuestion } from "@/data/quiz-questions";
import type { QuizQuestion } from "@/components/learning/ReturnQuizPopup";

const DISMISSED_KEY = "fcf-quiz-dismissed";

// Track which topics have been dismissed recently (avoid re-showing)
function isDismissed(topic: string): boolean {
  try {
    const raw = localStorage.getItem(DISMISSED_KEY);
    if (!raw) return false;
    const dismissed: Record<string, number> = JSON.parse(raw);
    // Dismissed for 24 hours
    return Boolean(
      dismissed[topic] && Date.now() - dismissed[topic] < 24 * 60 * 60 * 1000,
    );
  } catch {
    return false;
  }
}

function markDismissed(topic: string) {
  try {
    const raw = localStorage.getItem(DISMISSED_KEY);
    const dismissed: Record<string, number> = raw ? JSON.parse(raw) : {};
    dismissed[topic] = Date.now();
    localStorage.setItem(DISMISSED_KEY, JSON.stringify(dismissed));
  } catch {
    // noop
  }
}

export function useReturnQuiz() {
  const [quizQuestion, setQuizQuestion] = useState<QuizQuestion | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const checkForQuiz = useCallback(() => {
    const recentClicks = getRecentReadMoreClicks();
    if (recentClicks.length === 0) return;

    // Find the most recent click that hasn't been dismissed
    for (let i = recentClicks.length - 1; i >= 0; i--) {
      const click = recentClicks[i];
      if (!isDismissed(click.topic)) {
        const question = getQuizQuestion(click.topic);
        if (question) {
          setQuizQuestion(question);
          setIsVisible(true);
          return;
        }
      }
    }
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        // Small delay to let the page settle
        setTimeout(checkForQuiz, 800);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [checkForQuiz]);

  const dismiss = useCallback(() => {
    if (quizQuestion) {
      markDismissed(quizQuestion.topic);
      clearReadMoreClick(quizQuestion.topic);
    }
    setIsVisible(false);
    setQuizQuestion(null);
  }, [quizQuestion]);

  const complete = useCallback(
    (_correct: boolean) => {
      // Whether correct or not, mark as dismissed so it doesn't show again
      if (quizQuestion) {
        markDismissed(quizQuestion.topic);
        clearReadMoreClick(quizQuestion.topic);
      }
    },
    [quizQuestion],
  );

  return {
    quizQuestion,
    isVisible,
    dismiss,
    complete,
  };
}
