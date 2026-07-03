import type { LocalizedText } from "./projects";

export type TestimonialType =
  | "whatsapp"
  | "instagram"
  | "agency"
  | "delivery"
  | "screenshot"
  | "video";

export interface Testimonial {
  id: string;
  type: TestimonialType;
  authorName: string;
  authorRole?: LocalizedText;
  quote: LocalizedText;
  rating?: number;
  accent: string;
  /** Pour type "screenshot" (image) ou "video" — URL depuis la Médiathèque admin. */
  mediaUrl?: string;
}

/**
 * Preuve sociale de démarrage — à remplacer par tes vrais retours dès que tu
 * les as (via /admin/testimonials, aucune modification de code nécessaire).
 * Les prénoms sont volontairement génériques : ce ne sont pas de vraies
 * personnes tant que tu n'as pas remplacé le contenu. Les entrées "screenshot"
 * et "video" sont des emplacements vides prêts à recevoir tes vraies preuves
 * (capture d'écran de discussion, vidéo client) via la Médiathèque.
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
    id: "t15",
    type: "whatsapp",
    authorName: "Nadia",
    authorRole: { fr: "Fondatrice, marque cosmétique", en: "Founder, cosmetics brand" },
    quote: {
      fr: "Très bon travail dans l'ensemble, on a juste dû revoir deux-trois détails de mise en page après la livraison, corrigés rapidement 👍",
      en: "Really solid work overall, we just had to revisit a couple of layout details after delivery, fixed quickly 👍",
    },
    rating: 4,
    accent: "#25D366",
  },
  {
    id: "t16",
    type: "instagram",
    authorName: "sofia.creates",
    quote: {
      fr: "Boutique super propre, mobile au top. Je recommande.",
      en: "Super clean store, great on mobile. I recommend.",
    },
    rating: 5,
    accent: "#E1306C",
  },
  {
    id: "t17",
    type: "delivery",
    authorName: "Bella Slim",
    quote: {
      fr: "Boutique en ligne, testée et validée avant transfert.",
      en: "Store live, tested and approved before handover.",
    },
    accent: "#F5A623",
  },
  {
    id: "t18",
    type: "whatsapp",
    authorName: "Thomas",
    authorRole: { fr: "Gérant, boutique tech", en: "Owner, tech store" },
    quote: {
      fr: "Bonne communication du début à la fin, le résultat correspond à ce qu'on avait défini ensemble.",
      en: "Good communication from start to finish, the result matches what we defined together.",
    },
    rating: 4,
    accent: "#25D366",
  },
  {
    id: "t19",
    type: "agency",
    authorName: "Elite Agency",
    authorRole: { fr: "Bordeaux, France", en: "Bordeaux, France" },
    quote: {
      fr: "On lui confie régulièrement des projets clients en direct, toujours livrés proprement.",
      en: "We regularly hand him direct client projects, always delivered cleanly.",
    },
    rating: 5,
    accent: "#B9FF5C",
  },
  {
    id: "t20",
    type: "instagram",
    authorName: "yanis.storefront",
    quote: {
      fr: "Le tunnel d'achat est vraiment fluide, bravo.",
      en: "The checkout flow is really smooth, well done.",
    },
    rating: 5,
    accent: "#E1306C",
  },
  {
    id: "t5",
    type: "screenshot",
    authorName: "Capture d'échange client",
    quote: { fr: "", en: "" },
    accent: "#B9FF5C",
  },
  {
    id: "t6",
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
    id: "t7",
    type: "delivery",
    authorName: "Zylvea",
    quote: {
      fr: "Refonte complète livrée avant la date prévue.",
      en: "Full redesign delivered ahead of schedule.",
    },
    accent: "#8B6BFF",
  },
  {
    id: "t8",
    type: "video",
    authorName: "Retour vidéo client",
    quote: { fr: "", en: "" },
    accent: "#8B6BFF",
  },
  {
    id: "t9",
    type: "agency",
    authorName: "Viip Interstis",
    authorRole: { fr: "Agence partenaire", en: "Partner agency" },
    quote: {
      fr: "Rigoureux, force de proposition, capable de gérer un projet du design jusqu'au déploiement.",
      en: "Rigorous, proactive, able to own a project from design all the way to deployment.",
    },
    rating: 5,
    accent: "#A8C8D8",
  },
  {
    id: "t10",
    type: "instagram",
    authorName: "marc_ecom",
    quote: {
      fr: "Depuis la nouvelle boutique le taux de conversion a clairement augmenté, merci !",
      en: "Since the new store went live, conversion rate has clearly gone up, thank you!",
    },
    accent: "#E1306C",
  },
  {
    id: "t11",
    type: "screenshot",
    authorName: "Capture d'avis client",
    quote: { fr: "", en: "" },
    accent: "#D8A8C8",
  },
  {
    id: "t12",
    type: "agency",
    authorName: "Omega Agency",
    authorRole: { fr: "Paris, France", en: "Paris, France" },
    quote: {
      fr: "Bon niveau technique, autonome sur WordPress comme sur Shopify, toujours orienté résultat.",
      en: "Strong technical level, autonomous on both WordPress and Shopify, always results-oriented.",
    },
    rating: 5,
    accent: "#E8D8B8",
  },
  {
    id: "t13",
    type: "whatsapp",
    authorName: "Amadou",
    authorRole: { fr: "Fondateur, marque lifestyle", en: "Founder, lifestyle brand" },
    quote: {
      fr: "Boutique livrée nickel, et le suivi après lancement est vraiment appréciable 👌",
      en: "Store delivered flawlessly, and the post-launch follow-up is genuinely appreciated 👌",
    },
    accent: "#25D366",
  },
  {
    id: "t14",
    type: "screenshot",
    authorName: "Capture de livraison",
    quote: { fr: "", en: "" },
    accent: "#C8D8E8",
  },
];
