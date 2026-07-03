import type { Project } from "@/data/projects";
import type { VideoEntry } from "@/data/videos";

/** Vidéo du mur "vidéos" en priorité, sinon retombe sur le champ vidéo direct
 * de la boutique (utile si tu attaches une vidéo depuis l'admin Boutiques
 * sans créer d'entrée séparée dans le mur de vidéos). */
export function resolveRelatedVideo(
  project: Project,
  videos: VideoEntry[]
): VideoEntry | undefined {
  const fromWall = videos.find((v) => v.id === project.id);
  if (fromWall) return fromWall;
  if (!project.videoSrc) return undefined;

  return {
    id: project.id,
    src: project.videoSrc,
    accent: project.accent,
    caption: project.name,
  };
}
