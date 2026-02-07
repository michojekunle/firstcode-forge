"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Play,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  RotateCcw,
  Maximize2,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface LiveCodeEditorProps {
  code: string;
  language?: "dart" | "flutter" | "javascript" | "typescript";
  title?: string;
  description?: string;
  expectedOutput?: string;
  dartPadUrl?: string;
  editable?: boolean;
  className?: string;
}

// Theme-aware syntax highlighting with CSS variables
function highlightDart(code: string): React.ReactNode[] {
  const lines = code.split("\n");

  return lines.map((line, lineIndex) => {
    // Escape HTML first
    const escaped = line
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // Apply highlighting in a specific order and be careful not to match inside already-highlighted spans
    let highlighted = escaped;

    // Store placeholders for already highlighted content
    const placeholders: string[] = [];
    const createPlaceholder = (content: string) => {
      const index = placeholders.length;
      placeholders.push(content);
      return `___HIGHLIGHT_${index}___`;
    };

    // Comments first (highest priority)
    highlighted = highlighted.replace(/(\/\/.*$)/gm, (match) =>
      createPlaceholder(`<span class="code-comment">${match}</span>`),
    );

    // Strings
    highlighted = highlighted.replace(
      /(['"`])(?:(?!\1)[^\\]|\\.)*\1/g,
      (match) => createPlaceholder(`<span class="code-string">${match}</span>`),
    );

    // Annotations
    highlighted = highlighted.replace(/(@\w+)/g, (match) =>
      createPlaceholder(`<span class="code-annotation">${match}</span>`),
    );

    // Keywords
    highlighted = highlighted.replace(
      /\b(class|extends|implements|void|return|final|const|var|int|String|bool|double|new|this|super|override|static|async|await|if|else|for|while|switch|case|break|try|catch|throw|import|export|required|late|Widget|BuildContext|State)\b/g,
      (match) =>
        createPlaceholder(`<span class="code-keyword">${match}</span>`),
    );

    // Numbers
    highlighted = highlighted.replace(/\b(\d+\.?\d*)\b/g, (match) =>
      createPlaceholder(`<span class="code-number">${match}</span>`),
    );

    // Class names (capitalized words)
    highlighted = highlighted.replace(/\b([A-Z][a-zA-Z0-9]*)\b/g, (match) =>
      createPlaceholder(`<span class="code-class">${match}</span>`),
    );

    // Function calls
    highlighted = highlighted.replace(
      /\b([a-z_][a-zA-Z0-9_]*)\(/g,
      (match, name) =>
        createPlaceholder(`<span class="code-function">${name}</span>`) + "(",
    );

    // Restore placeholders
    placeholders.forEach((content, index) => {
      highlighted = highlighted.replace(`___HIGHLIGHT_${index}___`, content);
    });

    return (
      <div key={lineIndex} className="flex min-h-[1.5em]">
        <span className="w-10 text-right pr-4 text-muted-foreground/50 select-none text-xs shrink-0">
          {lineIndex + 1}
        </span>
        <span
          dangerouslySetInnerHTML={{ __html: highlighted || "&nbsp;" }}
          className="flex-1 whitespace-pre"
        />
      </div>
    );
  });
}

export function LiveCodeEditor({
  code: initialCode,
  language = "dart",
  title,
  description,
  expectedOutput,
  dartPadUrl,
  editable = false,
  className,
}: LiveCodeEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [copied, setCopied] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const lineCount = code.split("\n").length;
  const shouldCollapse = lineCount > 15;

  // Handle escape key to close fullscreen
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isFullscreen]);

  // Lock body scroll when fullscreen
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isFullscreen]);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  const handleReset = useCallback(() => {
    setCode(initialCode);
  }, [initialCode]);

  const handleRunInDartPad = useCallback(() => {
    const url =
      dartPadUrl || `https://dartpad.dev/?code=${encodeURIComponent(code)}`;
    window.open(url, "_blank");
  }, [code, dartPadUrl]);

  // Different layouts for fullscreen vs normal
  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm">
        <div className="h-full flex flex-col">
          {/* Fullscreen header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-card">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              {title && <span className="font-medium">{title}</span>}
              <span className="text-xs text-muted-foreground px-2 py-0.5 rounded bg-muted">
                {language}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={handleCopy}
                className="h-8"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsFullscreen(false)}
                className="h-8"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Fullscreen code - scrollable */}
          <div className="flex-1 overflow-auto">
            <pre className="p-6 font-mono text-sm leading-relaxed bg-card min-h-full">
              <code>{highlightDart(code)}</code>
            </pre>
          </div>

          {/* Fullscreen footer */}
          <div className="flex items-center gap-3 px-6 py-4 border-t border-border bg-card">
            <Button
              size="sm"
              onClick={handleRunInDartPad}
              className="gap-2"
              glow
            >
              <Play className="w-4 h-4" />
              Run in DartPad
              <ExternalLink className="w-3 h-3 ml-1 opacity-50" />
            </Button>
            {expectedOutput && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowOutput(!showOutput)}
              >
                {showOutput ? "Hide" : "Show"} Output
              </Button>
            )}
            <span className="text-sm text-muted-foreground ml-auto">
              Press Esc to close
            </span>
          </div>

          {/* Output in fullscreen */}
          {showOutput && expectedOutput && (
            <div className="border-t border-green-500/30 bg-green-500/5 p-4">
              <div className="text-xs text-green-600 dark:text-green-400 font-medium mb-2">
                Expected Output
              </div>
              <pre className="font-mono text-sm text-green-700 dark:text-green-300">
                {expectedOutput}
              </pre>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <motion.div layout className={cn("relative", className)}>
      <Card
        hover={false}
        className="overflow-hidden border-2 border-primary/20"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-muted/50 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div>
              {title && <span className="font-medium text-sm">{title}</span>}
              <span className="ml-2 text-xs text-muted-foreground px-2 py-0.5 rounded bg-background/50">
                {language}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <Button
              size="sm"
              variant="ghost"
              onClick={handleCopy}
              className="h-7 px-2"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-green-500" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </Button>
            {editable && code !== initialCode && (
              <Button
                size="sm"
                variant="ghost"
                onClick={handleReset}
                className="h-7 px-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </Button>
            )}
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsFullscreen(true)}
              className="h-7 px-2"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>

        {/* Description */}
        {description && (
          <div className="px-4 py-2 bg-muted/30 border-b border-border text-sm text-muted-foreground">
            {description}
          </div>
        )}

        {/* Code content */}
        <motion.div
          initial={false}
          animate={{
            maxHeight: isExpanded || !shouldCollapse ? "2000px" : "320px",
          }}
          className="relative overflow-hidden"
        >
          <pre className="p-4 overflow-x-auto font-mono text-sm leading-relaxed bg-card">
            <code>{highlightDart(code)}</code>
          </pre>

          {/* Gradient overlay for collapsed state */}
          {shouldCollapse && !isExpanded && (
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-card to-transparent" />
          )}
        </motion.div>

        {/* Expand/collapse */}
        {shouldCollapse && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full py-2 text-sm text-muted-foreground hover:text-foreground border-t border-border bg-muted/30 flex items-center justify-center gap-1"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-4 h-4" />
                Show less
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                Show all {lineCount} lines
              </>
            )}
          </button>
        )}

        {/* Action bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-t border-border">
          <Button size="sm" onClick={handleRunInDartPad} className="gap-2" glow>
            <Play className="w-3.5 h-3.5" />
            Run in DartPad
            <ExternalLink className="w-3 h-3 ml-1 opacity-50" />
          </Button>

          {expectedOutput && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowOutput(!showOutput)}
              className="gap-2"
            >
              {showOutput ? "Hide" : "Show"} Expected Output
            </Button>
          )}
        </div>

        {/* Output panel */}
        <AnimatePresence>
          {showOutput && expectedOutput && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-green-500/30"
            >
              <div className="px-4 py-2 bg-green-500/10 text-xs text-green-600 dark:text-green-400 font-medium">
                Expected Output
              </div>
              <pre className="p-4 font-mono text-sm text-green-700 dark:text-green-300 bg-green-500/5">
                {expectedOutput}
              </pre>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}
