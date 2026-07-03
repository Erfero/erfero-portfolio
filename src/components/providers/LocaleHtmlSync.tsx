"use client";

import { useEffect } from "react";

/** Le root layout (partagé avec /admin, hors i18n) fixe lang="fr" par défaut.
 * Ce composant corrige l'attribut lang du <html> côté client une fois la
 * locale réelle connue, sans dupliquer la balise <html>. */
export default function LocaleHtmlSync({ locale }: { locale: string }) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
