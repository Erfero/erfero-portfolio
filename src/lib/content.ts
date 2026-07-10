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
 * plus ancien.
 */
export async function getProjects(): Promise<Project[]> {
  const [override, statusMap] = await Promise.all([
    readJsonBlob<Project[]>("content/projects.json"),
    readJsonBlob<Record<string, ProjectStatus>>("content/project-status.json"),
  ]);
  const base = override && override.length > 0 ? override : defaultProjects;
  if (!statusMap) return base;
  return base.map((p) =>
    statusMap[p.id] ? { ...p, status: statusMap[p.id] } : p
  );
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


/** Bascules de visibilité pour chaque section de la page d'accueil,
 * modifiables depuis /admin/sections sans toucher au code. Toutes activées
 * par défaut — à désactiver au cas par cas si besoin. */
export interface SectionsSettings {
  heroEnabled: boolean;
  featuredProjectsEnabled: boolean;
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
  featuredProjectsEnabled: true,
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
