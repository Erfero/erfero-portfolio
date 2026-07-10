"use client";

import { useRef, useState, useTransition } from "react";
import {
  Upload,
  Check,
  Save,
  FileText,
  ExternalLink,
  AlertCircle,
} from "lucide-react";
import {
  saveCvSettingsAction,
  saveCvPageContentAction,
} from "@/lib/actions";
import type { CvSettings } from "@/lib/content";
import { RecursiveField, type JsonObject } from "./ContentEditor";

export default function CvManager({
  initialSettings,
  initialCvPage,
}: {
  initialSettings: CvSettings;
  initialCvPage: { fr: JsonObject; en: JsonObject };
}) {
  const [savedSettings, setSavedSettings] = useState(initialSettings);
  const [settings, setSettings] = useState(initialSettings);
  const [uploading, setUploading] = useState(false);
  const [isPendingSettings, startSettingsTransition] = useTransition();
  const [justSavedSettings, setJustSavedSettings] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const [cvPage, setCvPage] = useState(initialCvPage);
  const [locale, setLocale] = useState<"fr" | "en">("fr");
  const [isPendingContent, startContentTransition] = useTransition();
  const [justSavedContent, setJustSavedContent] = useState(false);

  const isSettingsDirty =
    JSON.stringify(settings) !== JSON.stringify(savedSettings);

  const handleUpload = async (files: FileList | null) => {
    const file = files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("pathname", `cv-source/${file.name}`);
      const res = await fetch("/api/media/upload", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error((await res.json()).error ?? "Échec de l'upload");
      const { url } = await res.json();
      setSettings((prev) => ({ ...prev, fileUrl: url, fileName: file.name }));
    } catch (err) {
      alert(`Échec de l'upload : ${(err as Error).message}`);
    }
    setUploading(false);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleSaveSettings = () => {
    startSettingsTransition(async () => {
      await saveCvSettingsAction(settings);
      setSavedSettings(settings);
      setJustSavedSettings(true);
      setTimeout(() => setJustSavedSettings(false), 2500);
    });
  };

  const handleSaveContent = () => {
    startContentTransition(async () => {
      await saveCvPageContentAction(locale, cvPage[locale]);
      setJustSavedContent(true);
      setTimeout(() => setJustSavedContent(false), 2500);
    });
  };

  return (
    <div className="mt-6 flex flex-col gap-6">
      <div className="rounded-2xl border border-border bg-white/[0.02] p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-base font-medium">
              Afficher le CV sur le site
            </h2>
            <p className="mt-1 text-xs text-ink-muted">
              Une fois activé <strong>et enregistré</strong>, un lien « CV »
              apparaît dans le menu du site, vers la page CV (HTML,
              bilingue FR/EN, avec un bouton imprimer/enregistrer en PDF).
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
        <h2 className="font-display text-base font-medium">
          Fichier de référence (PDF ou HTML)
        </h2>
        <p className="mt-1 text-xs text-ink-muted">
          Ce fichier n&apos;est <strong>pas affiché directement</strong> sur
          le site (la page CV reste la page HTML ci-dessous) : il sert
          uniquement de référence pour toi, ou pour demander une mise à jour
          du contenu affiché à partir de ce document.
        </p>

        {settings.fileUrl ? (
          <a
            href={settings.fileUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-4 flex items-center gap-2 rounded-xl border border-lime/30 bg-lime/[0.04] px-4 py-3 text-sm text-ink hover:border-lime/50"
          >
            <FileText className="size-4 shrink-0 text-lime" />
            <span className="truncate">{settings.fileName || settings.fileUrl}</span>
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
            {uploading ? "Envoi en cours..." : "Clique pour envoyer ton CV (.pdf ou .html)"}
          </span>
          <input
            ref={inputRef}
            type="file"
            accept="application/pdf,text/html"
            className="hidden"
            disabled={uploading}
            onChange={(e) => handleUpload(e.target.files)}
          />
        </label>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={handleSaveSettings}
          disabled={isPendingSettings || (!isSettingsDirty && !justSavedSettings)}
          className="inline-flex w-fit items-center gap-1.5 rounded-full bg-lime px-5 py-2.5 text-sm font-medium text-bg disabled:opacity-40"
        >
          {justSavedSettings ? <Check className="size-4" /> : <Save className="size-4" />}
          {isPendingSettings
            ? "Enregistrement..."
            : justSavedSettings
              ? "Enregistré"
              : "Enregistrer"}
        </button>
        {isSettingsDirty && !isPendingSettings && (
          <span className="text-xs text-amber-400">
            Modifications non enregistrées
          </span>
        )}
      </div>

      <div className="rounded-2xl border border-border bg-white/[0.02] p-5">
        <h2 className="font-display text-base font-medium">
          Contenu affiché sur la page CV
        </h2>
        <p className="mt-1 text-xs text-ink-muted">
          C&apos;est ce texte (profil, expériences, formation, compétences...)
          qui s&apos;affiche réellement sur <code>/cv</code>, en français et en
          anglais. Modifie-le ici pour mettre à jour ton CV, par exemple à
          partir du fichier de référence envoyé ci-dessus.
        </p>

        <div className="mb-4 mt-5 flex items-center gap-2">
          {(["fr", "en"] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLocale(l)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium uppercase ${
                locale === l
                  ? "border-lime bg-lime/10 text-lime"
                  : "border-border text-ink-muted"
              }`}
            >
              {l}
            </button>
          ))}
        </div>

        <RecursiveField
          value={cvPage[locale]}
          onChange={(next) =>
            setCvPage((prev) => ({ ...prev, [locale]: next as JsonObject }))
          }
        />

        <div className="mt-6 flex items-center gap-3">
          <button
            onClick={handleSaveContent}
            disabled={isPendingContent}
            className="inline-flex w-fit items-center gap-1.5 rounded-full bg-lime px-5 py-2.5 text-sm font-medium text-bg disabled:opacity-40"
          >
            {justSavedContent ? <Check className="size-4" /> : <Save className="size-4" />}
            {isPendingContent
              ? "Enregistrement..."
              : justSavedContent
                ? "Enregistré"
                : `Enregistrer (${locale.toUpperCase()})`}
          </button>
        </div>
      </div>
    </div>
  );
}
