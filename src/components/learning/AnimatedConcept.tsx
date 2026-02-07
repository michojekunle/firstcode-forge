"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================
// WIDGET TREE ANIMATION
// ============================================
interface WidgetNode {
  name: string;
  color: string;
  children?: WidgetNode[];
}

interface WidgetTreeProps {
  tree: WidgetNode;
  title?: string;
  description?: string;
}

export function WidgetTreeAnimation({
  tree,
  title,
  description,
}: WidgetTreeProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isPlaying, setIsPlaying] = useState(true);

  const renderNode = (
    node: WidgetNode,
    depth: number = 0,
    index: number = 0,
  ) => {
    const delay = depth * 0.2 + index * 0.1;

    return (
      <motion.div
        key={`${node.name}-${depth}-${index}`}
        initial={{ opacity: 0, scale: 0.8, y: -10 }}
        animate={isInView && isPlaying ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ delay, duration: 0.4, type: "spring" }}
        className="flex flex-col items-center"
      >
        {/* Node */}
        <motion.div
          className={cn(
            "px-4 py-2 rounded-lg font-mono text-sm font-medium border-2",
            node.color,
          )}
          whileHover={{ scale: 1.05 }}
          animate={
            isPlaying
              ? {
                  boxShadow: [
                    "0 0 0px rgba(139,92,246,0)",
                    "0 0 20px rgba(139,92,246,0.3)",
                    "0 0 0px rgba(139,92,246,0)",
                  ],
                }
              : {}
          }
          transition={{ duration: 2, repeat: Infinity, delay: delay + 0.5 }}
        >
          {node.name}
        </motion.div>

        {/* Children */}
        {node.children && node.children.length > 0 && (
          <>
            {/* Connector line */}
            <motion.div
              initial={{ height: 0 }}
              animate={isInView && isPlaying ? { height: 24 } : {}}
              transition={{ delay: delay + 0.2, duration: 0.3 }}
              className="w-0.5 bg-gradient-to-b from-primary/50 to-primary/20"
            />

            {/* Horizontal spread for multiple children */}
            <div className="flex gap-8">
              {node.children.map((child, i) => (
                <div key={i} className="flex flex-col items-center">
                  {node.children!.length > 1 && (
                    <motion.div
                      initial={{ width: 0, opacity: 0 }}
                      animate={
                        isInView && isPlaying
                          ? { width: "100%", opacity: 1 }
                          : {}
                      }
                      transition={{ delay: delay + 0.3, duration: 0.2 }}
                      className="h-0.5 bg-primary/30 mb-0"
                    />
                  )}
                  {renderNode(child, depth + 1, i)}
                </div>
              ))}
            </div>
          </>
        )}
      </motion.div>
    );
  };

  return (
    <Card ref={ref} hover={false} className="p-6 overflow-hidden">
      {(title || description) && (
        <div className="mb-6 text-center">
          {title && (
            <h4 className="font-semibold text-lg flex items-center justify-center gap-2">
              <span className="text-2xl">🌳</span>
              {title}
            </h4>
          )}
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
        </div>
      )}

      <div className="flex justify-center py-4 overflow-x-auto">
        {renderNode(tree)}
      </div>

      <div className="flex justify-center gap-2 mt-4">
        <Button
          size="sm"
          variant="outline"
          onClick={() => setIsPlaying(!isPlaying)}
          className="gap-2"
        >
          {isPlaying ? (
            <Pause className="w-3 h-3" />
          ) : (
            <Play className="w-3 h-3" />
          )}
          {isPlaying ? "Pause" : "Play"}
        </Button>
      </div>
    </Card>
  );
}

// ============================================
// STATE FLOW ANIMATION
// ============================================
interface StateFlowStep {
  label: string;
  icon: string;
  description?: string;
}

interface StateFlowProps {
  steps: StateFlowStep[];
  title?: string;
  looping?: boolean;
}

export function StateFlowAnimation({
  steps,
  title,
  looping = true,
}: StateFlowProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Auto-advance animation
  useState(() => {
    if (!looping || !isPlaying) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 2000);
    return () => clearInterval(interval);
  });

  return (
    <Card ref={ref} hover={false} className="p-6">
      {title && (
        <h4 className="font-semibold text-lg text-center mb-6 flex items-center justify-center gap-2">
          <span className="text-2xl">🔄</span>
          {title}
        </h4>
      )}

      <div className="flex items-center justify-center gap-4 flex-wrap">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-4"
          >
            {/* Step card */}
            <motion.div
              animate={{
                scale: activeStep === index ? 1.1 : 1,
                borderColor:
                  activeStep === index
                    ? "rgb(139, 92, 246)"
                    : "rgba(255,255,255,0.1)",
              }}
              className={cn(
                "flex flex-col items-center p-4 rounded-xl border-2 min-w-[100px] transition-colors",
                activeStep === index ? "bg-primary/10" : "bg-muted/30",
              )}
            >
              <span className="text-3xl mb-2">{step.icon}</span>
              <span className="font-medium text-sm">{step.label}</span>
              {step.description && (
                <span className="text-xs text-muted-foreground mt-1 text-center">
                  {step.description}
                </span>
              )}
            </motion.div>

            {/* Arrow */}
            {index < steps.length - 1 && (
              <motion.div
                animate={{
                  color:
                    activeStep === index
                      ? "rgb(139, 92, 246)"
                      : "rgba(255,255,255,0.3)",
                  scale: activeStep === index ? 1.2 : 1,
                }}
                className="text-2xl"
              >
                →
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-2 mt-6">
        {steps.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveStep(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              activeStep === index
                ? "w-6 bg-primary"
                : "bg-muted-foreground/30",
            )}
          />
        ))}
      </div>
    </Card>
  );
}

// ============================================
// BUILD PROCESS ANIMATION
// ============================================
interface BuildStep {
  name: string;
  icon: string;
  duration: number;
}

export function BuildProcessAnimation({ steps }: { steps: BuildStep[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentStep, setCurrentStep] = useState(-1);
  const [isBuilding, setIsBuilding] = useState(false);

  const startBuild = async () => {
    setIsBuilding(true);
    setCurrentStep(0);

    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(i);
      await new Promise((resolve) => setTimeout(resolve, steps[i].duration));
    }

    setIsBuilding(false);
  };

  return (
    <Card ref={ref} hover={false} className="p-6">
      <h4 className="font-semibold text-lg text-center mb-6 flex items-center justify-center gap-2">
        <span className="text-2xl">🔨</span>
        Flutter Build Process
      </h4>

      <div className="space-y-3">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: index * 0.1 }}
            className={cn(
              "flex items-center gap-4 p-3 rounded-lg border transition-all",
              currentStep === index && "border-primary bg-primary/10",
              currentStep > index && "border-green-500/50 bg-green-500/10",
              currentStep < index && "border-border bg-muted/30",
            )}
          >
            <span className="text-2xl">{step.icon}</span>
            <span className="flex-1 font-medium">{step.name}</span>

            {currentStep === index && (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full"
              />
            )}

            {currentStep > index && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-green-500 text-xl"
              >
                ✓
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <Button
          onClick={startBuild}
          disabled={isBuilding}
          glow
          className="gap-2"
        >
          {isBuilding ? (
            <>Building...</>
          ) : (
            <>
              <Play className="w-4 h-4" />
              Start Build
            </>
          )}
        </Button>
      </div>
    </Card>
  );
}

// ============================================
// CONCEPT FLOW DIAGRAM
// ============================================
interface ConceptFlowProps {
  title: string;
  description?: string;
  nodes: Array<{
    id: string;
    label: string;
    icon: string;
    highlight?: boolean;
  }>;
  connections: Array<[string, string, string?]>; // [from, to, label?]
}

export function ConceptFlowDiagram({
  title,
  description,
  nodes,
  connections,
}: ConceptFlowProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Card ref={ref} hover={false} className="p-6">
      {title && (
        <div className="text-center mb-6">
          <h4 className="font-semibold text-lg">{title}</h4>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
        </div>
      )}

      <div className="flex items-center justify-center gap-6 flex-wrap">
        {nodes.map((node, index) => (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: index * 0.15, type: "spring" }}
            className="flex items-center gap-4"
          >
            <div
              className={cn(
                "flex flex-col items-center p-4 rounded-xl border-2 min-w-[100px]",
                node.highlight
                  ? "border-primary bg-primary/10"
                  : "border-border bg-muted/30",
              )}
            >
              <motion.span
                className="text-3xl mb-2"
                animate={node.highlight ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {node.icon}
              </motion.span>
              <span className="font-medium text-sm text-center">
                {node.label}
              </span>
            </div>

            {/* Arrow to next */}
            {index < nodes.length - 1 && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.15 + 0.1 }}
                className="text-primary text-xl"
              >
                →
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </Card>
  );
}
