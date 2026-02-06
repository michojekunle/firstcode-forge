"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowLeft,
  Heart,
  MessageSquare,
  Trophy,
  Clock,
  ArrowRight,
  Star,
  Users,
} from "lucide-react";
import Link from "next/link";
import { use } from "react";

// Sample submissions data
const submissions = [
  {
    id: "sub-1",
    userId: "user-1",
    userName: "Sarah Chen",
    userAvatar: "https://i.pravatar.cc/150?u=sarah",
    completedAt: "2 hours ago",
    likes: 24,
    comments: 5,
    story:
      "This was my first Flutter project! I learned so much about setState and added some extra animations...",
    featured: true,
  },
  {
    id: "sub-2",
    userId: "user-2",
    userName: "Marcus Johnson",
    userAvatar: "https://i.pravatar.cc/150?u=marcus",
    completedAt: "5 hours ago",
    likes: 18,
    comments: 3,
    story:
      "Added some extra animations to make it feel more polished. Used implicit animations for smooth transitions.",
    featured: false,
  },
  {
    id: "sub-3",
    userId: "user-3",
    userName: "Priya Patel",
    userAvatar: "https://i.pravatar.cc/150?u=priya",
    completedAt: "1 day ago",
    likes: 42,
    comments: 8,
    story:
      "Implemented a custom theme switcher as a bonus feature! Dark mode and light mode with smooth transitions.",
    featured: true,
  },
  {
    id: "sub-4",
    userId: "user-4",
    userName: "Alex Rivera",
    userAvatar: "https://i.pravatar.cc/150?u=alex",
    completedAt: "2 days ago",
    likes: 15,
    comments: 2,
    story:
      "Kept it simple but added sound effects for button presses. Makes it feel more interactive!",
    featured: false,
  },
];

const challengeInfo: Record<string, { title: string; emoji: string }> = {
  "counter-app": { title: "Build a Counter App", emoji: "🔢" },
  "todo-list": { title: "Todo List with Persistence", emoji: "✅" },
  "weather-app": { title: "Weather Dashboard", emoji: "🌤️" },
};

export default function SubmissionsListPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const challenge = challengeInfo[id] || challengeInfo["counter-app"];

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link
            href={`/challenges/${id}`}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Challenge
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">{challenge.emoji}</span>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">
                Community Solutions
              </h1>
              <p className="text-muted-foreground">{challenge.title}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {submissions.length} solutions
            </span>
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500" />
              {submissions.filter((s) => s.featured).length} featured
            </span>
          </div>
        </motion.div>

        {/* Featured submissions */}
        <div className="mb-12">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            Featured Solutions
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {submissions
              .filter((sub) => sub.featured)
              .map((sub, i) => (
                <motion.div
                  key={sub.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link href={`/challenges/${id}/submissions/${sub.id}`}>
                    <Card hover className="p-5 h-full border-yellow-500/30">
                      <div className="flex items-start gap-3 mb-3">
                        <img
                          src={sub.userAvatar}
                          alt={sub.userName}
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="flex-1">
                          <span className="font-medium">{sub.userName}</span>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {sub.completedAt}
                            </span>
                            <span className="px-1.5 py-0.5 rounded-full bg-yellow-500/10 text-yellow-500 font-medium">
                              Featured
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {sub.story}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          {sub.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-4 h-4" />
                          {sub.comments}
                        </span>
                        <span className="ml-auto text-primary flex items-center gap-1">
                          View
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
          </div>
        </div>

        {/* All submissions */}
        <div>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            All Solutions
          </h2>
          <div className="space-y-4">
            {submissions.map((sub, i) => (
              <motion.div
                key={sub.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.05 }}
              >
                <Link href={`/challenges/${id}/submissions/${sub.id}`}>
                  <Card hover className="p-4 flex items-center gap-4">
                    <img
                      src={sub.userAvatar}
                      alt={sub.userName}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{sub.userName}</span>
                        {sub.featured && (
                          <span className="px-1.5 py-0.5 rounded-full bg-yellow-500/10 text-yellow-500 text-xs font-medium">
                            Featured
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {sub.story}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground shrink-0">
                      <span className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        {sub.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        {sub.comments}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {sub.completedAt}
                      </span>
                      <ArrowRight className="w-4 h-4 text-primary" />
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground mb-4">
            Have your own solution? Share it with the community!
          </p>
          <Link href={`/challenges/${id}`}>
            <Button glow size="lg">
              Submit Your Solution
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
