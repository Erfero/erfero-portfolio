"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import {
  writeJsonBlob,
  readJsonBlob,
  uploadMediaFile,
  listMedia,
  deleteMedia,
} from "@/lib/blob";
import { getMessages } from "@/lib/content";
import type { Project, ProjectStatus } from "@/data/projects";
import type { VideoEntry } from "@/data/videos";
import type { Testimonial } from "@/data/testimonials";
import type { FreelanceSettings, SectionsSettings, CvSettings } from "@/lib/content";
import { checkOne } from "@/lib/linkChecker";
import { fetchSiteMeta } from "@/lib/siteMeta";
import { captureThumbnail } from "@/lib/captureThumbnail";

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

function normalizeUrl(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  const withScheme = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    const parsed = new URL(withScheme);
    return `${parsed.protocol}//${parsed.hostname}${parsed.pathname === "/" ? "" : parsed.pathname}`;
  } catch {
    return null;
  }
}

function idFromUrl(url: string): string {
  const host = new URL(url).hostname.replace(/^www\./, "");
  const slug = host.split(".")[0].replace(/[^a-zA-Z0-9]/g, "");
  const suffix = Math.random().toString(36).slice(2, 6);
  return `${slug || "boutique"}-${suffix}`;
}

function randomPastelAccent(): string {
  const hue = Math.floor(Math.random() * 360);
  const h = hue / 360;
  const s = 0.35;
  const l = 0.8;
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const r = Math.round(hue2rgb(p, q, h + 1 / 3) * 255);
  const g = Math.round(hue2rgb(p, q, h) * 255);
  const b = Math.round(hue2rgb(p, q, h - 1 / 3) * 255);
  return `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}

export interface QuickAddResult {
  added: Project[];
  skipped: { input: string; reason: string }[];
}

/**
 * Prend une liste brute de liens (un par ligne, collée depuis l'admin) et
 * produit des fiches boutique prêtes à afficher : statut vérifié en HTTP réel
 * (comme le vérificateur automatique), titre/description récupérés depuis la
 * page (et /products.json pour les boutiques Shopify), et — si le lien est
 * en ligne — une capture d'écran figée une bonne fois pour toutes (voir
 * captureThumbnail) plutôt que de dépendre de thum.io à chaque visite.
 * Ne persiste rien : les fiches retournées sont ajoutées à la liste côté
 * admin, qui reste responsable du "Enregistrer" final (comme pour un ajout
 * manuel).
 */
export async function quickAddProjectsAction(
  rawInput: string,
  existingUrls: string[]
): Promise<QuickAddResult> {
  await requireAdmin();

  const existingHosts = new Set(
    existingUrls
      .map((u) => {
        try {
          return new URL(u).hostname.replace(/^www\./, "");
        } catch {
          return null;
        }
      })
      .filter(Boolean)
  );

  const lines = Array.from(
    new Set(
      rawInput
        .split(/\r?\n/)
        .map((l) => l.trim())
        .filter(Boolean)
    )
  );

  const result: QuickAddResult = { added: [], skipped: [] };
  const seenHosts = new Set<string>();
  const thumbnailMap =
    (await readJsonBlob<Record<string, string>>("content/thumbnail-overrides.json")) ?? {};
  let thumbnailMapChanged = false;

  for (const line of lines) {
    const url = normalizeUrl(line);
    if (!url) {
      result.skipped.push({ input: line, reason: "URL invalide" });
      continue;
    }
    const host = new URL(url).hostname.replace(/^www\./, "");
    if (existingHosts.has(host) || seenHosts.has(host)) {
      result.skipped.push({ input: line, reason: "Déjà dans la liste" });
      continue;
    }
    seenHosts.add(host);

    let status: ProjectStatus;
    try {
      status = await checkOne(url);
    } catch {
      status = "unavailable";
    }

    const meta = await fetchSiteMeta(url);
    const displayName = meta.title || host;
    const shortTagline = meta.description
      ? meta.description.slice(0, 70).replace(/\s+\S*$/, "") + "…"
      : "";

    const id = idFromUrl(url);
    const thumbnailOverride =
      status === "live" ? (await captureThumbnail(id, url)) ?? undefined : undefined;
    if (thumbnailOverride) {
      // Marque cette boutique comme déjà capturée en haute résolution, pour
      // que le rafraîchissement quotidien (refreshThumbnails.ts) ne
      // consomme pas de quota microlink.io à la retenter inutilement.
      thumbnailMap[id] = thumbnailOverride;
      thumbnailMapChanged = true;
    }

    result.added.push({
      id,
      url,
      status,
      accent: randomPastelAccent(),
      niche: "unknown",
      videoSrc: "",
      year: new Date().getFullYear(),
      name: { fr: displayName, en: displayName },
      tagline: {
        fr: shortTagline || "À compléter",
        en: shortTagline || "To complete",
      },
      description: {
        fr: meta.description || "Description à compléter.",
        en: meta.description || "Description to complete (auto-fetched text is in French — translate before publishing).",
      },
      tags: { fr: ["Shopify"], en: ["Shopify"] },
      thumbnailOverride,
    });
  }

  if (thumbnailMapChanged) {
    await writeJsonBlob("content/thumbnail-overrides.json", thumbnailMap);
  }

  return result;
}

export async function saveVideosAction(videos: VideoEntry[]) {
  await requireAdmin();
  await writeJsonBlob("content/videos.json", videos);
  revalidatePath("/", "layout");
}

export async function saveTestimonialsAction(testimonials: Testimonial[]) {
  await requireAdmin();
  await writeJsonBlob("content/testimonials.json", testimonials);
  revalidatePath("/", "layout");
}

export async function saveNicheImagesAction(images: Record<string, string>) {
  await requireAdmin();
  await writeJsonBlob("content/niche-images.json", images);
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

export async function saveFreelanceSettingsAction(settings: FreelanceSettings) {
  await requireAdmin();
  await writeJsonBlob("content/freelance-settings.json", settings);
  revalidatePath("/admin/freelance");
}

export async function saveCvSettingsAction(settings: CvSettings) {
  await requireAdmin();
  await writeJsonBlob("content/cv-settings.json", settings);
  revalidatePath("/", "layout");
  revalidatePath("/admin/cv");
}

/** Met à jour uniquement la section "cvPage" du contenu d'une langue, en
 * préservant tous les autres textes déjà personnalisés depuis /admin/content
 * (contrairement à saveContentAction qui réécrit tout le fichier). */
export async function saveCvPageContentAction(
  locale: string,
  cvPage: Record<string, unknown>
) {
  await requireAdmin();
  const current = await getMessages(locale);
  await writeJsonBlob(`content/${locale}.json`, { ...current, cvPage });
  revalidatePath("/", "layout");
  revalidatePath("/admin/cv");
}

export async function saveSectionsSettingsAction(settings: SectionsSettings) {
  await requireAdmin();
  await writeJsonBlob("content/sections-settings.json", settings);
  revalidatePath("/", "layout");
  revalidatePath("/admin/sections");
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
