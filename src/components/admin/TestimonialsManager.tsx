"use client";

import { useState, useTransition } from "react";
import { Plus, Trash2, Save, Check } from "lucide-react";
import { saveTestimonialsAction } from "@/lib/actions";
import type { Testimonial, TestimonialType } from "@/data/testimonials";

const emptyTestimonial = (): Testimonial => ({
  id: `avis-${Date.now()}`,
  type: "whatsapp",
  authorName: "",
  authorRole: { fr: "", en: "" },
  quote: { fr: "", en: "" },
  accent: "#B9FF5C",
});

const inputClass =
  "w-full rounded-lg border border-border bg-white/[0.02] px-3 py-2 text-sm outline-none focus:border-lime/50";

export default function TestimonialsManager({
  initialTestimonials,
}: {
  initialTestimonials: Testimonial[];
}) {
  const [items, setItems] = useState(initialTestimonials);
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  const update = (index: number, patch: Partial<Testimonial>) => {
    setItems((prev) => prev.map((t, i) => (i === index ? { ...t, ...patch } : t)));
  };

  const updateQuote = (index: number, locale: "fr" | "en", value: string) => {
    setItems((prev) =>
      prev.map((t, i) =>
        i === index ? { ...t, quote: { ...t.quote, [locale]: value } } : t
      )
    );
  };

  const updateRole = (index: number, locale: "fr" | "en", value: string) => {
    setItems((prev) =>
      prev.map((t, i) =>
        i === index
          ? { ...t, authorRole: { ...(t.authorRole ?? { fr: "", en: "" }), [locale]: value } }
          : t
      )
    );
  };

  const addItem = () => setItems((prev) => [...prev, emptyTestimonial()]);
  const removeItem = (index: number) =>
    setItems((prev) => prev.filter((_, i) => i !== index));

  const handleSave = () => {
    startTransition(async () => {
      await saveTestimonialsAction(items);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    });
  };

  return (
    <div className="mt-6">
      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((item, i) => (
          <div
            key={item.id}
            className="flex flex-col gap-3 rounded-2xl border border-border bg-white/[0.02] p-5"
          >
            <div className="flex items-center gap-2">
              <select
                value={item.type}
                onChange={(e) =>
                  update(i, { type: e.target.value as TestimonialType })
                }
                className={inputClass}
              >
                <option value="whatsapp">WhatsApp</option>
                <option value="instagram">Instagram</option>
                <option value="agency">Avis agence</option>
                <option value="delivery">Confirmation de livraison</option>
              </select>
              <button
                onClick={() => removeItem(i)}
                className="grid size-8 shrink-0 place-items-center rounded-lg border border-border text-red-400 hover:bg-red-500/10"
              >
                <Trash2 className="size-4" />
              </button>
            </div>

            <input
              value={item.authorName}
              onChange={(e) => update(i, { authorName: e.target.value })}
              className={inputClass}
              placeholder="Nom / pseudo"
            />

            {item.type === "agency" && (
              <input
                type="number"
                min={1}
                max={5}
                value={item.rating ?? 5}
                onChange={(e) => update(i, { rating: Number(e.target.value) })}
                className={inputClass}
                placeholder="Note (1-5)"
              />
            )}

            {(item.type === "whatsapp" || item.type === "agency") && (
              <>
                <input
                  value={item.authorRole?.fr ?? ""}
                  onChange={(e) => updateRole(i, "fr", e.target.value)}
                  className={inputClass}
                  placeholder="Rôle / provenance (FR)"
                />
                <input
                  value={item.authorRole?.en ?? ""}
                  onChange={(e) => updateRole(i, "en", e.target.value)}
                  className={inputClass}
                  placeholder="Rôle / provenance (EN)"
                />
              </>
            )}

            <textarea
              value={item.quote.fr}
              onChange={(e) => updateQuote(i, "fr", e.target.value)}
              rows={2}
              className={inputClass}
              placeholder="Message (FR)"
            />
            <textarea
              value={item.quote.en}
              onChange={(e) => updateQuote(i, "en", e.target.value)}
              rows={2}
              className={inputClass}
              placeholder="Message (EN)"
            />

            <input
              type="color"
              value={item.accent}
              onChange={(e) => update(i, { accent: e.target.value })}
              className="h-8 w-full rounded-lg border border-border bg-white/[0.02]"
            />
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-3">
        <button
          onClick={addItem}
          className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm"
        >
          <Plus className="size-4" />
          Ajouter un avis
        </button>
        <button
          onClick={handleSave}
          disabled={isPending}
          className="inline-flex items-center gap-1.5 rounded-full bg-lime px-5 py-2 text-sm font-medium text-bg disabled:opacity-60"
        >
          {saved ? <Check className="size-4" /> : <Save className="size-4" />}
          {isPending ? "Enregistrement..." : saved ? "Enregistré" : "Enregistrer"}
        </button>
      </div>
    </div>
  );
}
