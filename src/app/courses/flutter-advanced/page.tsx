"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
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
    id: "rendering",
    title: "Custom Render Objects",
    subtitle: "Beyond Widgets",
    icon: "🎨",
    sections: [
      {
        type: "philosophy",
        title: "Going Deeper",
        content:
          "Widgets are the API. Behind them lies the RenderObject tree—the actual layout and painting engine. Understanding this separation is key to advanced Flutter.",
      },
      {
        type: "demo",
        title: "Custom Painter",
        code: `class ChartPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = Colors.blue
      ..strokeWidth = 2;
    
    // Draw a custom line chart
    final path = Path();
    path.moveTo(0, size.height);
    path.lineTo(size.width * 0.3, size.height * 0.4);
    path.lineTo(size.width * 0.6, size.height * 0.7);
    path.lineTo(size.width, size.height * 0.2);
    
    canvas.drawPath(path, paint);
  }
  
  @override
  bool shouldRepaint(covariant CustomPainter old) => false;
}`,
        explanation:
          "CustomPainter gives you a Canvas—the lowest level drawing API. You control every pixel, enabling charts, games, and custom UI that widgets can't express.",
      },
    ],
  },
  {
    id: "platform-channels",
    title: "Platform Channels",
    subtitle: "Native Integration",
    icon: "📱",
    sections: [
      {
        type: "concept",
        title: "The Bridge",
        content:
          "Flutter runs in its own rendering engine. To access device features (camera, sensors, native UI), you need Platform Channels—a message-passing system between Dart and native code.",
      },
      {
        type: "demo",
        title: "Method Channel",
        code: `// Dart side
class BatteryService {
  static const _channel = MethodChannel('com.app/battery');
  
  static Future<int> getBatteryLevel() async {
    final int level = await _channel.invokeMethod('getBatteryLevel');
    return level;
  }
}

// Usage
final battery = await BatteryService.getBatteryLevel();
print('Battery: \$battery%');`,
        explanation:
          "Method channels work like RPC. Dart sends a message, native code responds. This is how every Flutter plugin works under the hood.",
      },
    ],
  },
  {
    id: "animations",
    title: "Advanced Animations",
    subtitle: "60 FPS Magic",
    icon: "✨",
    sections: [
      {
        type: "philosophy",
        title: "Animation from First Principles",
        content:
          "Animation is just values changing over time. Flutter's AnimationController produces values from 0.0 to 1.0. Tween maps those to any range. Curves add easing. Combine them freely.",
      },
      {
        type: "demo",
        title: "Staggered Animation",
        code: `class StaggeredList extends StatefulWidget {
  @override
  State createState() => _StaggeredListState();
}

class _StaggeredListState extends State<StaggeredList>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  
  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: Duration(milliseconds: 1500),
      vsync: this,
    )..forward();
  }
  
  @override
  Widget build(BuildContext context) {
    return Column(
      children: List.generate(5, (i) {
        final delay = i * 0.1;
        return SlideTransition(
          position: Tween<Offset>(
            begin: Offset(1, 0),
            end: Offset.zero,
          ).animate(CurvedAnimation(
            parent: _controller,
            curve: Interval(delay, delay + 0.4, curve: Curves.easeOut),
          )),
          child: ListTile(title: Text('Item \$i')),
        );
      }),
    );
  }
}`,
        explanation:
          "Interval creates sub-animations within a single controller. Each item starts at a different time, creating the staggered effect—efficient and beautiful.",
      },
    ],
  },
  {
    id: "architecture",
    title: "Production Architecture",
    subtitle: "Scaling Flutter Apps",
    icon: "🏛️",
    sections: [
      {
        type: "concept",
        title: "Separation of Concerns",
        content:
          "UI, business logic, and data access should be separate layers. This isn't just theory—it makes testing, refactoring, and team collaboration possible.",
      },
      {
        type: "demo",
        title: "Repository Pattern",
        code: `// Abstract repository
abstract class UserRepository {
  Future<User> getUser(String id);
  Future<void> saveUser(User user);
}

// Implementation
class UserRepositoryImpl implements UserRepository {
  final ApiClient _api;
  final LocalCache _cache;
  
  UserRepositoryImpl(this._api, this._cache);
  
  @override
  Future<User> getUser(String id) async {
    // Check cache first
    final cached = await _cache.getUser(id);
    if (cached != null) return cached;
    
    // Fallback to API
    final user = await _api.fetchUser(id);
    await _cache.saveUser(user);
    return user;
  }
}`,
        explanation:
          "The repository abstracts data sources. Your UI doesn't know if data comes from cache, API, or database. This makes switching sources trivial.",
      },
    ],
  },
  {
    id: "complete",
    title: "Advanced Journey Complete",
    subtitle: "You're Ready",
    icon: "🚀",
    sections: [
      {
        type: "philosophy",
        title: "You've Mastered",
        content:
          "✅ Custom rendering with Canvas\n✅ Native platform integration\n✅ Advanced animation techniques\n✅ Production-grade architecture",
      },
      {
        type: "concept",
        title: "Keep Building",
        content:
          "The best Flutter developers learn by shipping. Take these patterns and build something real. Break things, fix them, and watch your skills compound.",
      },
    ],
  },
];

function CodeBlock({ code }: { code: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-muted/50 rounded-xl p-4 font-mono text-sm overflow-x-auto"
    >
      <div className="flex items-center gap-2 mb-3 text-xs text-muted-foreground">
        <Code2 className="w-4 h-4" />
        <span>dart</span>
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

export default function FlutterAdvancedPage() {
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
