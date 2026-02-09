"use client";

import { motion, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Play, Pause, RotateCcw, ChevronRight } from "lucide-react";

const codeLines = [
  { code: "void main() {", indent: 0, keyword: "void" },
  { code: "  for (int i = 0; i < 5; i++) {", indent: 1, keyword: "for" },
  { code: "    print(i);", indent: 2, keyword: "print" },
  { code: "  }", indent: 1, keyword: "" },
  { code: "}", indent: 0, keyword: "" },
];

export function ConceptSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIteration, setCurrentIteration] = useState(-1);
  const [outputValues, setOutputValues] = useState<number[]>([]);
  const [activeLineIndex, setActiveLineIndex] = useState(-1);

  const progress = useMotionValue(0);

  useEffect(() => {
    if (isPlaying && currentIteration < 4) {
      const timer = setTimeout(() => {
        setActiveLineIndex(2); // Highlight print line
        setTimeout(() => {
          setCurrentIteration((prev) => prev + 1);
          setOutputValues((prev) => [...prev, currentIteration + 1]);
          progress.set(currentIteration + 2);
        }, 300);
      }, 800);
      return () => clearTimeout(timer);
    } else if (currentIteration >= 4) {
      setIsPlaying(false);
      setActiveLineIndex(-1);
    }
  }, [isPlaying, currentIteration, progress]);

  const handlePlay = () => {
    if (currentIteration >= 4) {
      handleReset();
    }
    setActiveLineIndex(1); // Start at for loop
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentIteration(-1);
    setOutputValues([]);
    setActiveLineIndex(-1);
    progress.set(0);
  };

  const highlightSyntax = (line: (typeof codeLines)[0]) => {
    const { code, keyword } = line;

    // Keywords
    const keywords = ["void", "main", "for", "int", "print"];
    let highlighted = code;

    return (
      <span className="font-mono">
        {code.split(/(\s+)/).map((part, i) => {
          if (keywords.includes(part)) {
            return (
              <span key={i} className="text-purple-400">
                {part}
              </span>
            );
          }
          if (part.match(/^\d+$/)) {
            return (
              <span key={i} className="text-orange-400">
                {part}
              </span>
            );
          }
          if (part === "i") {
            return (
              <span key={i} className="text-cyan-400">
                {part}
              </span>
            );
          }
          return (
            <span key={i} className="text-foreground">
              {part}
            </span>
          );
        })}
      </span>
    );
  };

  return (
    <section className="py-24 px-4 bg-muted/30">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            See Code <span className="text-gradient-primary">Come Alive</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Watch how a Dart for loop executes step by step. Our motion-powered
            visualizations make abstract concepts tangible.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Code Visualization */}
          <Card className="p-0 overflow-hidden" hover={false}>
            {/* Code Editor Header */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/50">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="text-xs text-muted-foreground ml-2 flex items-center gap-2">
                <span className="text-blue-400">💙</span>
                loop_demo.dart
              </span>
            </div>

            {/* Code Content */}
            <div className="p-6 text-sm font-mono whitespace-pre">
              {codeLines.map((line, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3 py-1.5 rounded-md px-2 -mx-2"
                  animate={{
                    backgroundColor:
                      activeLineIndex === index
                        ? "rgba(0, 230, 118, 0.15)"
                        : "transparent",
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-muted-foreground w-6 text-right text-xs select-none">
                    {index + 1}
                  </span>
                  <span className="flex-1">{highlightSyntax(line)}</span>
                  {index === 2 && currentIteration >= 0 && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-primary font-bold text-xs bg-primary/10 px-2 py-1 rounded"
                    >
                      i = {currentIteration}
                    </motion.span>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="px-6 pb-4">
              <div className="text-xs text-muted-foreground mb-2 flex items-center justify-between">
                <span>Loop Progress</span>
                <span className="font-mono">
                  {Math.max(0, currentIteration + 1)} / 5 iterations
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-primary-dark rounded-full"
                  animate={{ width: `${((currentIteration + 1) / 5) * 100}%` }}
                  transition={{ type: "spring", stiffness: 100 }}
                />
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2 px-6 pb-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={isPlaying ? handlePause : handlePlay}
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-primary-foreground shadow-lg shadow-primary/30 get-started-play-btn"
                aria-label={isPlaying ? "Pause execution" : "Start execution"}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4 ml-0.5" />
                )}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleReset}
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                aria-label="Reset execution"
              >
                <RotateCcw className="w-4 h-4" />
              </motion.button>
              <span className="text-xs text-muted-foreground ml-2">
                {isPlaying
                  ? "Running..."
                  : currentIteration >= 4
                    ? "Complete!"
                    : "Click play to start"}
              </span>
            </div>
          </Card>

          {/* Output & Explanation */}
          <div className="space-y-6">
            {/* Output */}
            <Card hover={false}>
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <ChevronRight className="w-5 h-5 text-primary" />
                Console Output
              </h3>
              <div className="font-mono text-sm bg-muted/50 rounded-lg p-4 min-h-[120px]">
                {outputValues.length === 0 ? (
                  <span className="text-muted-foreground">
                    Press play to run the loop...
                  </span>
                ) : (
                  outputValues.map((val, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-primary"
                    >
                      {val - 1}
                    </motion.div>
                  ))
                )}
              </div>
            </Card>

            {/* Explanation */}
            <Card hover={false}>
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <ChevronRight className="w-5 h-5 text-primary" />
                First Principles Breakdown
              </h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">1.</span>
                  <span>
                    <strong className="text-foreground">int i = 0</strong>{" "}
                    initializes the counter variable to zero
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">2.</span>
                  <span>
                    <strong className="text-foreground">i &lt; 5</strong> is the
                    condition—loop continues while true
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">3.</span>
                  <span>
                    <strong className="text-foreground">print(i)</strong>{" "}
                    outputs the current value to console
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">4.</span>
                  <span>
                    <strong className="text-foreground">i++</strong> increments
                    i by 1 after each iteration
                  </span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
