"use client";

import { useState, useTransition } from "react";
import { Plus, Trash2, Save, Check } from "lucide-react";
import { saveProjectsAction } from "@/lib/actions";
import type { Project, ProjectStatus } from "@/data/projects";

const emptyProject = (): Project => ({
  id: `boutique-${Date.now()}`,
  url: "",
  status: "password-protected",
  accent: "#B9FF5C",
  niche: "",
  videoSrc: "",
  year: new Date().getFullYear(),
  name: { fr: "", en: "" },
  tagline: { fr: "", en: "" },
  description: { fr: "", en: "" },
  tags: { fr: [], en: [] },
});

const inputClass =
  "w-full rounded-lg border border-border bg-white/[0.02] px-3 py-2 text-sm outline-none focus:border-lime/50";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-xs text-ink-muted">{label}</span>
      {children}
    </label>
  );
}

export default function ProjectsManager({
  initialProjects,
  mediaUrls,
}: {
  initialProjects: Project[];
  mediaUrls: string[];
}) {
  const [projects, setProjects] = useState(initialProjects);
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  const update = (index: number, patch: Partial<Project>) => {
    setProjects((prev) =>
      prev.map((p, i) => (i === index ? { ...p, ...patch } : p))
    );
  };

  const updateLocalized = (
    index: number,
    field: "name" | "tagline" | "description",
    locale: "fr" | "en",
    value: string
  ) => {
    setProjects((prev) =>
      prev.map((p, i) =>
        i === index ? { ...p, [field]: { ...p[field], [locale]: value } } : p
      )
    );
  };

  const updateTags = (index: number, locale: "fr" | "en", value: string) => {
    const tags = value
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    setProjects((prev) =>
      prev.map((p, i) =>
        i === index ? { ...p, tags: { ...p.tags, [locale]: tags } } : p
      )
    );
  };

  const addProject = () => setProjects((prev) => [...prev, emptyProject()]);
  const removeProject = (index: number) =>
    setProjects((prev) => prev.filter((_, i) => i !== index));

  const handleSave = () => {
    startTransition(async () => {
      await saveProjectsAction(projects);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    });
  };

  return (
    <div className="mt-6">
      <div className="flex flex-col gap-6">
        {projects.map((project, i) => (
          <div
            key={project.id}
            className="rounded-2xl border border-border bg-white/[0.02] p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="grid flex-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Field label="Identifiant (unique, sans espace)">
                  <input
                    value={project.id}
                    onChange={(e) => update(i, { id: e.target.value })}
                    className={inputClass}
                  />
                </Field>
                <Field label="URL de la boutique">
                  <input
                    value={project.url}
                    onChange={(e) => update(i, { url: e.target.value })}
                    className={inputClass}
                  />
                </Field>
                <Field label="Statut">
                  <select
                    value={project.status}
                    onChange={(e) =>
                      update(i, { status: e.target.value as ProjectStatus })
                    }
                    className={inputClass}
                  >
                    <option value="live">En ligne (visible sur le site)</option>
                    <option value="password-protected">
                      Protégée par mot de passe (masquée)
                    </option>
                    <option value="coming-soon">Bientôt (masquée)</option>
                    <option value="unavailable">Indisponible (masquée)</option>
                  </select>
                </Field>
                <Field label="Couleur d'accent">
                  <input
                    type="color"
                    value={project.accent}
                    onChange={(e) => update(i, { accent: e.target.value })}
                    className="h-9 w-full rounded-lg border border-border bg-white/[0.02]"
                  />
                </Field>
              </div>
              <button
                onClick={() => removeProject(i)}
                className="mt-1 grid size-9 shrink-0 place-items-center rounded-lg border border-border text-red-400 hover:bg-red-500/10"
                aria-label="Supprimer"
              >
                <Trash2 className="size-4" />
              </button>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Nom (FR)">
                <input
                  value={project.name.fr}
                  onChange={(e) => updateLocalized(i, "name", "fr", e.target.value)}
                  className={inputClass}
                />
              </Field>
              <Field label="Nom (EN)">
                <input
                  value={project.name.en}
                  onChange={(e) => updateLocalized(i, "name", "en", e.target.value)}
                  className={inputClass}
                />
              </Field>
              <Field label="Tagline (FR)">
                <input
                  value={project.tagline.fr}
                  onChange={(e) => updateLocalized(i, "tagline", "fr", e.target.value)}
                  className={inputClass}
                />
              </Field>
              <Field label="Tagline (EN)">
                <input
                  value={project.tagline.en}
                  onChange={(e) => updateLocalized(i, "tagline", "en", e.target.value)}
                  className={inputClass}
                />
              </Field>
              <Field label="Description (FR)">
                <textarea
                  value={project.description.fr}
                  onChange={(e) =>
                    updateLocalized(i, "description", "fr", e.target.value)
                  }
                  rows={3}
                  className={inputClass}
                />
              </Field>
              <Field label="Description (EN)">
                <textarea
                  value={project.description.en}
                  onChange={(e) =>
                    updateLocalized(i, "description", "en", e.target.value)
                  }
                  rows={3}
                  className={inputClass}
                />
              </Field>
              <Field label="Tags (FR, séparés par des virgules)">
                <input
                  value={project.tags.fr.join(", ")}
                  onChange={(e) => updateTags(i, "fr", e.target.value)}
                  className={inputClass}
                />
              </Field>
              <Field label="Tags (EN, séparés par des virgules)">
                <input
                  value={project.tags.en.join(", ")}
                  onChange={(e) => updateTags(i, "en", e.target.value)}
                  className={inputClass}
                />
              </Field>
              <Field label="Vidéo associée (URL, depuis Médiathèque)">
                <input
                  list={`media-${i}`}
                  value={project.videoSrc}
                  onChange={(e) => update(i, { videoSrc: e.target.value })}
                  className={inputClass}
                  placeholder="/videos/exemple.mp4 ou URL Blob"
                />
                <datalist id={`media-${i}`}>
                  {mediaUrls.map((url) => (
                    <option key={url} value={url} />
                  ))}
                </datalist>
              </Field>
              <Field label="Année">
                <input
                  type="number"
                  value={project.year}
                  onChange={(e) => update(i, { year: Number(e.target.value) })}
                  className={inputClass}
                />
              </Field>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-3">
        <button
          onClick={addProject}
          className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm"
        >
          <Plus className="size-4" />
          Ajouter une boutique
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
