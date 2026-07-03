import type { LocalizedText } from "./projects";

export type TestimonialType = "whatsapp" | "instagram" | "agency" | "delivery";

export interface Testimonial {
  id: string;
  type: TestimonialType;
  authorName: string;
  authorRole?: LocalizedText;
  quote: LocalizedText;
  rating?: number;
  accent: string;
}

/**
 * Preuve sociale de démarrage — à remplacer par tes vrais retours dès que tu
 * les as (via /admin/testimonials, aucune modification de code nécessaire).
 * Les prénoms sont volontairement génériques : ce ne sont pas de vraies
 * personnes tant que tu n'as pas remplacé le contenu.
 */
export const testimonials: Testimonial[] = [
  {
    id: "t1",
    type: "delivery",
    authorName: "Cissé Glow",
    quote: {
      fr: "Boutique livrée en 3 jours, en ligne et opérationnelle.",
      en: "Store delivered in 3 days, live and fully operational.",
    },
    accent: "#B9FF5C",
  },
  {
    id: "t2",
    type: "whatsapp",
    authorName: "Sarah",
    authorRole: { fr: "Gérante, boutique beauté", en: "Owner, beauty store" },
    quote: {
      fr: "Franchement je m'attendais pas à un rendu aussi pro, mes clientes n'arrêtent pas de me complimenter sur le site 😍",
      en: "Honestly I wasn't expecting something this professional, my customers keep complimenting me on the site 😍",
    },
    accent: "#25D366",
  },
  {
    id: "t3",
    type: "instagram",
    authorName: "karim.dz",
    quote: {
      fr: "Le design est incroyable franchement, ça donne direct envie d'acheter 🔥",
      en: "The design is incredible honestly, it makes you want to buy right away 🔥",
    },
    accent: "#E1306C",
  },
  {
    id: "t4",
    type: "agency",
    authorName: "Elite Agency",
    authorRole: { fr: "Bordeaux, France", en: "Bordeaux, France" },
    quote: {
      fr: "Un développeur Shopify fiable et autonome, livraisons toujours dans les temps sur nos projets clients.",
      en: "A reliable, autonomous Shopify developer — always on time on our client projects.",
    },
    rating: 5,
    accent: "#B9FF5C",
  },
  {
    id: "t5",
    type: "whatsapp",
    authorName: "Julie",
    authorRole: { fr: "Fondatrice, marque bien-être", en: "Founder, wellness brand" },
    quote: {
      fr: "En 48h j'avais déjà les premières maquettes, super réactif et à l'écoute des retours 🙏",
      en: "Within 48h I already had the first mockups, super responsive and open to feedback 🙏",
    },
    accent: "#25D366",
  },
  {
    id: "t6",
    type: "delivery",
    authorName: "Zylvea",
    quote: {
      fr: "Refonte complète livrée avant la date prévue.",
      en: "Full redesign delivered ahead of schedule.",
    },
    accent: "#8B6BFF",
  },
  {
    id: "t7",
    type: "agency",
    authorName: "Viip Interstis",
    authorRole: { fr: "Cotonou, Bénin", en: "Cotonou, Benin" },
    quote: {
      fr: "Rigoureux, force de proposition, capable de gérer un projet du design jusqu'au déploiement.",
      en: "Rigorous, proactive, able to own a project from design all the way to deployment.",
    },
    rating: 5,
    accent: "#A8C8D8",
  },
  {
    id: "t8",
    type: "instagram",
    authorName: "marc_ecom",
    quote: {
      fr: "Depuis la nouvelle boutique le taux de conversion a clairement augmenté, merci !",
      en: "Since the new store went live, conversion rate has clearly gone up, thank you!",
    },
    accent: "#E1306C",
  },
];
