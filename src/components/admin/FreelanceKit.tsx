"use client";

import { useState, useTransition, type ReactNode } from "react";
import { Copy, Check, RefreshCw, Save, Info } from "lucide-react";
import { saveFreelanceSettingsAction } from "@/lib/actions";
import type { FreelanceSettings } from "@/lib/content";

const inputClass =
  "w-full rounded-lg border border-border bg-white/[0.02] px-3 py-2 text-sm outline-none focus:border-lime/50";

/** Contact / preuve sociale : reprend le CV et site.config.ts, à ajuster
 * ici si l'un des deux change (mieux vaut un seul endroit que de les
 * dupliquer dans chaque texte généré). */
const PROFILE = {
  name: "Erféro Keoula",
  role: "Développeur Shopify & Web Fullstack",
  email: "erferokam@gmail.com",
  phone: "01 69 27 25 95",
  portfolio: "erfero-portfolio.vercel.app",
  linkedin: "linkedin.com/in/erfero-keoula",
  stats: {
    stores: "200+",
    years: "5 ans",
    rating: "4.8/5",
    delivery: "3 jours",
    satisfaction: "98%",
  },
};

function fmtRate(rate: string) {
  return rate.trim() ? `à partir de ${rate.trim()}€/jour` : "[ton TJM]";
}
function fmtAvailability(availability: string) {
  return availability.trim() ? `Disponible ${availability.trim()}` : "[ta disponibilité]";
}

type Block = {
  id: string;
  title: string;
  platforms: string[];
  tip: string;
  variants: (s: FreelanceSettings) => string[];
};

const BLOCKS: Block[] = [
  {
    id: "headline",
    title: "Titre de profil (accroche)",
    platforms: ["Malt", "Comet", "LinkedIn", "Upwork"],
    tip: "Sur Malt, vise ~10 mots avec des mots-clés précis : le titre doit correspondre à ce que tapent les clients dans la barre de recherche, pas à une formule poétique.",
    variants: () => [
      "Développeur Shopify Freelance — Boutiques e-commerce qui convertissent (200+ projets)",
      "Développeur Web Fullstack & Shopify — Sites rapides, référencés, pensés pour vendre",
    ],
  },
  {
    id: "bio-short",
    title: "Bio courte (une phrase)",
    platforms: ["Comet", "Fiverr", "LinkedIn"],
    tip: "Sur Comet, la bio démarre en général par « Je suis [métier] freelance avec [X] ans d'expérience » — direct, sans détour.",
    variants: () => [
      "Je suis Développeur Shopify & Web Fullstack freelance avec 5 ans d'expérience. Je conçois des boutiques e-commerce rapides, bien référencées et pensées pour convertir, du design à la mise en ligne.",
      "Développeur Shopify freelance depuis 5 ans, j'ai livré plus de 200 boutiques en France et à l'international. Autonome et orienté résultat, je transforme un besoin métier en boutique qui vend.",
    ],
  },
  {
    id: "bio-long",
    title: "Présentation complète (« à propos »)",
    platforms: ["Malt", "Upwork"],
    tip: "Malt recommande une description d'au moins 200 caractères : une intro engageante, des résultats mesurables, ce qui te différencie, et un appel à échanger.",
    variants: (s) => [
      `Développeur web Fullstack spécialisé Shopify, j'aide les marques e-commerce à lancer et à faire grandir des boutiques qui vendent réellement — pas seulement de belles vitrines.

En ${PROFILE.stats.years}, j'ai conçu et livré plus de ${PROFILE.stats.stores} boutiques Shopify pour des marques beauté, bien-être, mode et lifestyle en France, en Europe et à l'international. Mes clients me notent en moyenne ${PROFILE.stats.rating} et je livre en ${PROFILE.stats.delivery} en moyenne sur un projet de boutique standard.

Ce que j'apporte concrètement :
— Design et structure pensés conversion (parcours d'achat, preuve sociale, mobile-first)
— Développement Shopify sur-mesure (Liquid, sections dynamiques, apps, intégrations)
— SEO technique et éditorial pour être visible sur Google dès le lancement
— Une stack complémentaire si besoin : React, Vue, Node.js, Laravel, WordPress

J'ai travaillé en agence (Shopify, SEO) comme sur des applications internes plus complexes en méthode fullstack, ce qui me permet de m'adapter aussi bien à une boutique Shopify qu'à un outil métier.

Autonome, rigoureux et orienté résultat : je préfère un échange de 15 minutes pour cadrer précisément votre besoin plutôt qu'un devis à l'aveugle. ${fmtAvailability(s.availability)}, ${fmtRate(s.dailyRate)}. Parlons de votre projet.`,
      `Boutiques Shopify qui vendent, sites rapides, référencement qui suit : voilà ce que je livre depuis ${PROFILE.stats.years} en tant que développeur web Fullstack freelance.

${PROFILE.stats.stores} boutiques livrées, note client moyenne de ${PROFILE.stats.rating}, délai moyen de ${PROFILE.stats.delivery} sur les projets de boutique standard. J'interviens sur l'ensemble de la chaîne : design orienté conversion, développement Shopify (Liquid, apps, sections sur-mesure), SEO technique, et intégration avec React, Vue, Node.js ou WordPress quand le projet le demande.

Ce qui me différencie : je ne me contente pas de livrer une boutique — je la pense pour qu'elle convertisse, en m'appuyant sur ce qui a déjà fonctionné sur plus de ${PROFILE.stats.stores} lancements. Autonome et direct, je préfère comprendre précisément votre objectif business avant de coder la première ligne.

${fmtAvailability(s.availability)}, TJM ${fmtRate(s.dailyRate)}. Discutons de votre projet.`,
    ],
  },
  {
    id: "cover-letter",
    title: "Lettre de motivation (candidature à une mission)",
    platforms: ["Codeur.com", "Malt", "Email direct"],
    tip: "Remplace les crochets [ ] par les détails de l'annonce avant d'envoyer — un message trop générique se repère immédiatement.",
    variants: (s) => [
      `Bonjour [Prénom],

Je me permets de vous contacter suite à votre annonce pour [intitulé de la mission]. Développeur web Fullstack freelance spécialisé Shopify, j'ai conçu et livré plus de ${PROFILE.stats.stores} boutiques e-commerce en ${PROFILE.stats.years}, avec une note client moyenne de ${PROFILE.stats.rating}.

Ce qui me semble pertinent pour votre projet :
— [Point 1 : une expérience proche de leur niche ou de leur problème]
— [Point 2 : une compétence technique précise demandée dans l'annonce]
— [Point 3 : une contrainte de délai ou de budget que vous pouvez respecter]

Concrètement, je peux vous accompagner sur [design / développement Shopify / SEO / intégration technique], de la conception à la mise en ligne, avec un point d'avancement régulier pour que vous gardiez toujours le contrôle sur le projet.

Je suis ${fmtAvailability(s.availability).toLowerCase()} et reste joignable pour un échange rapide (15-20 minutes) afin de mieux cerner vos besoins et vous proposer un cadrage précis avant de démarrer.

Au plaisir d'échanger avec vous,
${PROFILE.name}
${PROFILE.role}
${PROFILE.email} · ${PROFILE.phone}
Portfolio : ${PROFILE.portfolio}`,
      `Bonjour,

Développeur Shopify freelance (${PROFILE.stats.years} d'expérience, ${PROFILE.stats.stores} boutiques livrées, note client ${PROFILE.stats.rating}), votre annonce correspond exactement à ce que je fais au quotidien : [reformuler le besoin du client en une phrase].

Je peux démarrer ${fmtAvailability(s.availability).toLowerCase()} et vous propose un premier échange de 15 minutes pour cadrer précisément votre besoin avant de m'engager sur un délai et un tarif (${fmtRate(s.dailyRate)}).

Quelques exemples de boutiques que j'ai livrées récemment : ${PROFILE.portfolio}/realisations

À très vite,
${PROFILE.name}`,
    ],
  },
  {
    id: "proposal-short",
    title: "Réponse courte à une offre",
    platforms: ["Upwork", "Comet", "Malt"],
    tip: "Sur Upwork, les premières lignes s'affichent seules dans la liste : accroche directement liée au projet du client, pas de « Cher Monsieur/Madame ».",
    variants: (s) => [
      `Bonjour, votre projet m'intéresse directement : j'ai livré plus de ${PROFILE.stats.stores} boutiques Shopify en ${PROFILE.stats.years}, avec une note client moyenne de ${PROFILE.stats.rating}. [Une phrase reliant une réalisation concrète à leur besoin]. Je peux démarrer ${fmtAvailability(s.availability).toLowerCase()}. Auriez-vous 15 minutes pour qu'on précise ensemble le périmètre avant que je vous propose un chiffrage ?`,
      `Bonjour, je viens de lire votre annonce et j'ai une question avant de vous proposer un chiffrage précis : [question ciblée sur le besoin]. Pour contexte, je suis développeur Shopify freelance depuis ${PROFILE.stats.years} (${PROFILE.stats.stores} boutiques livrées, ${PROFILE.stats.rating} de satisfaction client) et je serais ravi d'échanger 15 minutes sur votre projet.`,
    ],
  },
  {
    id: "value-props",
    title: "Proposition de valeur (points clés)",
    platforms: ["Malt", "Comet", "Entretien client"],
    tip: "À garder sous la main pour un appel client : reformule un point en fonction de ce que le client mentionne en premier.",
    variants: () => [
      `— ${PROFILE.stats.stores} boutiques Shopify livrées en ${PROFILE.stats.years}, pour des marques en France, en Europe et à l'international
— Note client moyenne de ${PROFILE.stats.rating} et délai moyen de ${PROFILE.stats.delivery} sur un projet de boutique standard
— Une double casquette design + développement + SEO : pas besoin de coordonner plusieurs prestataires
— Expérience agence et fullstack : je m'adapte aussi bien à une boutique Shopify qu'à un outil métier plus complexe
— Autonome et orienté résultat : je cadre précisément le besoin avant de développer, pour éviter les mauvaises surprises de délai ou de budget`,
    ],
  },
  {
    id: "stats",
    title: "Chiffres clés (preuve sociale)",
    platforms: ["Malt", "Comet", "Site personnel"],
    tip: "À coller tel quel dans une section « résultats » ou à citer en entretien — des chiffres ronds, faciles à retenir.",
    variants: () => [
      `${PROFILE.stats.stores} boutiques Shopify livrées · ${PROFILE.stats.years} d'expérience web · ${PROFILE.stats.rating} de note moyenne clients · ${PROFILE.stats.delivery} de délai moyen · ${PROFILE.stats.satisfaction} de clients satisfaits`,
    ],
  },
  {
    id: "skills",
    title: "Compétences (les 5 premières comptent le plus sur Malt)",
    platforms: ["Malt", "Upwork", "Fiverr"],
    tip: "Malt affiche jusqu'à 50 compétences mais ne met en avant que les 5 premières dans les résultats de recherche — mets les plus recherchées en tête.",
    variants: () => [
      `Prioritaires : Shopify, Liquid, SEO, React.js, CRO (optimisation de conversion)
Frontend : Shopify, Liquid, React.js, Vue.js, Angular, WordPress, Flutter
Backend & données : Node.js, Laravel, PHP, MongoDB, Firebase
SEO & conversion : SEO technique, SEO éditorial, CRO, Copywriting`,
    ],
  },
  {
    id: "signature",
    title: "Signature email professionnelle",
    platforms: ["Email", "Devis / factures"],
    tip: "À enregistrer comme signature automatique dans ta messagerie.",
    variants: () => [
      `${PROFILE.name}
${PROFILE.role}
${PROFILE.email} · ${PROFILE.phone}
${PROFILE.portfolio} · ${PROFILE.linkedin}`,
    ],
  },
];

function GeneratorBlock({ block, settings }: { block: Block; settings: FreelanceSettings }) {
  const variants = block.variants(settings);
  const [index, setIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const text = variants[index % variants.length];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Presse-papier indisponible (contexte non sécurisé) : rien de plus à
      // faire, l'utilisateur peut toujours sélectionner le texte à la main.
    }
  };

  return (
    <div className="rounded-2xl border border-border bg-white/[0.02] p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-base font-medium">{block.title}</h3>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {block.platforms.map((p) => (
              <span
                key={p}
                className="rounded-full border border-border px-2 py-0.5 text-[11px] text-ink-muted"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {variants.length > 1 && (
            <button
              onClick={() => setIndex((i) => (i + 1) % variants.length)}
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs text-ink-muted hover:border-lime/50 hover:text-ink"
            >
              <RefreshCw className="size-3.5" />
              Régénérer
            </button>
          )}
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-full bg-lime px-3 py-1.5 text-xs font-medium text-bg"
          >
            {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
            {copied ? "Copié" : "Copier"}
          </button>
        </div>
      </div>

      <p className="mt-3 flex items-start gap-1.5 text-xs text-ink-muted/80">
        <Info className="mt-0.5 size-3.5 shrink-0 text-lime" />
        {block.tip}
      </p>

      <textarea
        readOnly
        value={text}
        rows={text.split("\n").length + 1}
        className="mt-3 w-full resize-y rounded-lg border border-border bg-white/[0.02] px-3 py-2 text-sm leading-relaxed text-ink outline-none"
      />
    </div>
  );
}

export default function FreelanceKit({ initial }: { initial: FreelanceSettings }) {
  const [settings, setSettings] = useState(initial);

  return (
    <div className="mt-6 flex flex-col gap-6">
      <SettingsFormControlled initial={initial} onSaved={setSettings} />

      <div className="flex flex-col gap-4">
        {BLOCKS.map((block) => (
          <GeneratorBlock key={block.id} block={block} settings={settings} />
        ))}
      </div>
    </div>
  );
}

function SettingsFormControlled({
  initial,
  onSaved,
}: {
  initial: FreelanceSettings;
  onSaved: (s: FreelanceSettings) => void;
}) {
  const [draft, setDraft] = useState(initial);
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    startTransition(async () => {
      await saveFreelanceSettingsAction(draft);
      onSaved(draft);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    });
  };

  const field = (
    label: string,
    key: keyof FreelanceSettings,
    placeholder?: string,
  ): ReactNode => (
    <label className="flex flex-col gap-1 text-xs text-ink-muted">
      {label}
      <input
        value={draft[key]}
        onChange={(e) => setDraft((d) => ({ ...d, [key]: e.target.value }))}
        placeholder={placeholder}
        className={inputClass}
      />
    </label>
  );

  return (
    <div className="rounded-2xl border border-lime/30 bg-lime/[0.04] p-5">
      <h2 className="font-display text-base font-medium">Tarif &amp; disponibilité</h2>
      <p className="mt-1 text-xs text-ink-muted">
        Ces informations ne sont pas sur le CV : renseigne-les une fois, elles
        s&apos;insèrent automatiquement dans les textes ci-dessous.
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {field("TJM (€/jour)", "dailyRate", "ex. 350")}
        {field("Disponibilité", "availability", "ex. immédiatement")}
        {field("Mode de travail", "workMode")}
      </div>

      <button
        onClick={handleSave}
        disabled={isPending}
        className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-lime px-5 py-2.5 text-sm font-medium text-bg disabled:opacity-60"
      >
        {saved ? <Check className="size-4" /> : <Save className="size-4" />}
        {isPending ? "Enregistrement..." : saved ? "Enregistré" : "Enregistrer"}
      </button>
    </div>
  );
}