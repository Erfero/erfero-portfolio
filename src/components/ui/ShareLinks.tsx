"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { Check, Copy, ExternalLink, X } from "lucide-react";
import { SITE_URL } from "@/lib/seo";
import { SHORT_LINKS } from "@/data/shortLinks";

const noopSubscribe = () => () => {};

/**
 * Accès caché aux liens courts à envoyer aux clients : un TRIPLE-CLIC (ou
 * triple tap) sur le texte « © année … » du pied de page ouvre ce panneau.
 * Rien ne le signale visuellement aux visiteurs.
 */
export default function ShareLinks({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const clicks = useRef<number[]>([]);
  const isClient = useSyncExternalStore(noopSubscribe, () => true, () => false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const onClick = () => {
    const now = Date.now();
    clicks.current = [...clicks.current.filter((t) => now - t < 700), now];
    if (clicks.current.length >= 3) {
      clicks.current = [];
      setOpen(true);
    }
  };

  const copy = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // Presse-papiers indisponible : sélection manuelle possible dans le champ.
    }
    setCopied(url);
    window.setTimeout(() => setCopied((c) => (c === url ? null : c)), 1600);
  };

  return (
    <>
      <span onClick={onClick} className="select-none">
        {children}
      </span>
      {isClient &&
        open &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Liens à partager"
            onClick={() => setOpen(false)}
            className="tone-dark fixed inset-0 z-[95] grid place-items-center !bg-[#0c1a15]/80 p-5 backdrop-blur-md"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="tone-light w-full max-w-xl rounded-3xl p-6 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.8)] sm:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="label-mono text-accent">Accès privé</p>
                  <p className="font-serif mt-2 text-3xl leading-tight">Liens à partager</p>
                  <p className="mt-2 text-sm text-ink-muted">
                    Copie le lien adapté à ton client : chacun s&apos;ouvre directement dans la bonne langue.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Fermer"
                  className="grid size-10 shrink-0 place-items-center rounded-full border border-line hover:bg-ink hover:text-bg"
                >
                  <X className="size-4" />
                </button>
              </div>
              <ul className="mt-6 flex flex-col gap-3">
                {SHORT_LINKS.map((link) => {
                  const url = `${SITE_URL}${link.path}`;
                  const display = url.replace(/^https:\/\//, "");
                  return (
                    <li key={link.path || "/"} className="rounded-2xl border border-line bg-surface p-4">
                      <p className="text-sm font-semibold">{link.label.fr}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <input
                          readOnly
                          value={display}
                          onFocus={(e) => e.currentTarget.select()}
                          className="min-w-0 flex-1 rounded-xl bg-ink/[0.05] px-3 py-2 font-mono text-[12.5px] text-ink outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => copy(url)}
                          className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-[#008060] px-3 py-2 text-sm font-medium text-white"
                        >
                          {copied === url ? <Check className="size-4" /> : <Copy className="size-4" />}
                          {copied === url ? "Copié" : "Copier"}
                        </button>
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Ouvrir : ${link.label.fr}`}
                          className="grid size-9 shrink-0 place-items-center rounded-xl border border-line hover:bg-ink hover:text-bg"
                        >
                          <ExternalLink className="size-4" />
                        </a>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
