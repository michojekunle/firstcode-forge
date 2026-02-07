import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Flutter Fundamentals Course",
  description:
    "Master Flutter from first principles. Build beautiful, cross-platform apps with hands-on lessons covering widgets, state management, and Dart syntax.",
  keywords: [
    "flutter course",
    "flutter tutorial",
    "learn flutter",
    "flutter fundamentals",
    "cross-platform development",
    "mobile app development",
    "dart programming",
  ],
  openGraph: {
    title: "Flutter Fundamentals | FirstCode Forge",
    description:
      "Master Flutter from first principles with interactive lessons and hands-on coding.",
    type: "website",
  },
};

export default function FlutterFundamentalsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
