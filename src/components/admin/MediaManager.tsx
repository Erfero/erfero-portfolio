"use client";

import { useRef, useState, useTransition } from "react";
import { Upload, Trash2, Copy, Check, Music } from "lucide-react";
import { deleteMediaAction } from "@/lib/actions";

interface MediaItem {
  url: string;
  pathname: string;
  size: number;
  uploadedAt: Date | string;
}

export default function MediaManager({
  initialMedia,
}: {
  initialMedia: MediaItem[];
}) {
  const [media, setMedia] = useState(initialMedia);
  const [progress, setProgress] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    for (const file of Array.from(files)) {
      setProgress(`Envoi de ${file.name}...`);
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("pathname", `media/${file.name}`);
        const res = await fetch("/api/media/upload", { method: "POST", body: formData });
        if (!res.ok) throw new Error((await res.json()).error ?? "Échec de l'upload");
        const { url, pathname } = await res.json();
        setMedia((prev) => [
          { url, pathname, size: file.size, uploadedAt: new Date() },
          ...prev,
        ]);
      } catch (err) {
        alert(`Échec de l'upload de ${file.name} : ${(err as Error).message}`);
      }
    }
    setProgress(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleDelete = (url: string) => {
    startTransition(async () => {
      await deleteMediaAction(url);
      setMedia((prev) => prev.filter((m) => m.url !== url));
    });
  };

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopied(url);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="mt-6">
      <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border p-10 text-center transition-colors hover:border-lime/40">
        <Upload className="size-6 text-lime" />
        <span className="text-sm font-medium">
          Clique pour choisir un ou plusieurs fichiers
        </span>
        <span className="text-xs text-ink-muted">
          Vidéos .mp4 et images (png/jpg/webp)
        </span>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="video/mp4,video/quicktime,image/*,audio/mpeg,audio/mp3,audio/wav"
          className="hidden"
          onChange={(e) => handleUpload(e.target.files)}
        />
      </label>

      {progress && (
        <p className="mt-3 text-sm text-lime">{progress}</p>
      )}

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {media.map((item) => {
          const isVideo = /\.(mp4|mov)$/i.test(item.pathname);
          const isAudio = /\.(mp3|wav)$/i.test(item.pathname);
          return (
            <div
              key={item.url}
              className="group relative overflow-hidden rounded-xl border border-border bg-white/[0.02]"
            >
              {isVideo ? (
                <video src={item.url} muted className="aspect-square w-full object-cover" />
              ) : isAudio ? (
                <div className="flex aspect-square w-full flex-col items-center justify-center gap-2 bg-white/[0.03] p-3">
                  <Music className="size-6 text-lime" />
                  <audio src={item.url} controls className="w-full" />
                </div>
              ) : (
                <img src={item.url} alt="" className="aspect-square w-full object-cover" />
              )}

              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                <button
                  onClick={() => handleCopy(item.url)}
                  className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs text-white"
                >
                  {copied === item.url ? (
                    <Check className="size-3.5" />
                  ) : (
                    <Copy className="size-3.5" />
                  )}
                  Copier l&apos;URL
                </button>
                <button
                  onClick={() => handleDelete(item.url)}
                  disabled={isPending}
                  className="flex items-center gap-1.5 rounded-full bg-red-500/20 px-3 py-1.5 text-xs text-red-300"
                >
                  <Trash2 className="size-3.5" />
                  Supprimer
                </button>
              </div>

              <p className="truncate p-2 text-[11px] text-ink-muted">
                {item.pathname.replace("media/", "")}
              </p>
            </div>
          );
        })}
      </div>

      {media.length === 0 && (
        <p className="mt-6 text-sm text-ink-muted">
          Aucun fichier pour l&apos;instant.
        </p>
      )}
    </div>
  );
}
