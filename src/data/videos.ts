import type { LocalizedText } from "./projects";

export interface VideoEntry {
  id: string;
  /** Fichier dans /public/videos/, ou URL Vercel Blob une fois uploadé via l'admin. */
  src: string;
  poster?: string;
  caption: LocalizedText;
  accent: string;
  /** Musique de fond (le son original de la vidéo est toujours coupé).
   * Dépose un fichier .mp3 libre de droits dans /public/audio/ et renseigne
   * le chemin ici (ou depuis /admin/videos). Vide = pas de musique. */
  musicSrc?: string;
}

// Accroches vendeuses réutilisées en boucle sur les 27 vidéos (voir index
// ci-dessous) — pas de nom de boutique ici car ces clips ne sont pas
// rattachés à un projet précis (cf. resolveRelatedVideo).
const pitchLines: LocalizedText[] = [
  { fr: "De l'idée à la boutique en ligne", en: "From idea to online store" },
  { fr: "Chaque détail compte", en: "Every detail matters" },
  { fr: "Une boutique pensée pour vendre", en: "A store built to sell" },
  { fr: "Du design au premier client", en: "From design to first sale" },
  { fr: "L'envers du décor d'un lancement", en: "Behind the scenes of a launch" },
  { fr: "Construite pour convertir", en: "Built to convert" },
  { fr: "Une vitrine qui inspire confiance", en: "A storefront that builds trust" },
  { fr: "Prête à vendre en quelques jours", en: "Ready to sell in days" },
  { fr: "Le détail qui fait la différence", en: "The detail that makes the difference" },
  { fr: "Une expérience d'achat fluide", en: "A seamless shopping experience" },
];

const accents = [
  "#E8B4B8", "#A8C8D8", "#D8A8C8", "#D8C8A8", "#B8D8C8", "#C8C8E8",
  "#E8D8B8", "#E0D8E8", "#E8DCC0", "#D0D8E0", "#E8B4B8", "#A8C8D8",
  "#D8A8C8", "#D8C8A8", "#B8D8C8", "#C8C8E8", "#E8D8B8", "#E0D8E8",
  "#E8DCC0", "#D0D8E0", "#E8C8D0", "#D0D8C8", "#C8D0D8", "#D8D0C8",
  "#D0C8D8", "#C8D8D0", "#D8C8C8",
];

// 9 pistes qui tournent sur les 27 vidéos (3 vidéos par piste). Dépose les
// fichiers correspondants dans /public/audio/ — dès qu'un fichier existe à
// ce chemin, sa vidéo se met à jouer cette musique automatiquement, sans
// autre changement de code. Tant qu'un fichier est absent, la vidéo reste
// simplement muette (aucune erreur).
const musicTracks = Array.from(
  { length: 9 },
  (_, i) => `/audio/track-${String(i + 1).padStart(2, "0")}.mp3`
);

// Tes vraies vidéos de réalisations (uploadées dans /public/videos). Ajoute une
// entrée ici pour chaque nouvelle vidéo, ou utilise l'admin (/admin/videos).
export const videos: VideoEntry[] = accents.map((accent, i) => ({
  id: `reel-${String(i + 1).padStart(2, "0")}`,
  src: `/videos/reel-${String(i + 1).padStart(2, "0")}.mp4`,
  caption: pitchLines[i % pitchLines.length],
  accent,
  musicSrc: musicTracks[i % musicTracks.length],
}));
