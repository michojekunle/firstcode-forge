"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

// ============================================
// ICON HIGHLIGHT - Standout concept markers
// ============================================
interface IconHighlightProps {
  icon: string;
  label: string;
  definition: string;
  color?: "primary" | "success" | "warning" | "danger";
  size?: "sm" | "md" | "lg";
  pulse?: boolean;
  inline?: boolean;
}

const colorClasses = {
  primary: {
    bg: "bg-primary/20",
    border: "border-primary/50",
    text: "text-primary",
    glow: "shadow-primary/30",
  },
  success: {
    bg: "bg-green-500/20",
    border: "border-green-500/50",
    text: "text-green-500",
    glow: "shadow-green-500/30",
  },
  warning: {
    bg: "bg-yellow-500/20",
    border: "border-yellow-500/50",
    text: "text-yellow-500",
    glow: "shadow-yellow-500/30",
  },
  danger: {
    bg: "bg-red-500/20",
    border: "border-red-500/50",
    text: "text-red-500",
    glow: "shadow-red-500/30",
  },
};

const sizeClasses = {
  sm: "text-sm px-2 py-1",
  md: "text-base px-3 py-1.5",
  lg: "text-lg px-4 py-2",
};

export function IconHighlight({
  icon,
  label,
  definition,
  color = "primary",
  size = "md",
  pulse = false,
  inline = true,
}: IconHighlightProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const colors = colorClasses[color];
  const sizeClass = sizeClasses[size];

  return (
    <span
      className={cn("relative", inline && "inline-flex")}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <motion.span
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border font-medium cursor-help",
          colors.bg,
          colors.border,
          colors.text,
          sizeClass,
          pulse && "shadow-lg",
          pulse && colors.glow,
        )}
        animate={
          pulse
            ? {
                boxShadow: [
                  `0 0 0 0 ${colors.glow}`,
                  `0 0 20px 5px ${colors.glow}`,
                  `0 0 0 0 ${colors.glow}`,
                ],
              }
            : {}
        }
        transition={{ duration: 2, repeat: Infinity }}
        whileHover={{ scale: 1.05 }}
      >
        <span className="text-base shrink-0">{icon}</span>
        <span className="truncate">{label}</span>
      </motion.span>

      {/* Tooltip */}
      {showTooltip && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-72 max-w-[90vw] bg-popover border border-border rounded-xl shadow-xl z-50 overflow-hidden"
        >
          <div className="p-4">
            <div className="flex gap-3">
              <span className="text-2xl shrink-0 mt-0.5">{icon}</span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm mb-1.5">{label}</p>
                <p className="text-muted-foreground text-xs leading-relaxed break-words">
                  {definition}
                </p>
              </div>
            </div>
          </div>
          {/* Arrow pointing down */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-popover" />
        </motion.div>
      )}
    </span>
  );
}

// ============================================
// CONCEPT CHIPS - Row of highlighted concepts
// ============================================
interface ConceptChipsProps {
  concepts: Array<{
    icon: string;
    label: string;
    definition: string;
  }>;
  title?: string;
}

export function ConceptChips({ concepts, title }: ConceptChipsProps) {
  return (
    <div className="space-y-3">
      {title && (
        <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          <span>✨</span>
          {title}
        </p>
      )}
      <div className="flex flex-wrap gap-2">
        {concepts.map((concept, index) => (
          <motion.div
            key={concept.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
          >
            <IconHighlight
              icon={concept.icon}
              label={concept.label}
              definition={concept.definition}
              size="sm"
              color={
                index % 4 === 0
                  ? "primary"
                  : index % 4 === 1
                    ? "success"
                    : index % 4 === 2
                      ? "warning"
                      : "danger"
              }
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ============================================
// KEY POINT CALLOUT
// ============================================
interface KeyPointProps {
  icon: string;
  title: string;
  description: string;
  variant?: "tip" | "warning" | "important" | "note";
}

const variantStyles = {
  tip: {
    border: "border-green-500/30",
    bg: "bg-green-500/5",
    iconBg: "bg-green-500/20",
    iconColor: "text-green-500",
  },
  warning: {
    border: "border-yellow-500/30",
    bg: "bg-yellow-500/5",
    iconBg: "bg-yellow-500/20",
    iconColor: "text-yellow-500",
  },
  important: {
    border: "border-red-500/30",
    bg: "bg-red-500/5",
    iconBg: "bg-red-500/20",
    iconColor: "text-red-500",
  },
  note: {
    border: "border-primary/30",
    bg: "bg-primary/5",
    iconBg: "bg-primary/20",
    iconColor: "text-primary",
  },
};

export function KeyPointCallout({
  icon,
  title,
  description,
  variant = "note",
}: KeyPointProps) {
  const style = variantStyles[variant];

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className={cn(
        "flex gap-4 p-4 rounded-xl border-2",
        style.border,
        style.bg,
      )}
    >
      <div
        className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0",
          style.iconBg,
        )}
      >
        {icon}
      </div>
      <div>
        <h5 className="font-semibold mb-1">{title}</h5>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </motion.div>
  );
}

// ============================================
// INLINE DEFINITION
// ============================================
interface InlineDefProps {
  term: string;
  definition: string;
  children: React.ReactNode;
}

export function InlineDef({ term, definition, children }: InlineDefProps) {
  const [showDef, setShowDef] = useState(false);

  return (
    <span
      className="relative"
      onMouseEnter={() => setShowDef(true)}
      onMouseLeave={() => setShowDef(false)}
    >
      <span className="border-b-2 border-dashed border-primary/50 cursor-help text-primary">
        {children}
      </span>

      {showDef && (
        <motion.span
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-full left-0 mb-2 px-3 py-2 bg-popover border rounded-lg text-xs max-w-[240px] shadow-lg z-50 block"
        >
          <span className="font-semibold block mb-1">{term}</span>
          <span className="text-muted-foreground">{definition}</span>
        </motion.span>
      )}
    </span>
  );
}

// ============================================
// PROGRESS MILESTONE
// ============================================
interface ProgressMilestoneProps {
  current: number;
  total: number;
  milestones: Array<{
    at: number;
    icon: string;
    label: string;
  }>;
}

export function ProgressMilestone({
  current,
  total,
  milestones,
}: ProgressMilestoneProps) {
  const progress = (current / total) * 100;

  return (
    <div className="space-y-3">
      {/* Progress bar */}
      <div className="relative h-3 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-primary/60 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />

        {/* Milestone markers */}
        {milestones.map((milestone) => (
          <div
            key={milestone.at}
            className="absolute top-1/2 -translate-y-1/2"
            style={{ left: `${(milestone.at / total) * 100}%` }}
          >
            <motion.div
              className={cn(
                "w-5 h-5 rounded-full flex items-center justify-center text-xs -translate-x-1/2 border-2",
                current >= milestone.at
                  ? "bg-primary border-primary text-primary-foreground"
                  : "bg-muted border-border",
              )}
              initial={{ scale: 0.8 }}
              animate={{ scale: current >= milestone.at ? 1.2 : 1 }}
            >
              {milestone.icon}
            </motion.div>
          </div>
        ))}
      </div>

      {/* Labels */}
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>
          Lesson {current} of {total}
        </span>
        <span>{Math.round(progress)}% Complete</span>
      </div>
    </div>
  );
}
