import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const baseUrl = "https://erfero-portfolio.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/realisations"];

  return paths.flatMap((path) =>
    routing.locales.map((locale) => ({
      url:
        locale === routing.defaultLocale
          ? `${baseUrl}${path}`
          : `${baseUrl}/${locale}${path}`,
      lastModified: new Date(),
    }))
  );
}
