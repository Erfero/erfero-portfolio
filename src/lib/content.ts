import "server-only";
import frDefault from "@/messages/fr.json";
import enDefault from "@/messages/en.json";
import { projects as defaultProjects, type Project } from "@/data/projects";
import { videos as defaultVideos, type VideoEntry } from "@/data/videos";
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

export async function getProjects(): Promise<Project[]> {
  const override = await readJsonBlob<Project[]>("content/projects.json");
  return override && override.length > 0 ? override : defaultProjects;
}

export async function getVisibleProjects(): Promise<Project[]> {
  const all = await getProjects();
  return all.filter((p) => p.status === "live");
}

export async function getVideos(): Promise<VideoEntry[]> {
  const override = await readJsonBlob<VideoEntry[]>("content/videos.json");
  return override && override.length > 0 ? override : defaultVideos;
}
