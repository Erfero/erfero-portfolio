"use client";

import { useState, useTransition } from "react";
import { Plus, Trash2, Save, Check } from "lucide-react";
import { saveVideosAction } from "@/lib/actions";
import type { VideoEntry } from "@/data/videos";

const emptyVideo = (): VideoEntry => ({
  id: `video-${Date.now()}`,
  src: "",
  caption: { fr: "", en: "" },
  accent: "#B9FF5C",
});

const inputClass =
  "w-full rounded-lg border border-border bg-white/[0.02] px-3 py-2 text-sm outline-none focus:border-lime/50";

export default function VideosManager({
  initialVideos,
  mediaUrls,
}: {
  initialVideos: VideoEntry[];
  mediaUrls: string[];
}) {
  const [videos, setVideos] = useState(initialVideos);
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  const update = (index: number, patch: Partial<VideoEntry>) => {
    setVideos((prev) => prev.map((v, i) => (i === index ? { ...v, ...patch } : v)));
  };

  const updateCaption = (index: number, locale: "fr" | "en", value: string) => {
    setVideos((prev) =>
      prev.map((v, i) =>
        i === index ? { ...v, caption: { ...v.caption, [locale]: value } } : v
      )
    );
  };

  const addVideo = () => setVideos((prev) => [...prev, emptyVideo()]);
  const removeVideo = (index: number) =>
    setVideos((prev) => prev.filter((_, i) => i !== index));

  const handleSave = () => {
    startTransition(async () => {
      await saveVideosAction(videos);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    });
  };

  return (
    <div className="mt-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((video, i) => (
          <div
            key={video.id}
            className="flex flex-col gap-3 rounded-2xl border border-border bg-white/[0.02] p-5"
          >
            <div className="flex items-center justify-between">
              <input
                value={video.id}
                onChange={(e) => update(i, { id: e.target.value })}
                className={inputClass}
                placeholder="identifiant"
              />
              <button
                onClick={() => removeVideo(i)}
                className="ml-2 grid size-8 shrink-0 place-items-center rounded-lg border border-border text-red-400 hover:bg-red-500/10"
              >
                <Trash2 className="size-4" />
              </button>
            </div>

            <input
              list={`video-media-${i}`}
              value={video.src}
              onChange={(e) => update(i, { src: e.target.value })}
              className={inputClass}
              placeholder="URL vidéo (Médiathèque)"
            />
            <datalist id={`video-media-${i}`}>
              {mediaUrls.map((url) => (
                <option key={url} value={url} />
              ))}
            </datalist>

            <input
              value={video.caption.fr}
              onChange={(e) => updateCaption(i, "fr", e.target.value)}
              className={inputClass}
              placeholder="Légende (FR)"
            />
            <input
              value={video.caption.en}
              onChange={(e) => updateCaption(i, "en", e.target.value)}
              className={inputClass}
              placeholder="Légende (EN)"
            />
            <input
              type="color"
              value={video.accent}
              onChange={(e) => update(i, { accent: e.target.value })}
              className="h-8 w-full rounded-lg border border-border bg-white/[0.02]"
            />
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-3">
        <button
          onClick={addVideo}
          className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm"
        >
          <Plus className="size-4" />
          Ajouter une vidéo
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
