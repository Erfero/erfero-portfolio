export interface VideoEntry {
  id: string;
  /** Fichier dans /public/videos/ (mp4 vertical, voir README pour l'export iPhone -> web). */
  src: string;
  poster?: string;
  captionKey: string;
  accent: string;
}

// Point de départ avec 6 boutiques en exemple parmi tes 200+ boutiques et vidéos.
// Ajoute une entrée ici pour chaque vidéo supplémentaire (voir README > "Ajouter tes vidéos").
export const videos: VideoEntry[] = [
  { id: "cisseGlow", src: "/videos/cisse-glow.mp4", captionKey: "cisseGlow", accent: "#E8B4B8" },
  { id: "zylvea", src: "/videos/zylvea.mp4", captionKey: "zylvea", accent: "#A8C8D8" },
  { id: "cilvya", src: "/videos/cilvya.mp4", captionKey: "cilvya", accent: "#D8A8C8" },
  { id: "seshellBeauty", src: "/videos/seshell-beauty.mp4", captionKey: "seshellBeauty", accent: "#B8D8C8" },
  { id: "nexora", src: "/videos/nexora.mp4", captionKey: "nexora", accent: "#C8C8E8" },
  { id: "maisonNova", src: "/videos/maison-nova.mp4", captionKey: "maisonNova", accent: "#E8D8B8" },
];
