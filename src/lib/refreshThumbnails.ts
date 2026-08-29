import "server-only";
import { getProjects } from "./content";
import { readJsonBlob, writeJsonBlob } from "./blob";
import { captureThumbnail } from "./captureThumbnail";

/** microlink.io autorise 25 requêtes/jour sans clé API. On en garde une
 * partie pour l'ajout rapide depuis l'admin (voir quickAddProjectsAction),
 * donc le rafraîchissement automatique ne consomme qu'une partie du quota
 * par passage — le reste du catalogue est repris au(x) passage(s) suivant(s)
 * (ce endpoint est appelé une fois par jour, voir .github/workflows). */
const DAILY_BATCH_SIZE = 15;

export interface ThumbnailRefreshResult {
  captured: string[];
  failed: string[];
  remaining: number;
}

/**
 * Capture une capture d'écran haute résolution (microlink.io) pour chaque
 * boutique en ligne qui n'a pas encore de capture "à jour" — c'est-à-dire
 * absente de content/thumbnail-overrides.json, qu'elle ait ou non une
 * ancienne capture thum.io figée dans le code. Une fois qu'une boutique est
 * passée ici, elle n'est plus retentée : ce fichier ne sert qu'à monter le
 * catalogue en qualité une fois, pas à répéter la capture à chaque passage.
 */
export async function refreshThumbnails(): Promise<ThumbnailRefreshResult> {
  const [projects, thumbnailMap] = await Promise.all([
    getProjects(),
    readJsonBlob<Record<string, string>>("content/thumbnail-overrides.json"),
  ]);

  const map = { ...(thumbnailMap ?? {}) };
  const candidates = projects.filter(
    (p) => p.status === "live" && !map[p.id]
  );

  const batch = candidates.slice(0, DAILY_BATCH_SIZE);
  const captured: string[] = [];
  const failed: string[] = [];

  for (const project of batch) {
    const url = await captureThumbnail(project.id, project.url);
    if (url) {
      map[project.id] = url;
      captured.push(project.id);
    } else {
      failed.push(project.id);
    }
  }

  if (captured.length > 0) {
    await writeJsonBlob("content/thumbnail-overrides.json", map);
  }

  return {
    captured,
    failed,
    remaining: candidates.length - batch.length,
  };
}
