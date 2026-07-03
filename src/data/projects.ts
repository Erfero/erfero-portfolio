export type ProjectStatus = "live" | "password-protected" | "coming-soon";

export interface Project {
  id: string;
  url: string;
  status: ProjectStatus;
  accent: string;
  niche: string;
  // Nom du fichier vidéo vertical attendu dans /public/videos/ (voir README).
  videoSrc: string;
  year: number;
}

export const projects: Project[] = [
  {
    id: "cisseGlow",
    url: "https://cisseglow.store",
    status: "live",
    accent: "#E8B4B8",
    niche: "beauty-tech",
    videoSrc: "/videos/cisse-glow.mp4",
    year: 2025,
  },
  {
    id: "zylvea",
    url: "https://zylvea.com",
    status: "live",
    accent: "#A8C8D8",
    niche: "wellness",
    videoSrc: "/videos/zylvea.mp4",
    year: 2025,
  },
  {
    id: "cilvya",
    url: "https://cilvya.com",
    status: "live",
    accent: "#D8A8C8",
    niche: "beauty",
    videoSrc: "/videos/cilvya.mp4",
    year: 2024,
  },
  {
    id: "seshellBeauty",
    url: "https://seshell-beauty-label.myshopify.com",
    status: "password-protected",
    accent: "#B8D8C8",
    niche: "beauty",
    videoSrc: "/videos/seshell-beauty.mp4",
    year: 2024,
  },
  {
    id: "nexora",
    url: "https://nexora-20666.myshopify.com",
    status: "password-protected",
    accent: "#C8C8E8",
    niche: "lifestyle",
    videoSrc: "/videos/nexora.mp4",
    year: 2024,
  },
  {
    id: "maisonNova",
    url: "https://shop-off-7216.myshopify.com",
    status: "coming-soon",
    accent: "#E8D8B8",
    niche: "maison",
    videoSrc: "/videos/maison-nova.mp4",
    year: 2026,
  },
];