import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://topbright.lk";
  const now = new Date();

  const routes = [
    { path: "", changeFrequency: "daily" as const, priority: 1.0 },
    { path: "/about", changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/timetable", changeFrequency: "weekly" as const, priority: 0.9 },
    { path: "/downloads", changeFrequency: "weekly" as const, priority: 0.9 },
    { path: "/videos", changeFrequency: "weekly" as const, priority: 0.8 },
    { path: "/contact", changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/login", changeFrequency: "monthly" as const, priority: 0.5 },
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
