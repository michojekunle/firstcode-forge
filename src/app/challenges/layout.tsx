import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Coding Challenges",
  description:
    "Practice your skills with AI-generated coding challenges. Submit solutions, view community submissions, and level up your programming abilities.",
  keywords: [
    "coding challenges",
    "programming practice",
    "coding exercises",
    "leetcode alternative",
    "coding practice",
  ],
  openGraph: {
    title: "Challenges | FirstCode Forge",
    description:
      "AI-generated coding challenges tailored to your learning path.",
    type: "website",
  },
};

export default function ChallengesLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
