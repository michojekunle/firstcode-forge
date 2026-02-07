import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Systems Design Course",
  description:
    "Design scalable systems from first principles. Learn load balancing, distributed databases, caching strategies, and real-world architecture patterns.",
  keywords: [
    "systems design",
    "scalability",
    "distributed systems",
    "load balancing",
    "database design",
    "caching",
    "system architecture",
    "interview prep",
  ],
  openGraph: {
    title: "Systems Design | FirstCode Forge",
    description:
      "Learn to design scalable systems with visual diagrams and real-world case studies.",
    type: "website",
  },
};

export default function SystemsDesignLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
