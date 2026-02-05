"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface CardProps extends Omit<HTMLMotionProps<"div">, "ref"> {
  hover?: boolean;
  glow?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover = true, glow = false, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
        transition={{ type: "spring" as const, stiffness: 300, damping: 20 }}
        className={cn(
          "rounded-xl border border-border bg-card p-6",
          "transition-[box-shadow,border-color] duration-300",
          hover &&
            "hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5",
          glow && "glow-primary",
          className,
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  },
);

Card.displayName = "Card";

export { Card };
