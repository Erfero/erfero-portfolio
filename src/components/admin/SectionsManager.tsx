"use client";

import { useState, useTransition } from "react";
import { Check, Save, AlertTriangle } from "lucide-react";
import { saveSectionsSettingsAction } from "@/lib/actions";
import type { SectionsSettings } from "@/lib/content";

const toggles: {
  key: keyof SectionsSettings;
  label: string;
  description: string;
  warning?: string;
}[] = [
  {
    key: "heroEnabled",
    label: "Section d'accueil (Hero)",
    description: "Le tout premier bloc en haut de la page d'accueil.",
    warning: "La page démarrera directement sur la section suivante si désactivée.",
  },
  {
    key: "featuredProjectsEnabled",
    label: "Réalisations en vedette",
    description: "La grille de boutiques mises en avant sur l'accueil.",
  },
  {
    key: "videoReelsEnabled",
    label: "Mur de vidéos (accueil)",
    description: "Le carrousel de vidéos verticales sur l'accueil.",
  },
  {
    key: "servicesEnabled",
    label: "Services",
    description: "Le bloc \"Pas un thème gratuit...\" présentant ta méthode.",
  },
  {
    key: "testimonialsEnabled",
    label: "Témoignages",
    description: "Les avis clients affichés sur l'accueil.",
  },
  {
    key: "pricingEnabled",
    label: "Tarifs",
    description: "Le bloc de tarifs sur l'accueil et la page Services.",
  },
  {
    key: "painPointsEnabled",
    label: "Problématiques (\"Ça te parle ?\")",
    description: "Le bloc listant les problèmes fréquents des boutiques.",
  },
  {
    key: "expertiseCatalogEnabled",
    label: "Catalogue d'expertise",
    description: "Le catalogue par univers/niche.",
  },
  {
    key: "metricsEnabled",
    label: "Chiffres clés",
    description: "Le bloc de statistiques (\"5 ans à construire...\").",
  },
  {
    key: "processEnabled",
    label: "Process",
    description: "Les étapes de collaboration, du premier message à la mise en ligne.",
  },
  {
    key: "techStackEnabled",
    label: "Stack technique",
    description: "Les outils/technologies maîtrisés.",
  },
  {
    key: "trustEnabled",
    label: "Confiance / garantie",
    description: "Le bloc \"Pourquoi me faire confiance\".",
  },
  {
    key: "faqEnabled",
    label: "FAQ",
    description: "Les questions fréquentes en bas de page.",
  },
  {
    key: "contactEnabled",
    label: "Contact",
    description: "Le formulaire/bloc de contact final.",
    warning: "Les visiteurs n'auront plus de moyen direct de te contacter depuis l'accueil si désactivé.",
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
    <div className="mt-6 flex flex-col gap-6 pb-24">
      <div className="flex flex-col gap-3">
        {toggles.map((item) => (
          <div
            key={item.key}
            className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-white/[0.02] p-4"
          >
            <div>
              <h2 className="text-sm font-medium">{item.label}</h2>
              <p className="mt-0.5 text-xs text-ink-muted">{item.description}</p>
              {item.warning && !settings[item.key] && (
                <p className="mt-1.5 flex items-center gap-1.5 text-xs text-amber-400">
                  <AlertTriangle className="size-3.5 shrink-0" />
                  {item.warning}
                </p>
              )}
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

      <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-border bg-bg/95 px-6 py-4 backdrop-blur sm:left-64">
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
    </div>
  );
}
