import { list, put, del } from "@vercel/blob";

/**
 * Petite couche au-dessus de Vercel Blob pour stocker à la fois les fichiers
 * uploadés (vidéos/images) et des documents JSON "config" (textes du site,
 * liste des boutiques, liste des vidéos) qu'on peut réécrire depuis l'admin
 * sans jamais toucher au code ni redéployer.
 */

export async function readJsonBlob<T>(pathname: string): Promise<T | null> {
  try {
    const { blobs } = await list({ prefix: pathname, limit: 1 });
    const match = blobs.find((b) => b.pathname === pathname);
    if (!match) return null;

    const res = await fetch(match.url, { next: { revalidate: 30 } });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function writeJsonBlob(pathname: string, data: unknown) {
  await put(pathname, JSON.stringify(data, null, 2), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
}

export async function uploadMediaFile(pathname: string, file: File) {
  const blob = await put(`media/${pathname}`, file, {
    access: "public",
    addRandomSuffix: true,
  });
  return blob.url;
}

export async function listMedia() {
  const { blobs } = await list({ prefix: "media/" });
  return blobs
    .map((b) => ({
      url: b.url,
      pathname: b.pathname,
      size: b.size,
      uploadedAt: b.uploadedAt,
    }))
    .sort(
      (a, b) =>
        new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    );
}

export async function deleteMedia(url: string) {
  await del(url);
}
