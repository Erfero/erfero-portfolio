import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { localizedPath, buildAlternates } from "@/lib/seo";

const PRIORITIES: Record<string, number> = { "": 1, "/services": 0.8, "/realisations": 0.8 };

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/realisations", "/services", "/process", "/faq", "/contact"];

  return paths.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: localizedPath(locale, path),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: PRIORITIES[path] ?? 0.6,
      alternates: { languages: buildAlternates(locale, path).languages },
    }))
  );
}
