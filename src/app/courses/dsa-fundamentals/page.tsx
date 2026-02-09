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
// LESSON DATA - DSA Course
// ============================================
const lessons = [
  {
    id: "intro",
    title: "Why DSA Matters",
    subtitle: "The Foundation of Programming",
    icon: "🧠",
  },
  {
    id: "big-o",
    title: "Big O Notation",
    subtitle: "Measuring Efficiency",
    icon: "📊",
  },
  {
    id: "arrays-strings",
    title: "Arrays & Strings",
    subtitle: "The Building Blocks",
    icon: "📦",
  },
  {
    id: "linked-lists",
    title: "Linked Lists",
    subtitle: "Dynamic Data Structures",
    icon: "🔗",
  },
  {
    id: "trees-graphs",
    title: "Trees & Graphs",
    subtitle: "Hierarchical Data",
    icon: "🌳",
  },
  {
    id: "sorting-searching",
    title: "Sorting & Searching",
    subtitle: "Essential Algorithms",
    icon: "🔍",
  },
  {
    id: "challenge",
    title: "Your DSA Challenge",
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
        concept="Data Structures & Algorithms"
        simpleExplanation="DSA is like learning to organize your toys AND the best way to find them. Data Structures are the boxes and shelves (HOW you store things). Algorithms are the steps you take to find what you need (HOW you search)."
        analogy={{
          icon: "🏠",
          text: "Imagine your room. You could throw all toys in a pile (messy!). Or use labeled boxes by type—LEGO, cars, dolls. When you want a specific LEGO set, you go straight to the LEGO box. That's a data structure with an algorithm!",
        }}
        keywords={[
          {
            word: "Data Structure",
            definition:
              "A way to organize and store data so it can be accessed efficiently",
            icon: "📦",
          },
          {
            word: "Algorithm",
            definition: "Step-by-step instructions to solve a problem",
            icon: "📋",
          },
          {
            word: "Efficiency",
            definition: "How fast and memory-efficient your code runs",
            icon: "⚡",
          },
          {
            word: "Time Complexity",
            definition: "How runtime grows as input size increases",
            icon: "⏱️",
          },
        ]}
        technicalExplanation="DSA knowledge separates junior from senior developers. Companies like Google, Meta, and Amazon prioritize DSA skills because efficient code saves millions in computing costs and provides better user experiences."
      />

      <KeyPointCallout
        icon="💼"
        title="Career Impact"
        description="DSA is the #1 topic in technical interviews. Master it, and you unlock doors to top tech companies."
        variant="important"
      />

      <StateFlowAnimation
        title="The Problem-Solving Process"
        steps={[
          { label: "Understand", icon: "🧐", description: "Read the problem" },
          { label: "Plan", icon: "📝", description: "Choose data structure" },
          { label: "Code", icon: "💻", description: "Implement solution" },
          { label: "Optimize", icon: "⚡", description: "Improve efficiency" },
        ]}
      />

      <DeeperDive title="How Google Search Uses DSA">
        <p className="text-foreground">
          When you search Google, your query triggers algorithms running on{" "}
          <strong>millions of servers</strong>.
        </p>
        <p>
          The <strong>PageRank</strong> algorithm treats the web as a graph and
          ranks pages by how many quality pages link to them. Search
          autocomplete uses <strong>Trie</strong> data structures for O(k)
          prefix matching (where k is the length of what you typed).
        </p>
        <p>
          Even the order of search results uses{" "}
          <strong>sorting algorithms</strong> optimized for relevance scoring.
          Every millisecond saved = billions of queries served faster.
        </p>
      </DeeperDive>

      <RealWorldExample
        appName="Google Maps"
        concept="Graph algorithms in navigation"
        description="Google Maps uses Dijkstra's algorithm (and optimized variants like A*) to find shortest paths between locations. The road network is a weighted graph with millions of nodes."
        icon="🗺️"
      />

      <ReadMoreLink
        title="VisuAlgo — Visualize DSA"
        url="https://visualgo.net"
        topic="big-o"
        description="Interactive visualizations for every data structure and algorithm"
        icon="🎬"
      />
    </div>
  );
}

function Lesson1() {
  return (
    <div className="space-y-8">
      <ExplainLikeFive
        concept="Big O Notation"
        simpleExplanation="Big O tells you how slow your code gets when you have MORE stuff. If you're finding your name in a phone book, do you check every page (slow!) or jump to the right letter first (fast!)? Big O measures that difference."
        analogy={{
          icon: "📚",
          text: "Phone book search: checking every name = O(n). Opening to 'S' for 'Smith' = O(log n). The second way is WAY faster for big phone books!",
        }}
        keywords={[
          {
            word: "O(1)",
            definition: "Constant time - same speed regardless of size",
            icon: "⚡",
          },
          {
            word: "O(n)",
            definition: "Linear time - grows with input size",
            icon: "📈",
          },
          {
            word: "O(n²)",
            definition: "Quadratic time - very slow for large data",
            icon: "🐢",
          },
          {
            word: "O(log n)",
            definition: "Logarithmic - very fast, halves each step",
            icon: "🚀",
          },
        ]}
      />

      <Card
        hover={false}
        className="p-6 bg-gradient-to-br from-primary/5 to-transparent"
      >
        <h4 className="font-bold mb-4">Big O Comparison</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
            <span className="text-2xl font-bold text-green-500">O(1)</span>
            <p className="text-xs text-muted-foreground mt-1">Best</p>
            <p className="text-sm">Array access</p>
          </div>
          <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
            <span className="text-2xl font-bold text-blue-500">O(log n)</span>
            <p className="text-xs text-muted-foreground mt-1">Great</p>
            <p className="text-sm">Binary search</p>
          </div>
          <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
            <span className="text-2xl font-bold text-yellow-500">O(n)</span>
            <p className="text-xs text-muted-foreground mt-1">OK</p>
            <p className="text-sm">Linear search</p>
          </div>
          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
            <span className="text-2xl font-bold text-red-500">O(n²)</span>
            <p className="text-xs text-muted-foreground mt-1">Avoid</p>
            <p className="text-sm">Nested loops</p>
          </div>
        </div>
      </Card>

      <LiveCodeEditor
        title="Big O Examples"
        language="javascript"
        code={`// O(1) - Constant Time
function getFirst(arr) {
  return arr[0]; // Always 1 operation
}

// O(n) - Linear Time  
function findMax(arr) {
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) { // n operations
    if (arr[i] > max) max = arr[i];
  }
  return max;
}

// O(n²) - Quadratic Time
function findPairs(arr) {
  const pairs = [];
  for (let i = 0; i < arr.length; i++) {      // n
    for (let j = i + 1; j < arr.length; j++) { // × n
      pairs.push([arr[i], arr[j]]);
    }
  }
  return pairs; // n × n = n²
}

// O(log n) - Binary Search
function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1; // Halves search space each time!
}`}
      />

      <KeyPointCallout
        icon="🎯"
        title="Rule of Thumb"
        description="Drop constants and lower-order terms. O(2n) = O(n). O(n² + n) = O(n²). Focus on the dominant term."
        variant="tip"
      />

      <DeeperDive title="Space Complexity — The Forgotten Dimension">
        <p className="text-foreground">
          Time complexity gets all the attention, but{" "}
          <strong>space complexity</strong> matters too. How much extra memory
          does your algorithm use?
        </p>
        <p>
          <strong className="text-foreground">O(1) space:</strong> Swapping
          variables in-place. You use no extra memory.
          <br />
          <strong className="text-foreground">O(n) space:</strong> Creating a
          copy of an array. Memory scales with input.
          <br />
          <strong className="text-foreground">O(n²) space:</strong> 2D matrix
          for dynamic programming.
        </p>
        <p>
          <strong className="text-foreground">Trade-off:</strong> You can often
          trade space for time. Hash maps use O(n) space but give O(1) lookups,
          turning O(n²) algorithms into O(n).
        </p>
      </DeeperDive>

      <RealWorldExample
        appName="Netflix"
        concept="Algorithm efficiency at scale"
        description="Netflix's recommendation engine processes 100M+ user profiles. An O(n²) algorithm would take years. They use O(n log n) collaborative filtering to serve recommendations in milliseconds."
        icon="🎬"
      />

      <div className="grid gap-3 sm:grid-cols-2">
        <ReadMoreLink
          title="Big-O Cheat Sheet"
          url="https://www.bigocheatsheet.com"
          topic="big-o"
          description="Visual reference for all common complexities"
        />
        <ReadMoreLink
          title="Amortized Analysis Explained"
          url="https://medium.com/@satorusasozaki/amortized-time-in-the-time-complexity-of-an-algorithm-6966b4e44a7d"
          topic="big-o"
          description="When worst-case isn't the full story"
          icon="📊"
        />
      </div>
    </div>
  );
}

function Lesson2() {
  return (
    <div className="space-y-8">
      <ExplainLikeFive
        concept="Arrays & Strings"
        simpleExplanation="Arrays are like numbered lockers in a row. Each locker (index) holds one item. Strings are just arrays of letters! Because they're in order, you can instantly jump to locker #5—no searching required."
        analogy={{
          icon: "🗄️",
          text: "100 lockers in a hallway. Want locker #42? Walk straight there—O(1)! Want to find WHO is in locker #42? That's different—you'd need to search each one—O(n).",
        }}
        keywords={[
          {
            word: "Index",
            definition: "The position number in an array (starts at 0)",
            icon: "🔢",
          },
          {
            word: "Contiguous",
            definition: "Elements stored next to each other in memory",
            icon: "📍",
          },
          {
            word: "Two Pointers",
            definition: "Using two indices to traverse from both ends",
            icon: "👆👆",
          },
          {
            word: "Sliding Window",
            definition: "A moving range through the array",
            icon: "🪟",
          },
        ]}
      />

      <StepByStepBreakdown
        title="Common Array Operations"
        steps={[
          {
            title: "Access by index: O(1)",
            description: "arr[5] - instant lookup",
            icon: "⚡",
            codeHint: "const val = arr[5];",
          },
          {
            title: "Search: O(n)",
            description: "Find a value - check each element",
            icon: "🔍",
            codeHint: "arr.indexOf(target);",
          },
          {
            title: "Insert at end: O(1)",
            description: "Add to the back is fast",
            icon: "➕",
            codeHint: "arr.push(newItem);",
          },
          {
            title: "Insert at start: O(n)",
            description: "Shifts all elements right",
            icon: "🔄",
            codeHint: "arr.unshift(newItem);",
          },
        ]}
      />

      <LiveCodeEditor
        title="Two Pointer Technique"
        language="javascript"
        code={`// Problem: Is this string a palindrome?
// "racecar" → true, "hello" → false

function isPalindrome(str) {
  let left = 0;
  let right = str.length - 1;
  
  while (left < right) {
    if (str[left] !== str[right]) {
      return false; // Mismatch found
    }
    left++;   // Move left pointer right
    right--;  // Move right pointer left
  }
  
  return true; // All characters matched!
}

// Time: O(n) - each char checked once
// Space: O(1) - just two pointers

console.log(isPalindrome("racecar")); // true
console.log(isPalindrome("hello"));   // false`}
      />

      <KeyPointCallout
        icon="💡"
        title="When to Use Two Pointers"
        description="Sorted arrays, palindrome checks, finding pairs that sum to a target. Reduces O(n²) to O(n) in many cases!"
        variant="tip"
      />

      <DeeperDive title="Sliding Window — The Power Technique">
        <p className="text-foreground">
          The sliding window technique processes{" "}
          <strong>contiguous subarrays</strong> without recalculating everything
          from scratch.
        </p>
        <LiveCodeEditor
          title="Maximum Sum Subarray (Window of size k)"
          language="javascript"
          code={`function maxSumSubarray(arr, k) {
  let windowSum = 0;
  let maxSum = -Infinity;
  
  for (let i = 0; i < arr.length; i++) {
    windowSum += arr[i];       // Add right element
    
    if (i >= k) {
      windowSum -= arr[i - k]; // Remove left element
    }
    
    if (i >= k - 1) {
      maxSum = Math.max(maxSum, windowSum);
    }
  }
  return maxSum;
}

// [2, 1, 5, 1, 3, 2], k=3
// Windows: [2,1,5]=8, [1,5,1]=7, [5,1,3]=9, [1,3,2]=6
// Max = 9 — found in O(n), not O(n×k)!`}
        />
      </DeeperDive>

      <RealWorldExample
        appName="Spotify"
        concept="Array processing in audio streaming"
        description="Spotify's audio processing uses sliding windows over PCM sample arrays for real-time equalization, beat detection, and audio analysis. Efficient array operations make streaming smooth."
        icon="🎵"
      />

      <div className="grid gap-3 sm:grid-cols-2">
        <ReadMoreLink
          title="14 Array Patterns for Interviews"
          url="https://hackernoon.com/14-patterns-to-ace-any-coding-interview-question-c5bb3357f6ed"
          topic="arrays-strings"
          description="Master the most common problem patterns"
        />
        <ReadMoreLink
          title="LeetCode Array Problems"
          url="https://leetcode.com/tag/array/"
          topic="arrays-strings"
          description="Practice with real interview questions"
          icon="🎯"
        />
      </div>
    </div>
  );
}

function Lesson3() {
  return (
    <div className="space-y-8">
      <ExplainLikeFive
        concept="Linked Lists"
        simpleExplanation="A linked list is like a treasure hunt—each clue (node) tells you where the next clue is. Unlike arrays, elements aren't stored next to each other. Great for inserting/deleting, but slow for finding specific items."
        analogy={{
          icon: "🔗",
          text: "A train! Each car (node) is connected to the next. Adding a new car in the middle? Just reconnect the links. With lockers (arrays), you'd have to shift everyone down!",
        }}
        keywords={[
          {
            word: "Node",
            definition: "One element containing data and a pointer to the next",
            icon: "📦",
          },
          {
            word: "Head",
            definition: "The first node in the list",
            icon: "1️⃣",
          },
          {
            word: "Tail",
            definition: "The last node (points to null)",
            icon: "🔚",
          },
          {
            word: "Pointer",
            definition: "Reference to another node's location",
            icon: "➡️",
          },
        ]}
      />

      <VisualComparison
        title="Array vs Linked List"
        items={[
          {
            label: "Array",
            icon: "🗄️",
            color: "border-blue-500/30 bg-blue-500/5",
            points: [
              "Fast access by index O(1)",
              "Slow insert/delete O(n)",
              "Fixed or expensive resize",
              "Great for random access",
            ],
          },
          {
            label: "Linked List",
            icon: "🔗",
            color: "border-green-500/30 bg-green-500/5",
            points: [
              "Slow access by index O(n)",
              "Fast insert/delete O(1)*",
              "Dynamic size, no resize",
              "Great for queues/stacks",
            ],
          },
        ]}
      />

      <LiveCodeEditor
        title="Linked List Implementation"
        language="javascript"
        code={`class Node {
  constructor(value) {
    this.value = value;
    this.next = null; // Pointer to next node
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }
  
  // Add to end - O(n) to find end, O(1) to add
  append(value) {
    const newNode = new Node(value);
    
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    this.size++;
  }
  
  // Add to beginning - O(1)
  prepend(value) {
    const newNode = new Node(value);
    newNode.next = this.head;
    this.head = newNode;
    this.size++;
  }
}

// Usage
const list = new LinkedList();
list.append(1);  // 1 → null
list.append(2);  // 1 → 2 → null
list.prepend(0); // 0 → 1 → 2 → null`}
      />

      <KeyPointCallout
        icon="⚠️"
        title="The Catch"
        description="*O(1) insert/delete is only after you've found the position. Finding it is O(n). But if you already have the node reference, it's instant!"
        variant="warning"
      />

      <DeeperDive title="Reversing a Linked List — The Classic Interview Question">
        <p className="text-foreground">
          This is asked in <strong>90% of DSA interviews</strong>. Understanding
          it proves you grasp pointer manipulation.
        </p>
        <LiveCodeEditor
          title="Reverse Linked List (Iterative)"
          language="javascript"
          code={`function reverse(head) {
  let prev = null;
  let current = head;
  
  while (current) {
    const next = current.next; // Save next
    current.next = prev;       // Reverse pointer
    prev = current;            // Move prev forward
    current = next;            // Move current forward
  }
  
  return prev; // New head
}

// Before: 1 → 2 → 3 → null
// After:  3 → 2 → 1 → null
// Time: O(n), Space: O(1)`}
        />
        <p>
          <strong className="text-foreground">Cycle detection:</strong>{" "}
          Floyd&apos;s algorithm uses a fast pointer (2 steps) and slow pointer
          (1 step). If they meet, there&apos;s a cycle. This is O(n) time, O(1)
          space.
        </p>
      </DeeperDive>

      <RealWorldExample
        appName="Operating Systems"
        concept="Linked lists in memory management"
        description="Your OS uses linked lists for the free memory list. When you malloc() memory, the OS walks a linked list of free blocks to find one that fits. Deallocating adds the block back to the list."
        icon="🖥️"
      />

      <div className="grid gap-3 sm:grid-cols-2">
        <ReadMoreLink
          title="Linked List Visualizer"
          url="https://visualgo.net/en/list"
          topic="linked-lists"
          description="Watch operations animate step by step"
        />
        <ReadMoreLink
          title="When to Use Linked Lists"
          url="https://www.geeksforgeeks.org/linked-list-vs-array/"
          topic="linked-lists"
          description="Array vs Linked List decision guide"
          icon="⚖️"
        />
      </div>
    </div>
  );
}

function Lesson4() {
  return (
    <div className="space-y-8">
      <ExplainLikeFive
        concept="Trees & Graphs"
        simpleExplanation="A tree is like a family tree—one parent can have children, who have their own children. A graph is like a social network—anyone can connect to anyone, even forming circles!"
        analogy={{
          icon: "👨‍👩‍👧‍👦",
          text: "Family tree = Tree (one-way relationships, no cycles). Friend network = Graph (two-way, anyone can friend anyone, groups can all be connected).",
        }}
        keywords={[
          {
            word: "Binary Tree",
            definition: "Each node has at most 2 children (left and right)",
            icon: "🌲",
          },
          {
            word: "BST",
            definition: "Binary Search Tree - left < parent < right",
            icon: "🔍",
          },
          {
            word: "DFS",
            definition: "Depth-First Search - go deep before wide",
            icon: "⬇️",
          },
          {
            word: "BFS",
            definition: "Breadth-First Search - go wide before deep",
            icon: "➡️",
          },
        ]}
      />

      <Card hover={false} className="p-6">
        <h4 className="font-bold mb-4 text-center">Binary Search Tree</h4>
        <div className="flex justify-center">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
              8
            </div>
            <div className="flex justify-center gap-16 mt-4">
              <div className="text-center">
                <div className="w-10 h-10 mx-auto rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <div className="flex gap-4 mt-2">
                  <div className="w-8 h-8 rounded-full bg-blue-400 text-white flex items-center justify-center text-xs">
                    1
                  </div>
                  <div className="w-8 h-8 rounded-full bg-blue-400 text-white flex items-center justify-center text-xs">
                    6
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 mx-auto rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-sm">
                  10
                </div>
                <div className="flex gap-4 mt-2">
                  <div className="w-8 h-8 rounded-full bg-green-400 text-white flex items-center justify-center text-xs">
                    9
                  </div>
                  <div className="w-8 h-8 rounded-full bg-green-400 text-white flex items-center justify-center text-xs">
                    14
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="text-sm text-muted-foreground text-center mt-4">
          Left subtree &lt; root &lt; Right subtree
        </p>
      </Card>

      <LiveCodeEditor
        title="Tree Traversal"
        language="javascript"
        code={`class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

// DFS - Inorder (Left, Root, Right)
// For BST, this gives sorted order!
function inorder(node, result = []) {
  if (!node) return result;
  inorder(node.left, result);   // Go left
  result.push(node.val);        // Visit root
  inorder(node.right, result);  // Go right
  return result;
}

// BFS - Level Order
function levelOrder(root) {
  if (!root) return [];
  const result = [];
  const queue = [root];
  
  while (queue.length > 0) {
    const node = queue.shift();
    result.push(node.val);
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
  return result;
}

// BST Search - O(log n) average
function search(root, target) {
  if (!root) return false;
  if (root.val === target) return true;
  return target < root.val 
    ? search(root.left, target) 
    : search(root.right, target);
}`}
      />

      <DeeperDive title="BFS vs DFS — When to Use Which">
        <p className="text-foreground">
          Both traverse the same nodes but in very different orders. The right
          choice depends on the problem.
        </p>
        <VisualComparison
          title="BFS vs DFS"
          items={[
            {
              label: "BFS (Queue)",
              icon: "➡️",
              color: "border-blue-500/30 bg-blue-500/5",
              points: [
                "Level by level exploration",
                "Finds shortest path (unweighted)",
                "Uses more memory (queue)",
                "Best for: nearest neighbor, shortest path",
              ],
            },
            {
              label: "DFS (Stack)",
              icon: "⬇️",
              color: "border-green-500/30 bg-green-500/5",
              points: [
                "Goes as deep as possible first",
                "Uses less memory (call stack)",
                "Good for detecting cycles",
                "Best for: path existence, backtracking",
              ],
            },
          ]}
        />
        <p>
          <strong className="text-foreground">Real-world analogy:</strong> BFS
          is like exploring every room on floor 1 before going to floor 2. DFS
          is like following one hallway to the end before backtracking.
        </p>
      </DeeperDive>

      <RealWorldExample
        appName="File Systems"
        concept="Trees in your computer"
        description="Your file system is literally a tree. Folders are nodes, files are leaves. When you search for a file, your OS uses DFS to traverse the directory tree. 'Find' and 'ls -R' are tree traversals!"
        icon="📂"
      />

      <div className="grid gap-3 sm:grid-cols-2">
        <ReadMoreLink
          title="Tree Traversal Visualizer"
          url="https://visualgo.net/en/bst"
          topic="trees-graphs"
          description="Interactive BST with step-by-step traversal"
        />
        <ReadMoreLink
          title="Graph Algorithms Explained"
          url="https://www.freecodecamp.org/news/graph-algorithms-for-technical-interviews/"
          topic="trees-graphs"
          description="Complete guide with practice problems"
          icon="🌐"
        />
      </div>
    </div>
  );
}

function Lesson5() {
  return (
    <div className="space-y-8">
      <ExplainLikeFive
        concept="Sorting & Searching"
        simpleExplanation="Sorting is putting things in order (A-Z, 1-100). Searching is finding what you want. Key insight: searching SORTED data is WAY faster than unsorted!"
        analogy={{
          icon: "📖",
          text: "Dictionary: already sorted A-Z. To find 'zebra', you don't start at 'aardvark'. You jump to 'Z' section. That's binary search on sorted data!",
        }}
        keywords={[
          {
            word: "Bubble Sort",
            definition: "Simple but slow O(n²) - swap neighbors",
            icon: "🫧",
          },
          {
            word: "Merge Sort",
            definition: "Fast O(n log n) - divide and conquer",
            icon: "🔀",
          },
          {
            word: "Quick Sort",
            definition: "Fast O(n log n) avg - pick pivot, partition",
            icon: "⚡",
          },
          {
            word: "Binary Search",
            definition: "O(log n) - requires sorted array",
            icon: "🔍",
          },
        ]}
      />

      <Card
        hover={false}
        className="p-6 bg-gradient-to-br from-primary/5 to-transparent"
      >
        <h4 className="font-bold mb-4">Sorting Algorithm Comparison</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2">Algorithm</th>
                <th className="text-center py-2">Best</th>
                <th className="text-center py-2">Average</th>
                <th className="text-center py-2">Worst</th>
                <th className="text-center py-2">Space</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border/50">
                <td className="py-2">Bubble Sort</td>
                <td className="text-center text-green-500">O(n)</td>
                <td className="text-center text-red-500">O(n²)</td>
                <td className="text-center text-red-500">O(n²)</td>
                <td className="text-center text-green-500">O(1)</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2">Merge Sort</td>
                <td className="text-center text-yellow-500">O(n log n)</td>
                <td className="text-center text-yellow-500">O(n log n)</td>
                <td className="text-center text-yellow-500">O(n log n)</td>
                <td className="text-center text-yellow-500">O(n)</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2">Quick Sort</td>
                <td className="text-center text-yellow-500">O(n log n)</td>
                <td className="text-center text-yellow-500">O(n log n)</td>
                <td className="text-center text-red-500">O(n²)</td>
                <td className="text-center text-green-500">O(log n)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      <LiveCodeEditor
        title="Merge Sort & Binary Search"
        language="javascript"
        code={`// Merge Sort - O(n log n)[always]
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }
  
  return [...result, ...left.slice(i), ...right.slice(j)];
}

// Binary Search - O(log n)
function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  
  return -1; // Not found
}

// Usage
const sorted = mergeSort([5, 2, 8, 1, 9]);
console.log(sorted); // [1, 2, 5, 8, 9]
console.log(binarySearch(sorted, 8)); // 3`}
      />

      <KeyPointCallout
        icon="🎯"
        title="Interview Tip"
        description="Always ask: 'Is the input sorted?' If yes, think binary search. If you need to sort first, factor in O(n log n) sorting time."
        variant="tip"
      />

      <DeeperDive title="Beyond Comparison Sorts — O(n) is Possible!">
        <p className="text-foreground">
          Comparison-based sorts (merge, quick, heap) have a{" "}
          <strong>mathematical lower bound of O(n log n)</strong>. But
          non-comparison sorts can break this barrier!
        </p>
        <LiveCodeEditor
          title="Counting Sort — O(n + k)"
          language="javascript"
          code={`// When values are in a known range [0, k]
function countingSort(arr, max) {
  const count = new Array(max + 1).fill(0);
  
  // Count occurrences
  for (const num of arr) {
    count[num]++;
  }
  
  // Rebuild sorted array
  const result = [];
  for (let i = 0; i <= max; i++) {
    while (count[i] > 0) {
      result.push(i);
      count[i]--;
    }
  }
  return result;
}

// [4, 2, 2, 8, 3, 3, 1] → [1, 2, 2, 3, 3, 4, 8]
// Time: O(n + k) where k is the range
// Catch: only works for non-negative integers!`}
        />
        <p>
          <strong className="text-foreground">Stability:</strong> A stable sort
          preserves the relative order of equal elements. Merge sort is stable,
          quicksort is not. This matters when sorting objects by multiple
          fields.
        </p>
      </DeeperDive>

      <RealWorldExample
        appName="Database Engines"
        concept="Sorting in query execution"
        description="When you write ORDER BY in SQL, your database picks the best sort algorithm. PostgreSQL uses merge sort for disk-based sorting (stable, good I/O patterns) and quicksort for in-memory data."
        icon="🗄️"
      />

      <div className="grid gap-3 sm:grid-cols-2">
        <ReadMoreLink
          title="Sorting Algorithms Animated"
          url="https://www.toptal.com/developers/sorting-algorithms"
          topic="sorting-searching"
          description="See every sorting algorithm race side by side"
        />
        <ReadMoreLink
          title="When to Use Which Sort"
          url="https://www.geeksforgeeks.org/sorting-algorithms/"
          topic="sorting-searching"
          description="Complete comparison with use cases"
          icon="📊"
        />
      </div>
    </div>
  );
}

function Lesson6({
  onGenerateChallenge,
  onRatingSubmit,
  showRating,
  ratingSubmitted,
  userId,
}: {
  onGenerateChallenge: () => void;
  onRatingSubmit: (rating: number, feedback: string) => void;
  showRating: boolean;
  ratingSubmitted: boolean;
  userId?: string;
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
        className="p-8 text-center bg-gradient-to-br from-yellow-500/10 via-orange-500/10 to-red-500/10 border-primary/30"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring" }}
        >
          <span className="text-6xl mb-4 block">🏆</span>
          <h2 className="text-2xl font-bold mb-2">
            DSA Fundamentals Complete!
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            You now understand the building blocks of efficient code. Time to
            solve real problems!
          </p>

          <ConceptChips
            title="Concepts Mastered"
            concepts={[
              {
                icon: "📊",
                label: "Big O",
                definition: "Time and space complexity analysis",
              },
              {
                icon: "📦",
                label: "Arrays",
                definition: "Contiguous storage, O(1) access",
              },
              {
                icon: "🔗",
                label: "Linked Lists",
                definition: "Dynamic nodes with pointers",
              },
              {
                icon: "🌳",
                label: "Trees",
                definition: "Hierarchical data structures",
              },
              {
                icon: "🔍",
                label: "Binary Search",
                definition: "O(log n) sorted array search",
              },
              {
                icon: "🔀",
                label: "Merge Sort",
                definition: "O(n log n) divide and conquer",
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
            courseId="dsa-fundamentals"
            courseName="DSA Fundamentals"
            userId={userId}
            onSubmit={onRatingSubmit}
            onSkip={() => onRatingSubmit(0, "")}
          />
        </motion.div>
      )}

      {/* Challenge Section - show after rating */}
      {(ratingSubmitted || !showRating) && (
        <>
          {showAuthPrompt && !user ? (
            <Card hover={false} className="p-8 border-2 border-primary/50">
              <div className="text-center">
                <Lock className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Sign In to Continue</h3>
                <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                  Create an account to get your personalized DSA challenge.
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
                <h3 className="text-xl font-bold mb-2">Your DSA Challenge</h3>
                <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                  I&apos;ll generate a coding challenge that tests the concepts
                  you just learned.
                </p>
                <Button
                  onClick={handleChallengeClick}
                  glow
                  size="lg"
                  className="gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  Generate DSA Challenge
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
export default function DSAPage() {
  const courseId = "dsa-fundamentals";
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
  const [ratingSubmitted, setRatingSubmitted] = useState(false);
  const [showSurvey, setShowSurvey] = useState(false);
  const [generatingChallenge, setGeneratingChallenge] = useState(false);

  const stats = { rating: 4.9, students: 2150 };

  // Compute showRating
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
        return <Lesson5 />;
      case 6:
        return (
          <Lesson6
            onGenerateChallenge={() => setShowSurvey(true)}
            onRatingSubmit={(rating, feedback) => {
              console.log("Rating submitted:", rating, feedback);
              setRatingSubmitted(true);
            }}
            showRating={showRating}
            ratingSubmitted={ratingSubmitted}
            userId={user?.id}
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
          courseTitle="DSA Fundamentals"
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
              { at: 2, icon: "📊", label: "Big O" },
              { at: 4, icon: "🌳", label: "Trees" },
              { at: 7, icon: "🏆", label: "Complete" },
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
