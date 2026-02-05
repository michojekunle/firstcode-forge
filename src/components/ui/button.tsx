"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  glow?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      glow = false,
      children,
      ...props
    },
    ref,
  ) => {
    const variants = {
      primary: "bg-primary text-primary-foreground hover:bg-primary-dark",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      ghost: "bg-transparent hover:bg-muted text-foreground",
      outline:
        "border border-border bg-transparent hover:bg-muted text-foreground",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-5 py-2.5 text-base",
      lg: "px-8 py-4 text-lg",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring" as const, stiffness: 400, damping: 17 }}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-lg font-medium",
          "transition-colors duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          glow && "glow-primary",
          className,
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  },
);

Button.displayName = "Button";

export { Button };
