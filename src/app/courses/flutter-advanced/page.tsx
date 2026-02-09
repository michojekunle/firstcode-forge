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
  Lock,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

// Import interactive components
import { LiveCodeEditor } from "@/components/learning/LiveCodeEditor";
import { StateFlowAnimation } from "@/components/learning/AnimatedConcept";
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
import { ReadMoreLink } from "@/components/learning/ReadMoreLink";
import { DeeperDive } from "@/components/learning/DeeperDive";
import { RealWorldExample } from "@/components/learning/RealWorldExample";
import { ReturnQuizPopup } from "@/components/learning/ReturnQuizPopup";
import { useReturnQuiz } from "@/hooks/useReturnQuiz";
import {
  PostCourseSurvey,
  type SurveyResult,
} from "@/components/learning/PostCourseSurvey";
import { ChallengeGeneratingLoader } from "@/components/learning/ChallengeGeneratingLoader";

// ============================================
// LESSON DATA - Flutter Advanced
// ============================================
const lessons = [
  {
    id: "rendering",
    title: "Custom Render Objects",
    subtitle: "Beyond Widgets",
    icon: "🎨",
  },
  {
    id: "platform-channels",
    title: "Platform Channels",
    subtitle: "Native Integration",
    icon: "📱",
  },
  {
    id: "animations",
    title: "Advanced Animations",
    subtitle: "60 FPS Magic",
    icon: "✨",
  },
  {
    id: "architecture",
    title: "Production Architecture",
    subtitle: "Scaling Flutter Apps",
    icon: "🏛️",
  },
  {
    id: "performance",
    title: "Performance Optimization",
    subtitle: "Ship Fast Apps",
    icon: "⚡",
  },
  {
    id: "challenge",
    title: "Your Advanced Challenge",
    subtitle: "Build Something Amazing",
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
        concept="Render Objects"
        simpleExplanation="Widgets are blueprints that say WHAT to build. RenderObjects are the actual workers that BUILD and PAINT on screen. It is like architect drawings vs construction crew."
        analogy={{
          icon: "🏗️",
          text: "Widgets = architect drawings (describe what you want). RenderObjects = construction workers (actually build it). You usually work with drawings, but sometimes you need to guide the workers directly for custom work.",
        }}
        keywords={[
          {
            word: "Widget",
            definition: "Immutable description of UI - the blueprint",
            icon: "📋",
          },
          {
            word: "Element",
            definition: "Widget instance in the tree - lifecycle manager",
            icon: "🔄",
          },
          {
            word: "RenderObject",
            definition: "Actual layout and painting - the worker",
            icon: "🎨",
          },
          {
            word: "CustomPainter",
            definition: "Direct canvas access for custom drawing",
            icon: "🖌️",
          },
        ]}
        technicalExplanation="Flutter uses a three-tree architecture: Widget tree (configuration), Element tree (lifecycle), and RenderObject tree (layout/paint). Understanding this enables advanced optimizations and custom rendering."
      />

      <StateFlowAnimation
        title="Flutter's Three Trees"
        steps={[
          { label: "Widget", icon: "📋", description: "Describe UI" },
          { label: "Element", icon: "🔄", description: "Manage lifecycle" },
          { label: "RenderObject", icon: "🎨", description: "Layout & Paint" },
          { label: "Screen", icon: "📱", description: "Visible pixels" },
        ]}
      />

      <LiveCodeEditor
        title="Custom Painter Example"
        language="dart"
        code={`class ChartPainter extends CustomPainter {
  final List<double> data;
  
  ChartPainter(this.data);
  
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = Colors.blue
      ..strokeWidth = 3
      ..style = PaintingStyle.stroke;
    
    final path = Path();
    path.moveTo(0, size.height);
    
    for (int i = 0; i < data.length; i++) {
      final x = (i / (data.length - 1)) * size.width;
      final y = size.height - (data[i] * size.height);
      path.lineTo(x, y);
    }
    
    canvas.drawPath(path, paint);
  }
  
  @override
  bool shouldRepaint(ChartPainter old) => old.data != data;
}

// Usage
CustomPaint(
  painter: ChartPainter([0.2, 0.5, 0.3, 0.8, 0.6]),
  size: Size(300, 200),
)`}
        description="CustomPainter gives you direct Canvas access - draw anything from charts to games"
      />

      <KeyPointCallout
        icon="💡"
        title="When to Use CustomPainter"
        description="Charts, games, custom shapes, complex animations that widgets cannot express. It is the escape hatch when widgets are not enough."
        variant="tip"
      />

      <DeeperDive title="The Flutter Rendering Pipeline">
        <p className="text-foreground">
          Flutter&apos;s rendering pipeline has 3 phases:{" "}
          <strong>Layout</strong> (calculate sizes),
          <strong> Paint</strong> (draw pixels), and{" "}
          <strong>Compositing</strong> (combine layers for the GPU).
        </p>
        <p>
          <code>CustomPainter</code> hooks into the Paint phase. For full
          control, you can create a custom <code>RenderObject</code> that
          controls all three phases. This is how Flutter&apos;s built-in widgets
          actually work under the hood.
        </p>
        <p>
          <strong className="text-foreground">Impeller</strong> is
          Flutter&apos;s new rendering engine replacing Skia. It pre-compiles
          shaders to eliminate jank from shader compilation.
        </p>
      </DeeperDive>

      <RealWorldExample
        appName="Superlist"
        concept="CustomPainter for rich canvas UI"
        description="Superlist uses CustomPainter extensively for its beautiful task visualization, drawing custom curves, gradients, and glassmorphism effects that standard widgets can't achieve."
        icon="✨"
      />

      <div className="grid gap-3 sm:grid-cols-2">
        <ReadMoreLink
          title="Flutter Rendering Deep Dive"
          url="https://docs.flutter.dev/resources/inside-flutter"
          topic="custom-render"
          description="How Flutter's rendering pipeline works internally"
        />
        <ReadMoreLink
          title="CustomPainter Cookbook"
          url="https://docs.flutter.dev/ui/widgets/custom-paint-and-canvas"
          topic="custom-render"
          description="Practical canvas drawing recipes"
          icon="🎨"
        />
      </div>
    </div>
  );
}

function Lesson1() {
  return (
    <div className="space-y-8">
      <ExplainLikeFive
        concept="Platform Channels"
        simpleExplanation="Flutter runs in its own world. To talk to the phone camera, GPS, or native features, you need a translator. Platform Channels are that translator - they pass messages between Dart and native code."
        analogy={{
          icon: "🌉",
          text: "Flutter is like an embassy in a foreign country. Platform Channels are the diplomats who can speak both languages and carry messages back and forth.",
        }}
        keywords={[
          {
            word: "MethodChannel",
            definition: "For request-response calls (like function calls)",
            icon: "📞",
          },
          {
            word: "EventChannel",
            definition: "For streams of data (like sensor updates)",
            icon: "📡",
          },
          {
            word: "BasicMessageChannel",
            definition: "For simple message passing",
            icon: "💬",
          },
          {
            word: "Codec",
            definition: "How data is encoded/decoded between Dart and native",
            icon: "🔐",
          },
        ]}
      />

      <VisualComparison
        title="Channel Types"
        items={[
          {
            label: "MethodChannel",
            icon: "📞",
            color: "border-blue-500/30 bg-blue-500/5",
            points: [
              "Request → Response pattern",
              "Like calling a function",
              "Best for one-time calls",
              "Example: Get battery level",
            ],
          },
          {
            label: "EventChannel",
            icon: "📡",
            color: "border-green-500/30 bg-green-500/5",
            points: [
              "Stream of events",
              "Native pushes to Dart",
              "Best for continuous data",
              "Example: Sensor updates",
            ],
          },
        ]}
      />

      <LiveCodeEditor
        title="MethodChannel Implementation"
        language="dart"
        code={`// Dart Side
class BatteryService {
  static const _channel = MethodChannel('com.app/battery');
  
  static Future<int> getBatteryLevel() async {
    try {
      final int level = await _channel.invokeMethod('getBatteryLevel');
      return level;
    } on PlatformException catch (e) {
      print('Failed: \${e.message}');
      return -1;
    }
  }
}

// iOS Side (Swift)
@UIApplicationMain
class AppDelegate: FlutterAppDelegate {
  override func application(_ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    
    let controller = window?.rootViewController as! FlutterViewController
    let channel = FlutterMethodChannel(
      name: "com.app/battery",
      binaryMessenger: controller.binaryMessenger
    )
    
    channel.setMethodCallHandler { [weak self] call, result in
      if call.method == "getBatteryLevel" {
        let level = UIDevice.current.batteryLevel * 100
        result(Int(level))
      } else {
        result(FlutterMethodNotImplemented)
      }
    }
    
    return super.application(application, didFinishLaunchingWithOptions: launchOptions)
  }
}`}
        description="MethodChannel enables Dart to call native code and receive responses"
      />

      <KeyPointCallout
        icon="📦"
        title="Use Existing Plugins First"
        description="Most native features have pub.dev plugins already. Only write platform channels when you need custom behavior or the plugin does not exist."
        variant="tip"
      />

      <DeeperDive title="EventChannel — Streaming Data from Native">
        <p className="text-foreground">
          <code>MethodChannel</code> is request-response. But what about{" "}
          <strong>continuous data</strong>
          like sensor readings, location updates, or Bluetooth streams?
        </p>
        <p>
          <code>EventChannel</code> creates a Dart <code>Stream</code> that
          receives events pushed from native code. Think of it as a pipe: native
          code pushes data in, Dart code listens on the other end.
        </p>
        <p>
          <strong className="text-foreground">Common uses:</strong>{" "}
          Accelerometer data, GPS location updates, push notification listeners,
          Bluetooth device scanning.
        </p>
      </DeeperDive>

      <RealWorldExample
        appName="Camera Plugin"
        concept="Platform channels for hardware access"
        description="Flutter's camera plugin uses MethodChannels for camera control (take photo, switch lens) and EventChannels for preview frames streaming. Each platform (iOS/Android) has its own native implementation."
        icon="📷"
      />

      <div className="grid gap-3 sm:grid-cols-2">
        <ReadMoreLink
          title="Platform Channels Guide"
          url="https://docs.flutter.dev/platform-integration/platform-channels"
          topic="platform-channels"
          description="Official guide with Kotlin, Swift, and Dart examples"
        />
        <ReadMoreLink
          title="Pigeon — Type-safe Channels"
          url="https://pub.dev/packages/pigeon"
          topic="platform-channels"
          description="Auto-generate platform channel code with type safety"
          icon="🐦"
        />
      </div>
    </div>
  );
}

function Lesson2() {
  return (
    <div className="space-y-8">
      <ExplainLikeFive
        concept="Advanced Animations"
        simpleExplanation="Animation is just numbers changing over time. AnimationController produces 0.0 to 1.0 over a duration. Tween maps that to any range. Curves add personality (bounce, ease). Combine them like LEGO blocks!"
        analogy={{
          icon: "🎬",
          text: "AnimationController is the movie director saying 'Action!' to 'Cut!' (0 to 1). Tween is the actor knowing their start and end positions. Curve is HOW they move between marks (walk, run, dance).",
        }}
        keywords={[
          {
            word: "AnimationController",
            definition: "Produces 0.0→1.0 over duration, controls playback",
            icon: "🎚️",
          },
          {
            word: "Tween",
            definition: "Maps 0-1 to any range (colors, sizes, positions)",
            icon: "🔄",
          },
          {
            word: "Curve",
            definition: "Easing function (linear, easeIn, bounce)",
            icon: "📈",
          },
          {
            word: "Interval",
            definition: "Sub-animation within parent for staggering",
            icon: "⏱️",
          },
        ]}
      />

      <StepByStepBreakdown
        title="Animation Composition"
        steps={[
          {
            title: "Create Controller",
            description: "Set duration, attach to ticker (vsync)",
            icon: "1️⃣",
            codeHint:
              "AnimationController(duration: Duration(ms: 500), vsync: this)",
          },
          {
            title: "Define Tween",
            description: "Map 0-1 to your actual values",
            icon: "2️⃣",
            codeHint: "Tween<double>(begin: 0, end: 100)",
          },
          {
            title: "Apply Curve",
            description: "Add easing for natural motion",
            icon: "3️⃣",
            codeHint:
              "CurvedAnimation(parent: ctrl, curve: Curves.easeOutBack)",
          },
          {
            title: "Animate Widget",
            description:
              "Use FadeTransition, ScaleTransition, or AnimatedBuilder",
            icon: "4️⃣",
            codeHint: "FadeTransition(opacity: animation, child: ...)",
          },
        ]}
      />

      <LiveCodeEditor
        title="Staggered List Animation"
        language="dart"
        code={`class StaggeredList extends StatefulWidget {
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
    )..forward(); // Start immediately
  }
  
  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }
  
  @override
  Widget build(BuildContext context) {
    return Column(
      children: List.generate(5, (index) {
        // Each item starts later (staggered)
        final delay = index * 0.1;
        
        return SlideTransition(
          position: Tween<Offset>(
            begin: Offset(1, 0), // Start off-screen right
            end: Offset.zero,    // End in place
          ).animate(CurvedAnimation(
            parent: _controller,
            // Interval creates sub-animation
            curve: Interval(
              delay,           // Start at delay
              delay + 0.4,     // End 0.4 later
              curve: Curves.easeOutCubic,
            ),
          )),
          child: FadeTransition(
            opacity: CurvedAnimation(
              parent: _controller,
              curve: Interval(delay, delay + 0.3),
            ),
            child: ListTile(title: Text('Item \$index')),
          ),
        );
      }),
    );
  }
}`}
        description="Interval creates sub-animations within a single controller for efficient staggered effects"
      />

      <KeyPointCallout
        icon="⚡"
        title="Performance Tip"
        description="Use const widgets where possible. AnimatedBuilder only rebuilds its builder function. SlideTransition and FadeTransition are optimized compositing layers."
        variant="tip"
      />

      <DeeperDive title="Hero Transitions — Shared Element Magic">
        <p className="text-foreground">
          Hero animations make a widget <strong>&quot;fly&quot;</strong> between
          routes during navigation. Wrap the same widget with <code>Hero</code>{" "}
          on both screens using the same <code>tag</code>.
        </p>
        <p>
          Flutter automatically calculates the start and end positions, sizes,
          and clips, then animates the transition. Combined with{" "}
          <code>CustomClipper</code>, you can create stunning page transitions
          that feel native and polished.
        </p>
        <p>
          <strong className="text-foreground">Physics-based animations</strong>{" "}
          use
          <code>SpringSimulation</code> and <code>FrictionSimulation</code> for
          natural-feeling motion. They respond to velocity, making
          swipe-to-dismiss feel real.
        </p>
      </DeeperDive>

      <RealWorldExample
        appName="Google Photos"
        concept="Hero animations in gallery"
        description="When you tap a photo thumbnail in Google Photos, it smoothly expands into full-screen using a Hero animation. The same image widget 'flies' between the grid and detail views."
        icon="🖼️"
      />

      <div className="grid gap-3 sm:grid-cols-2">
        <ReadMoreLink
          title="Animations Deep Dive"
          url="https://docs.flutter.dev/ui/animations"
          topic="advanced-animations"
          description="Official guide to Flutter's animation system"
        />
        <ReadMoreLink
          title="Rive — Professional Animations"
          url="https://rive.app"
          topic="advanced-animations"
          description="Design-tool-driven animations for Flutter"
          icon="🎬"
        />
      </div>
    </div>
  );
}

function Lesson3() {
  return (
    <div className="space-y-8">
      <ExplainLikeFive
        concept="Production Architecture"
        simpleExplanation="In big apps, you cannot put everything in one file. Architecture is how you organize code so it stays manageable. Separate WHAT users see (UI) from WHAT the app does (logic) from WHERE data comes from (data layer)."
        analogy={{
          icon: "🏢",
          text: "A restaurant: Waiters (UI) talk to customers. Kitchen (business logic) prepares food. Pantry/suppliers (data layer) provide ingredients. Each focuses on their job!",
        }}
        keywords={[
          {
            word: "Repository",
            definition: "Abstracts data sources (API, cache, database)",
            icon: "📚",
          },
          {
            word: "BLoC",
            definition: "Business Logic Component - separates UI from logic",
            icon: "🧱",
          },
          {
            word: "Dependency Injection",
            definition: "Pass dependencies in, do not create inside",
            icon: "💉",
          },
          {
            word: "Clean Architecture",
            definition:
              "Layers with dependency rules (inner cannot know outer)",
            icon: "🧅",
          },
        ]}
      />

      <StateFlowAnimation
        title="Clean Architecture Layers"
        steps={[
          { label: "UI", icon: "🖼️", description: "Widgets, pages" },
          { label: "State", icon: "🔄", description: "BLoC, Riverpod" },
          { label: "Domain", icon: "📋", description: "Use cases, entities" },
          { label: "Data", icon: "💾", description: "Repos, APIs, cache" },
        ]}
      />

      <LiveCodeEditor
        title="Repository Pattern"
        language="dart"
        code={`// Abstract repository - defines the contract
abstract class UserRepository {
  Future<User> getUser(String id);
  Future<void> saveUser(User user);
  Stream<User> watchUser(String id);
}

// Concrete implementation
class UserRepositoryImpl implements UserRepository {
  final ApiClient _api;
  final LocalDatabase _db;
  final MemoryCache _cache;
  
  UserRepositoryImpl(this._api, this._db, this._cache);
  
  @override
  Future<User> getUser(String id) async {
    // 1. Check in-memory cache first (fastest)
    final cached = _cache.get<User>('user_\$id');
    if (cached != null) return cached;
    
    // 2. Check local database
    final local = await _db.getUser(id);
    if (local != null) {
      _cache.set('user_\$id', local);
      return local;
    }
    
    // 3. Fetch from API (slowest)
    final remote = await _api.fetchUser(id);
    await _db.saveUser(remote);
    _cache.set('user_\$id', remote);
    return remote;
  }
  
  @override
  Stream<User> watchUser(String id) {
    return _db.watchUser(id);
  }
}

// Usage with DI
final userRepo = UserRepositoryImpl(
  ApiClient(),
  LocalDatabase(),
  MemoryCache(),
);`}
        description="Repository abstracts data sources - your UI does not know if data comes from cache, database, or API"
      />

      <KeyPointCallout
        icon="🎯"
        title="Why This Matters"
        description="Testing: mock the repository. Switching backends: change implementation, not UI. Caching: add without touching UI code. Architecture enables change."
        variant="important"
      />

      <DeeperDive title="Dependency Injection with get_it">
        <p className="text-foreground">
          Clean Architecture needs a way to <strong>wire up</strong>{" "}
          implementations without hard-coding dependencies. This is where{" "}
          <strong>Dependency Injection (DI)</strong> comes in.
        </p>
        <p>
          <code>get_it</code> is a simple service locator. Register interfaces
          at app startup, then retrieve them anywhere without passing through
          constructors.
        </p>
        <p>
          <strong className="text-foreground">Testing benefit:</strong> Swap
          real implementations for mocks in one line:{" "}
          <code>getIt.registerSingleton&lt;UserRepo&gt;(MockUserRepo())</code>.
          Your tests run without network, database, or real services.
        </p>
      </DeeperDive>

      <RealWorldExample
        appName="Very Good Ventures"
        concept="Clean Architecture in client projects"
        description="Google's recommended Flutter agency uses Clean Architecture with BLoC pattern for all client projects. Their open-source template (very_good_cli) demonstrates feature-first folder structure with clear layer separation."
        icon="✅"
      />

      <div className="grid gap-3 sm:grid-cols-2">
        <ReadMoreLink
          title="Flutter Clean Architecture"
          url="https://resocoder.com/flutter-clean-architecture-tdd/"
          topic="architecture-patterns"
          description="Step-by-step tutorial with TDD approach"
        />
        <ReadMoreLink
          title="BLoC Pattern Guide"
          url="https://bloclibrary.dev"
          topic="architecture-patterns"
          description="Official BLoC documentation and examples"
          icon="🧩"
        />
      </div>
    </div>
  );
}

function Lesson4() {
  return (
    <div className="space-y-8">
      <ExplainLikeFive
        concept="Performance Optimization"
        simpleExplanation="Slow apps lose users. Flutter is fast by default, but YOU can make it slow with bad patterns. Learn to build widgets that Flutter can optimize, not fight against."
        analogy={{
          icon: "🏎️",
          text: "Flutter is a race car. But if you fill the trunk with rocks (unnecessary rebuilds), leave the parking brake on (heavy computations on UI thread), it will be slow. Remove the obstacles!",
        }}
        keywords={[
          {
            word: "const",
            definition:
              "Tells Flutter this widget never changes - skip rebuild",
            icon: "🔒",
          },
          {
            word: "Keys",
            definition: "Help Flutter identify widgets during rebuilds",
            icon: "🔑",
          },
          {
            word: "Isolates",
            definition: "Separate threads for heavy computation",
            icon: "🧵",
          },
          {
            word: "DevTools",
            definition: "Profiler to find performance issues",
            icon: "🔍",
          },
        ]}
      />

      <StepByStepBreakdown
        title="Performance Checklist"
        steps={[
          {
            title: "Use const Constructors",
            description: "const widgets are cached and never rebuilt",
            icon: "✅",
            codeHint: "const Text('Hello') vs Text('Hello')",
          },
          {
            title: "Split Large Widgets",
            description: "Small widgets = small rebuilds",
            icon: "✅",
            codeHint: "Extract to StatelessWidget or const",
          },
          {
            title: "Avoid Heavy build()",
            description: "No computations in build method",
            icon: "✅",
            codeHint: "Move to initState, compute.run, or Isolate",
          },
          {
            title: "Use ListView.builder",
            description: "Only builds visible items",
            icon: "✅",
            codeHint: "ListView.builder vs ListView(children: [...])",
          },
        ]}
      />

      <LiveCodeEditor
        title="Isolate for Heavy Work"
        language="dart"
        code={`import 'package:flutter/foundation.dart';

// Heavy computation that would freeze UI
List<int> processLargeData(List<int> data) {
  // Simulate heavy work
  return data.map((n) => n * n).toList();
}

// Run in isolate - does NOT freeze UI
Future<void> handleHeavyWork() async {
  final largeData = List.generate(1000000, (i) => i);
  
  // compute() runs function in separate isolate
  final result = await compute(processLargeData, largeData);
  
  print('Processed \${result.length} items');
}

// For complex scenarios, use Isolate.spawn directly
void heavyTask(SendPort sendPort) {
  // This runs in separate isolate
  final result = expensiveCalculation();
  sendPort.send(result);
}

Future<void> runInIsolate() async {
  final receivePort = ReceivePort();
  await Isolate.spawn(heavyTask, receivePort.sendPort);
  
  final result = await receivePort.first;
  print('Got result: \$result');
}`}
        description="Isolates run on separate threads - keep your UI at 60 FPS"
      />

      <KeyPointCallout
        icon="🔍"
        title="Profile First"
        description="Do not guess - use Flutter DevTools performance tab. Find the actual bottleneck before optimizing."
        variant="warning"
      />

      <DeeperDive title="const Constructors — Free Performance">
        <p className="text-foreground">
          The <strong>single biggest performance win</strong> in Flutter: use{" "}
          <code>const</code> constructors.
        </p>
        <p>
          When a widget is <code>const</code>, Flutter creates it once at
          compile time and reuses the same instance forever. During rebuilds,
          Flutter sees the identical reference and{" "}
          <strong>skips the entire subtree</strong>.
        </p>
        <p>
          <strong className="text-foreground">RepaintBoundary</strong> isolates
          painting to a subtree. Without it, a single animation can repaint the
          entire screen. With it, only the animated part repaints. Use Flutter
          DevTools&apos; &quot;Highlight Repaints&quot; to visualize this.
        </p>
      </DeeperDive>

      <RealWorldExample
        appName="Reflectly"
        concept="Performance optimization at scale"
        description="Reflectly (journaling app with 4M+ installs) uses const constructors, RepaintBoundary on animations, and lazy loading to achieve buttery smooth scrolling through thousands of journal entries."
        icon="📓"
      />

      <div className="grid gap-3 sm:grid-cols-2">
        <ReadMoreLink
          title="Flutter Performance Best Practices"
          url="https://docs.flutter.dev/perf/best-practices"
          topic="flutter-performance"
          description="Official performance optimization guide"
        />
        <ReadMoreLink
          title="Flutter DevTools Guide"
          url="https://docs.flutter.dev/tools/devtools/overview"
          topic="flutter-performance"
          description="Master the profiling and debugging tools"
          icon="🛠️"
        />
      </div>
    </div>
  );
}

function Lesson5({
  onRatingSubmit,
  onGenerateChallenge,
  showRating,
  ratingSubmitted,
}: {
  onRatingSubmit: (rating: number, feedback: string) => void;
  onGenerateChallenge: () => void;
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
        className="p-8 text-center bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-rose-500/10 border-primary/30"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring" }}
        >
          <span className="text-6xl mb-4 block">🏆</span>
          <h2 className="text-2xl font-bold mb-2">
            Flutter Advanced Complete!
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            You have mastered the advanced Flutter concepts. You are ready to
            build production-grade apps!
          </p>

          <ConceptChips
            title="Skills Mastered"
            concepts={[
              {
                icon: "🎨",
                label: "CustomPainter",
                definition: "Direct canvas rendering",
              },
              {
                icon: "📱",
                label: "Platform Channels",
                definition: "Native code integration",
              },
              {
                icon: "✨",
                label: "Animations",
                definition: "Staggered, physics, curves",
              },
              {
                icon: "🏛️",
                label: "Architecture",
                definition: "Repository, BLoC, DI",
              },
              {
                icon: "⚡",
                label: "Performance",
                definition: "Isolates, const, profiling",
              },
            ]}
          />
        </motion.div>
      </Card>

      {/* Course Rating */}
      {showRating && !ratingSubmitted && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <CourseRating
            courseId="flutter-advanced"
            courseName="Flutter Advanced"
            userId={user?.id}
            onSubmit={onRatingSubmit}
            onSkip={() => onRatingSubmit(0, "")}
          />
        </motion.div>
      )}

      {/* Challenge Section */}
      {(ratingSubmitted || !showRating) && (
        <>
          {showAuthPrompt && !user ? (
            <Card hover={false} className="p-8 border-2 border-primary/50">
              <div className="text-center">
                <Lock className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Sign In to Continue</h3>
                <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                  Create an account to get your personalized advanced challenge.
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
                  Your Advanced Challenge
                </h3>
                <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                  Ready for a real challenge? Generate a personalized project.
                </p>
                <Button
                  onClick={handleChallengeClick}
                  glow
                  size="lg"
                  className="gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  Generate Challenge
                </Button>
              </div>
            </Card>
          )}
        </>
      )}
    </div>
  );
}

// ============================================
// MAIN PAGE
// ============================================
export default function FlutterAdvancedPage() {
  const courseId = "flutter-advanced";
  const { getCourseProgress, setCourseProgress, profile } = useAppStore();
  const { user } = useAuth();

  const [currentLesson, setCurrentLesson] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<number[]>(() => {
    if (typeof window !== "undefined") {
      return getCourseProgress(courseId);
    }
    return [];
  });
  const [ratingSubmitted, setRatingSubmitted] = useState(false);
  const [generatedChallenge, setGeneratedChallenge] = useState<null | {
    title: string;
    description: string;
    difficulty: string;
    steps: string[];
  }>(null);
  const [showSurvey, setShowSurvey] = useState(false);
  const [generatingChallenge, setGeneratingChallenge] = useState(false);

  // Course stats
  const stats = { rating: 4.8, students: 1200 };

  // Persist progress
  useEffect(() => {
    if (completedLessons.length > 0) {
      setCourseProgress(courseId, completedLessons);
    }
  }, [completedLessons, setCourseProgress]);

  // Compute showRating directly instead of using useEffect
  const showRating = currentLesson === lessons.length - 1 && !ratingSubmitted;

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

  const handleRatingSubmit = (rating: number, feedback: string) => {
    console.log("Rating submitted:", rating, feedback);
    setRatingSubmitted(true);
  };

  const generateChallenge = async (surveyData?: SurveyResult) => {
    setGeneratingChallenge(true);
    try {
      const response = await fetch("/api/challenges/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId,
          userId: user?.id,
          userName:
            user?.user_metadata?.full_name ||
            user?.user_metadata?.name ||
            "Anonymous",
          userAvatar: user?.user_metadata?.avatar_url || null,
          userSurvey: surveyData || profile,
        }),
      });
      const data = await response.json();
      if (data.challenge) {
        setGeneratedChallenge(data.challenge);
      }
    } catch (error) {
      console.error("Failed to generate challenge:", error);
    } finally {
      setGeneratingChallenge(false);
    }
  };

  const handleSurveyComplete = (result: SurveyResult) => {
    setShowSurvey(false);
    generateChallenge(result);
  };

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
            onRatingSubmit={handleRatingSubmit}
            onGenerateChallenge={() => setShowSurvey(true)}
            showRating={showRating}
            ratingSubmitted={ratingSubmitted}
          />
        );
      default:
        return <Lesson0 />;
    }
  };

  // Return quiz popup integration
  const {
    quizQuestion,
    isVisible: quizVisible,
    dismiss: dismissQuiz,
    complete: completeQuiz,
  } = useReturnQuiz();

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      {/* Return Quiz Popup */}
      {quizVisible && quizQuestion && (
        <ReturnQuizPopup
          question={quizQuestion}
          onDismiss={dismissQuiz}
          onComplete={completeQuiz}
        />
      )}

      {/* PostCourseSurvey Modal */}
      {showSurvey && (
        <PostCourseSurvey
          courseTitle="Flutter Advanced"
          onComplete={handleSurveyComplete}
          onDismiss={() => {
            setShowSurvey(false);
            generateChallenge();
          }}
        />
      )}
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
              { at: 2, icon: "📱", label: "Platform" },
              { at: 4, icon: "🏛️", label: "Architecture" },
              { at: 6, icon: "🏆", label: "Complete" },
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

        {/* Content */}
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

        {/* Generated Challenge */}
        {/* Challenge Generating Loader */}
        {generatingChallenge && <ChallengeGeneratingLoader />}

        {generatedChallenge && !generatingChallenge && (
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
                    <Button
                      variant="outline"
                      onClick={() => generateChallenge()}
                    >
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
