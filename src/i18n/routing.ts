import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["fr", "en"],
  defaultLocale: "fr",
  localePrefix: "as-needed",
  // Langue déterminée uniquement par l'adresse : « / » est toujours en
  // français, « /en » toujours en anglais (pas de redirection selon le
  // navigateur ou un cookie). Les liens partagés s'ouvrent donc toujours
  // dans la bonne langue, et le changement de langue peut être préchargé.
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
