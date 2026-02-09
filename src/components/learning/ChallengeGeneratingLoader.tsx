"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

const cookingMessages = [
  "Analyzing your interests…",
  "Crafting the perfect challenge…",
  "Adding a dash of creativity…",
  "Almost ready…",
];

export function ChallengeGeneratingLoader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="mt-8"
    >
      <Card
        hover={false}
        className="p-8 border-2 border-primary/40 bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5 overflow-hidden relative"
      >
        {/* Animated background shimmer */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />

        <div className="relative z-10 text-center space-y-6">
          {/* Animated icon */}
          <div className="flex justify-center">
            <motion.div
              animate={{
                rotate: [0, 10, -10, 10, 0],
                scale: [1, 1.1, 1, 1.1, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center"
            >
              <Sparkles className="w-8 h-8 text-primary" />
            </motion.div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-2">
              AI is cooking your challenge
              <motion.span
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                …
              </motion.span>
            </h3>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto">
              Your personalized challenge will be shared on the{" "}
              <span className="text-primary font-medium">Challenges</span> page
              for the community to see!
            </p>
          </div>

          {/* Progress steps */}
          <div className="flex flex-col items-center gap-2">
            {cookingMessages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 1.5, duration: 0.4 }}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 1.5 + 0.2, type: "spring" }}
                  className="w-1.5 h-1.5 rounded-full bg-primary"
                />
                {msg}
              </motion.div>
            ))}
          </div>

          {/* Pulsing bar */}
          <div className="w-full max-w-xs mx-auto h-1.5 rounded-full bg-muted overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-primary via-purple-500 to-pink-500"
              animate={{ width: ["0%", "70%", "90%", "95%"] }}
              transition={{ duration: 6, ease: "easeOut" }}
            />
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
