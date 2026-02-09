"use client";

import { motion } from "framer-motion";
import { ExternalLink, BookOpen } from "lucide-react";

interface ReadMoreLinkProps {
  title: string;
  url: string;
  topic: string;
  description?: string;
  icon?: string;
}

const STORAGE_KEY = "fcf-readmore-clicks";

function saveClickedLink(topic: string, url: string) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const clicks: Array<{ topic: string; url: string; timestamp: number }> = raw
      ? JSON.parse(raw)
      : [];

    // Avoid duplicates within 30 minutes
    const recent = clicks.find(
      (c) => c.topic === topic && Date.now() - c.timestamp < 30 * 60 * 1000,
    );
    if (!recent) {
      clicks.push({ topic, url, timestamp: Date.now() });
      // Keep only last 20
      if (clicks.length > 20) clicks.shift();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(clicks));
    }
  } catch {
    // localStorage not available
  }
}

export function ReadMoreLink({
  title,
  url,
  topic,
  description,
  icon = "📖",
}: ReadMoreLinkProps) {
  const handleClick = () => {
    saveClickedLink(topic, url);
  };

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="group flex items-center gap-3 p-4 rounded-xl border border-primary/20 bg-primary/5 hover:bg-primary/10 hover:border-primary/40 transition-all duration-300 no-underline"
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="text-2xl flex-shrink-0" role="img" aria-hidden="true">
        {icon}
      </span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <BookOpen className="w-3.5 h-3.5 text-primary flex-shrink-0" />
          <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors truncate">
            {title}
          </span>
        </div>
        {description && (
          <p className="text-xs text-muted-foreground mt-0.5 truncate">
            {description}
          </p>
        )}
      </div>
      <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 opacity-0 group-hover:opacity-100" />
    </motion.a>
  );
}

// Helper to get recent clicked topics (used by useReturnQuiz)
export function getRecentReadMoreClicks(): Array<{
  topic: string;
  url: string;
  timestamp: number;
}> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const clicks = JSON.parse(raw);
    // Return only clicks within last 30 minutes
    return clicks.filter(
      (c: { timestamp: number }) => Date.now() - c.timestamp < 30 * 60 * 1000,
    );
  } catch {
    return [];
  }
}

export function clearReadMoreClick(topic: string) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const clicks = JSON.parse(raw);
    const filtered = clicks.filter((c: { topic: string }) => c.topic !== topic);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch {
    // noop
  }
}
