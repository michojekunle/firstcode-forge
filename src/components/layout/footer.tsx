"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Github, Twitter } from "lucide-react";

const footerLinks = {
  courses: [
    { label: "Flutter Fundamentals", href: "/courses/flutter-fundamentals" },
    { label: "Flutter Advanced", href: "/courses/flutter-advanced" },
    { label: "Systems Design", href: "/courses/systems-design" },
  ],
  product: [
    { label: "Learn", href: "/#courses" },
    { label: "Challenges", href: "/challenges" },
    { label: "Roadmap", href: "/roadmap" },
    { label: "Onboarding", href: "/onboarding" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl overflow-hidden">
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
              </div>
              <span className="text-xl font-bold tracking-tight">
                FirstCode<span className="text-gradient-primary">Forge</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs mb-6">
              Learn coding from first principles with immersive motion design
              and AI-personalized challenges.
            </p>
            <div className="flex gap-3">
              <motion.a
                href="https://github.com/michojekunle/firstcode-forge"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="https://twitter.com/devvmichael"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </motion.a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-foreground">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors animated-underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} FirstCode Forge. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Built with <span className="text-primary">♥</span> for learners
            worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}
