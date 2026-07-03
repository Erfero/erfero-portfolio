import type { LocalizedText } from "./projects";

export interface VideoEntry {
  id: string;
  /** Fichier dans /public/videos/, ou URL Vercel Blob une fois uploadé via l'admin. */
  src: string;
  poster?: string;
  caption: LocalizedText;
  accent: string;
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
];
