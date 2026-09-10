import type { MetadataRoute } from "next";
import { PUBLIC_LESSONS, absUrl } from "@/lib/mount";

const PUBLIC_PATHS = ["/", "/exam/2027", "/faq", "/legal", PUBLIC_LESSONS[0].path, PUBLIC_LESSONS[1].path] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return PUBLIC_PATHS.map((path) => ({
    url: absUrl(path),
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.startsWith("/learn/") ? 0.9 : 0.7,
  }));
}
