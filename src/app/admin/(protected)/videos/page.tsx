import { getVideos } from "@/lib/content";
import { listMedia } from "@/lib/blob";
import VideosManager from "@/components/admin/VideosManager";

export default async function VideosPage() {
  const [videos, media] = await Promise.all([getVideos(), listMedia()]);

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold">Mur de vidéos</h1>
      <p className="mt-1 text-sm text-ink-muted">
        Toutes les vidéos affichées sur la page d&apos;accueil et la page
        Réalisations, qu&apos;elles soient liées ou non à une boutique.
      </p>

      <VideosManager
        initialVideos={videos}
        mediaUrls={media.map((m) => m.url)}
      />
    </div>
  );
}
