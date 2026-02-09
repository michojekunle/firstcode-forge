"use client";

import { motion } from "framer-motion";
import { Building2 } from "lucide-react";

interface RealWorldExampleProps {
  appName: string;
  concept: string;
  description: string;
  icon?: string;
  link?: string;
}

export function RealWorldExample({
  appName,
  concept,
  description,
  icon = "🏢",
  link,
}: RealWorldExampleProps) {
  const content = (
    <>
      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-primary/20 flex-shrink-0">
        <span className="text-2xl" role="img" aria-hidden="true">
          {icon}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <Building2 className="w-3.5 h-3.5 text-primary flex-shrink-0" />
          <span className="text-xs font-medium text-primary uppercase tracking-wider">
            Real World
          </span>
        </div>
        <h4 className="text-sm font-semibold text-foreground">
          {appName}{" "}
          <span className="font-normal text-muted-foreground">— {concept}</span>
        </h4>
        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
          {description}
        </p>
      </div>
    </>
  );

  const className =
    "flex items-start gap-4 p-4 rounded-xl border border-border/50 bg-muted/30 hover:bg-muted/50 transition-all duration-300 group no-underline";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {link ? (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
        >
          {content}
        </a>
      ) : (
        <div className={className}>{content}</div>
      )}
    </motion.div>
  );
}
