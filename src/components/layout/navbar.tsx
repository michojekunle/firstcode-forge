"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/providers/theme-provider";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Menu, X, Terminal } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/learn", label: "Learn" },
  { href: "/challenges", label: "Challenges" },
  { href: "/roadmap", label: "Roadmap" },
];

export function Navbar() {
  const { resolvedTheme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={cn("fixed top-0 left-0 right-0 z-50", "px-4 py-4 md:px-8")}
    >
      <nav className="glass mx-auto max-w-7xl rounded-2xl px-6 py-3 backdrop-blur-3xl">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary"
            >
              <Terminal className="h-5 w-5 text-primary-foreground" />
            </motion.div>
            <span className="text-xl font-bold tracking-tight">
              FirstCode<span className="text-gradient-primary">Forge</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium",
                  "text-muted-foreground hover:text-foreground",
                  "hover:bg-muted transition-colors duration-200",
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-lg",
                "text-muted-foreground hover:text-foreground",
                "hover:bg-muted transition-colors duration-200",
              )}
              aria-label="Toggle theme"
            >
              {resolvedTheme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </motion.button>

            <Button size="sm" className="hidden md:inline-flex">
              Get Started
            </Button>

            {/* Mobile menu toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="flex md:hidden h-10 w-10 items-center justify-center rounded-lg hover:bg-muted"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden md:hidden"
        >
          <div className="pt-4 pb-2 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "px-4 py-3 rounded-lg text-sm font-medium",
                  "text-muted-foreground hover:text-foreground",
                  "hover:bg-muted transition-colors duration-200",
                )}
              >
                {link.label}
              </Link>
            ))}
            <Button size="sm" className="mt-2 w-full">
              Get Started
            </Button>
          </div>
        </motion.div>
      </nav>
    </motion.header>
  );
}
