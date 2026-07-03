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

// Tes vraies vidéos de réalisations (uploadées dans /public/videos). Ajoute une
// entrée ici pour chaque nouvelle vidéo, ou utilise l'admin (/admin/videos).
export const videos: VideoEntry[] = [
  {
    id: "reel-01",
    src: "/videos/reel-01.mp4",
    caption: { fr: "Construction boutique — session #1", en: "Store build — session #1" },
    accent: "#E8B4B8",
  },
  {
    id: "reel-02",
    src: "/videos/reel-02.mp4",
    caption: { fr: "Construction boutique — session #2", en: "Store build — session #2" },
    accent: "#A8C8D8",
  },
  {
    id: "reel-03",
    src: "/videos/reel-03.mp4",
    caption: { fr: "Construction boutique — session #3", en: "Store build — session #3" },
    accent: "#D8A8C8",
  },
  {
    id: "reel-04",
    src: "/videos/reel-04.mp4",
    caption: { fr: "Construction boutique — session #4", en: "Store build — session #4" },
    accent: "#D8C8A8",
  },
  {
    id: "reel-05",
    src: "/videos/reel-05.mp4",
    caption: { fr: "Construction boutique — session #5", en: "Store build — session #5" },
    accent: "#B8D8C8",
  },
  {
    id: "reel-06",
    src: "/videos/reel-06.mp4",
    caption: { fr: "Construction boutique — session #6", en: "Store build — session #6" },
    accent: "#C8C8E8",
  },
  {
    id: "reel-07",
    src: "/videos/reel-07.mp4",
    caption: { fr: "Construction boutique — session #7", en: "Store build — session #7" },
    accent: "#E8D8B8",
  },
  {
    id: "reel-08",
    src: "/videos/reel-08.mp4",
    caption: { fr: "Construction boutique — session #8", en: "Store build — session #8" },
    accent: "#E0D8E8",
  },
  {
    id: "reel-09",
    src: "/videos/reel-09.mp4",
    caption: { fr: "Construction boutique — session #9", en: "Store build — session #9" },
    accent: "#E8DCC0",
  },
  {
    id: "reel-10",
    src: "/videos/reel-10.mp4",
    caption: { fr: "Construction boutique — session #10", en: "Store build — session #10" },
    accent: "#D0D8E0",
  },
  {
    id: "reel-11",
    src: "/videos/reel-11.mp4",
    caption: { fr: "Construction boutique — session #11", en: "Store build — session #11" },
    accent: "#E8B4B8",
  },
  {
    id: "reel-12",
    src: "/videos/reel-12.mp4",
    caption: { fr: "Construction boutique — session #12", en: "Store build — session #12" },
    accent: "#A8C8D8",
  },
  {
    id: "reel-13",
    src: "/videos/reel-13.mp4",
    caption: { fr: "Construction boutique — session #13", en: "Store build — session #13" },
    accent: "#D8A8C8",
  },
  {
    id: "reel-14",
    src: "/videos/reel-14.mp4",
    caption: { fr: "Construction boutique — session #14", en: "Store build — session #14" },
    accent: "#D8C8A8",
  },
  {
    id: "reel-15",
    src: "/videos/reel-15.mp4",
    caption: { fr: "Construction boutique — session #15", en: "Store build — session #15" },
    accent: "#B8D8C8",
  },
  {
    id: "reel-16",
    src: "/videos/reel-16.mp4",
    caption: { fr: "Construction boutique — session #16", en: "Store build — session #16" },
    accent: "#C8C8E8",
  },
  {
    id: "reel-17",
    src: "/videos/reel-17.mp4",
    caption: { fr: "Construction boutique — session #17", en: "Store build — session #17" },
    accent: "#E8D8B8",
  },
  {
    id: "reel-18",
    src: "/videos/reel-18.mp4",
    caption: { fr: "Construction boutique — session #18", en: "Store build — session #18" },
    accent: "#E0D8E8",
  },
  {
    id: "reel-19",
    src: "/videos/reel-19.mp4",
    caption: { fr: "Construction boutique — session #19", en: "Store build — session #19" },
    accent: "#E8DCC0",
  },
  {
    id: "reel-20",
    src: "/videos/reel-20.mp4",
    caption: { fr: "Construction boutique — session #20", en: "Store build — session #20" },
    accent: "#D0D8E0",
  },
  {
    id: "reel-21",
    src: "/videos/reel-21.mp4",
    caption: { fr: "Construction boutique — session #21", en: "Store build — session #21" },
    accent: "#E8C8D0",
  },
  {
    id: "reel-22",
    src: "/videos/reel-22.mp4",
    caption: { fr: "Construction boutique — session #22", en: "Store build — session #22" },
    accent: "#D0D8C8",
  },
  {
    id: "reel-23",
    src: "/videos/reel-23.mp4",
    caption: { fr: "Construction boutique — session #23", en: "Store build — session #23" },
    accent: "#C8D0D8",
  },
  {
    id: "reel-24",
    src: "/videos/reel-24.mp4",
    caption: { fr: "Construction boutique — session #24", en: "Store build — session #24" },
    accent: "#D8D0C8",
  },
  {
    id: "reel-25",
    src: "/videos/reel-25.mp4",
    caption: { fr: "Construction boutique — session #25", en: "Store build — session #25" },
    accent: "#D0C8D8",
  },
  {
    id: "reel-26",
    src: "/videos/reel-26.mp4",
    caption: { fr: "Construction boutique — session #26", en: "Store build — session #26" },
    accent: "#C8D8D0",
  },
  {
    id: "reel-27",
    src: "/videos/reel-27.mp4",
    caption: { fr: "Construction boutique — session #27", en: "Store build — session #27" },
    accent: "#D8C8C8",
  },
];
