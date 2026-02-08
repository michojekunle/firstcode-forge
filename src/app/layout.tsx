import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { AuthProvider } from "@/components/providers/auth-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Space_Grotesk, Inter } from "next/font/google";

// Optimized font loading with next/font
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://firstcodeforge.vercel.app";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "FirstCode Forge | Learn Coding from First Principles",
    template: "%s | FirstCode Forge",
  },
  description:
    "Master programming through first-principles thinking, immersive animations, and AI-personalized coding challenges. Learn Flutter, DSA, and Systems Design.",
  keywords: [
    "learn coding",
    "programming courses",
    "first principles learning",
    "coding education",
    "AI coding challenges",
    "flutter tutorial",
    "systems design course",
    "data structures algorithms",
    "online programming",
    "interactive coding",
  ],
  authors: [{ name: "FirstCode Forge", url: BASE_URL }],
  creator: "FirstCode Forge",
  publisher: "FirstCode Forge",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "FirstCode Forge",
    title: "FirstCode Forge | Learn Coding from First Principles",
    description:
      "Master programming through first-principles thinking and AI-personalized challenges.",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "FirstCode Forge - Learn Coding from First Principles",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FirstCode Forge",
    description:
      "Learn coding from first principles with immersive motion design and AI challenges.",
    images: [`${BASE_URL}/og-image.png`],
    creator: "@firstcodeforge",
  },
  alternates: {
    canonical: BASE_URL,
  },
  category: "Education",
  manifest: "/manifest.json",
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "FirstCode Forge",
  description:
    "Learn programming from first principles with immersive motion design and AI-personalized challenges.",
  url: BASE_URL,
  logo: `${BASE_URL}/logo.svg`,
  sameAs: [],
  offers: {
    "@type": "Offer",
    category: "Online Courses",
    availability: "https://schema.org/InStock",
    itemOffered: [
      {
        "@type": "Course",
        name: "Flutter Fundamentals",
        description: "Master Flutter from first principles",
        provider: { "@type": "Organization", name: "FirstCode Forge" },
      },
      {
        "@type": "Course",
        name: "Flutter Advanced",
        description: "Advanced Flutter patterns and architecture",
        provider: { "@type": "Organization", name: "FirstCode Forge" },
      },
      {
        "@type": "Course",
        name: "DSA Fundamentals",
        description: "Data Structures and Algorithms from first principles",
        provider: { "@type": "Organization", name: "FirstCode Forge" },
      },
      {
        "@type": "Course",
        name: "Systems Design",
        description: "Design scalable systems",
        provider: { "@type": "Organization", name: "FirstCode Forge" },
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${inter.variable}`}
    >
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Preconnect to external resources */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="dns-prefetch" href="https://api.fontshare.com" />

        {/* Premium fonts */}
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap"
          rel="stylesheet"
        />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased font-sans">
        {/* Skip to main content for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg"
        >
          Skip to main content
        </a>

        <ThemeProvider>
          <AuthProvider>
            <Navbar />
            <main id="main-content" className="min-h-screen">
              {children}
            </main>
            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
