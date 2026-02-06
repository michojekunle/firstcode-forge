"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Sparkles,
  Code2,
  Layers,
  Zap,
  BookOpen,
  ChevronDown,
  Play,
  Users,
  Clock,
  Star,
} from "lucide-react";
import Link from "next/link";
import { useAppStore } from "@/lib/store";

// Course data with enhanced info
const courses = [
  {
    id: "flutter-fundamentals",
    title: "Flutter Fundamentals",
    subtitle: "from First Principles",
    description:
      "Master Flutter by understanding WHY things work, not just how. Build cross-platform apps from the ground up.",
    icon: "💙",
    gradient: "from-blue-500 via-cyan-500 to-teal-500",
    bgGradient:
      "bg-gradient-to-br from-blue-500/10 via-cyan-500/5 to-transparent",
    concepts: ["Widget Tree", "State Management", "Dart Syntax", "Hot Reload"],
    stats: { duration: "8 weeks", students: "2.4k", rating: "4.9" },
    previewCode: `class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Text('Hello, Flutter!'),
    );
  }
}`,
    flowSteps: [
      { icon: "🎯", label: "Learn Dart" },
      { icon: "🧱", label: "Build Widgets" },
      { icon: "⚡", label: "Manage State" },
      { icon: "🚀", label: "Ship Apps" },
    ],
  },
  {
    id: "flutter-advanced",
    title: "Flutter Advanced",
    subtitle: "Deep Dive",
    description:
      "Go beyond the basics. Master rendering, custom painters, platform channels, and production architecture.",
    icon: "🚀",
    gradient: "from-purple-500 via-pink-500 to-rose-500",
    bgGradient:
      "bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-transparent",
    concepts: [
      "Custom Painters",
      "Platform Channels",
      "Animations",
      "Architecture",
    ],
    stats: { duration: "10 weeks", students: "1.2k", rating: "4.8" },
    previewCode: `class ChartPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final path = Path();
    // Custom drawing logic
    canvas.drawPath(path, paint);
  }
}`,
    flowSteps: [
      { icon: "🎨", label: "Custom Paint" },
      { icon: "📱", label: "Native Bridge" },
      { icon: "✨", label: "Animations" },
      { icon: "🏛️", label: "Scale Apps" },
    ],
  },
  {
    id: "systems-design",
    title: "Systems Design",
    subtitle: "Think Like a Senior Engineer",
    description:
      "Design scalable systems from first principles—databases, caching, load balancing, and more.",
    icon: "🏗️",
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    bgGradient:
      "bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent",
    concepts: [
      "Distributed Systems",
      "Database Design",
      "Caching",
      "Scalability",
    ],
    stats: { duration: "12 weeks", students: "3.1k", rating: "4.9" },
    previewCode: `// Load Balancer Pattern
    [Users]
        ↓
 [Load Balancer]
   ↓    ↓    ↓
[S1] [S2] [S3]
        ↓
  [Database]`,
    flowSteps: [
      { icon: "🧠", label: "Think Systems" },
      { icon: "📊", label: "Design Scale" },
      { icon: "⚡", label: "Optimize" },
      { icon: "🔒", label: "Ship Reliably" },
    ],
  },
];

// Animated flow arrow component
function FlowArrow() {
  return (
    <motion.svg
      width="40"
      height="20"
      viewBox="0 0 40 20"
      className="text-primary/40"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
    >
      <motion.path
        d="M0 10 L30 10 M25 5 L30 10 L25 15"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      />
    </motion.svg>
  );
}

// Course showcase section - full viewport height
function CourseShowcase({
  course,
  index,
  progress,
}: {
  course: (typeof courses)[0];
  index: number;
  progress: number[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.9, 1, 1, 0.9],
  );

  const completedCount = progress.length;
  const totalLessons = 5; // Each course has 5 lessons
  const progressPercent = Math.round((completedCount / totalLessons) * 100);

  return (
    <motion.section
      ref={ref}
      style={{ opacity, scale }}
      className={`min-h-screen flex items-center justify-center py-24 px-4 relative ${course.bgGradient}`}
    >
      {/* Background decoration */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        <div
          className={`absolute top-1/4 -right-20 w-[600px] h-[600px] rounded-full bg-gradient-to-br ${course.gradient} opacity-5 blur-3xl`}
        />
        <div
          className={`absolute bottom-1/4 -left-20 w-[400px] h-[400px] rounded-full bg-gradient-to-br ${course.gradient} opacity-5 blur-3xl`}
        />
      </motion.div>

      <div className="max-w-6xl w-full mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Course info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Course badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 mb-6"
            >
              <span className="text-5xl">{course.icon}</span>
              {progressPercent > 0 && (
                <span className="px-3 py-1 text-xs font-bold bg-primary/10 text-primary rounded-full">
                  {progressPercent}% Complete
                </span>
              )}
            </motion.div>

            {/* Title */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">
              {course.title}
            </h2>
            <p
              className={`text-lg font-playful bg-gradient-to-r ${course.gradient} bg-clip-text text-transparent mb-6`}
            >
              {course.subtitle}
            </p>

            {/* Description */}
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {course.description}
            </p>

            {/* Learning flow */}
            <div className="flex items-center gap-2 mb-8 flex-wrap">
              {course.flowSteps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 border border-border">
                    <span>{step.icon}</span>
                    <span className="text-sm font-medium">{step.label}</span>
                  </div>
                  {i < course.flowSteps.length - 1 && <FlowArrow />}
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 mb-8 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {course.stats.duration}
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {course.stats.students}
              </span>
              <span className="flex items-center gap-1 text-yellow-500">
                <Star className="w-4 h-4 fill-current" />
                {course.stats.rating}
              </span>
            </div>

            {/* CTA */}
            <Link href={`/courses/${course.id}`}>
              <Button size="lg" glow className="group">
                {progressPercent > 0 ? "Continue Learning" : "Start Course"}
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>

          {/* Right: Code preview with animation */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative"
          >
            {/* Code window */}
            <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-2xl">
              {/* Window header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/50">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-xs text-muted-foreground ml-2">
                  main.dart
                </span>
              </div>

              {/* Code content */}
              <div className="p-6 font-mono text-sm overflow-x-auto">
                <motion.pre
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="text-foreground whitespace-pre-wrap"
                >
                  <code>{course.previewCode}</code>
                </motion.pre>
              </div>
            </div>

            {/* Floating concepts */}
            <div className="absolute -right-4 top-1/2 -translate-y-1/2 space-y-3 hidden lg:block">
              {course.concepts.map((concept, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  className="px-3 py-1.5 rounded-full bg-background border border-border text-xs font-medium shadow-lg"
                >
                  {concept}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

export default function LearnPage() {
  const { courseProgress } = useAppStore();

  return (
    <div className="min-h-screen">
      {/* Hero section */}
      <section className="relative min-h-[80vh] flex items-center justify-center pt-24 pb-16 px-4 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 -z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[150px]"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
            className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-blue-500/10 blur-[120px]"
          />
        </div>

        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-2"
          >
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Learning Paths
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            Master Coding from{" "}
            <span className="text-gradient-primary">First Principles</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12"
          >
            Don't just learn syntax—understand{" "}
            <span className="font-playful text-primary">why things work</span>.
            Our courses break down complex concepts into intuitive,
            first-principles explanations.
          </motion.p>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center gap-8 mb-12"
          >
            {[
              { icon: BookOpen, label: "3 Courses", value: "Launching" },
              { icon: Layers, label: "50+ Concepts", value: "Explained" },
              { icon: Zap, label: "Interactive", value: "Learning" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-sm text-muted-foreground">
              Explore courses
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronDown className="w-5 h-5 text-muted-foreground" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Course showcases */}
      {courses.map((course, index) => (
        <CourseShowcase
          key={course.id}
          course={course}
          index={index}
          progress={courseProgress[course.id]?.completedLessons ?? []}
        />
      ))}

      {/* Bottom CTA */}
      <section className="py-24 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Learning?
          </h2>
          <p className="text-muted-foreground mb-8">
            Pick a course and begin your first-principles journey today.
          </p>
          <Link href="/#courses">
            <Button size="lg" variant="outline" className="group">
              View All Courses
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
