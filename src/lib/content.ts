import "server-only";
import frDefault from "@/messages/fr.json";
import enDefault from "@/messages/en.json";
import {
  projects as defaultProjects,
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
  return all.filter((p) => p.status === "live");
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
