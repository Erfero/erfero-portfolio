// Portfolio — URL canonique + alternates hreflang pour chaque page. Sans ça, Google voit les
// versions FR/EN comme deux pages indépendantes plutôt que comme des traductions l'une de l'autre
// — risque de duplicate content et de mauvais signal de langue pour les visiteurs internationaux.

import { routing } from "@/i18n/routing";

export const SITE_URL = "https://erfero-portfolio.vercel.app";

export function localizedPath(locale: string, path: string): string {
  return locale === routing.defaultLocale ? `${SITE_URL}${path}` : `${SITE_URL}/${locale}${path}`;
}

export function buildAlternates(locale: string, path: string) {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    languages[l] = localizedPath(l, path);
  }
  languages["x-default"] = localizedPath(routing.defaultLocale, path);

  return {
    canonical: localizedPath(locale, path),
    languages,
  };
}
