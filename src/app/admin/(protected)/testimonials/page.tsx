import { getTestimonials } from "@/lib/content";
import TestimonialsManager from "@/components/admin/TestimonialsManager";

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold">Témoignages</h1>
      <p className="mt-1 text-sm text-ink-muted">
        Retours clients (WhatsApp, Instagram, livraisons) et avis d&apos;agences.
        Remplace le contenu de départ par tes vrais retours dès que tu les as.
      </p>

      <TestimonialsManager initialTestimonials={testimonials} />
    </div>
  );
}
