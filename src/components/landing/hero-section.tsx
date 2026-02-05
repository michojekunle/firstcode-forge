"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

const wordVariants = {
  hidden: {
    opacity: 0,
    y: 80,
    rotateX: -90,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring" as const,
      stiffness: 80,
      damping: 12,
    },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
    },
  },
};

// Pre-computed particle positions to avoid Math.random during render
const particleData = [
  { x: "12%", y: "8%", scale: 0.7, duration: 15, delay: 1 },
  { x: "28%", y: "23%", scale: 0.9, duration: 18, delay: 2 },
  { x: "45%", y: "15%", scale: 0.5, duration: 12, delay: 0 },
  { x: "67%", y: "32%", scale: 0.8, duration: 20, delay: 3 },
  { x: "82%", y: "18%", scale: 0.6, duration: 14, delay: 1.5 },
  { x: "15%", y: "55%", scale: 0.75, duration: 16, delay: 2.5 },
  { x: "38%", y: "67%", scale: 0.85, duration: 19, delay: 0.5 },
  { x: "55%", y: "45%", scale: 0.65, duration: 13, delay: 4 },
  { x: "78%", y: "72%", scale: 0.55, duration: 17, delay: 1 },
  { x: "92%", y: "38%", scale: 0.95, duration: 11, delay: 2 },
  { x: "8%", y: "82%", scale: 0.6, duration: 15, delay: 3.5 },
  { x: "35%", y: "88%", scale: 0.7, duration: 18, delay: 0 },
  { x: "58%", y: "78%", scale: 0.8, duration: 14, delay: 4.5 },
  { x: "72%", y: "92%", scale: 0.5, duration: 20, delay: 1 },
  { x: "95%", y: "65%", scale: 0.75, duration: 12, delay: 2 },
];

// Floating particles for motion.zajno.com style
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particleData.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary/30 rounded-full"
          initial={{
            x: particle.x,
            y: particle.y,
            scale: particle.scale,
          }}
          animate={{
            y: [null, "-100%"],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

// Interactive mouse-following gradient
function InteractiveGradient() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 50, damping: 30 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="absolute w-[800px] h-[800px] rounded-full bg-primary/20 blur-[150px] pointer-events-none"
      style={{
        x: useTransform(x, (v) => v - 400),
        y: useTransform(y, (v) => v - 400),
      }}
    />
  );
}

export function HeroSection() {
  const titleWords = ["Learn", "Coding", "from", "First", "Principles"];
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16 px-4">
      {/* Interactive background */}
      <div className="absolute inset-0 -z-10">
        {mounted && <InteractiveGradient />}
        <FloatingParticles />

        {/* Static gradient orbs */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px]"
        />

        {/* Animated grid */}
        <div className="absolute inset-0">
          <svg className="w-full h-full opacity-[0.03]">
            <defs>
              <pattern
                id="grid"
                width="60"
                height="60"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 60 0 L 0 0 0 60"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      <div className="mx-auto max-w-6xl text-center">
        {/* Animated badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.1, type: "spring" as const }}
          whileHover={{ scale: 1.05 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-2 cursor-default"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <Sparkles className="h-4 w-4 text-primary" />
          </motion.div>
          <span className="text-sm font-medium text-primary font-playful">
            AI-Powered Learning Platform
          </span>
        </motion.div>

        {/* 3D Title with staggered word animation */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8"
          style={{ perspective: "1000px" }}
        >
          {titleWords.map((word, index) => (
            <motion.span
              key={index}
              variants={wordVariants}
              className={`inline-block mr-4 md:mr-6 ${
                word === "First" || word === "Principles"
                  ? "text-gradient-primary"
                  : ""
              }`}
              style={{
                transformOrigin: "bottom",
                transformStyle: "preserve-3d",
              }}
              whileHover={{
                scale: 1.1,
                rotateY: 10,
                transition: { type: "spring", stiffness: 400 },
              }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subtitle with playful font accent */}
        <motion.p
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.8 }}
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-12"
        >
          Master any programming language by deconstructing concepts to their
          core. Experience immersive{" "}
          <span className="font-playful text-primary">motion design</span> and
          AI-personalized challenges tailored to your goals.
        </motion.p>

        {/* CTA Buttons with hover effects */}
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/onboarding">
            <Button size="lg" glow className="group relative overflow-hidden">
              <motion.span
                className="absolute inset-0 bg-white/20"
                initial={{ x: "-100%", skewX: -15 }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5 }}
              />
              <span className="relative flex items-center gap-2">
                Start Learning
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </span>
            </Button>
          </Link>
          <Link href="#courses">
            <Button size="lg" variant="outline" className="group">
              <span>Explore Courses</span>
              <motion.div
                className="ml-2"
                animate={{ y: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ↓
              </motion.div>
            </Button>
          </Link>
        </motion.div>

        {/* Stats with staggered entrance */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto"
        >
          {[
            { value: "10+", label: "Languages" },
            { value: "50+", label: "Concepts" },
            { value: "∞", label: "AI Challenges" },
            { value: "Free", label: "To Start" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 + index * 0.1, type: "spring" as const }}
              whileHover={{ scale: 1.1, y: -5 }}
              className="text-center cursor-default"
            >
              <motion.div
                className="text-3xl md:text-4xl font-bold text-primary mb-1"
                whileHover={{ scale: 1.15 }}
              >
                {stat.value}
              </motion.div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator - clickable */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        onClick={() => {
          document
            .getElementById("courses")
            ?.scrollIntoView({ behavior: "smooth" });
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer hover:scale-110 transition-transform"
        aria-label="Scroll to courses"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2 hover:border-primary transition-colors"
        >
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full bg-primary"
          />
        </motion.div>
      </motion.button>
    </section>
  );
}
