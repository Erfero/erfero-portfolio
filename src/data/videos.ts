import type { LocalizedText } from "./projects";

export interface VideoEntry {
  id: string;
  /** Fichier dans /public/videos/, ou URL Vercel Blob une fois uploadé via l'admin. */
  src: string;
  poster?: string;
  caption: LocalizedText;
  accent: string;
}

// Point de départ avec 6 boutiques en exemple parmi tes 200+ boutiques et vidéos.
// Ajoute une entrée ici pour chaque vidéo supplémentaire, ou utilise l'admin (/admin/media + /admin/projects).
export const videos: VideoEntry[] = [
  {
    id: "cisseGlow",
    src: "/videos/cisse-glow.mp4",
    caption: { fr: "Cissé Glow", en: "Cissé Glow" },
    accent: "#E8B4B8",
  },
  {
    id: "zylvea",
    src: "/videos/zylvea.mp4",
    caption: { fr: "Zylvea", en: "Zylvea" },
    accent: "#A8C8D8",
  },
  {
    id: "cilvya",
    src: "/videos/cilvya.mp4",
    caption: { fr: "Cilvya", en: "Cilvya" },
    accent: "#D8A8C8",
  },
  {
    id: "seshellBeauty",
    src: "/videos/seshell-beauty.mp4",
    caption: { fr: "Seshell Beauty Label", en: "Seshell Beauty Label" },
    accent: "#B8D8C8",
  },
  {
    id: "nexora",
    src: "/videos/nexora.mp4",
    caption: { fr: "Nexora", en: "Nexora" },
    accent: "#C8C8E8",
  },
  {
    id: "maisonNova",
    src: "/videos/maison-nova.mp4",
    caption: { fr: "Maison Nova", en: "Maison Nova" },
    accent: "#E8D8B8",
  },
];
