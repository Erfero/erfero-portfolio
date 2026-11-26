import type { Project } from "@/data/projects";
import { getScreenshotUrl } from "./screenshot";

/** Sous-ensemble d'une boutique réellement affiché par les cartes : c'est tout
 * ce qui est envoyé au navigateur (les descriptions longues FR/EN, tags, etc.
 * restent côté serveur), ce qui allège nettement le poids de la page. */
export type ProjectCard = Pick<
  Project,
  "id" | "url" | "name" | "tagline" | "niche" | "accent" | "screenshot" | "thumb" | "thumbnailOverride" | "displayHost"
>;

export function toProjectCard(p: Project): ProjectCard {
  return {
    id: p.id,
    url: p.url,
    name: p.name,
    tagline: p.tagline,
    niche: p.niche,
    accent: p.accent,
    ...(p.screenshot ? { screenshot: p.screenshot } : {}),
    ...(p.thumb ? { thumb: p.thumb } : {}),
    ...(p.thumbnailOverride && !p.screenshot ? { thumbnailOverride: p.thumbnailOverride } : {}),
    ...(p.displayHost ? { displayHost: p.displayHost } : {}),
  };
}

/** Capture pleine page d'une boutique, de la meilleure source disponible :
 * capture locale vérifiée > capture uploadée/rafraîchie > capture live. */
export function projectShot(project: ProjectCard): string {
  return (
    project.screenshot ||
    project.thumbnailOverride ||
    getScreenshotUrl(project.url, 1000, 2600)
  );
}

/** Aperçu léger 16:10 (haut de la boutique, 900×563) : ce qu'une carte montre
 * au repos. La capture pleine page (≈3× plus lourde) ne se charge qu'au survol,
 * pour le défilement. Repli sur la capture complète si l'aperçu n'existe pas. */
export function projectTop(project: ProjectCard): string {
  const m = project.screenshot?.match(/^\/shots\/([^/]+)\.webp$/);
  return m ? `/shots/top/${m[1]}.webp` : projectShot(project);
}

/** Vignette légère (haut de page) pour les petits formats. */
export function projectThumb(project: ProjectCard): string {
  return (
    project.thumb ||
    project.screenshot ||
    project.thumbnailOverride ||
    getScreenshotUrl(project.url, 480, 600)
  );
}

/** Nom de domaine lisible (sans protocole ni "www."). Analysé comme texte
 * plutôt qu'avec l'API URL, qui convertirait un domaine accentué
 * ("noïly.com") en punycode illisible ("xn--noly-6pa.com"). */
export function projectHost(project: ProjectCard): string {
  return project.displayHost ?? project.url.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/[/?#].*$/, "");
}
