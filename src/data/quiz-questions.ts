import type { QuizQuestion } from "@/components/learning/ReturnQuizPopup";

// Quiz questions keyed by topic (matched to ReadMoreLink topic prop)
// Each topic has 1-3 questions; one is randomly selected when quiz triggers
export const quizQuestions: Record<string, QuizQuestion[]> = {
  // =============================================
  // FLUTTER FUNDAMENTALS
  // =============================================
  "flutter-intro": [
    {
      topic: "flutter-intro",
      question:
        "What rendering engine does Flutter use to draw directly to the screen?",
      options: ["WebView", "Skia / Impeller", "JavaScriptCore", "UIKit"],
      correctIndex: 1,
      explanation:
        "Flutter uses Skia (and the newer Impeller) to render directly to the GPU canvas, bypassing platform UI frameworks entirely.",
    },
    {
      topic: "flutter-intro",
      question: "What is the main advantage of Flutter over React Native?",
      options: [
        "Uses JavaScript",
        "No bridge — compiles to native ARM code",
        "Smaller app size",
        "Uses Swift under the hood",
      ],
      correctIndex: 1,
      explanation:
        "Flutter compiles Dart to native ARM code and renders directly with its own engine, avoiding the JavaScript bridge used by React Native.",
    },
  ],

  "dart-basics": [
    {
      topic: "dart-basics",
      question:
        "What keyword makes a variable immutable after assignment in Dart?",
      options: ["var", "final", "let", "mutable"],
      correctIndex: 1,
      explanation:
        "'final' means the variable can only be set once at runtime. 'const' is for compile-time constants.",
    },
    {
      topic: "dart-basics",
      question: "What is Dart's null safety feature?",
      options: [
        "Variables can hold null by default",
        "Variables are non-nullable by default",
        "Null doesn't exist in Dart",
        "Only strings can be null",
      ],
      correctIndex: 1,
      explanation:
        "Since Dart 2.12, variables are non-nullable unless you explicitly mark them with '?' (e.g., String?).",
    },
    {
      topic: "dart-basics",
      question: "What does the '=>' operator mean in Dart?",
      options: [
        "Greater than or equal to",
        "Arrow function (single expression shorthand)",
        "Type casting",
        "Null check",
      ],
      correctIndex: 1,
      explanation:
        "'=>' is shorthand for a function body with a single expression. 'int add(int a, int b) => a + b;' is equivalent to using return.",
    },
  ],

  "widget-tree": [
    {
      topic: "widget-tree",
      question:
        "In Flutter, what is the relationship between Widget, Element, and RenderObject?",
      options: [
        "They are all the same thing",
        "Widget is config, Element manages lifecycle, RenderObject handles layout/paint",
        "Widget handles paint, Element handles config",
        "RenderObject is the blueprint, Widget is the instance",
      ],
      correctIndex: 1,
      explanation:
        "Widgets are immutable configuration. Elements are instantiated widgets managing the lifecycle. RenderObjects handle layout, painting, and hit testing.",
    },
    {
      topic: "widget-tree",
      question: "What is BuildContext in Flutter?",
      options: [
        "A build configuration file",
        "A handle to the location of a widget in the widget tree",
        "The main application entry point",
        "A testing framework",
      ],
      correctIndex: 1,
      explanation:
        "BuildContext is each widget's Element — it represents the widget's location in the tree and allows looking up inherited widgets.",
    },
  ],

  "state-management": [
    {
      topic: "state-management",
      question: "What does setState() do in a StatefulWidget?",
      options: [
        "Saves state to disk",
        "Marks the widget as dirty and schedules a rebuild",
        "Sends state to the server",
        "Creates a new widget",
      ],
      correctIndex: 1,
      explanation:
        "setState() marks the State object as dirty, causing Flutter to call build() again and update the UI with new state values.",
    },
    {
      topic: "state-management",
      question: "What is InheritedWidget used for?",
      options: [
        "Class inheritance",
        "Passing data down the widget tree efficiently",
        "HTTP requests",
        "Database access",
      ],
      correctIndex: 1,
      explanation:
        "InheritedWidget lets you propagate data down the tree so descendants can access it via context, without passing it through every constructor.",
    },
  ],

  "flutter-layouts": [
    {
      topic: "flutter-layouts",
      question: "In Flutter's layout system, how do constraints flow?",
      options: [
        "Up from children to parents",
        "Down from parents to children",
        "Horizontally between siblings",
        "Randomly",
      ],
      correctIndex: 1,
      explanation:
        "Flutter's golden rule: Constraints go DOWN, sizes go UP, and parents set the position. Parents tell children their max/min size.",
    },
  ],

  // =============================================
  // DSA FUNDAMENTALS
  // =============================================
  "big-o": [
    {
      topic: "big-o",
      question:
        "What is the time complexity of accessing an element by index in an array?",
      options: ["O(n)", "O(1)", "O(log n)", "O(n²)"],
      correctIndex: 1,
      explanation:
        "Array access by index is O(1) because arrays store elements in contiguous memory, so the address can be calculated directly.",
    },
    {
      topic: "big-o",
      question: "What does O(n log n) typically represent?",
      options: [
        "Linear search",
        "Efficient sorting algorithms like merge sort",
        "Constant time operations",
        "Hash table lookups",
      ],
      correctIndex: 1,
      explanation:
        "O(n log n) is the optimal comparison-based sorting time. Merge sort and heap sort achieve this consistently.",
    },
  ],

  "arrays-strings": [
    {
      topic: "arrays-strings",
      question: "What is the two-pointer technique primarily used for?",
      options: [
        "Sorting arrays",
        "Solving problems on sorted arrays or linked lists efficiently",
        "Creating new arrays",
        "Memory allocation",
      ],
      correctIndex: 1,
      explanation:
        "Two pointers (often from both ends moving inward) can solve problems like pair sums, palindrome checks, and container problems in O(n) time.",
    },
    {
      topic: "arrays-strings",
      question: "What is the sliding window technique best for?",
      options: [
        "Finding the maximum element",
        "Processing contiguous subarrays/substrings efficiently",
        "Sorting arrays",
        "Binary search",
      ],
      correctIndex: 1,
      explanation:
        "Sliding window maintains a window of elements and slides it across, avoiding redundant work. Great for subarray sum, longest substring, etc.",
    },
  ],

  "linked-lists": [
    {
      topic: "linked-lists",
      question: "How can you detect a cycle in a linked list?",
      options: [
        "Sort the list first",
        "Use Floyd's fast/slow pointer algorithm",
        "Convert to an array",
        "Check if length is even",
      ],
      correctIndex: 1,
      explanation:
        "Floyd's algorithm uses two pointers: one moves 1 step, the other 2 steps. If they meet, there's a cycle. O(1) space, O(n) time.",
    },
    {
      topic: "linked-lists",
      question:
        "What is the time complexity of inserting at the head of a linked list?",
      options: ["O(n)", "O(1)", "O(log n)", "O(n²)"],
      correctIndex: 1,
      explanation:
        "Inserting at the head is O(1) — just create a new node, point it to the current head, and update the head pointer.",
    },
  ],

  "trees-graphs": [
    {
      topic: "trees-graphs",
      question: "What is the key difference between BFS and DFS?",
      options: [
        "BFS is always faster",
        "BFS explores level by level; DFS goes deep first",
        "DFS uses a queue; BFS uses a stack",
        "They produce the same traversal order",
      ],
      correctIndex: 1,
      explanation:
        "BFS uses a queue to explore neighbors first (level order). DFS uses a stack/recursion to go as deep as possible before backtracking.",
    },
    {
      topic: "trees-graphs",
      question: "What data structure does BFS use internally?",
      options: ["Stack", "Queue", "Heap", "Hash table"],
      correctIndex: 1,
      explanation:
        "BFS uses a queue (FIFO) to process nodes level by level, ensuring closer nodes are visited before farther ones.",
    },
  ],

  "sorting-searching": [
    {
      topic: "sorting-searching",
      question: "Why is merge sort preferred over quicksort for linked lists?",
      options: [
        "It's faster",
        "Linked lists don't support random access, so merge sort's sequential access is better",
        "It uses less code",
        "Quicksort doesn't work on linked lists",
      ],
      correctIndex: 1,
      explanation:
        "Merge sort works well with sequential access (ideal for linked lists). Quicksort needs random access for efficient partitioning.",
    },
  ],

  // =============================================
  // FLUTTER ADVANCED
  // =============================================
  "custom-render": [
    {
      topic: "custom-render",
      question: "When should you use CustomPainter instead of regular widgets?",
      options: [
        "Always, it's more efficient",
        "When you need pixel-level control for charts, games, or custom shapes",
        "For simple text displays",
        "For navigation",
      ],
      correctIndex: 1,
      explanation:
        "CustomPainter gives you a Canvas to draw anything — curves, gradients, complex shapes. Use it when widgets can't express your design.",
    },
  ],

  "platform-channels": [
    {
      topic: "platform-channels",
      question:
        "What is the difference between MethodChannel and EventChannel?",
      options: [
        "They are the same",
        "MethodChannel is for one-shot calls; EventChannel is for continuous streams",
        "MethodChannel is for iOS only",
        "EventChannel is deprecated",
      ],
      correctIndex: 1,
      explanation:
        "MethodChannel handles request-response calls. EventChannel creates a stream for continuous data (like sensor updates or location changes).",
    },
  ],

  "advanced-animations": [
    {
      topic: "advanced-animations",
      question: "What is a Hero animation in Flutter?",
      options: [
        "A loading spinner",
        "A shared element transition between routes",
        "A button animation",
        "A splash screen effect",
      ],
      correctIndex: 1,
      explanation:
        "Hero wraps a widget that 'flies' between routes during navigation, creating a smooth shared element transition effect.",
    },
  ],

  "architecture-patterns": [
    {
      topic: "architecture-patterns",
      question: "In Clean Architecture, what does the Repository pattern do?",
      options: [
        "Manages Git repositories",
        "Abstracts data sources so business logic doesn't care where data comes from",
        "Handles UI rendering",
        "Manages user authentication",
      ],
      correctIndex: 1,
      explanation:
        "The Repository pattern provides a clean API for data access. The domain layer depends on the repository interface, not the implementation.",
    },
  ],

  "flutter-performance": [
    {
      topic: "flutter-performance",
      question: "Why should you use 'const' constructors in Flutter widgets?",
      options: [
        "It's a style preference",
        "It prevents unnecessary rebuilds by reusing widget instances",
        "It makes the app larger",
        "It's required by Dart",
      ],
      correctIndex: 1,
      explanation:
        "Const constructors create compile-time constants. Flutter skips rebuilding const widgets because they're guaranteed unchanged.",
    },
  ],

  // =============================================
  // SYSTEMS DESIGN
  // =============================================
  "cap-theorem": [
    {
      topic: "cap-theorem",
      question: "What does the CAP theorem state?",
      options: [
        "You can have all three: Consistency, Availability, Partition tolerance",
        "You can only guarantee two of three: Consistency, Availability, Partition tolerance",
        "Systems must be consistent at all times",
        "Partitions never happen in practice",
      ],
      correctIndex: 1,
      explanation:
        "The CAP theorem states that during a network partition, you must choose between consistency and availability. You can't have both.",
    },
  ],

  scaling: [
    {
      topic: "scaling",
      question:
        "What is the main advantage of horizontal scaling over vertical scaling?",
      options: [
        "It's cheaper per server",
        "No theoretical limit — just add more machines",
        "It's simpler to implement",
        "It doesn't require load balancers",
      ],
      correctIndex: 1,
      explanation:
        "Vertical scaling hits hardware limits. Horizontal scaling adds more machines, which scales virtually without limit (but adds complexity).",
    },
  ],

  databases: [
    {
      topic: "databases",
      question: "When should you prefer NoSQL over SQL?",
      options: [
        "Always, it's faster",
        "When you need flexible schemas, horizontal scaling, or denormalized data",
        "When you need ACID transactions",
        "When data has complex relationships",
      ],
      correctIndex: 1,
      explanation:
        "NoSQL excels at flexible schemas, horizontal scaling, and high write throughput. SQL is better for complex queries and strong consistency.",
    },
  ],

  caching: [
    {
      topic: "caching",
      question: "What is the hardest problem in caching?",
      options: [
        "Choosing a cache",
        "Cache invalidation — knowing when cached data is stale",
        "Cache size",
        "Cache speed",
      ],
      correctIndex: 1,
      explanation:
        "Phil Karlton famously said there are only two hard things in CS: cache invalidation and naming things. Knowing when to evict stale data is genuinely difficult.",
    },
  ],

  "load-balancing": [
    {
      topic: "load-balancing",
      question: "What is the circuit breaker pattern used for?",
      options: [
        "Electrical safety",
        "Preventing cascading failures by stopping calls to a failing service",
        "Load balancing",
        "Data encryption",
      ],
      correctIndex: 1,
      explanation:
        "A circuit breaker monitors failures. After a threshold, it 'opens' and stops calling the failing service, preventing cascade failures.",
    },
  ],
};

// Helper: get a random question for a topic
export function getQuizQuestion(topic: string): QuizQuestion | null {
  const questions = quizQuestions[topic];
  if (!questions || questions.length === 0) return null;
  return questions[Math.floor(Math.random() * questions.length)];
}
