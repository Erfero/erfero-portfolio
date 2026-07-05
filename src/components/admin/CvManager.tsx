"use client";

import { useRef, useState, useTransition } from "react";
import { upload } from "@vercel/blob/client";
import { Upload, Check, Save, FileText, ExternalLink, AlertCircle } from "lucide-react";
import { saveCvSettingsAction } from "@/lib/actions";
import type { CvSettings } from "@/lib/content";

export default function CvManager({ initial }: { initial: CvSettings }) {
  const [savedSettings, setSavedSettings] = useState(initial);
  const [settings, setSettings] = useState(initial);
  const [uploading, setUploading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [justSaved, setJustSaved] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const isDirty = JSON.stringify(settings) !== JSON.stringify(savedSettings);

  const handleUpload = async (files: FileList | null) => {
    const file = files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const blob = await upload("cv/erfero-keoula-cv.pdf", file, {
        access: "public",
        handleUploadUrl: "/api/media/upload",
      });
      setSettings((prev) => ({ ...prev, url: blob.url }));
    } catch (err) {
      alert(`Échec de l'upload : ${(err as Error).message}`);
    }
    setUploading(false);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleSave = () => {
    startTransition(async () => {
      await saveCvSettingsAction(settings);
      setSavedSettings(settings);
      setJustSaved(true);
      setTimeout(() => setJustSaved(false), 2500);
    });
  };

  const fileName = settings.url ? decodeURIComponent(settings.url.split("/").pop() ?? "") : "";

  return (
    <div className="mt-6 flex flex-col gap-6">
      <div className="rounded-2xl border border-border bg-white/[0.02] p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-base font-medium">
              Afficher le lien CV sur le site
            </h2>
            <p className="mt-1 text-xs text-ink-muted">
              Une fois activé <strong>et enregistré</strong>, un lien « CV »
              apparaît dans le menu du site. Au clic, le PDF s&apos;ouvre dans
              un nouvel onglet.
            </p>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-1.5">
            <span
              className={`text-xs font-semibold ${
                settings.enabled ? "text-lime" : "text-ink-muted"
              }`}
            >
              {settings.enabled ? "Activé" : "Désactivé"}
            </span>
            <button
              onClick={() => setSettings((s) => ({ ...s, enabled: !s.enabled }))}
              aria-pressed={settings.enabled}
              className={`relative h-7 w-12 rounded-full transition-colors ${
                settings.enabled ? "bg-lime" : "bg-white/10"
              }`}
            >
              <span
                className={`absolute top-1 size-5 rounded-full bg-bg transition-transform ${
                  settings.enabled ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-white/[0.02] p-5">
        <h2 className="font-display text-base font-medium">Fichier PDF</h2>
        <p className="mt-1 text-xs text-ink-muted">
          Uploade ton CV au format PDF. Un nouvel envoi remplace le lien
          utilisé sur le site (n&apos;oublie pas d&apos;enregistrer après).
        </p>

        {settings.url ? (
          <a
            href={settings.url}
            target="_blank"
            rel="noreferrer"
            className="mt-4 flex items-center gap-2 rounded-xl border border-lime/30 bg-lime/[0.04] px-4 py-3 text-sm text-ink hover:border-lime/50"
          >
            <FileText className="size-4 shrink-0 text-lime" />
            <span className="truncate">{fileName || settings.url}</span>
            <ExternalLink className="ml-auto size-3.5 shrink-0 text-ink-muted" />
          </a>
        ) : (
          <p className="mt-4 flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-ink-muted">
            <AlertCircle className="size-4 shrink-0" />
            Aucun fichier envoyé pour l&apos;instant.
          </p>
        )}

        <label className="mt-4 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border p-8 text-center transition-colors hover:border-lime/40">
          <Upload className="size-6 text-lime" />
          <span className="text-sm font-medium">
            {uploading ? "Envoi en cours..." : "Clique pour choisir ton CV (.pdf)"}
          </span>
          <input
            ref={inputRef}
            type="file"
            accept="application/pdf"
            className="hidden"
            disabled={uploading}
            onChange={(e) => handleUpload(e.target.files)}
          />
        </label>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={handleSave}
          disabled={isPending || (!isDirty && !justSaved)}
          className="inline-flex w-fit items-center gap-1.5 rounded-full bg-lime px-5 py-2.5 text-sm font-medium text-bg disabled:opacity-40"
        >
          {justSaved ? <Check className="size-4" /> : <Save className="size-4" />}
          {isPending ? "Enregistrement..." : justSaved ? "Enregistré" : "Enregistrer"}
        </button>
        {isDirty && !isPending && (
          <span className="text-xs text-amber-400">
            Modifications non enregistrées
          </span>
        )}
      </div>
    </div>
  );
}
