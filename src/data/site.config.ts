export const siteConfig = {
  name: "Erféro Keoula",
  shortName: "Erféro",
  studioName: "Erféro Studio",
  role: "Développeur Shopify & Web FullStack",
  location: "Cotonou, Bénin — Télétravail dans le monde entier",
  email: "erferokam@gmail.com",
  phone: "+229 69 27 25 95",
  whatsappNumber: "22969272595",
  // TODO(erfero): remplace par ton vrai lien Calendly une fois le compte gratuit créé (voir README).
  calendlyUrl: "https://calendly.com/erferokam/appel-decouverte",
  socials: {
    instagram: "https://www.instagram.com/erfero04",
    linkedin: "https://www.linkedin.com/in/erfero-keoula-905b7220",
    // TODO(erfero): ajoute tes vraies URLs quand elles existent.
    github: "https://github.com/Erfero",
    upwork: "",
    fiverr: "",
    malt: "",
    behance: "",
  },
  // Métriques affichées sur le site : chiffres arrondis et honnêtes basés sur ton parcours réel
  // (Elite Agency 2021-2025, Viip Interstis, Omega Agency, clients freelance directs).
  // Ajuste librement ces valeurs à mesure que ton activité évolue.
  metrics: {
    yearsExperience: 5,
    storesLaunched: 200,
    videosDocumented: 200,
    avgDeliveryDays: 10,
    clientSatisfaction: 98,
  },
} as const;

export type SiteConfig = typeof siteConfig;