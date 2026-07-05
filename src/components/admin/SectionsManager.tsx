"use client";

import { useState, useTransition } from "react";
import { Check, Save } from "lucide-react";
import { saveSectionsSettingsAction } from "@/lib/actions";
import type { SectionsSettings } from "@/lib/content";

const toggles: { key: keyof SectionsSettings; label: string; description: string }[] = [
  {
    key: "pricingEnabled",
    label: "Section Tarifs",
    description:
      "Affiche ou masque le bloc de tarifs sur la page d'accueil et la page Services.",
  },
];

export default function SectionsManager({ initial }: { initial: SectionsSettings }) {
  const [savedSettings, setSavedSettings] = useState(initial);
  const [settings, setSettings] = useState(initial);
  const [isPending, startTransition] = useTransition();
  const [justSaved, setJustSaved] = useState(false);

  const isDirty = JSON.stringify(settings) !== JSON.stringify(savedSettings);

  const handleSave = () => {
    startTransition(async () => {
      await saveSectionsSettingsAction(settings);
      setSavedSettings(settings);
      setJustSaved(true);
      setTimeout(() => setJustSaved(false), 2500);
    });
  };

  return (
    <div className="mt-6 flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        {toggles.map((item) => (
          <div
            key={item.key}
            className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-white/[0.02] p-5"
          >
            <div>
              <h2 className="font-display text-base font-medium">{item.label}</h2>
              <p className="mt-1 text-xs text-ink-muted">{item.description}</p>
            </div>
            <div className="flex shrink-0 flex-col items-end gap-1.5">
              <span
                className={`text-xs font-semibold ${
                  settings[item.key] ? "text-lime" : "text-ink-muted"
                }`}
              >
                {settings[item.key] ? "Activée" : "Désactivée"}
              </span>
              <button
                onClick={() =>
                  setSettings((s) => ({ ...s, [item.key]: !s[item.key] }))
                }
                aria-pressed={settings[item.key]}
                className={`relative h-7 w-12 rounded-full transition-colors ${
                  settings[item.key] ? "bg-lime" : "bg-white/10"
                }`}
              >
                <span
                  className={`absolute top-1 size-5 rounded-full bg-bg transition-transform ${
                    settings[item.key] ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        ))}
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
