"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowRight,
  ArrowLeft,
  Play,
  CheckCircle2,
  BookOpen,
  Code2,
  Lightbulb,
  Rocket,
} from "lucide-react";
import Link from "next/link";

const lessonContent = [
  {
    id: "intro",
    title: "Welcome to Flutter",
    subtitle: "First Principles Thinking",
    icon: "💙",
    sections: [
      {
        type: "concept",
        title: "What is Flutter?",
        content:
          "Flutter is Google's UI toolkit for building natively compiled applications from a single codebase. But before we dive into syntax, let's understand WHY Flutter exists.",
      },
      {
        type: "philosophy",
        title: "The Problem It Solves",
        content:
          "Traditional mobile development requires separate codebases for iOS (Swift) and Android (Kotlin). Flutter's first principle: write once, run everywhere—without compromising native performance.",
      },
      {
        type: "demo",
        title: "Your First Widget",
        code: `// Everything in Flutter is a Widget
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Text('Hello, Flutter!'),
    );
  }
}`,
        explanation:
          "In Flutter, everything you see is a Widget—buttons, text, layouts, even the app itself. This uniformity is a first principle that makes Flutter learnable.",
      },
    ],
  },
  {
    id: "dart-basics",
    title: "Dart: The Foundation",
    subtitle: "Understanding the Language",
    icon: "🎯",
    sections: [
      {
        type: "concept",
        title: "Why Dart?",
        content:
          "Flutter uses Dart because it compiles to ARM code (fast on mobile) AND to JavaScript (web). It's also designed for hot reload—you see changes instantly.",
      },
      {
        type: "demo",
        title: "Variables & Types",
        code: `// Dart is type-safe but flexible
var name = 'Flutter';     // Inferred as String
String explicit = 'Dart'; // Explicit type
final constant = 42;      // Cannot be reassigned
const pi = 3.14159;       // Compile-time constant`,
        explanation:
          "Dart infers types, but being explicit helps catch errors early. Use 'final' for values that don't change after assignment.",
      },
      {
        type: "demo",
        title: "Functions",
        code: `// Functions are first-class citizens
int add(int a, int b) => a + b;

// Named parameters for clarity
void greet({required String name, int age = 0}) {
  print('Hello, $name! Age: $age');
}

// Usage:
greet(name: 'Developer');`,
        explanation:
          "The arrow syntax (=>) is shorthand for single-expression functions. Named parameters make your code self-documenting.",
      },
    ],
  },
  {
    id: "widget-tree",
    title: "The Widget Tree",
    subtitle: "Composition Over Inheritance",
    icon: "🌳",
    sections: [
      {
        type: "philosophy",
        title: "First Principle: Composition",
        content:
          "Flutter embraces composition: small, focused widgets combine to create complex UIs. This is more flexible than inheritance hierarchies.",
      },
      {
        type: "demo",
        title: "Building with Composition",
        code: `class ProfileCard extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Card(
      child: Row(
        children: [
          Avatar(url: 'profile.jpg'),
          Column(
            children: [
              Text('John Doe'),
              Text('Developer'),
            ],
          ),
        ],
      ),
    );
  }
}`,
        explanation:
          "Each widget has one job. Avatar displays images. Row arranges horizontally. Column arranges vertically. Together, they create a profile card.",
      },
    ],
  },
  {
    id: "state",
    title: "State Management",
    subtitle: "Making Things Interactive",
    icon: "⚡",
    sections: [
      {
        type: "concept",
        title: "Stateless vs Stateful",
        content:
          "StatelessWidget: displays data that doesn't change. StatefulWidget: has mutable state that can trigger rebuilds. Choose based on your needs.",
      },
      {
        type: "demo",
        title: "Counter Example",
        code: `class Counter extends StatefulWidget {
  @override
  State<Counter> createState() => _CounterState();
}

class _CounterState extends State<Counter> {
  int count = 0;
  
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text('Count: \$count'),
        ElevatedButton(
          onPressed: () => setState(() => count++),
          child: Text('Increment'),
        ),
      ],
    );
  }
}`,
        explanation:
          "setState() tells Flutter to rebuild this widget. The framework efficiently updates only what changed—this is reactive programming.",
      },
    ],
  },
  {
    id: "next-steps",
    title: "Your Journey Continues",
    subtitle: "What's Next",
    icon: "🚀",
    sections: [
      {
        type: "concept",
        title: "You've Learned",
        content:
          "✅ Flutter's composition model\n✅ Dart syntax fundamentals\n✅ Widget tree architecture\n✅ State management basics",
      },
      {
        type: "philosophy",
        title: "The Path Forward",
        content:
          "Next, explore layouts (Flex, Stack), navigation (Routes), and advanced state management (Provider, Riverpod). Remember: build, break, learn, repeat.",
      },
    ],
  },
];

function CodeBlock({
  code,
  language = "dart",
}: {
  code: string;
  language?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-muted/50 rounded-xl p-4 font-mono text-sm overflow-x-auto"
    >
      <div className="flex items-center gap-2 mb-3 text-xs text-muted-foreground">
        <Code2 className="w-4 h-4" />
        <span>{language}</span>
      </div>
      <pre className="text-foreground">
        <code>{code}</code>
      </pre>
    </motion.div>
  );
}

function Section({
  section,
  index,
}: {
  section: (typeof lessonContent)[0]["sections"][0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, type: "spring" as const }}
      className="mb-8"
    >
      <div className="flex items-center gap-3 mb-4">
        {section.type === "concept" && (
          <BookOpen className="w-5 h-5 text-blue-500" />
        )}
        {section.type === "philosophy" && (
          <Lightbulb className="w-5 h-5 text-yellow-500" />
        )}
        {section.type === "demo" && <Play className="w-5 h-5 text-primary" />}
        <h3 className="text-xl font-semibold">{section.title}</h3>
      </div>

      <p className="text-muted-foreground mb-4 leading-relaxed whitespace-pre-line">
        {section.content}
      </p>

      {"code" in section && section.code && (
        <>
          <CodeBlock code={section.code} />
          {"explanation" in section && section.explanation && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-4 text-sm text-muted-foreground italic border-l-2 border-primary pl-4"
            >
              💡 {section.explanation}
            </motion.p>
          )}
        </>
      )}
    </motion.div>
  );
}

export default function FlutterFundamentalsPage() {
  const courseId = "flutter-fundamentals";
  const { getCourseProgress, setCourseProgress } = useAppStore();

  const [currentLesson, setCurrentLesson] = useState(0);
  // Initialize from store with lazy initializer (SSR safe)
  const [completedLessons, setCompletedLessons] = useState<number[]>(() => {
    if (typeof window !== "undefined") {
      return getCourseProgress(courseId);
    }
    return [];
  });

  // Persist progress when it changes
  useEffect(() => {
    if (completedLessons.length > 0) {
      setCourseProgress(courseId, completedLessons);
    }
  }, [completedLessons, setCourseProgress]);

  const lesson = lessonContent[currentLesson];

  const goNext = () => {
    if (currentLesson < lessonContent.length - 1) {
      if (!completedLessons.includes(currentLesson)) {
        setCompletedLessons([...completedLessons, currentLesson]);
      }
      setCurrentLesson(currentLesson + 1);
    }
  };

  const goPrev = () => {
    if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1);
    }
  };

  const finishCourse = () => {
    // Mark the last lesson as complete
    if (!completedLessons.includes(currentLesson)) {
      setCompletedLessons([...completedLessons, currentLesson]);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            href="/#courses"
            className="text-muted-foreground hover:text-foreground text-sm flex items-center gap-2 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Courses
          </Link>
          <div className="flex items-center gap-4 mb-2">
            <span className="text-4xl">{lesson.icon}</span>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">{lesson.title}</h1>
              <p className="text-primary font-playful">{lesson.subtitle}</p>
            </div>
          </div>
        </motion.div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <span>
              Lesson {currentLesson + 1} of {lessonContent.length}
            </span>
            <span>
              {Math.round(
                (completedLessons.length / lessonContent.length) * 100,
              )}
              % complete
            </span>
          </div>
          <div className="flex gap-2">
            {lessonContent.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => setCurrentLesson(i)}
                className={`flex-1 h-2 rounded-full transition-colors ${
                  i === currentLesson
                    ? "bg-primary"
                    : completedLessons.includes(i)
                      ? "bg-primary/50"
                      : "bg-muted"
                }`}
                whileHover={{ scale: 1.05 }}
              />
            ))}
          </div>
        </div>

        {/* Lesson Content */}
        <Card hover={false} className="p-8 mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentLesson}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{
                type: "spring" as const,
                stiffness: 200,
                damping: 25,
              }}
            >
              {lesson.sections.map((section, i) => (
                <Section key={i} section={section} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={goPrev}
            disabled={currentLesson === 0}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </Button>

          <div className="flex items-center gap-2">
            {completedLessons.includes(currentLesson) && (
              <span className="text-primary flex items-center gap-1 text-sm">
                <CheckCircle2 className="w-4 h-4" />
                Completed
              </span>
            )}
          </div>

          <Button
            onClick={
              currentLesson === lessonContent.length - 1 ? finishCourse : goNext
            }
            glow
            className="gap-2"
          >
            {currentLesson === lessonContent.length - 1 ? (
              <>
                Finish Course
                <Rocket className="w-4 h-4" />
              </>
            ) : (
              <>
                Next Lesson
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
