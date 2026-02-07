import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "DSA Fundamentals Course",
  description:
    "Master Data Structures and Algorithms from first principles. Learn Big O notation, arrays, linked lists, trees, graphs, and essential sorting algorithms.",
  keywords: [
    "data structures",
    "algorithms",
    "dsa course",
    "big o notation",
    "leetcode prep",
    "coding interview",
    "arrays linked lists",
    "trees graphs",
  ],
  openGraph: {
    title: "DSA Fundamentals | FirstCode Forge",
    description:
      "Learn Data Structures and Algorithms from first principles with visual explanations and hands-on practice.",
    type: "website",
  },
};

export default function DSALayout({ children }: { children: ReactNode }) {
  return children;
}
