"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { useAuth } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Rocket,
  Star,
  Users,
  Sparkles,
  Lock,
} from "lucide-react";
import Link from "next/link";

// Import all new interactive components
import { LiveCodeEditor } from "@/components/learning/LiveCodeEditor";
import {
  WidgetTreeAnimation,
  StateFlowAnimation,
  BuildProcessAnimation,
} from "@/components/learning/AnimatedConcept";
import {
  ExplainLikeFive,
  StepByStepBreakdown,
  VisualComparison,
} from "@/components/learning/ConceptBreakdown";
import {
  ConceptChips,
  KeyPointCallout,
  ProgressMilestone,
} from "@/components/learning/IconHighlight";
import { CourseRating } from "@/components/learning/CourseRating";

// ============================================
// LESSON DATA - Immersive content structure
// ============================================
const lessons = [
  {
    id: "intro",
    title: "Welcome to Flutter",
    subtitle: "First Principles Thinking",
    icon: "💙",
  },
  {
    id: "dart-basics",
    title: "Dart: The Foundation",
    subtitle: "Understanding the Language",
    icon: "🎯",
  },
  {
    id: "widget-tree",
    title: "The Widget Tree",
    subtitle: "Composition Over Inheritance",
    icon: "🌳",
  },
  {
    id: "state",
    title: "State Management",
    subtitle: "Making Things Interactive",
    icon: "⚡",
  },
  {
    id: "layouts",
    title: "Building Layouts",
    subtitle: "Row, Column, Flex",
    icon: "📐",
  },
  {
    id: "challenge",
    title: "Your Challenge",
    subtitle: "Put It All Together",
    icon: "🚀",
  },
];

// ============================================
// LESSON COMPONENTS
// ============================================

function Lesson0() {
  return (
    <div className="space-y-8">
      <ExplainLikeFive
        concept="What is Flutter?"
        simpleExplanation="Flutter is like a magic paintbrush for making phone apps. You draw your app once, and it works on both iPhones AND Android phones! The paintbrush uses special building blocks called Widgets to create everything you see."
        analogy={{
          icon: "🎨",
          text: "Imagine you're building with LEGO. Each LEGO brick is a 'Widget'. You stack them together to build anything—a button, a list, even the whole app. Flutter is your LEGO set for mobile apps!",
        }}
        keywords={[
          {
            word: "Widget",
            definition:
              "A building block for your UI. Everything visible is a Widget—buttons, text, images, even layouts.",
            icon: "🧱",
          },
          {
            word: "Dart",
            definition:
              "The programming language Flutter uses. It's designed for fast mobile apps.",
            icon: "🎯",
          },
          {
            word: "Cross-platform",
            definition: "Write once, run on iOS, Android, web, and desktop.",
            icon: "🌍",
          },
        ]}
        technicalExplanation="Flutter is a UI toolkit that compiles to native ARM code for optimal performance. Unlike React Native which uses a JavaScript bridge, Flutter renders directly through Skia, giving you 60fps animations and full control over every pixel."
      />

      <KeyPointCallout
        icon="💡"
        title="Why Flutter Matters"
        description="One codebase means half the development time. Companies like Google, BMW, and Alibaba use Flutter to ship apps faster."
        variant="tip"
      />

      <BuildProcessAnimation
        steps={[
          { name: "Write Dart code", icon: "✍️", duration: 800 },
          { name: "Hot reload changes", icon: "🔥", duration: 600 },
          { name: "Compile to native", icon: "⚡", duration: 1000 },
          { name: "Run on device", icon: "📱", duration: 500 },
        ]}
      />

      <LiveCodeEditor
        title="Your First Flutter App"
        description="Every Flutter app starts with a MaterialApp and at least one Widget. This is the simplest Flutter app possible."
        code={`import 'package:flutter/material.dart';

void main() {
  runApp(
    MaterialApp(
      home: Center(
        child: Text(
          'Hello, Flutter!',
          style: TextStyle(fontSize: 32),
        ),
      ),
    ),
  );
}`}
        expectedOutput="A centered 'Hello, Flutter!' text on your screen"
        language="dart"
      />
    </div>
  );
}

function Lesson1() {
  return (
    <div className="space-y-8">
      <ExplainLikeFive
        concept="What is Dart?"
        simpleExplanation="Dart is like the language you use to talk to Flutter. Just like you use words to tell your friends what to do, you use Dart to tell Flutter what to build. It's designed to be easy to read and super fast."
        analogy={{
          icon: "🗣️",
          text: "Think of Dart as the 'recipe language' for cooking. You write the recipe (code), and Flutter follows it to cook (build) your app. Clear recipes = delicious apps!",
        }}
        keywords={[
          {
            word: "Variable",
            definition:
              "A named container that holds data. Like a labeled box you put things in.",
            icon: "📦",
          },
          {
            word: "Function",
            definition:
              "A reusable set of instructions. Like a recipe you can use again and again.",
            icon: "📋",
          },
          {
            word: "Class",
            definition:
              "A blueprint for creating objects. Like a cookie cutter for making cookies.",
            icon: "🍪",
          },
        ]}
      />

      <StepByStepBreakdown
        title="Dart Fundamentals in 5 Steps"
        steps={[
          {
            title: "Variables store data",
            description: "Use 'var', 'final', or 'const' to create variables",
            icon: "📦",
            codeHint: "var name = 'Flutter';",
          },
          {
            title: "Types keep you safe",
            description:
              "Dart knows if something is text, numbers, or true/false",
            icon: "🛡️",
            codeHint: "String name = 'Flutter'; int age = 3;",
          },
          {
            title: "Functions do things",
            description: "Wrap code in functions to reuse it",
            icon: "⚙️",
            codeHint: "int add(int a, int b) => a + b;",
          },
          {
            title: "Classes create objects",
            description: "Blueprints for creating multiple similar things",
            icon: "🏗️",
            codeHint: "class Person { String name; }",
          },
          {
            title: "Null safety prevents crashes",
            description: "Dart ensures you handle missing data",
            icon: "🔒",
            codeHint: "String? nickname; // Can be null",
          },
        ]}
      />

      <LiveCodeEditor
        title="Dart Variables & Functions"
        code={`// Variables
var name = 'Flutter';         // Type inferred
String language = 'Dart';     // Explicit type
final version = 3.0;          // Can't change
const pi = 3.14159;           // Compile-time constant

// Functions
String greet(String name) {
  return 'Hello, $name!';
}

// Arrow syntax for one-liners
int add(int a, int b) => a + b;

// Named parameters for clarity
void printInfo({required String name, int age = 0}) {
  print('$name is $age years old');
}

// Using them
void main() {
  print(greet('Developer'));  // Hello, Developer!
  print(add(2, 3));           // 5
  printInfo(name: 'Alex');    // Alex is 0 years old
}`}
        expectedOutput={`Hello, Developer!
5
Alex is 0 years old`}
      />

      <KeyPointCallout
        icon="🔥"
        title="Hot Reload Magic"
        description="Change your code, press save, and see changes instantly—no restart needed. This makes learning Dart incredibly fast."
        variant="tip"
      />
    </div>
  );
}

function Lesson2() {
  return (
    <div className="space-y-8">
      <ExplainLikeFive
        concept="The Widget Tree"
        simpleExplanation="In Flutter, your whole app is a tree of Widgets stacked on top of each other. The top Widget is the 'parent' and it contains 'child' Widgets. It's like a family tree, but for your app's pieces!"
        analogy={{
          icon: "🌲",
          text: "Imagine a Christmas tree. The trunk is your app, the branches are containers (Row, Column), and the ornaments are visible things (Text, Button). To add a new ornament, you hang it on a branch!",
        }}
        keywords={[
          {
            word: "Widget",
            definition:
              "Everything in Flutter's UI. Immutable—you don't modify them, you rebuild them.",
            icon: "🧱",
          },
          {
            word: "Parent",
            definition: "A widget that contains other widgets",
            icon: "👆",
          },
          {
            word: "Child",
            definition: "A widget inside another widget",
            icon: "👇",
          },
          {
            word: "Composition",
            definition: "Building complex UIs by combining simple widgets",
            icon: "🔗",
          },
        ]}
      />

      <WidgetTreeAnimation
        title="Widget Tree Visualization"
        description="Watch how widgets nest inside each other to form your UI"
        tree={{
          name: "MaterialApp",
          color: "border-primary bg-primary/10",
          children: [
            {
              name: "Scaffold",
              color: "border-blue-400 bg-blue-400/10",
              children: [
                {
                  name: "Column",
                  color: "border-green-400 bg-green-400/10",
                  children: [
                    {
                      name: "Text",
                      color: "border-yellow-400 bg-yellow-400/10",
                    },
                    { name: "Button", color: "border-red-400 bg-red-400/10" },
                  ],
                },
              ],
            },
          ],
        }}
      />

      <LiveCodeEditor
        title="Building with Composition"
        description="Small widgets combine to create complex UIs. Each widget has one job."
        code={`class ProfileCard extends StatelessWidget {
  final String name;
  final String role;
  final String avatarUrl;
  
  const ProfileCard({
    required this.name,
    required this.role,
    required this.avatarUrl,
  });
  
  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: EdgeInsets.all(16),
        child: Row(
          children: [
            // Avatar on the left
            CircleAvatar(
              radius: 30,
              backgroundImage: NetworkImage(avatarUrl),
            ),
            SizedBox(width: 16),
            // Info on the right
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  name,
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                Text(
                  role,
                  style: TextStyle(color: Colors.grey),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}`}
      />

      <VisualComparison
        title="Stateless vs Stateful"
        items={[
          {
            label: "StatelessWidget",
            icon: "📖",
            color: "border-green-500/30 bg-green-500/5",
            points: [
              "Never changes after creation",
              "Simpler and faster",
              "Use for static content",
              "Just displays data",
            ],
          },
          {
            label: "StatefulWidget",
            icon: "⚡",
            color: "border-orange-500/30 bg-orange-500/5",
            points: [
              "Can change over time",
              "Has a State object",
              "Use for interactive content",
              "Responds to user input",
            ],
          },
        ]}
      />
    </div>
  );
}

function Lesson3() {
  return (
    <div className="space-y-8">
      <ExplainLikeFive
        concept="State Management"
        simpleExplanation="State is like a widget's memory. When you tap a button and a counter goes up, that number is 'state'. Flutter needs to know when state changes so it can redraw the screen with the new value."
        analogy={{
          icon: "🧠",
          text: "Think of state like a scoreboard at a game. When someone scores, the scoreboard updates. setState() is like pressing the 'update scoreboard' button—it tells everyone to look at the new score!",
        }}
        keywords={[
          {
            word: "State",
            definition:
              "Data that can change over time and affects what you see on screen",
            icon: "📊",
          },
          {
            word: "setState",
            definition:
              "A function that tells Flutter: 'Hey, data changed! Please redraw!'",
            icon: "🔄",
          },
          {
            word: "Rebuild",
            definition: "When Flutter redraws a widget with new data",
            icon: "🎨",
          },
        ]}
      />

      <StateFlowAnimation
        title="The setState() Lifecycle"
        steps={[
          { label: "User Tap", icon: "👆", description: "User interacts" },
          { label: "setState()", icon: "🔄", description: "Update data" },
          { label: "Rebuild", icon: "🏗️", description: "Redraw UI" },
          { label: "Display", icon: "✨", description: "Show changes" },
        ]}
      />

      <LiveCodeEditor
        title="Counter with setState"
        description="The classic first Flutter app—but now you understand WHY it works"
        code={`class CounterApp extends StatefulWidget {
  @override
  State<CounterApp> createState() => _CounterAppState();
}

class _CounterAppState extends State<CounterApp> {
  int count = 0;  // This is STATE
  
  void increment() {
    // setState tells Flutter: "count changed, please rebuild!"
    setState(() {
      count++;
    });
  }
  
  void decrement() {
    setState(() {
      if (count > 0) count--;
    });
  }
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Counter')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              '$count',
              style: TextStyle(fontSize: 72, fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 20),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                ElevatedButton(
                  onPressed: decrement,
                  child: Icon(Icons.remove),
                ),
                SizedBox(width: 20),
                ElevatedButton(
                  onPressed: increment,
                  child: Icon(Icons.add),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}`}
        expectedOutput="A counter with + and - buttons that updates in real-time"
      />

      <KeyPointCallout
        icon="⚠️"
        title="When to Use StatefulWidget"
        description="Only use StatefulWidget when your widget needs to change. If it just displays data, StatelessWidget is faster and simpler."
        variant="warning"
      />
    </div>
  );
}

function Lesson4() {
  return (
    <div className="space-y-8">
      <ExplainLikeFive
        concept="Flutter Layouts"
        simpleExplanation="Layouts decide WHERE things go on screen. Row puts things side by side. Column stacks them up and down. Stack puts them on top of each other. That's 90% of layouts!"
        analogy={{
          icon: "📦",
          text: "Think of arranging books on a shelf. Laying them flat is a Row. Stacking them is a Column. Putting one on top of another is a Stack. Simple!",
        }}
        keywords={[
          {
            word: "Row",
            definition: "Arranges children horizontally (left to right)",
            icon: "➡️",
          },
          {
            word: "Column",
            definition: "Arranges children vertically (top to bottom)",
            icon: "⬇️",
          },
          {
            word: "Stack",
            definition: "Overlays children on top of each other",
            icon: "📚",
          },
          {
            word: "Expanded",
            definition: "Makes a child fill available space",
            icon: "📐",
          },
        ]}
      />

      <div className="grid md:grid-cols-3 gap-4">
        <Card hover={false} className="p-4 text-center">
          <div className="text-3xl mb-2">➡️</div>
          <h4 className="font-semibold">Row</h4>
          <div className="flex gap-2 justify-center mt-3">
            <div className="w-12 h-12 bg-primary/20 rounded flex items-center justify-center">
              1
            </div>
            <div className="w-12 h-12 bg-primary/20 rounded flex items-center justify-center">
              2
            </div>
            <div className="w-12 h-12 bg-primary/20 rounded flex items-center justify-center">
              3
            </div>
          </div>
        </Card>
        <Card hover={false} className="p-4 text-center">
          <div className="text-3xl mb-2">⬇️</div>
          <h4 className="font-semibold">Column</h4>
          <div className="flex flex-col gap-2 items-center mt-3">
            <div className="w-12 h-8 bg-primary/20 rounded flex items-center justify-center">
              1
            </div>
            <div className="w-12 h-8 bg-primary/20 rounded flex items-center justify-center">
              2
            </div>
            <div className="w-12 h-8 bg-primary/20 rounded flex items-center justify-center">
              3
            </div>
          </div>
        </Card>
        <Card hover={false} className="p-4 text-center">
          <div className="text-3xl mb-2">📚</div>
          <h4 className="font-semibold">Stack</h4>
          <div className="relative h-24 mt-3 flex items-center justify-center">
            <div className="absolute w-16 h-16 bg-blue-500/30 rounded"></div>
            <div className="absolute w-12 h-12 bg-green-500/40 rounded translate-x-2 translate-y-2"></div>
            <div className="absolute w-8 h-8 bg-red-500/50 rounded translate-x-4 translate-y-4"></div>
          </div>
        </Card>
      </div>

      <LiveCodeEditor
        title="Common Layout Patterns"
        code={`// A typical app screen layout
class HomeScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Home'),
      ),
      body: Column(
        children: [
          // Header section
          Container(
            height: 200,
            color: Colors.blue,
            child: Center(child: Text('Header')),
          ),
          
          // Content area - fills remaining space
          Expanded(
            child: ListView(
              children: [
                // Cards in a row
                Padding(
                  padding: EdgeInsets.all(16),
                  child: Row(
                    children: [
                      Expanded(child: StatCard(label: 'Views', value: '1.2K')),
                      SizedBox(width: 16),
                      Expanded(child: StatCard(label: 'Likes', value: '340')),
                    ],
                  ),
                ),
                // More content...
              ],
            ),
          ),
        ],
      ),
      bottomNavigationBar: BottomNavigationBar(
        items: [
          BottomNavigationBarItem(icon: Icon(Icons.home), label: 'Home'),
          BottomNavigationBarItem(icon: Icon(Icons.search), label: 'Search'),
          BottomNavigationBarItem(icon: Icon(Icons.person), label: 'Profile'),
        ],
      ),
    );
  }
}`}
      />

      <KeyPointCallout
        icon="🎯"
        title="The Expanded Trick"
        description="Use Expanded to make a child fill leftover space. It's perfect for making flexible layouts that work on any screen size."
        variant="tip"
      />
    </div>
  );
}

function Lesson5({
  onGenerateChallenge,
  onRatingSubmit,
  showRating,
  ratingSubmitted,
}: {
  onGenerateChallenge: () => void;
  onRatingSubmit: (rating: number, feedback: string) => void;
  showRating: boolean;
  ratingSubmitted: boolean;
}) {
  const { user } = useAuth();
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);

  const handleChallengeClick = () => {
    if (!user) {
      setShowAuthPrompt(true);
    } else {
      onGenerateChallenge();
    }
  };

  return (
    <div className="space-y-8">
      <Card
        hover={false}
        className="p-8 text-center bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10 border-primary/30"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring" }}
        >
          <span className="text-6xl mb-4 block">🎉</span>
          <h2 className="text-2xl font-bold mb-2">Congratulations!</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            You&apos;ve learned the fundamentals of Flutter. Now it&apos;s time
            to build something real.
          </p>

          <ConceptChips
            title="Skills Unlocked"
            concepts={[
              {
                icon: "📦",
                label: "Widgets",
                definition: "Building blocks of Flutter UI",
              },
              {
                icon: "🎯",
                label: "Dart",
                definition: "The language powering Flutter",
              },
              {
                icon: "🌳",
                label: "Widget Tree",
                definition: "How widgets compose together",
              },
              {
                icon: "⚡",
                label: "State",
                definition: "Managing changing data",
              },
              {
                icon: "📐",
                label: "Layouts",
                definition: "Row, Column, Stack",
              },
            ]}
          />
        </motion.div>
      </Card>

      {/* Course Rating - show before challenge */}
      {showRating && !ratingSubmitted && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <CourseRating
            courseId="flutter-fundamentals"
            courseName="Flutter Fundamentals"
            userId={user?.id}
            onSubmit={onRatingSubmit}
            onSkip={() => onRatingSubmit(0, "")}
          />
        </motion.div>
      )}

      {/* Challenge section - show after rating */}
      {(ratingSubmitted || !showRating) && (
        <>
          {showAuthPrompt && !user ? (
            <Card hover={false} className="p-8 border-2 border-primary/50">
              <div className="text-center">
                <Lock className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Sign In to Continue</h3>
                <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                  Create an account to get your personalized challenge and track
                  your progress.
                </p>
                <Link href="/onboarding">
                  <Button glow size="lg" className="gap-2">
                    <Sparkles className="w-4 h-4" />
                    Get Started
                  </Button>
                </Link>
              </div>
            </Card>
          ) : (
            <Card hover={false} className="p-8">
              <div className="text-center">
                <Rocket className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">
                  Your Personalized Challenge
                </h3>
                <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                  Based on what you&apos;ve learned, I&apos;ll generate a unique
                  project challenge just for you.
                </p>
                <Button
                  onClick={handleChallengeClick}
                  glow
                  size="lg"
                  className="gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  Generate My Challenge
                </Button>
              </div>
            </Card>
          )}
        </>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        <KeyPointCallout
          icon="📚"
          title="Keep Learning"
          description="Check out Flutter Advanced for state management, animations, and architecture patterns."
          variant="note"
        />
        <KeyPointCallout
          icon="🔗"
          title="Join the Community"
          description="Share your challenge solution and see what others built!"
          variant="tip"
        />
      </div>
    </div>
  );
}

// ============================================
// MAIN COURSE PAGE
// ============================================
export default function FlutterFundamentalsPage() {
  const courseId = "flutter-fundamentals";
  const { getCourseProgress, setCourseProgress, profile } = useAppStore();
  const { user } = useAuth();

  const [currentLesson, setCurrentLesson] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<number[]>(() => {
    if (typeof window !== "undefined") {
      return getCourseProgress(courseId);
    }
    return [];
  });
  const [generatedChallenge, setGeneratedChallenge] = useState<null | {
    title: string;
    description: string;
    difficulty: string;
    steps: string[];
  }>(null);
  const [showRating, setShowRating] = useState(false);
  const [ratingSubmitted, setRatingSubmitted] = useState(false);

  // Course stats (would come from API in production)
  const stats = { rating: 4.9, students: 2400 };

  useEffect(() => {
    if (completedLessons.length > 0) {
      setCourseProgress(courseId, completedLessons);
    }
  }, [completedLessons, setCourseProgress]);

  const lesson = lessons[currentLesson];

  const goNext = () => {
    if (currentLesson < lessons.length - 1) {
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
    if (!completedLessons.includes(currentLesson)) {
      setCompletedLessons([...completedLessons, currentLesson]);
    }
  };

  const generateChallenge = async () => {
    try {
      const response = await fetch("/api/challenges/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId,
          userId: user?.id,
          userSurvey: profile,
        }),
      });
      const data = await response.json();
      if (data.challenge) {
        setGeneratedChallenge(data.challenge);
      }
    } catch (error) {
      console.error("Failed to generate challenge:", error);
    }
  };

  const handleRatingSubmit = (rating: number, feedback: string) => {
    console.log("Rating submitted:", rating, feedback);
    setRatingSubmitted(true);
    setShowRating(false);
  };

  // Render current lesson content
  const renderLessonContent = () => {
    switch (currentLesson) {
      case 0:
        return <Lesson0 />;
      case 1:
        return <Lesson1 />;
      case 2:
        return <Lesson2 />;
      case 3:
        return <Lesson3 />;
      case 4:
        return <Lesson4 />;
      case 5:
        return (
          <Lesson5
            onGenerateChallenge={generateChallenge}
            onRatingSubmit={handleRatingSubmit}
            showRating={currentLesson === 5}
            ratingSubmitted={ratingSubmitted}
          />
        );
      default:
        return <Lesson0 />;
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
            href="/learn"
            className="text-muted-foreground hover:text-foreground text-sm flex items-center gap-2 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Courses
          </Link>

          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-4">
              <span className="text-5xl">{lesson.icon}</span>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">
                  {lesson.title}
                </h1>
                <p className="text-primary font-playful">{lesson.subtitle}</p>
              </div>
            </div>

            <div className="text-right text-sm text-muted-foreground">
              <div className="flex items-center gap-1 justify-end">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="font-medium">{stats.rating}</span>
              </div>
              <div className="flex items-center gap-1 justify-end mt-1">
                <Users className="w-4 h-4" />
                <span>{stats.students.toLocaleString()} enrolled</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Progress */}
        <div className="mb-8">
          <ProgressMilestone
            current={completedLessons.length}
            total={lessons.length}
            milestones={[
              { at: 2, icon: "🎯", label: "Dart Basics" },
              { at: 4, icon: "⚡", label: "Interactive" },
              { at: 6, icon: "🚀", label: "Complete" },
            ]}
          />
        </div>

        {/* Lesson selector */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {lessons.map((l, i) => (
            <motion.button
              key={l.id}
              onClick={() => setCurrentLesson(i)}
              className={`px-4 py-2 rounded-full text-sm font-medium shrink-0 transition-all ${
                i === currentLesson
                  ? "bg-primary text-primary-foreground"
                  : completedLessons.includes(i)
                    ? "bg-primary/20 text-primary"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {l.icon} {l.title}
            </motion.button>
          ))}
        </div>

        {/* Lesson Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentLesson}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
          >
            {renderLessonContent()}
          </motion.div>
        </AnimatePresence>

        {/* Generated Challenge Display */}
        {generatedChallenge && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            <Card hover={false} className="p-6 border-2 border-primary">
              <div className="flex items-start gap-4">
                <span className="text-4xl">🎯</span>
                <div className="flex-1">
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded-full mb-2 inline-block ${
                      generatedChallenge.difficulty === "easy"
                        ? "bg-green-500/20 text-green-500"
                        : generatedChallenge.difficulty === "medium"
                          ? "bg-yellow-500/20 text-yellow-500"
                          : "bg-red-500/20 text-red-500"
                    }`}
                  >
                    {generatedChallenge.difficulty.toUpperCase()}
                  </span>
                  <h3 className="text-xl font-bold">
                    {generatedChallenge.title}
                  </h3>
                  <p className="text-muted-foreground mt-2">
                    {generatedChallenge.description}
                  </p>

                  <div className="mt-4 space-y-2">
                    {generatedChallenge.steps.map((step, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm">
                        <span className="w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center shrink-0">
                          {i + 1}
                        </span>
                        <span className="text-muted-foreground">{step}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3 mt-6">
                    <Link href="/challenges">
                      <Button glow>Start Challenge</Button>
                    </Link>
                    <Button variant="outline" onClick={generateChallenge}>
                      Generate Another
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-8 border-t border-border">
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
              currentLesson === lessons.length - 1 ? finishCourse : goNext
            }
            glow
            className="gap-2"
          >
            {currentLesson === lessons.length - 1 ? (
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
