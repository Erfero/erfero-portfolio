import { getTestimonials } from "@/lib/content";
import { listMedia } from "@/lib/blob";
import TestimonialsManager from "@/components/admin/TestimonialsManager";

export default async function TestimonialsPage() {
  const [testimonials, media] = await Promise.all([
    getTestimonials(),
    listMedia(),
  ]);

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold">Témoignages</h1>
      <p className="mt-1 text-sm text-ink-muted">
        Retours clients (WhatsApp, Instagram, livraisons, captures, vidéos) et
        avis d&apos;agences. Remplace le contenu de départ par tes vrais
        retours dès que tu les as (upload d&apos;abord dans la Médiathèque).
      </p>

      <TestimonialsManager
        initialTestimonials={testimonials}
        mediaUrls={media.map((m) => m.url)}
      />
    </div>
  );
}
