import type { LocalizedText } from "./projects";

export interface VideoEntry {
  id: string;
  /** Fichier dans /public/videos/, ou URL Supabase une fois uploadé via l'admin. */
  src: string;
  poster?: string;
  caption: LocalizedText;
  accent: string;
  /** Musique de fond (le son original de la vidéo est toujours coupé).
   * Dépose un fichier .mp3 libre de droits dans /public/audio/ et renseigne
   * le chemin ici (ou depuis /admin/videos). Vide = pas de musique. */
  musicSrc?: string;
}

/** Nombre de vidéos `reel-XX.mp4` présentes dans /public/videos (et de leurs
 * affiches dans /public/videos/posters). Chaque fichier a été vérifié unique :
 * ni copie exacte, ni même vidéo ré-exportée (empreintes visuelles comparées
 * sur 12 images par vidéo, le 25/11/2026). Pour en ajouter, voir
 * videos-a-ajouter/LISEZ-MOI.md. */
const REEL_COUNT = 48;

// Accroches génériques (ces clips ne sont pas rattachés à une boutique précise
// du portfolio), réparties en boucle sur les vidéos.
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
  { fr: "Pensée d'abord pour le mobile", en: "Designed mobile-first" },
  { fr: "La preuve sociale au bon endroit", en: "Social proof in the right place" },
  { fr: "Une marque, pas juste un thème", en: "A brand, not just a theme" },
  { fr: "Visite guidée d'une boutique livrée", en: "Walkthrough of a delivered store" },
  { fr: "Des offres qui donnent envie", en: "Offers that make people buy" },
  { fr: "Du premier écran au panier", en: "From first screen to checkout" },
];

const accents = [
  "#E8B4B8", "#A8C8D8", "#D8A8C8", "#D8C8A8", "#B8D8C8", "#C8C8E8",
  "#E8D8B8", "#E0D8E8", "#E8DCC0", "#D0D8E0", "#E8C8D0", "#D0D8C8",
  "#C8D0D8", "#D8D0C8", "#D0C8D8", "#C8D8D0",
];

// 9 pistes qui tournent sur les vidéos. Tant qu'un fichier est absent de
// /public/audio/, la vidéo concernée reste simplement muette (aucune erreur).
const musicTracks = Array.from(
  { length: 9 },
  (_, i) => `/audio/track-${String(i + 1).padStart(2, "0")}.mp3`
);

const pad = (n: number) => String(n).padStart(2, "0");

// Les plus récentes d'abord : elles montrent les boutiques les plus actuelles.
export const videos: VideoEntry[] = Array.from({ length: REEL_COUNT }, (_, i) => {
  const n = REEL_COUNT - i;
  return {
    id: `reel-${pad(n)}`,
    src: `/videos/reel-${pad(n)}.mp4`,
    poster: `/videos/posters/reel-${pad(n)}.jpg`,
    caption: pitchLines[(n - 1) % pitchLines.length],
    accent: accents[(n - 1) % accents.length],
    musicSrc: musicTracks[(n - 1) % musicTracks.length],
  };
});
