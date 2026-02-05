"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  BookOpen,
  Lightbulb,
  Rocket,
  Layers,
} from "lucide-react";
import Link from "next/link";

const lessonContent = [
  {
    id: "thinking",
    title: "Thinking in Systems",
    subtitle: "The Mental Model",
    icon: "🧠",
    sections: [
      {
        type: "philosophy",
        title: "What is Systems Design?",
        content:
          "Systems design is the art of making tradeoffs. There's no perfect architecture—only the right one for your constraints: scale, budget, team size, and time.",
      },
      {
        type: "concept",
        title: "First Principle: Everything Fails",
        content:
          "Networks fail. Servers crash. Databases corrupt. The question isn't IF failure happens, but HOW your system responds. This mindset shapes every design decision.",
      },
      {
        type: "concept",
        title: "The Core Tradeoffs",
        content:
          "📊 CAP Theorem: You can only guarantee 2 of 3—Consistency, Availability, Partition Tolerance\n\n⚡ Latency vs Throughput: Fast for one user OR efficient for many?\n\n💾 Storage vs Compute: Pre-calculate (store more) OR calculate on-demand?",
      },
    ],
  },
  {
    id: "scaling",
    title: "Scaling Fundamentals",
    subtitle: "From 1 to 1 Million Users",
    icon: "📈",
    sections: [
      {
        type: "concept",
        title: "Vertical vs Horizontal",
        content:
          "Vertical Scaling: Bigger machine (more CPU, RAM)\n→ Simple, but has limits\n\nHorizontal Scaling: More machines\n→ Complex, but unlimited potential",
      },
      {
        type: "philosophy",
        title: "Load Balancing",
        content:
          "When you have multiple servers, how do you distribute traffic? Load balancers sit in front and route requests using strategies like Round Robin, Least Connections, or IP Hash.",
      },
      {
        type: "diagram",
        title: "Basic Architecture",
        content:
          "```\n     [Users]\n        ↓\n  [Load Balancer]\n    ↓    ↓    ↓\n [Web1][Web2][Web3]\n        ↓\n   [Database]\n```\n\nThis simple pattern handles 10K+ requests/second. Start here.",
      },
    ],
  },
  {
    id: "databases",
    title: "Database Design",
    subtitle: "The Heart of Your System",
    icon: "🗄️",
    sections: [
      {
        type: "concept",
        title: "SQL vs NoSQL",
        content:
          "SQL (PostgreSQL, MySQL)\n✓ Strong consistency\n✓ Complex queries\n✓ ACID transactions\n\nNoSQL (MongoDB, Cassandra)\n✓ Flexible schema\n✓ Horizontal scaling\n✓ High write throughput",
      },
      {
        type: "philosophy",
        title: "Choosing the Right Database",
        content:
          "The first principle: What are your access patterns?\n\n• Read-heavy? → PostgreSQL + Read Replicas\n• Write-heavy? → Cassandra or DynamoDB\n• Flexible data? → MongoDB\n• Graph relationships? → Neo4j",
      },
      {
        type: "concept",
        title: "Indexes: The Performance Multiplier",
        content:
          "Without index: Scan ALL rows (O(n))\nWith index: Jump directly (O(log n))\n\nBut indexes have costs:\n• Extra storage\n• Slower writes\n• Maintenance overhead\n\nIndex strategically, not everywhere.",
      },
    ],
  },
  {
    id: "caching",
    title: "Caching Strategies",
    subtitle: "Speed for Free",
    icon: "⚡",
    sections: [
      {
        type: "philosophy",
        title: "The Caching Principle",
        content:
          "The fastest request is one you don't make. By storing frequently accessed data closer to the user, you reduce latency from 100ms to 1ms.",
      },
      {
        type: "concept",
        title: "Cache Layers",
        content:
          "1️⃣ Browser Cache (closest to user)\n2️⃣ CDN Cache (geographically distributed)\n3️⃣ Application Cache (Redis, Memcached)\n4️⃣ Database Cache (query results)\n\nEach layer reduces load on the next.",
      },
      {
        type: "concept",
        title: "Cache Invalidation",
        content:
          '"There are only two hard things in computer science: cache invalidation and naming things."\n\nStrategies:\n• TTL (Time-to-Live): Expires automatically\n• Write-Through: Update cache on every write\n• Write-Behind: Async cache updates\n• Event-Based: Invalidate on specific triggers',
      },
    ],
  },
  {
    id: "microservices",
    title: "Distributed Systems",
    subtitle: "When Monoliths Aren't Enough",
    icon: "🔗",
    sections: [
      {
        type: "concept",
        title: "Monolith vs Microservices",
        content:
          "Monolith:\n✓ Simple deployment\n✓ Easy debugging\n✗ Hard to scale parts independently\n\nMicroservices:\n✓ Independent scaling\n✓ Team autonomy\n✗ Network complexity\n✗ Harder debugging",
      },
      {
        type: "philosophy",
        title: "Start Monolith, Extract Later",
        content:
          "Don't start with microservices. Build a well-structured monolith. When specific parts need independent scaling or team ownership, extract them. Premature distribution is expensive.",
      },
      {
        type: "concept",
        title: "Inter-Service Communication",
        content:
          "Synchronous (REST, gRPC):\n→ Simple, immediate response\n→ Creates coupling; if service B is down, A fails\n\nAsynchronous (Message Queues):\n→ Decoupled; A doesn't wait for B\n→ More resilient, but eventual consistency",
      },
    ],
  },
  {
    id: "complete",
    title: "Systems Design Mindset",
    subtitle: "Keep Learning",
    icon: "🏗️",
    sections: [
      {
        type: "philosophy",
        title: "You've Learned",
        content:
          "✅ Tradeoff thinking (CAP, latency vs throughput)\n✅ Scaling patterns (vertical, horizontal, load balancing)\n✅ Database selection and indexing\n✅ Caching strategies\n✅ Distributed systems basics",
      },
      {
        type: "concept",
        title: "The Real Learning",
        content:
          "Systems design isn't memorizing patterns—it's understanding WHY those patterns exist. When you face a new problem, you won't copy solutions; you'll derive them from first principles.",
      },
    ],
  },
];

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
        {section.type === "diagram" && (
          <Layers className="w-5 h-5 text-purple-500" />
        )}
        <h3 className="text-xl font-semibold">{section.title}</h3>
      </div>

      <div className="text-muted-foreground leading-relaxed whitespace-pre-line font-mono text-sm bg-muted/30 rounded-xl p-4">
        {section.content}
      </div>
    </motion.div>
  );
}

export default function SystemsDesignPage() {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);

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
              Concept {currentLesson + 1} of {lessonContent.length}
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
            onClick={goNext}
            disabled={currentLesson === lessonContent.length - 1}
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
                Next Concept
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
