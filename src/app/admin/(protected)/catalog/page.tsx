import { getVisibleProjects, getNicheImages, getMessages } from "@/lib/content";
import { listMedia } from "@/lib/blob";
import NicheImagesManager from "@/components/admin/NicheImagesManager";

export default async function CatalogAdminPage() {
  const [projects, images, media, messages] = await Promise.all([
    getVisibleProjects(),
    getNicheImages(),
    listMedia(),
    getMessages("fr"),
  ]);

  const counts = new Map<string, number>();
  for (const p of projects) {
    if (p.niche === "unknown") continue;
    counts.set(p.niche, (counts.get(p.niche) ?? 0) + 1);
  }

  const nicheLabels = (
    messages as { catalog?: { niches?: Record<string, string> } }
  ).catalog?.niches ?? {};

  const niches = Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([key, count]) => ({ key, count, label: nicheLabels[key] ?? key }));

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold">Catalogue</h1>
      <p className="mt-1 text-sm text-ink-muted">
        Ajoute une image représentative par univers (upload d&apos;abord dans
        la Médiathèque, puis colle son URL ici). Sans image, l&apos;icône par
        défaut reste affichée.
      </p>

      <NicheImagesManager
        niches={niches}
        initialImages={images}
        mediaUrls={media.map((m) => m.url)}
      />
    </div>
  );
}
