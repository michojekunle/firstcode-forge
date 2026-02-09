"use client";

import { motion } from "framer-motion";
import { Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BlurOverlayProps {
  onSubmitClick?: () => void;
  message?: string;
}

export function BlurOverlay({
  onSubmitClick,
  message = "Submit your solution to see others",
}: BlurOverlayProps) {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center">
      {/* Blur layer */}
      <div className="absolute inset-0 backdrop-blur-md bg-background/30 rounded-xl" />

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-20 flex flex-col items-center gap-3 text-center px-6"
      >
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <Lock className="w-5 h-5 text-primary" />
        </div>
        <p className="text-sm font-medium text-foreground">{message}</p>
        {onSubmitClick && (
          <Button size="sm" glow onClick={onSubmitClick} className="gap-1.5">
            Submit Yours
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        )}
      </motion.div>
    </div>
  );
}
