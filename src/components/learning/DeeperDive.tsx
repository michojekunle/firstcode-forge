"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

interface DeeperDiveProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function DeeperDive({
  title,
  children,
  defaultOpen = false,
}: DeeperDiveProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="rounded-xl border border-dashed border-primary/30 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 overflow-hidden">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-3 p-4 text-left hover:bg-primary/5 transition-colors"
        whileTap={{ scale: 0.995 }}
        aria-expanded={isOpen}
        aria-label={`${isOpen ? "Collapse" : "Expand"} ${title}`}
      >
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary flex-shrink-0">
          <Layers className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-xs font-medium text-primary uppercase tracking-wider">
            Deeper Dive
          </span>
          <h4 className="text-sm font-semibold text-foreground mt-0.5">
            {title}
          </h4>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="flex-shrink-0"
        >
          <ChevronDown
            className={cn(
              "w-5 h-5 transition-colors",
              isOpen ? "text-primary" : "text-muted-foreground",
            )}
          />
        </motion.div>
      </motion.button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-0">
              <div className="pl-11 space-y-4 text-sm text-muted-foreground leading-relaxed">
                {children}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
