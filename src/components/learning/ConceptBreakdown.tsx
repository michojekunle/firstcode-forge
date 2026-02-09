"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  Lightbulb,
  Sparkles,
  ArrowRight,
  HelpCircle,
  BookOpen,
} from "lucide-react";

// ============================================
// EXPLAIN LIKE I'M 5 COMPONENT
// ============================================
interface ExplainLikeFiveProps {
  concept: string;
  simpleExplanation: string;
  analogy: {
    icon: string;
    text: string;
  };
  technicalExplanation?: string;
  keywords: Array<{
    word: string;
    definition: string;
    icon?: string;
  }>;
}

export function ExplainLikeFive({
  concept,
  simpleExplanation,
  analogy,
  technicalExplanation,
  keywords,
}: ExplainLikeFiveProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [showTechnical, setShowTechnical] = useState(false);
  const [activeKeyword, setActiveKeyword] = useState<string | null>(null);

  // Highlight keywords in the explanation
  const highlightText = (text: string) => {
    let result = text;
    keywords.forEach((keyword) => {
      const regex = new RegExp(`\\b(${keyword.word})\\b`, "gi");
      result = result.replace(
        regex,
        `<mark class="keyword" data-word="${keyword.word}">$1</mark>`,
      );
    });
    return result;
  };

  return (
    <Card ref={ref} hover={false} className="overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-red-500/10 border-b border-border">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="flex items-center gap-3"
        >
          <span className="text-3xl">🧒</span>
          <div>
            <h3 className="font-bold text-lg">Explain Like I&apos;m 5</h3>
            <p className="text-sm text-muted-foreground">{concept}</p>
          </div>
        </motion.div>
      </div>

      <div className="p-6 space-y-6">
        {/* Simple explanation with highlighted keywords */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-yellow-500 shrink-0 mt-1" />
            <p
              className="text-lg leading-relaxed [&_.keyword]:bg-primary/20 [&_.keyword]:text-primary [&_.keyword]:px-1.5 [&_.keyword]:py-0.5 [&_.keyword]:rounded [&_.keyword]:font-medium [&_.keyword]:cursor-help [&_.keyword]:transition-colors hover:[&_.keyword]:bg-primary/30"
              dangerouslySetInnerHTML={{
                __html: highlightText(simpleExplanation),
              }}
              onMouseOver={(e) => {
                const target = e.target as HTMLElement;
                if (target.classList.contains("keyword")) {
                  setActiveKeyword(target.dataset.word || null);
                }
              }}
              onMouseOut={() => setActiveKeyword(null)}
            />
          </div>
        </motion.div>

        {/* Keyword tooltip */}
        {activeKeyword && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="ml-8 p-3 rounded-lg bg-primary/10 border border-primary/30"
          >
            <div className="flex items-center gap-2 text-sm">
              <HelpCircle className="w-4 h-4 text-primary" />
              <span className="font-medium text-primary">{activeKeyword}:</span>
              <span className="text-muted-foreground">
                {
                  keywords.find(
                    (k) => k.word.toLowerCase() === activeKeyword.toLowerCase(),
                  )?.definition
                }
              </span>
            </div>
          </motion.div>
        )}

        {/* Analogy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex items-start gap-3 p-4 rounded-xl bg-muted/50 border border-border"
        >
          <span className="text-3xl">{analogy.icon}</span>
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">
              Think of it like this...
            </p>
            <p className="text-base">{analogy.text}</p>
          </div>
        </motion.div>

        {/* Keywords legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
        >
          <p className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Key Concepts
          </p>
          <div className="flex flex-wrap gap-2">
            {keywords.map((keyword, index) => (
              <motion.div
                key={keyword.word}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="group relative"
              >
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20 cursor-help transition-all hover:bg-primary/20">
                  {keyword.icon && <span>{keyword.icon}</span>}
                  {keyword.word}
                </span>

                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-popover border rounded-lg text-xs max-w-[200px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 shadow-lg">
                  {keyword.definition}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-popover" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Technical toggle */}
        {technicalExplanation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            <button
              onClick={() => setShowTechnical(!showTechnical)}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              {showTechnical ? "Hide" : "Show"} technical explanation
              <ArrowRight
                className={cn(
                  "w-4 h-4 transition-transform",
                  showTechnical && "rotate-90",
                )}
              />
            </button>

            {showTechnical && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-3 p-4 rounded-lg bg-muted/30 border border-border text-sm text-muted-foreground"
              >
                {technicalExplanation}
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </Card>
  );
}

// ============================================
// STEP BY STEP BREAKDOWN
// ============================================
interface Step {
  title: string;
  description: string;
  icon: string;
  codeHint?: string;
}

interface StepByStepProps {
  title: string;
  steps: Step[];
}

export function StepByStepBreakdown({ title, steps }: StepByStepProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [activeStep, setActiveStep] = useState(0);

  return (
    <Card ref={ref} hover={false} className="p-6">
      <h4 className="font-semibold text-lg mb-6 flex items-center gap-2">
        <span className="text-2xl">📝</span>
        {title}
      </h4>

      <div className="space-y-4">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: index * 0.1 }}
            onClick={() => setActiveStep(index)}
            className={cn(
              "flex gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all",
              activeStep === index
                ? "border-primary bg-primary/5"
                : "border-border bg-muted/30 hover:border-primary/50",
            )}
          >
            {/* Step number */}
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-xl",
                activeStep === index
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted",
              )}
            >
              {step.icon}
            </div>

            {/* Content */}
            <div className="flex-1">
              <h5 className="font-medium flex items-center gap-2">
                <span className="text-muted-foreground text-sm">
                  Step {index + 1}
                </span>
                {step.title}
              </h5>
              <p className="text-sm text-muted-foreground mt-1">
                {step.description}
              </p>
              {step.codeHint && activeStep === index && (
                <motion.code
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-2 block text-xs font-mono bg-muted p-2 rounded"
                >
                  {step.codeHint}
                </motion.code>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Progress */}
      <div className="mt-6 flex gap-1">
        {steps.map((_, index) => (
          <div
            key={index}
            className={cn(
              "flex-1 h-1 rounded-full transition-colors",
              index <= activeStep ? "bg-primary" : "bg-muted",
            )}
          />
        ))}
      </div>
    </Card>
  );
}

// ============================================
// VISUAL COMPARISON
// ============================================
interface ComparisonItem {
  label: string;
  icon: string;
  points: string[];
  color: string;
}

interface VisualComparisonProps {
  title: string;
  items: ComparisonItem[];
  vsLabel?: string;
}

export function VisualComparison({
  title,
  items,
  vsLabel = "VS",
}: VisualComparisonProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // For 2 items, use the classic VS layout
  if (items.length === 2) {
    return (
      <Card ref={ref} hover={false} className="p-6">
        <h4 className="font-semibold text-lg text-center mb-6">{title}</h4>
        <div className="grid md:grid-cols-[1fr,auto,1fr] gap-4 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            className={cn("p-4 rounded-xl border-2", items[0].color)}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">{items[0].icon}</span>
              <span className="font-medium">{items[0].label}</span>
            </div>
            <ul className="space-y-2">
              {items[0].points.map((point, i) => (
                <li
                  key={i}
                  className="text-sm text-muted-foreground flex gap-2"
                >
                  <span className="text-primary">•</span>
                  {point}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center"
          >
            <span className="px-3 py-1 bg-muted rounded-full text-sm font-bold">
              {vsLabel}
            </span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            className={cn("p-4 rounded-xl border-2", items[1].color)}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">{items[1].icon}</span>
              <span className="font-medium">{items[1].label}</span>
            </div>
            <ul className="space-y-2">
              {items[1].points.map((point, i) => (
                <li
                  key={i}
                  className="text-sm text-muted-foreground flex gap-2"
                >
                  <span className="text-primary">•</span>
                  {point}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </Card>
    );
  }

  // For 3+ items, use a flexible grid
  return (
    <Card ref={ref} hover={false} className="p-6">
      <h4 className="font-semibold text-lg text-center mb-6">{title}</h4>
      <div
        className={cn(
          "grid gap-4",
          items.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2",
        )}
      >
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.1 }}
            className={cn("p-4 rounded-xl border-2", item.color)}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </div>
            <ul className="space-y-2">
              {item.points.map((point, i) => (
                <li
                  key={i}
                  className="text-sm text-muted-foreground flex gap-2"
                >
                  <span className="text-primary">•</span>
                  {point}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </Card>
  );
}
