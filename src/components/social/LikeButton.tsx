"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface LikeButtonProps {
  initialCount: number;
  isLiked?: boolean;
  targetType: "challenge" | "submission";
  targetId: string;
  userId?: string;
  size?: "sm" | "md";
}

export function LikeButton({
  initialCount,
  isLiked: initialIsLiked = false,
  targetType,
  targetId,
  userId,
  size = "md",
}: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [count, setCount] = useState(initialCount);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = useCallback(async () => {
    if (!userId) return;

    // Optimistic update
    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);
    setCount((prev) => prev + (newIsLiked ? 1 : -1));

    if (newIsLiked) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 600);
    }

    try {
      const endpoint =
        targetType === "challenge"
          ? `/api/challenges/${targetId}/likes`
          : `/api/submissions/${targetId}/likes`;

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      if (!res.ok) {
        // Revert on failure
        setIsLiked(!newIsLiked);
        setCount((prev) => prev + (newIsLiked ? -1 : 1));
      }
    } catch {
      // Revert on error
      setIsLiked(!newIsLiked);
      setCount((prev) => prev + (newIsLiked ? -1 : 1));
    }
  }, [isLiked, userId, targetType, targetId]);

  const iconSize = size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4";
  const textSize = size === "sm" ? "text-xs" : "text-sm";

  return (
    <button
      onClick={handleClick}
      disabled={!userId}
      className={cn(
        "flex items-center gap-1.5 transition-all group",
        userId
          ? "hover:text-red-500 cursor-pointer"
          : "cursor-not-allowed opacity-50",
        isLiked ? "text-red-500" : "text-muted-foreground",
      )}
    >
      <motion.div
        animate={
          isAnimating
            ? {
                scale: [1, 1.4, 0.9, 1.2, 1],
              }
            : {}
        }
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <Heart
          className={cn(
            iconSize,
            "transition-all",
            isLiked && "fill-red-500",
            !isLiked && "group-hover:scale-110",
          )}
        />

        {/* Burst particles */}
        {isAnimating && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  scale: 0,
                  x: 0,
                  y: 0,
                  opacity: 1,
                }}
                animate={{
                  scale: [0, 1, 0],
                  x: Math.cos((i * 60 * Math.PI) / 180) * 16,
                  y: Math.sin((i * 60 * Math.PI) / 180) * 16,
                  opacity: [1, 1, 0],
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute top-1/2 left-1/2 w-1 h-1 rounded-full bg-red-400"
                style={{ marginLeft: -2, marginTop: -2 }}
              />
            ))}
          </>
        )}
      </motion.div>

      <span className={cn(textSize, "font-medium tabular-nums")}>{count}</span>
    </button>
  );
}
