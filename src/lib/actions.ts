"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import {
  writeJsonBlob,
  uploadMediaFile,
  listMedia,
  deleteMedia,
} from "@/lib/blob";
import type { Project } from "@/data/projects";
import type { VideoEntry } from "@/data/videos";

async function requireAdmin() {
  const session = await auth();
  if (!session) throw new Error("Non autorisé");
}

export async function saveProjectsAction(projects: Project[]) {
  await requireAdmin();
  await writeJsonBlob("content/projects.json", projects);
  revalidatePath("/", "layout");
  revalidatePath("/[locale]", "page");
  revalidatePath("/[locale]/realisations", "page");
}

export async function saveVideosAction(videos: VideoEntry[]) {
  await requireAdmin();
  await writeJsonBlob("content/videos.json", videos);
  revalidatePath("/", "layout");
}

export async function saveContentAction(
  locale: string,
  data: Record<string, unknown>
) {
  await requireAdmin();
  await writeJsonBlob(`content/${locale}.json`, data);
  revalidatePath("/", "layout");
}

export async function listMediaAction() {
  await requireAdmin();
  return listMedia();
}

export async function uploadMediaAction(formData: FormData) {
  await requireAdmin();
  const file = formData.get("file") as File | null;
  if (!file || file.size === 0) throw new Error("Aucun fichier reçu");
  const url = await uploadMediaFile(file.name, file);
  revalidatePath("/admin/media");
  return url;
}

export async function deleteMediaAction(url: string) {
  await requireAdmin();
  await deleteMedia(url);
  revalidatePath("/admin/media");
}
