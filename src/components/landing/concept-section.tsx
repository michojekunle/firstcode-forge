"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Play, Pause, RotateCcw, ChevronRight } from "lucide-react";

const codeLines = [
  { code: "for i in range(5):", indent: 0 },
  { code: "    print(i)", indent: 1 },
];

export function ConceptSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIteration, setCurrentIteration] = useState(-1);
  const [outputValues, setOutputValues] = useState<number[]>([]);

  const progress = useMotionValue(0);
  const loopIndicatorX = useTransform(progress, [0, 5], [0, 100]);

  useEffect(() => {
    if (isPlaying && currentIteration < 4) {
      const timer = setTimeout(() => {
        setCurrentIteration((prev) => prev + 1);
        setOutputValues((prev) => [...prev, currentIteration + 1]);
        progress.set(currentIteration + 2);
      }, 800);
      return () => clearTimeout(timer);
    } else if (currentIteration >= 4) {
      setIsPlaying(false);
    }
  }, [isPlaying, currentIteration, progress]);

  const handlePlay = () => {
    if (currentIteration >= 4) {
      handleReset();
    }
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentIteration(-1);
    setOutputValues([]);
    progress.set(0);
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
            Watch how a simple loop executes step by step. Our motion-powered
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
              <span className="text-xs text-muted-foreground ml-2">
                loop_demo.py
              </span>
            </div>

            {/* Code Content */}
            <div className="p-6 font-mono text-sm">
              {codeLines.map((line, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3 py-1"
                  animate={{
                    backgroundColor:
                      isPlaying && index === 1 && currentIteration >= 0
                        ? "rgba(0, 230, 118, 0.1)"
                        : "transparent",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-muted-foreground w-6 text-right">
                    {index + 1}
                  </span>
                  <span>
                    <span className="text-purple-400">
                      {line.code.includes("for") ? "for" : ""}
                    </span>
                    <span className="text-foreground">
                      {line.code.includes("for")
                        ? line.code.replace("for", "")
                        : line.code}
                    </span>
                  </span>
                  {index === 1 && currentIteration >= 0 && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-primary font-bold"
                    >
                      ← i = {currentIteration}
                    </motion.span>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="px-6 pb-4">
              <div className="text-xs text-muted-foreground mb-2">
                Loop Progress: {Math.max(0, currentIteration + 1)} / 5
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${((currentIteration + 1) / 5) * 100}%` }}
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
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-primary-foreground"
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
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted hover:bg-muted/80"
              >
                <RotateCcw className="w-4 h-4" />
              </motion.button>
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
                    <strong className="text-foreground">range(5)</strong>{" "}
                    creates a sequence: [0, 1, 2, 3, 4]
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">2.</span>
                  <span>
                    <strong className="text-foreground">for i in</strong>{" "}
                    assigns each value to variable <code>i</code>
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
                    Loop <strong className="text-foreground">repeats</strong>{" "}
                    until all values are processed
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
