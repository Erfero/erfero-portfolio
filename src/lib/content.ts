import "server-only";
import frDefault from "@/messages/fr.json";
import enDefault from "@/messages/en.json";
import {
  projects as defaultProjects,
  sortProjectsForDisplay,
  type Project,
  type ProjectStatus,
} from "@/data/projects";
import { videos as defaultVideos, type VideoEntry } from "@/data/videos";
import {
  testimonials as defaultTestimonials,
  type Testimonial,
} from "@/data/testimonials";
import { readJsonBlob } from "./blob";
import { deepMerge } from "./deepMerge";

const defaultsByLocale = { fr: frDefault, en: enDefault } as const;

export async function getMessages(locale: string) {
  const base =
    defaultsByLocale[locale as keyof typeof defaultsByLocale] ?? frDefault;
  const override = await readJsonBlob<Record<string, unknown>>(
    `content/${locale}.json`
  );
  return override ? deepMerge(base, override) : base;
}

/**
 * Base = override admin complet (content/projects.json) si présent, sinon la
 * liste du code. Par-dessus, on applique les corrections automatiques de
 * statut (content/project-status.json, écrit par le vérificateur de liens)
 * par id — ainsi, ajouter une boutique dans le code la fait toujours
 * apparaître, même si le vérificateur automatique a déjà écrit un instantané
 * plus ancien. On applique aussi content/thumbnail-overrides.json (écrit par
 * le rafraîchisseur de captures, voir refreshThumbnails.ts) par-dessus le
 * champ thumbnailOverride — un id présent dans cette table gagne toujours,
 * ce qui permet de faire monter en qualité les captures des boutiques du
 * code sans avoir à "basculer" tout le catalogue vers l'override admin.
 */
/** Liste de référence (override admin complet si présent, sinon le code),
 * avec les statuts tels que vérifiés — sans les corrections automatiques. */
export async function getBaseProjects(): Promise<Project[]> {
  const override = await readJsonBlob<Project[]>("content/projects.json");
  return override && override.length > 0 ? override : defaultProjects;
}

export async function getProjects(): Promise<Project[]> {
  const [base, statusMap, thumbnailMap] = await Promise.all([
    getBaseProjects(),
    readJsonBlob<Record<string, ProjectStatus>>("content/project-status.json"),
    readJsonBlob<Record<string, string>>("content/thumbnail-overrides.json"),
  ]);
  return base.map((p) => ({
    ...p,
    status: resolveStatus(p.status, statusMap?.[p.id]),
    thumbnailOverride: thumbnailMap?.[p.id] ?? p.thumbnailOverride,
  }));
}

/**
 * Le vérificateur automatique (HTTP simple, chaque matin, voir
 * linkChecker.ts) peut seulement MASQUER une boutique marquée "live" dans la
 * liste, puis la ré-afficher quand elle remarche ; il ne rend jamais visible
 * une boutique marquée autrement : il ne voit pas la page bleue "Votre licence n'est pas
 * activée" du thème Story (affichée en JavaScript), ni certains domaines
 * parqués. Seule la vérification complète en navigateur réel, reportée dans
 * le code (champ status), peut rendre une boutique visible.
 */
function resolveStatus(
  codeStatus: ProjectStatus,
  remoteStatus: ProjectStatus | undefined
): ProjectStatus {
  if (codeStatus !== "live") return codeStatus;
  if (remoteStatus === "unavailable" || remoteStatus === "password-protected") {
    return remoteStatus;
  }
  return codeStatus;
}

export async function getVisibleProjects(): Promise<Project[]> {
  const all = await getProjects();
  return sortProjectsForDisplay(all.filter((p) => p.status === "live"));
}

export async function getVideos(): Promise<VideoEntry[]> {
  const override = await readJsonBlob<VideoEntry[]>("content/videos.json");
  return override && override.length > 0 ? override : defaultVideos;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const override = await readJsonBlob<Testimonial[]>(
    "content/testimonials.json"
  );
  return override && override.length > 0 ? override : defaultTestimonials;
}

/** Image représentative par univers/niche (catalogue) — vide par défaut,
 * modifiable depuis /admin/catalog sans toucher au code. */
export async function getNicheImages(): Promise<Record<string, string>> {
  const override = await readJsonBlob<Record<string, string>>(
    "content/niche-images.json"
  );
  return override ?? {};
}

/** Réglages du kit de candidature freelance (/admin/freelance) : TJM et
 * disponibilité, injectés dans les textes générés (lettre de motivation,
 * bio, réponses aux offres...). Non affichés sur le site public. */
export interface FreelanceSettings {
  dailyRate: string;
  availability: string;
  workMode: string;
}

const defaultFreelanceSettings: FreelanceSettings = {
  dailyRate: "",
  availability: "sous 1 à 2 semaines",
  workMode: "à distance ou en présentiel ponctuel",
};

export async function getFreelanceSettings(): Promise<FreelanceSettings> {
  const override = await readJsonBlob<FreelanceSettings>(
    "content/freelance-settings.json"
  );
  return { ...defaultFreelanceSettings, ...override };
}

/** Réglages de la section CV : interrupteur pour l'afficher ou non sur le
 * site, et fichier de référence (PDF ou HTML) envoyé depuis /admin/cv —
 * ce fichier n'est pas affiché directement (la page /cv reste une page
 * HTML bilingue générée depuis le contenu du site, voir cvPage dans
 * messages/*.json, éditable depuis /admin/content ou /admin/cv), il sert
 * uniquement de référence pour mettre à jour ce contenu. */
export interface CvSettings {
  enabled: boolean;
  fileUrl: string;
  fileName: string;
}

const defaultCvSettings: CvSettings = {
  enabled: true,
  fileUrl: "",
  fileName: "",
};

export async function getCvSettings(): Promise<CvSettings> {
  const override = await readJsonBlob<CvSettings>("content/cv-settings.json");
  return { ...defaultCvSettings, ...override };
}

/** Bascules de visibilité pour chaque section de la page d'accueil,
 * modifiables depuis /admin/sections sans toucher au code. Toutes activées
 * par défaut — à désactiver au cas par cas si besoin. */
export interface SectionsSettings {
  heroEnabled: boolean;
  manifestoEnabled: boolean;
  featuredProjectsEnabled: boolean;
  experienceEnabled: boolean;
  videoReelsEnabled: boolean;
  servicesEnabled: boolean;
  testimonialsEnabled: boolean;
  pricingEnabled: boolean;
  painPointsEnabled: boolean;
  expertiseCatalogEnabled: boolean;
  metricsEnabled: boolean;
  processEnabled: boolean;
  techStackEnabled: boolean;
  trustEnabled: boolean;
  faqEnabled: boolean;
  contactEnabled: boolean;
}

const defaultSectionsSettings: SectionsSettings = {
  heroEnabled: true,
  manifestoEnabled: true,
  featuredProjectsEnabled: true,
  experienceEnabled: true,
  videoReelsEnabled: true,
  servicesEnabled: true,
  testimonialsEnabled: true,
  pricingEnabled: true,
  painPointsEnabled: true,
  expertiseCatalogEnabled: true,
  metricsEnabled: true,
  processEnabled: true,
  techStackEnabled: true,
  trustEnabled: true,
  faqEnabled: true,
  contactEnabled: true,
};

export async function getSectionsSettings(): Promise<SectionsSettings> {
  const override = await readJsonBlob<SectionsSettings>(
    "content/sections-settings.json"
  );
  return { ...defaultSectionsSettings, ...override };
}
