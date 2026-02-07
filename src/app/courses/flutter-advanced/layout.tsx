import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Flutter Advanced Course",
  description:
    "Go beyond the basics with Flutter Advanced. Master custom render objects, platform channels, advanced animations, and production-ready architecture patterns.",
  keywords: [
    "flutter advanced",
    "flutter architecture",
    "custom painters",
    "platform channels",
    "flutter animations",
    "production flutter",
    "flutter state management",
  ],
  openGraph: {
    title: "Flutter Advanced | FirstCode Forge",
    description:
      "Master advanced Flutter patterns including custom render objects, platform channels, and production architecture.",
    type: "website",
  },
};

export default function FlutterAdvancedLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
