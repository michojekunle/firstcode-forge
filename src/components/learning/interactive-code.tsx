"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Play,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Terminal,
  Code2,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface InteractiveCodeProps {
  code: string;
  language: string;
  title?: string;
  description?: string;
  output?: string;
  runnable?: boolean;
  externalLink?: string;
  externalLinkLabel?: string;
}

export function InteractiveCode({
  code,
  language,
  title,
  description,
  output,
  runnable = false,
  externalLink,
  externalLinkLabel = "Try in DartPad",
}: InteractiveCodeProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showOutput, setShowOutput] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRun = () => {
    setShowOutput(true);
  };

  return (
    <Card hover={false} className="overflow-hidden">
      {/* Header */}
      {(title || description) && (
        <div className="px-4 py-3 border-b border-border bg-muted/30">
          {title && (
            <div className="flex items-center gap-2 font-medium">
              <Code2 className="w-4 h-4 text-primary" />
              {title}
            </div>
          )}
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
        </div>
      )}

      {/* Code block */}
      <div className="relative">
        {/* Window controls */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/50">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
            </div>
            <span className="text-xs text-muted-foreground ml-2">
              {language}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {externalLink && (
              <a
                href={externalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary hover:underline flex items-center gap-1"
              >
                {externalLinkLabel}
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
            <Button
              size="sm"
              variant="ghost"
              onClick={handleCopy}
              className="h-7 px-2 text-xs"
            >
              {copied ? (
                <Check className="w-3 h-3 text-green-500" />
              ) : (
                <Copy className="w-3 h-3" />
              )}
            </Button>
          </div>
        </div>

        {/* Code content */}
        <motion.div
          initial={false}
          animate={{ height: isExpanded ? "auto" : "200px" }}
          className="overflow-hidden"
        >
          <pre className="p-4 overflow-x-auto font-mono text-sm">
            <code className="text-foreground">{code}</code>
          </pre>
        </motion.div>

        {/* Expand/collapse for long code */}
        {code.split("\n").length > 8 && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-card to-transparent pt-8 pb-2 px-4 flex justify-center">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="w-3 h-3 mr-1" />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDown className="w-3 h-3 mr-1" />
                  Show More
                </>
              )}
            </Button>
          </div>
        )}
      </div>

      {/* Run button and output */}
      {(runnable || output) && (
        <div className="border-t border-border">
          <div className="px-4 py-3 flex items-center gap-2">
            {runnable && (
              <Button size="sm" onClick={handleRun} className="gap-1">
                <Play className="w-3 h-3" />
                Run Code
              </Button>
            )}
            {output && !showOutput && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowOutput(true)}
                className="gap-1"
              >
                <Terminal className="w-3 h-3" />
                Show Output
              </Button>
            )}
          </div>

          {/* Output panel */}
          <AnimatePresence>
            {showOutput && output && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="border-t border-border bg-muted/30"
              >
                <div className="px-4 py-2 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Terminal className="w-3 h-3" />
                    Output
                  </span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setShowOutput(false)}
                    className="h-6 px-2 text-xs"
                  >
                    Hide
                  </Button>
                </div>
                <pre className="px-4 pb-4 font-mono text-sm text-green-400">
                  {output}
                </pre>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </Card>
  );
}

// Collapsible installation guide component
interface InstallationGuideProps {
  title: string;
  steps: Array<{
    title: string;
    command?: string;
    description?: string;
  }>;
  defaultOpen?: boolean;
}

export function InstallationGuide({
  title,
  steps,
  defaultOpen = false,
}: InstallationGuideProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopyCommand = async (command: string, index: number) => {
    await navigator.clipboard.writeText(command);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <Card hover={false} className="overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-muted/30 transition-colors"
      >
        <span className="font-medium flex items-center gap-2">
          <Terminal className="w-4 h-4 text-primary" />
          {title}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="overflow-hidden"
          >
            <div className="border-t border-border p-4 space-y-4">
              {steps.map((step, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
                      {index + 1}
                    </span>
                    <span className="font-medium text-sm">{step.title}</span>
                  </div>
                  {step.description && (
                    <p className="text-sm text-muted-foreground ml-8">
                      {step.description}
                    </p>
                  )}
                  {step.command && (
                    <div className="ml-8 flex items-center gap-2 bg-muted rounded-lg p-2">
                      <code className="flex-1 font-mono text-sm overflow-x-auto">
                        {step.command}
                      </code>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleCopyCommand(step.command!, index)}
                        className="h-7 px-2 shrink-0"
                      >
                        {copiedIndex === index ? (
                          <Check className="w-3 h-3 text-green-500" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}

// Deep dive link component
interface DeepDiveLinkProps {
  title: string;
  description: string;
  href: string;
  icon?: React.ReactNode;
}

export function DeepDiveLink({
  title,
  description,
  href,
  icon,
}: DeepDiveLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      <Card
        hover
        className="p-4 flex items-start gap-3 transition-colors group-hover:border-primary/50"
      >
        <div className="shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
          {icon || <ExternalLink className="w-5 h-5" />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-medium group-hover:text-primary transition-colors flex items-center gap-1">
            {title}
            <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        </div>
      </Card>
    </a>
  );
}

// Concept illustration with animation
interface ConceptIllustrationProps {
  title: string;
  items: Array<{
    icon: string;
    label: string;
    description?: string;
  }>;
  flowDirection?: "horizontal" | "vertical";
}

export function ConceptIllustration({
  title,
  items,
  flowDirection = "horizontal",
}: ConceptIllustrationProps) {
  return (
    <div className="space-y-4">
      {title && (
        <h4 className="font-medium text-center text-muted-foreground">
          {title}
        </h4>
      )}
      <div
        className={cn(
          "flex items-center justify-center gap-2",
          flowDirection === "vertical" && "flex-col",
        )}
      >
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-2"
          >
            <div className="flex flex-col items-center gap-1 px-4 py-3 rounded-xl bg-muted/50 border border-border min-w-[100px]">
              <span className="text-2xl">{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
              {item.description && (
                <span className="text-xs text-muted-foreground text-center">
                  {item.description}
                </span>
              )}
            </div>
            {/* Arrow between items */}
            {index < items.length - 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.2 }}
                className={cn(
                  "text-primary/50",
                  flowDirection === "vertical" && "rotate-90",
                )}
              >
                →
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
