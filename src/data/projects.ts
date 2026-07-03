export type ProjectStatus = "live" | "password-protected" | "coming-soon";

export interface LocalizedText {
  fr: string;
  en: string;
}

export interface Project {
  id: string;
  url: string;
  status: ProjectStatus;
  accent: string;
  niche: string;
  videoSrc: string;
  year: number;
  name: LocalizedText;
  tagline: LocalizedText;
  description: LocalizedText;
  tags: { fr: string[]; en: string[] };
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
    name: { fr: "Cissé Glow", en: "Cissé Glow" },
    tagline: {
      fr: "Beauté & high-tech skincare",
      en: "Beauty & skincare tech",
    },
    description: {
      fr: "Boutique dédiée aux appareils de soin de la peau (épilation IPL, diagnostic de peau, massage oculaire). Design minimaliste et élégant pensé pour inspirer confiance sur des produits techniques.",
      en: "A store dedicated to skincare devices (IPL hair removal, skin diagnostics, eye massage). A minimal, elegant design built to build trust around technical products.",
    },
    tags: {
      fr: ["Shopify", "Liquid", "CRO", "Beauté"],
      en: ["Shopify", "Liquid", "CRO", "Beauty"],
    },
  },
  {
    id: "zylvea",
    url: "https://zylvea.com",
    status: "live",
    accent: "#A8C8D8",
    niche: "wellness",
    videoSrc: "/videos/zylvea.mp4",
    year: 2025,
    name: { fr: "Zylvea", en: "Zylvea" },
    tagline: {
      fr: "Wellness & confort oculaire",
      en: "Wellness & eye comfort",
    },
    description: {
      fr: "Lancement d'un appareil chauffant pour les yeux avec luminothérapie. Tunnel de vente construit autour de la preuve sociale et d'une expérience mobile ultra fluide.",
      en: "Launch of a heated eye device with light therapy. A sales funnel built around social proof and a seamless mobile experience.",
    },
    tags: {
      fr: ["Shopify", "CRO", "Landing page", "Trust"],
      en: ["Shopify", "CRO", "Landing page", "Trust"],
    },
  },
  {
    id: "cilvya",
    url: "https://cilvya.com",
    status: "live",
    accent: "#D8A8C8",
    niche: "beauty",
    videoSrc: "/videos/cilvya.mp4",
    year: 2024,
    name: { fr: "Cilvya", en: "Cilvya" },
    tagline: { fr: "Beauté magnétique", en: "Magnetic beauty" },
    description: {
      fr: "Boutique dédiée à des faux-cils magnétiques réutilisables. Storytelling produit clair et parcours d'achat pensé pour les ventes impulsives.",
      en: "A store dedicated to reusable magnetic eyelashes. Clear product storytelling and a purchase flow built for impulse buys.",
    },
    tags: {
      fr: ["Shopify", "E-commerce", "Storytelling"],
      en: ["Shopify", "E-commerce", "Storytelling"],
    },
  },
  {
    id: "seshellBeauty",
    url: "https://seshell-beauty-label.myshopify.com",
    status: "password-protected",
    accent: "#B8D8C8",
    niche: "beauty",
    videoSrc: "/videos/seshell-beauty.mp4",
    year: 2024,
    name: { fr: "Seshell Beauty Label", en: "Seshell Beauty Label" },
    tagline: {
      fr: "Marque de beauté sur-mesure",
      en: "Custom beauty brand",
    },
    description: {
      fr: "Création d'une identité de boutique beauté haut de gamme, actuellement en accès privé pour le client. Le processus de création est visible dans mes vidéos de réalisations.",
      en: "Design of a premium beauty store identity, currently under private client access. The build process is documented in my video showcase.",
    },
    tags: {
      fr: ["Shopify", "Branding", "Beauté"],
      en: ["Shopify", "Branding", "Beauty"],
    },
  },
  {
    id: "nexora",
    url: "https://nexora-20666.myshopify.com",
    status: "password-protected",
    accent: "#C8C8E8",
    niche: "lifestyle",
    videoSrc: "/videos/nexora.mp4",
    year: 2024,
    name: { fr: "Nexora", en: "Nexora" },
    tagline: { fr: "Boutique lifestyle", en: "Lifestyle store" },
    description: {
      fr: "Conception d'une boutique lifestyle actuellement en accès restreint pour le client. Retrouve le processus de création en vidéo.",
      en: "Design of a lifestyle store currently under restricted client access. Check out the build process on video.",
    },
    tags: {
      fr: ["Shopify", "Design", "Lifestyle"],
      en: ["Shopify", "Design", "Lifestyle"],
    },
  },
  {
    id: "maisonNova",
    url: "https://shop-off-7216.myshopify.com",
    status: "password-protected",
    accent: "#E8D8B8",
    niche: "maison",
    videoSrc: "/videos/maison-nova.mp4",
    year: 2026,
    name: { fr: "Maison Nova", en: "Maison Nova" },
    tagline: {
      fr: "Lancement en préparation",
      en: "Launch in progress",
    },
    description: {
      fr: "Nouvelle boutique en cours de préparation, avec collecte d'emails avant ouverture pour créer l'attente autour du lancement.",
      en: "A new store in the making, collecting emails ahead of launch to build anticipation.",
    },
    tags: {
      fr: ["Shopify", "Pre-launch", "Growth"],
      en: ["Shopify", "Pre-launch", "Growth"],
    },
  },
];

/**
 * Seules les boutiques réellement accessibles publiquement (vérifié par
 * requête HTTP, pas juste déclaratif) sont affichées sur le site. Les autres
 * restent dans ce fichier, prêtes à réapparaître dès que tu enlèves le mot de
 * passe côté Shopify — aucune action de plus ne sera nécessaire ici.
 * Dernière vérification : voir date du commit qui a ajusté ce fichier.
 */
export const visibleProjects = projects.filter((p) => p.status === "live");
