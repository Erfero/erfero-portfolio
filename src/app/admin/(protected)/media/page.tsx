import { listMedia } from "@/lib/blob";
import MediaManager from "@/components/admin/MediaManager";

export default async function MediaPage() {
  const media = await listMedia();

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold">Médiathèque</h1>
      <p className="mt-1 text-sm text-ink-muted">
        Upload tes vidéos (format vertical .mp4) et images. Copie l&apos;URL
        générée pour l&apos;utiliser dans la section Boutiques.
      </p>

      <MediaManager initialMedia={media} />
    </div>
  );
}
