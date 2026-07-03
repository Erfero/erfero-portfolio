export type ProjectStatus =
  | "live"
  | "password-protected"
  | "coming-soon"
  | "unavailable";

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
  {
    id: "kandjiCare",
    url: "https://kandjicare-2.myshopify.com",
    status: "live",
    accent: "#D8C8A8",
    niche: "hair-care",
    videoSrc: "",
    year: 2025,
    name: { fr: "KandjiCare", en: "KandjiCare" },
    tagline: {
      fr: "Coloration capillaire nouvelle génération",
      en: "Next-gen hair coloring",
    },
    description: {
      fr: "Shampoing colorant qui couvre les cheveux blancs en 10 minutes, sans ammoniaque. Boutique au design épuré, pensée pour rassurer sur un produit encore méconnu.",
      en: "A color-restoring shampoo that covers gray hair in 10 minutes, ammonia-free. A clean design built to build trust around an unfamiliar product category.",
    },
    tags: {
      fr: ["Shopify", "CRO", "Beauté", "Trust"],
      en: ["Shopify", "CRO", "Beauty", "Trust"],
    },
  },
  {
    id: "yAndF",
    url: "https://boutique-y-f.myshopify.com",
    status: "live",
    accent: "#E8C8D8",
    niche: "wellness",
    videoSrc: "",
    year: 2025,
    name: { fr: "Y&F", en: "Y&F" },
    tagline: {
      fr: "Bien-être féminin & confort menstruel",
      en: "Women's wellness & period comfort",
    },
    description: {
      fr: "Ceinture chauffante portable contre les douleurs menstruelles. Storytelling produit centré sur le confort et la preuve sociale pour un sujet intime.",
      en: "A portable heated belt to relieve period pain. Product storytelling built around comfort and social proof for a deeply personal category.",
    },
    tags: {
      fr: ["Shopify", "Wellness", "CRO"],
      en: ["Shopify", "Wellness", "CRO"],
    },
  },
  {
    id: "suenoPerfecto",
    url: "https://suenoperfecto.myshopify.com",
    status: "live",
    accent: "#C8D8E8",
    niche: "sleep-health",
    videoSrc: "",
    year: 2025,
    name: { fr: "SueñoPerfecto", en: "SueñoPerfecto" },
    tagline: {
      fr: "Sommeil réparateur, marché hispanophone",
      en: "Restorative sleep, Spanish-speaking market",
    },
    description: {
      fr: "Boutique dédiée à des oreillers cervicaux orthopédiques, avec mise en avant des certifications santé et des avis presse pour rassurer sur un produit médical grand public.",
      en: "A store for orthopedic cervical pillows, highlighting health certifications and press mentions to build trust around a consumer health product.",
    },
    tags: {
      fr: ["Shopify", "E-commerce", "Santé"],
      en: ["Shopify", "E-commerce", "Health"],
    },
  },
  {
    id: "launeea",
    url: "https://launeea.com",
    status: "live",
    accent: "#D8E8D0",
    niche: "health",
    videoSrc: "",
    year: 2025,
    name: { fr: "Launeea", en: "Launeea" },
    tagline: {
      fr: "Solution lavable & durable",
      en: "Washable & sustainable solution",
    },
    description: {
      fr: "Sous-vêtements absorbants réutilisables jusqu'à 5 ans. Boutique construite autour d'un tableau comparatif clair et d'un discours axé durabilité pour un sujet sensible.",
      en: "Reusable absorbent underwear built to last up to 5 years. A store built around a clear comparison table and a sustainability-first message for a sensitive category.",
    },
    tags: {
      fr: ["Shopify", "E-commerce", "Santé"],
      en: ["Shopify", "E-commerce", "Health"],
    },
  },
  {
    id: "silke",
    url: "https://silk-9941.myshopify.com",
    status: "live",
    accent: "#E8D8E0",
    niche: "hair-tools",
    videoSrc: "",
    year: 2025,
    name: { fr: "SILKΞ", en: "SILKΞ" },
    tagline: {
      fr: "Coiffage professionnel 2-en-1",
      en: "2-in-1 professional styling",
    },
    description: {
      fr: "Sèche-cheveux et lisseur combinés, positionné comme un gain de temps premium. Design minimaliste, mentions médias et FAQ étoffée pour justifier le prix.",
      en: "A combined hair dryer and straightener positioned as a premium time-saver. Minimal design, press mentions and a thorough FAQ to justify the price point.",
    },
    tags: {
      fr: ["Shopify", "Beauté", "CRO"],
      en: ["Shopify", "Beauty", "CRO"],
    },
  },
  {
    id: "orasmile",
    url: "https://orasmile.myshopify.com",
    status: "live",
    accent: "#E8E0C8",
    niche: "beauty",
    videoSrc: "",
    year: 2025,
    name: { fr: "Orasmile", en: "Orasmile" },
    tagline: {
      fr: "Blancheur dentaire à domicile",
      en: "At-home teeth whitening",
    },
    description: {
      fr: "Bandes de blanchiment dentaire présentées comme une alternative accessible au dentiste. Preuve sociale massive et bénéfices clairs pour lever les freins à l'achat.",
      en: "Teeth whitening strips positioned as an accessible alternative to the dentist. Heavy social proof and clear benefits to remove purchase hesitation.",
    },
    tags: {
      fr: ["Shopify", "Beauté", "CRO"],
      en: ["Shopify", "Beauty", "CRO"],
    },
  },
  {
    id: "centPoils",
    url: "https://apgghh-mu.myshopify.com",
    status: "live",
    accent: "#D0D8C8",
    niche: "pets",
    videoSrc: "",
    year: 2025,
    name: { fr: "100Poils", en: "100Poils" },
    tagline: {
      fr: "Maison impeccable, animaux épanouis",
      en: "Spotless home, happy pets",
    },
    description: {
      fr: "Gant anti-poils multi-surfaces pour animaux, meubles et voitures. Boutique simple et directe, pensée pour convertir vite sur un produit d'appel.",
      en: "A multi-surface anti-fur glove for pets, furniture and cars. A simple, direct store built to convert fast on an impulse-buy product.",
    },
    tags: {
      fr: ["Shopify", "Lifestyle", "CRO"],
      en: ["Shopify", "Lifestyle", "CRO"],
    },
  },
  {
    id: "roselash",
    url: "https://rosalier.myshopify.com",
    status: "live",
    accent: "#E8C8D0",
    niche: "beauty",
    videoSrc: "",
    year: 2025,
    name: { fr: "Roselash", en: "Roselash" },
    tagline: {
      fr: "Cils magnétiques sans colle",
      en: "Glue-free magnetic lashes",
    },
    description: {
      fr: "Faux-cils magnétiques réutilisables plus de 100 fois. Mise en scène produit soignée et preuve sociale forte pour un marché ultra concurrentiel.",
      en: "Magnetic false eyelashes reusable 100+ times. Polished product staging and strong social proof for a highly competitive market.",
    },
    tags: {
      fr: ["Shopify", "Beauté", "Storytelling"],
      en: ["Shopify", "Beauty", "Storytelling"],
    },
  },
  {
    id: "soia",
    url: "https://51eymy-hm.myshopify.com",
    status: "live",
    accent: "#E0D8E8",
    niche: "beauty",
    videoSrc: "",
    year: 2025,
    name: { fr: "SOÏA", en: "SOÏA" },
    tagline: {
      fr: "Beauté du sommeil en soie naturelle",
      en: "Natural silk sleep beauty",
    },
    description: {
      fr: "Taies d'oreiller en soie de mûrier, positionnées comme un rituel beauté nocturne. Argumentaire clair entre soin de la peau, des cheveux et confort de sommeil.",
      en: "Mulberry silk pillowcases positioned as a nightly beauty ritual. A clear pitch bridging skincare, haircare and sleep comfort.",
    },
    tags: {
      fr: ["Shopify", "Beauté", "Lifestyle"],
      en: ["Shopify", "Beauty", "Lifestyle"],
    },
  },
  {
    id: "kyraCosmetic",
    url: "https://kyracosmetic.com",
    status: "live",
    accent: "#E8DCC0",
    niche: "beauty",
    videoSrc: "",
    year: 2025,
    name: { fr: "Kyra Cosmetic", en: "Kyra Cosmetic" },
    tagline: {
      fr: "Sérum cils, résultats en 3 semaines",
      en: "Lash serum, results in 3 weeks",
    },
    description: {
      fr: "Sérum 2-en-1 pour stimuler la pousse des cils. Palette or et blanc, carrousel avant/après et argumentaire sécurité pour rassurer sur un actif cosmétique.",
      en: "A 2-in-1 serum to stimulate lash growth. Gold-and-white palette, before/after carousel and a safety-first pitch to build trust around a cosmetic active ingredient.",
    },
    tags: {
      fr: ["Shopify", "Beauté", "Branding"],
      en: ["Shopify", "Beauty", "Branding"],
    },
  },
  {
    id: "crewEssentiels",
    url: "https://crewessentiels.com",
    status: "live",
    accent: "#C8D0D8",
    niche: "travel",
    videoSrc: "",
    year: 2025,
    name: { fr: "Crew Essentiels", en: "Crew Essentiels" },
    tagline: {
      fr: "Essentiels de voyage pour équipages",
      en: "Travel essentials for flight crews",
    },
    description: {
      fr: "Accessoires de voyage haut de gamme pensés pour le personnel navigant. Positionnement premium et niche, gamme volontairement resserrée plutôt qu'un catalogue large.",
      en: "Premium travel accessories built for flight crews. A deliberately niche, premium positioning with a tight product range instead of a broad catalog.",
    },
    tags: {
      fr: ["Shopify", "Branding", "Niche"],
      en: ["Shopify", "Branding", "Niche"],
    },
  },
  {
    id: "curcuGlow",
    url: "https://curcuglowbeauty.com",
    status: "live",
    accent: "#E8D8B0",
    niche: "beauty",
    videoSrc: "",
    year: 2025,
    name: { fr: "CurcuGlow Beauty", en: "CurcuGlow Beauty" },
    tagline: {
      fr: "Éclat naturel au curcuma",
      en: "Natural turmeric glow",
    },
    description: {
      fr: "Savon illuminateur au curcuma et acide kojique. Offre promotionnelle bien visible et ingrédients naturels mis en avant pour un produit d'entrée de gamme accessible.",
      en: "An illuminating soap with turmeric and kojic acid. A highly visible promo offer and natural ingredients front and center for an accessible entry-level product.",
    },
    tags: {
      fr: ["Shopify", "Beauté", "CRO"],
      en: ["Shopify", "Beauty", "CRO"],
    },
  },
  // --- Boutiques vérifiées mais non affichées publiquement (voir règle plus bas) ---
  {
    id: "mirelys",
    url: "https://mirelys-5844.myshopify.com",
    status: "password-protected",
    accent: "#B8C8D8",
    niche: "unknown",
    videoSrc: "",
    year: 2025,
    name: { fr: "Mirelys", en: "Mirelys" },
    tagline: { fr: "Statut à vérifier", en: "Status to verify" },
    description: {
      fr: "Boutique protégée par mot de passe au moment de la vérification.",
      en: "Password-protected store at the time of verification.",
    },
    tags: { fr: [], en: [] },
  },
  {
    id: "maynaCosmetics",
    url: "https://mayna-cosmetics.myshopify.com",
    status: "password-protected",
    accent: "#D8C8D0",
    niche: "beauty",
    videoSrc: "",
    year: 2025,
    name: { fr: "Mayna Cosmetics", en: "Mayna Cosmetics" },
    tagline: { fr: "Statut à vérifier", en: "Status to verify" },
    description: {
      fr: "Boutique protégée par mot de passe au moment de la vérification.",
      en: "Password-protected store at the time of verification.",
    },
    tags: { fr: [], en: [] },
  },
  {
    id: "shappyc",
    url: "https://shappyc.myshopify.com",
    status: "password-protected",
    accent: "#C8D8D0",
    niche: "unknown",
    videoSrc: "",
    year: 2025,
    name: { fr: "Shappyc", en: "Shappyc" },
    tagline: { fr: "Statut à vérifier", en: "Status to verify" },
    description: {
      fr: "Boutique protégée par mot de passe au moment de la vérification.",
      en: "Password-protected store at the time of verification.",
    },
    tags: { fr: [], en: [] },
  },
  {
    id: "kumaSkin",
    url: "https://kumaskin.fr",
    status: "password-protected",
    accent: "#D8D0C8",
    niche: "beauty",
    videoSrc: "",
    year: 2025,
    name: { fr: "Kuma Skin", en: "Kuma Skin" },
    tagline: { fr: "Statut à vérifier", en: "Status to verify" },
    description: {
      fr: "Boutique protégée par mot de passe au moment de la vérification (domaine kumaskin.fr).",
      en: "Password-protected store at the time of verification (kumaskin.fr domain).",
    },
    tags: { fr: [], en: [] },
  },
  {
    id: "bwcrvr",
    url: "https://bwcrvr-yi.myshopify.com",
    status: "unavailable",
    accent: "#C8C8C8",
    niche: "unknown",
    videoSrc: "",
    year: 2025,
    name: { fr: "Boutique (bwcrvr)", en: "Store (bwcrvr)" },
    tagline: { fr: "Statut à vérifier", en: "Status to verify" },
    description: {
      fr: "Boutique inaccessible (paiement Shopify en attente) au moment de la vérification.",
      en: "Store unreachable (pending Shopify payment) at the time of verification.",
    },
    tags: { fr: [], en: [] },
  },
  {
    id: "laguiCosmeticos",
    url: "https://lagui-cosmeticos.myshopify.com",
    status: "unavailable",
    accent: "#C8C8C8",
    niche: "beauty",
    videoSrc: "",
    year: 2025,
    name: { fr: "Lagui Cosméticos", en: "Lagui Cosméticos" },
    tagline: { fr: "Statut à vérifier", en: "Status to verify" },
    description: {
      fr: "Boutique inaccessible (paiement Shopify en attente) au moment de la vérification.",
      en: "Store unreachable (pending Shopify payment) at the time of verification.",
    },
    tags: { fr: [], en: [] },
  },
  {
    id: "pqpbib",
    url: "https://pqpbib-jp.myshopify.com",
    status: "unavailable",
    accent: "#C8C8C8",
    niche: "unknown",
    videoSrc: "",
    year: 2025,
    name: { fr: "Boutique (pqpbib)", en: "Store (pqpbib)" },
    tagline: { fr: "Statut à vérifier", en: "Status to verify" },
    description: {
      fr: "Boutique inaccessible (paiement Shopify en attente) au moment de la vérification.",
      en: "Store unreachable (pending Shopify payment) at the time of verification.",
    },
    tags: { fr: [], en: [] },
  },
  {
    id: "sahfxe",
    url: "https://sahfxe-e1.myshopify.com",
    status: "unavailable",
    accent: "#C8C8C8",
    niche: "unknown",
    videoSrc: "",
    year: 2025,
    name: { fr: "Boutique (sahfxe)", en: "Store (sahfxe)" },
    tagline: { fr: "Statut à vérifier", en: "Status to verify" },
    description: {
      fr: "Boutique inaccessible (paiement Shopify en attente) au moment de la vérification.",
      en: "Store unreachable (pending Shopify payment) at the time of verification.",
    },
    tags: { fr: [], en: [] },
  },
  {
    id: "dropsphere",
    url: "https://dropsphere-21.myshopify.com",
    status: "unavailable",
    accent: "#C8C8C8",
    niche: "unknown",
    videoSrc: "",
    year: 2025,
    name: { fr: "Dropsphere", en: "Dropsphere" },
    tagline: { fr: "Statut à vérifier", en: "Status to verify" },
    description: {
      fr: "Boutique inaccessible (paiement Shopify en attente) au moment de la vérification.",
      en: "Store unreachable (pending Shopify payment) at the time of verification.",
    },
    tags: { fr: [], en: [] },
  },
  {
    id: "celizen",
    url: "https://celizen.myshopify.com",
    status: "unavailable",
    accent: "#C8C8C8",
    niche: "unknown",
    videoSrc: "",
    year: 2025,
    name: { fr: "Celizen", en: "Celizen" },
    tagline: { fr: "Statut à vérifier", en: "Status to verify" },
    description: {
      fr: "Lien introuvable (404) au moment de la vérification.",
      en: "Link not found (404) at the time of verification.",
    },
    tags: { fr: [], en: [] },
  },
  {
    id: "fjmw0j",
    url: "https://fjmw0j-t7.myshopify.com",
    status: "unavailable",
    accent: "#C8C8C8",
    niche: "unknown",
    videoSrc: "",
    year: 2025,
    name: { fr: "Boutique (fjmw0j)", en: "Store (fjmw0j)" },
    tagline: { fr: "Statut à vérifier", en: "Status to verify" },
    description: {
      fr: "Lien introuvable (404) au moment de la vérification.",
      en: "Link not found (404) at the time of verification.",
    },
    tags: { fr: [], en: [] },
  },
  {
    id: "zeroXb8pc",
    url: "https://0xb8pc-u0.myshopify.com",
    status: "unavailable",
    accent: "#C8C8C8",
    niche: "unknown",
    videoSrc: "",
    year: 2025,
    name: { fr: "Boutique (0xb8pc)", en: "Store (0xb8pc)" },
    tagline: { fr: "Statut à vérifier", en: "Status to verify" },
    description: {
      fr: "Lien introuvable (404) au moment de la vérification.",
      en: "Link not found (404) at the time of verification.",
    },
    tags: { fr: [], en: [] },
  },
  {
    id: "d9zhde",
    url: "https://d9zhde-1c.myshopify.com",
    status: "unavailable",
    accent: "#C8C8C8",
    niche: "unknown",
    videoSrc: "",
    year: 2025,
    name: { fr: "Boutique (d9zhde)", en: "Store (d9zhde)" },
    tagline: { fr: "Statut à vérifier", en: "Status to verify" },
    description: {
      fr: "Lien introuvable (404) au moment de la vérification.",
      en: "Link not found (404) at the time of verification.",
    },
    tags: { fr: [], en: [] },
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
