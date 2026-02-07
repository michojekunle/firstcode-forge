"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/providers/theme-provider";
import { useAuth } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Menu, X, User, LogOut } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { href: "/#courses", label: "Courses" },
  { href: "/learn", label: "Learn" },
  { href: "/challenges", label: "Challenges" },
];

export function Navbar() {
  const { resolvedTheme, setTheme } = useTheme();
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

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
              className="flex h-10 w-10 items-center justify-center rounded-xl overflow-hidden"
            >
              <svg
                width="40"
                height="40"
                viewBox="0 0 512 512"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="256" cy="256" r="256" className="fill-primary" />
                <path
                  d="M128 320 L384 320 L360 380 L152 380 Z"
                  className="fill-primary-foreground"
                />
                <path
                  d="M160 180 L100 240 L160 300"
                  stroke="currentColor"
                  strokeWidth="24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  className="stroke-primary-foreground"
                />
                <path
                  d="M352 180 L412 240 L352 300"
                  stroke="currentColor"
                  strokeWidth="24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  className="stroke-primary-foreground"
                />
                <text
                  x="256"
                  y="270"
                  textAnchor="middle"
                  fontFamily="system-ui"
                  fontWeight="700"
                  fontSize="120"
                  className="fill-primary-foreground"
                >
                  1
                </text>
              </svg>
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

            {/* Conditional: Profile or Get Started */}
            {user ? (
              <div className="relative hidden md:block">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground"
                >
                  {user.user_metadata?.avatar_url ? (
                    <img
                      src={user.user_metadata.avatar_url}
                      alt="Profile"
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    <User className="h-5 w-5" />
                  )}
                </motion.button>

                {/* Profile dropdown */}
                {showProfileMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-xl shadow-xl z-50 overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-border">
                      <p className="font-medium truncate">
                        {user.user_metadata?.full_name ||
                          user.email?.split("@")[0]}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {user.email}
                      </p>
                    </div>
                    <div className="py-1">
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted transition-colors"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        <User className="w-4 h-4" />
                        Dashboard
                      </Link>
                      <Link
                        href="/challenges?tab=my"
                        className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted transition-colors"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        My Challenges
                      </Link>
                      <button
                        onClick={() => {
                          signOut();
                          setShowProfileMenu(false);
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted transition-colors text-red-500"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            ) : (
              <Link href="/learn">
                <Button size="sm" className="hidden md:inline-flex">
                  Get Started
                </Button>
              </Link>
            )}

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
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    signOut();
                    setIsOpen(false);
                  }}
                  className="px-4 py-3 rounded-lg text-sm font-medium text-red-500 hover:bg-muted text-left"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link href="/learn" className="mt-2">
                <Button size="sm" className="w-full">
                  Get Started
                </Button>
              </Link>
            )}
          </div>
        </motion.div>
      </nav>
    </motion.header>
  );
}
