import { MetadataRoute } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://firstcodeforge.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Static pages
  const staticPages = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${BASE_URL}/learn`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/challenges`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
  ];

  // Course pages
  const courses = [
    "flutter-fundamentals",
    "flutter-advanced",
    "dsa-fundamentals",
    "systems-design",
  ];

  const coursePages = courses.map((course) => ({
    url: `${BASE_URL}/courses/${course}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...coursePages];
}
