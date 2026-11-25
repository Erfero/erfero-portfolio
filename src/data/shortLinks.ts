/**
 * Liens courts à envoyer aux clients. Les liens anglais redirigent vers la
 * version /en (voir src/proxy.ts) ; les liens français sont les adresses
 * normales du site, qui s'ouvrent toujours en français.
 */
export type ShortLink = {
  path: string;
  /** Destination réelle (pour les liens qui redirigent). */
  redirectTo?: string;
  label: { fr: string; en: string };
};

export const SHORT_LINKS: ShortLink[] = [
  { path: "", label: { fr: "Portfolio en français", en: "Portfolio in French" } },
  { path: "/cv", label: { fr: "CV en français", en: "Resume in French" } },
  { path: "/home", redirectTo: "/en", label: { fr: "Portfolio en anglais", en: "Portfolio in English" } },
  { path: "/resume", redirectTo: "/en/cv", label: { fr: "CV en anglais", en: "Resume in English" } },
];
