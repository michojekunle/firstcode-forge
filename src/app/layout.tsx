import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { AuthProvider } from "@/components/providers/auth-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "FirstCode Forge | Learn Coding from First Principles",
  description:
    "Master any programming language through first-principles thinking, immersive motion design animations, and AI-personalized coding challenges.",
  keywords: [
    "learn coding",
    "programming",
    "first principles",
    "coding education",
    "AI challenges",
    "flutter",
    "systems design",
  ],
  authors: [{ name: "FirstCode Forge" }],
  openGraph: {
    title: "FirstCode Forge | Learn Coding from First Principles",
    description:
      "Master any programming language through first-principles thinking and AI-personalized challenges.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "FirstCode Forge",
    description:
      "Learn coding from first principles with immersive motion design and AI challenges.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/logo.svg" />

        {/* Custom fonts via CSS */}
        <link rel="preconnect" href="https://fonts.bunny.net" />
        <link
          href="https://fonts.bunny.net/css?family=space-grotesk:300,400,500,600,700|inter:400,500,600,700|comic-neue:400,700"
          rel="stylesheet"
        />
        {/* Fontshare for premium fonts */}
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@200,300,400,500,600,700&f[]=cabinet-grotesk@100,200,300,400,500,700,800,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <AuthProvider>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
