"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface CourseRatingProps {
  courseId: string;
  courseName: string;
  userId?: string;
  onSubmit: (rating: number, feedback: string) => void;
  onSkip?: () => void;
}

export function CourseRating({
  courseId,
  courseName,
  userId,
  onSubmit,
  onSkip,
}: CourseRatingProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) return;

    setIsSubmitting(true);
    try {
      // Submit to API
      const response = await fetch("/api/courses/rate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId,
          userId,
          rating,
          review: feedback.trim() || undefined,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit rating");
      }

      setIsSubmitted(true);
      onSubmit(rating, feedback);
    } catch (error) {
      console.error("Failed to submit rating:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8"
      >
        <motion.span
          className="text-5xl block mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
        >
          🎉
        </motion.span>
        <h3 className="text-xl font-bold mb-2">Thanks for your feedback!</h3>
        <p className="text-muted-foreground">
          Your rating helps us improve the course.
        </p>
      </motion.div>
    );
  }

  return (
    <Card hover={false} className="p-6 md:p-8">
      <div className="text-center">
        <motion.span
          className="text-4xl block mb-4"
          initial={{ rotate: -10 }}
          animate={{ rotate: 0 }}
        >
          ⭐
        </motion.span>
        <h3 className="text-xl font-bold mb-2">Rate This Course</h3>
        <p className="text-muted-foreground text-sm mb-6">
          How was your experience with {courseName}?
        </p>

        {/* Star Rating */}
        <div className="flex justify-center gap-2 mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <motion.button
              key={star}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="focus:outline-none"
            >
              <Star
                className={cn(
                  "w-10 h-10 transition-colors",
                  (hoverRating || rating) >= star
                    ? "text-yellow-500 fill-yellow-500"
                    : "text-muted-foreground/30",
                )}
              />
            </motion.button>
          ))}
        </div>

        {/* Rating label */}
        {rating > 0 && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-primary font-medium mb-4"
          >
            {rating === 5 && "Amazing! 🌟"}
            {rating === 4 && "Great! 😊"}
            {rating === 3 && "Good 👍"}
            {rating === 2 && "Could be better 🤔"}
            {rating === 1 && "Needs improvement 😔"}
          </motion.p>
        )}

        {/* Feedback textarea */}
        <div className="mb-6">
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Share your thoughts (optional)..."
            className="w-full p-4 rounded-xl border border-border bg-muted/50 focus:border-primary focus:ring-1 focus:ring-primary resize-none text-sm"
            rows={3}
          />
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={handleSubmit}
            disabled={rating === 0 || isSubmitting}
            glow={rating > 0}
            className="gap-2"
          >
            <Send className="w-4 h-4" />
            {isSubmitting ? "Submitting..." : "Submit Rating"}
          </Button>
          {onSkip && (
            <Button variant="ghost" onClick={onSkip}>
              Skip for now
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
