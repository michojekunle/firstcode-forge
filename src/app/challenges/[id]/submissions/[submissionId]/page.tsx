"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/components/providers/auth-provider";
import {
  ArrowLeft,
  Heart,
  MessageSquare,
  Share2,
  Clock,
  Star,
  Github,
  ExternalLink,
  Code2,
  Copy,
  Check,
  User,
} from "lucide-react";
import Link from "next/link";
import { use, useState } from "react";

// Sample submission data
const submissionData: Record<
  string,
  {
    id: string;
    challengeId: string;
    challengeTitle: string;
    userId: string;
    userName: string;
    userAvatar: string;
    userBio: string;
    completedAt: string;
    likes: number;
    comments: number;
    story: string;
    codeSnippet: string;
    githubLink?: string;
    liveDemo?: string;
    feedback: Array<{
      userId: string;
      userName: string;
      userAvatar: string;
      content: string;
      createdAt: string;
    }>;
  }
> = {
  "sub-1": {
    id: "sub-1",
    challengeId: "counter-app",
    challengeTitle: "Build a Counter App",
    userId: "user-1",
    userName: "Sarah Chen",
    userAvatar: "https://i.pravatar.cc/150?u=sarah",
    userBio: "Mobile developer learning Flutter. Love building beautiful UIs!",
    completedAt: "2 hours ago",
    likes: 24,
    comments: 5,
    story: `This was my first Flutter project and I learned so much about state management!

The hardest part was understanding when to use setState vs other state management solutions. I ended up keeping it simple with just setState for this project.

I added some extra features like vibration feedback and animated number transitions. The animation library in Flutter is amazing - the implicit animations made it super easy.

If I were to do it again, I'd probably separate the counter logic into a separate class for better testability.`,
    codeSnippet: `class CounterScreen extends StatefulWidget {
  @override
  _CounterScreenState createState() => _CounterScreenState();
}

class _CounterScreenState extends State<CounterScreen> {
  int _count = 0;

  void _increment() {
    setState(() => _count++);
    HapticFeedback.lightImpact();
  }

  void _decrement() {
    if (_count > 0) {
      setState(() => _count--);
      HapticFeedback.lightImpact();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: AnimatedSwitcher(
          duration: Duration(milliseconds: 200),
          child: Text(
            '$_count',
            key: ValueKey(_count),
            style: Theme.of(context).textTheme.displayLarge,
          ),
        ),
      ),
      floatingActionButton: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          FloatingActionButton(
            onPressed: _decrement,
            child: Icon(Icons.remove),
          ),
          SizedBox(width: 16),
          FloatingActionButton(
            onPressed: _increment,
            child: Icon(Icons.add),
          ),
        ],
      ),
    );
  }
}`,
    githubLink: "https://github.com/sarahchen/flutter-counter",
    liveDemo: "https://dartpad.dev/example",
    feedback: [
      {
        userId: "user-2",
        userName: "Marcus Johnson",
        userAvatar: "https://i.pravatar.cc/150?u=marcus",
        content: "Great use of AnimatedSwitcher! That's a nice touch.",
        createdAt: "1 hour ago",
      },
      {
        userId: "user-3",
        userName: "Priya Patel",
        userAvatar: "https://i.pravatar.cc/150?u=priya",
        content:
          "Love the haptic feedback addition. Makes it feel so polished!",
        createdAt: "30 minutes ago",
      },
    ],
  },
};

export default function SubmissionDetailPage({
  params,
}: {
  params: Promise<{ id: string; submissionId: string }>;
}) {
  const { id, submissionId } = use(params);
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);

  const submission = submissionData[submissionId] || submissionData["sub-1"];

  const handleCopy = async () => {
    await navigator.clipboard.writeText(submission.codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLike = () => {
    setLiked(!liked);
  };

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
            Back to {submission.challengeTitle}
          </Link>
        </motion.div>

        {/* Header - User info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-start gap-4">
            <img
              src={submission.userAvatar}
              alt={submission.userName}
              className="w-16 h-16 rounded-full"
            />
            <div className="flex-1">
              <h1 className="text-2xl font-bold">{submission.userName}</h1>
              <p className="text-muted-foreground">{submission.userBio}</p>
              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {submission.completedAt}
                </span>
                <span className="flex items-center gap-1">
                  <Heart
                    className={`w-4 h-4 ${liked ? "fill-red-500 text-red-500" : ""}`}
                  />
                  {submission.likes + (liked ? 1 : 0)}
                </span>
                <span className="flex items-center gap-1">
                  <MessageSquare className="w-4 h-4" />
                  {submission.feedback.length}
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleLike}
                className={liked ? "border-red-500 text-red-500" : ""}
              >
                <Heart
                  className={`w-4 h-4 mr-1 ${liked ? "fill-current" : ""}`}
                />
                {liked ? "Liked" : "Like"}
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-1" />
                Share
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Story and Code */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Story */}
            <Card hover={false} className="p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                My Journey
              </h2>
              <div className="prose prose-invert prose-sm max-w-none">
                {submission.story.split("\n\n").map((paragraph, i) => (
                  <p
                    key={i}
                    className="text-muted-foreground leading-relaxed mb-4"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </Card>

            {/* Code snippet */}
            <Card hover={false} className="overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/50">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-primary" />
                  <span className="font-medium text-sm">Code Snippet</span>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleCopy}
                  className="h-7 px-2 text-xs"
                >
                  {copied ? (
                    <Check className="w-3 h-3 text-green-500" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </Button>
              </div>
              <pre className="p-4 overflow-x-auto font-mono text-sm max-h-[400px]">
                <code className="text-foreground">
                  {submission.codeSnippet}
                </code>
              </pre>
            </Card>

            {/* Comments */}
            <div>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                Feedback ({submission.feedback.length})
              </h2>
              <div className="space-y-4">
                {submission.feedback.map((comment, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                  >
                    <Card hover={false} className="p-4">
                      <div className="flex items-start gap-3">
                        <img
                          src={comment.userAvatar}
                          alt={comment.userName}
                          className="w-8 h-8 rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">
                              {comment.userName}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {comment.createdAt}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {comment.content}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}

                {/* Add comment */}
                {user ? (
                  <Card hover={false} className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <User className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <textarea
                          placeholder="Add your feedback..."
                          className="w-full bg-muted rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                          rows={3}
                        />
                        <div className="flex justify-end mt-2">
                          <Button size="sm">Post Feedback</Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ) : (
                  <Card hover={false} className="p-4 text-center">
                    <p className="text-sm text-muted-foreground mb-2">
                      Sign in to leave feedback
                    </p>
                    <Button size="sm" variant="outline">
                      Sign In
                    </Button>
                  </Card>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right: Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Challenge info */}
            <Card hover={false} className="p-6">
              <h3 className="font-semibold mb-4">Challenge</h3>
              <Link
                href={`/challenges/${submission.challengeId}`}
                className="block p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <span className="font-medium text-sm">
                  {submission.challengeTitle}
                </span>
              </Link>
            </Card>

            {/* Links */}
            {(submission.githubLink || submission.liveDemo) && (
              <Card hover={false} className="p-6">
                <h3 className="font-semibold mb-4">Links</h3>
                <div className="space-y-3">
                  {submission.githubLink && (
                    <a
                      href={submission.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      View on GitHub
                      <ExternalLink className="w-3 h-3 ml-auto" />
                    </a>
                  )}
                  {submission.liveDemo && (
                    <a
                      href={submission.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Star className="w-4 h-4" />
                      Live Demo
                      <ExternalLink className="w-3 h-3 ml-auto" />
                    </a>
                  )}
                </div>
              </Card>
            )}

            {/* Try this challenge CTA */}
            <Card
              hover={false}
              className="p-6 bg-gradient-to-br from-primary/10 to-transparent border-primary/20"
            >
              <h3 className="font-semibold mb-2">Inspired?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Try this challenge yourself and share your own solution!
              </p>
              <Link href={`/challenges/${submission.challengeId}`}>
                <Button glow className="w-full">
                  Start Challenge
                </Button>
              </Link>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
