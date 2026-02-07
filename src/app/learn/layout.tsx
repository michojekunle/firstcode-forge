import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Courses",
  description:
    "Explore our comprehensive coding courses. Learn Flutter, Data Structures & Algorithms, and Systems Design from first principles.",
  openGraph: {
    title: "Learn | FirstCode Forge",
    description:
      "Explore interactive coding courses with hands-on lessons and AI-personalized challenges.",
    type: "website",
  },
};

export default function LearnLayout({ children }: { children: ReactNode }) {
  return children;
}
