"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Users, Star, Zap } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const courses = [
  {
    id: "flutter-fundamentals",
    title: "Flutter Fundamentals",
    subtitle: "from First Principles",
    description:
      "Master Flutter by understanding WHY things work, not just how. Build cross-platform apps from the ground up.",
    icon: "💙",
    gradient: "from-blue-500/20 to-cyan-500/20",
    borderGlow: "hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]",
    duration: "8 weeks",
    students: "2.4k",
    rating: "4.9",
    topics: [
      "Dart Language Core",
      "Widget Tree Architecture",
      "State Management Patterns",
      "Performance Optimization",
    ],
    level: "Beginner to Intermediate",
    featured: true,
  },
  {
    id: "flutter-advanced",
    title: "Flutter Advanced",
    subtitle: "First Principles Deep Dive",
    description:
      "Go beyond the basics. Master rendering, custom painters, platform channels, and production architecture.",
    icon: "🚀",
    gradient: "from-purple-500/20 to-pink-500/20",
    borderGlow: "hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]",
    duration: "10 weeks",
    students: "1.2k",
    rating: "4.8",
    topics: [
      "Custom Render Objects",
      "Native Platform Integration",
      "Advanced Animations",
      "Production Architecture",
    ],
    level: "Advanced",
    featured: true,
  },
  {
    id: "systems-design",
    title: "Systems Design",
    subtitle: "Concepts Explained",
    description:
      "Think like a senior engineer. Design scalable systems from first principles—databases, caching, load balancing, and more.",
    icon: "🏗️",
    gradient: "from-emerald-500/20 to-teal-500/20",
    borderGlow: "hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]",
    duration: "12 weeks",
    students: "3.1k",
    rating: "4.9",
    topics: [
      "Distributed Systems",
      "Database Design",
      "Caching Strategies",
      "System Scalability",
    ],
    level: "Intermediate to Advanced",
    featured: true,
  },
];

function CourseCard({
  course,
  index,
}: {
  course: (typeof courses)[0];
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  // 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  const springConfig = { stiffness: 300, damping: 30 };
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        delay: index * 0.15,
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      }}
      style={{
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="perspective-1000"
    >
      <div
        className={`
          relative rounded-2xl border border-border bg-card p-8 
          transition-all duration-500 ease-out
          ${course.borderGlow}
          ${isHovered ? "border-primary/50" : ""}
        `}
      >
        {/* Gradient background */}
        <div
          className={`
            absolute inset-0 rounded-2xl bg-gradient-to-br ${course.gradient}
            opacity-0 transition-opacity duration-500
            ${isHovered ? "opacity-100" : ""}
          `}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Icon and badge */}
          <div className="flex items-start justify-between mb-6">
            <motion.div
              animate={{
                scale: isHovered ? 1.1 : 1,
                rotate: isHovered ? 5 : 0,
              }}
              transition={{ type: "spring" as const, stiffness: 300 }}
              className="text-5xl"
            >
              {course.icon}
            </motion.div>
            {course.featured && (
              <span className="px-3 py-1 text-xs font-bold bg-primary text-primary-foreground rounded-full">
                LAUNCHING SOON
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold mb-1">{course.title}</h3>
          <p className="text-sm text-primary font-medium mb-4 font-playful">
            {course.subtitle}
          </p>

          {/* Description */}
          <p className="text-muted-foreground mb-6 leading-relaxed">
            {course.description}
          </p>

          {/* Topics preview */}
          <div className="mb-6">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
              What you&apos;ll master
            </p>
            <div className="flex flex-wrap gap-2">
              {course.topics.map((topic, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="px-3 py-1 text-xs bg-muted rounded-full"
                >
                  {topic}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 mb-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {course.duration}
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {course.students}
            </span>
            <span className="flex items-center gap-1 text-yellow-500">
              <Star className="w-4 h-4 fill-current" />
              {course.rating}
            </span>
          </div>

          {/* Level badge */}
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Zap className="w-3 h-3" />
              {course.level}
            </span>
            <Link href={`/courses/${course.id}`}>
              <Button variant="ghost" className="group gap-2">
                Explore
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function CoursesSection() {
  return (
    <section id="courses" className="py-24 px-4 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[150px] -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-blue-500/5 blur-[120px]" />

      <div className="mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 mb-4 text-sm font-medium text-primary bg-primary/10 rounded-full">
            📚 Learning Paths
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Master These <span className="text-gradient-primary">First</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Launching with three comprehensive courses designed to build
            <span className="font-playful text-primary">
              {" "}
              real understanding
            </span>
            , not just syntax.
          </p>
        </motion.div>

        {/* Course cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <CourseCard key={course.id} course={course} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-4">
            More courses coming soon. Got a request?
          </p>
          <Button variant="outline" className="gap-2">
            Request a Course
            <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
