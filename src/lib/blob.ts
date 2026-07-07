import { supabaseAdmin, SUPABASE_BUCKET } from "./supabase";

/**
 * Petite couche au-dessus de Supabase Storage pour stocker à la fois les
 * fichiers uploadés (vidéos/images) et des documents JSON "config" (textes
 * du site, liste des boutiques, liste des vidéos) qu'on peut réécrire depuis
 * l'admin sans jamais toucher au code ni redéployer.
 */

function withRandomSuffix(pathname: string) {
  const dot = pathname.lastIndexOf(".");
  const suffix = Math.random().toString(36).slice(2, 10);
  if (dot === -1) return `${pathname}-${suffix}`;
  return `${pathname.slice(0, dot)}-${suffix}${pathname.slice(dot)}`;
}

export async function readJsonBlob<T>(pathname: string): Promise<T | null> {
  try {
    const { data, error } = await supabaseAdmin.storage
      .from(SUPABASE_BUCKET)
      .download(pathname);
    if (error || !data) return null;
    return JSON.parse(await data.text()) as T;
  } catch {
    return null;
  }
}

export async function writeJsonBlob(pathname: string, data: unknown) {
  const body = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  await supabaseAdmin.storage.from(SUPABASE_BUCKET).upload(pathname, body, {
    upsert: true,
    contentType: "application/json",
  });
}

export async function uploadMediaFile(pathname: string, file: File) {
  const path = withRandomSuffix(`media/${pathname}`);
  const { error } = await supabaseAdmin.storage
    .from(SUPABASE_BUCKET)
    .upload(path, file, { upsert: true, contentType: file.type });
  if (error) throw error;
  const { data } = supabaseAdmin.storage.from(SUPABASE_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

export async function listMedia() {
  const { data, error } = await supabaseAdmin.storage
    .from(SUPABASE_BUCKET)
    .list("media", { sortBy: { column: "created_at", order: "desc" } });
  if (error || !data) return [];
  return data
    .filter((item) => item.id)
    .map((item) => {
      const path = `media/${item.name}`;
      const { data: urlData } = supabaseAdmin.storage
        .from(SUPABASE_BUCKET)
        .getPublicUrl(path);
      return {
        url: urlData.publicUrl,
        pathname: path,
        size: item.metadata?.size ?? 0,
        uploadedAt: item.created_at ?? new Date().toISOString(),
      };
    });
}

export async function deleteMedia(url: string) {
  const marker = `/object/public/${SUPABASE_BUCKET}/`;
  const idx = url.indexOf(marker);
  if (idx === -1) return;
  const pathname = decodeURIComponent(url.slice(idx + marker.length));
  await supabaseAdmin.storage.from(SUPABASE_BUCKET).remove([pathname]);
}
