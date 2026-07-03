"use client";

import { useState, useTransition } from "react";
import { Save, Check } from "lucide-react";
import { saveNicheImagesAction } from "@/lib/actions";

interface NicheEntry {
  key: string;
  label: string;
  count: number;
}

export default function NicheImagesManager({
  niches,
  initialImages,
  mediaUrls,
}: {
  niches: NicheEntry[];
  initialImages: Record<string, string>;
  mediaUrls: string[];
}) {
  const [images, setImages] = useState(initialImages);
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  const update = (niche: string, url: string) => {
    setImages((prev) => {
      const next = { ...prev };
      if (url) next[niche] = url;
      else delete next[niche];
      return next;
    });
  };

  const handleSave = () => {
    startTransition(async () => {
      await saveNicheImagesAction(images);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    });
  };

  return (
    <div className="mt-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {niches.map(({ key, label, count }) => (
          <div
            key={key}
            className="rounded-2xl border border-border bg-white/[0.02] p-5"
          >
            <p className="font-medium">{label}</p>
            <p className="text-xs text-ink-muted">
              {count} boutique{count > 1 ? "s" : ""}
            </p>

            {images[key] && (
              <img
                src={images[key]}
                alt={label}
                className="mt-3 h-24 w-full rounded-lg object-cover"
              />
            )}

            <input
              list={`niche-media-${key}`}
              value={images[key] ?? ""}
              onChange={(e) => update(key, e.target.value)}
              placeholder="URL depuis la Médiathèque"
              className="mt-3 w-full rounded-lg border border-border bg-white/[0.02] px-3 py-2 text-sm outline-none focus:border-lime/50"
            />
            <datalist id={`niche-media-${key}`}>
              {mediaUrls.map((url) => (
                <option key={url} value={url} />
              ))}
            </datalist>
          </div>
        ))}
      </div>

      <button
        onClick={handleSave}
        disabled={isPending}
        className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-lime px-5 py-2 text-sm font-medium text-bg disabled:opacity-60"
      >
        {saved ? <Check className="size-4" /> : <Save className="size-4" />}
        {isPending ? "Enregistrement..." : saved ? "Enregistré" : "Enregistrer"}
      </button>
    </div>
  );
}
