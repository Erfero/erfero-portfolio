"use client";

import { Suspense, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Loader2, Send, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";

type Status = "idle" | "sending" | "success" | "error";

function SelectedPlan({ label }: { label: string }) {
  const plan = useSearchParams().get("plan");
  if (!plan) return null;
  return (
    <div className="flex items-center gap-2 rounded-xl border border-accent/30 bg-accent/10 px-4 py-3 text-sm text-accent">
      <Sparkles className="size-4 shrink-0" />
      <span>
        {label} <strong>{plan}</strong>
      </span>
      <input type="hidden" name="offre_demandee" value={plan} />
    </div>
  );
}

export default function ContactForm() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<Status>("idle");
  const formEndpoint = process.env.NEXT_PUBLIC_FORMSPREE_ID
    ? `https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID}`
    : null;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formEndpoint) {
      // Pas encore configuré : voir README > "Activer le formulaire de contact".
      setStatus("error");
      return;
    }

    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch(formEndpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full border-0 border-b border-ink/25 bg-transparent px-0 py-4 text-base text-ink placeholder:text-ink-muted outline-none transition-colors focus:border-accent sm:text-[15px]";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* L'offre choisie (?plan=…) est lue dans le navigateur : la page de
          contact reste ainsi pré-générée (chargement instantané). */}
      <Suspense fallback={null}>
        <SelectedPlan label={t("planBadge")} />
      </Suspense>

      <div className="grid gap-4 sm:grid-cols-2">
        <input
          type="text"
          name="name"
          required
          placeholder={t("formName")}
          className={inputClass}
        />
        <input
          type="email"
          name="email"
          required
          placeholder={t("formEmail")}
          className={inputClass}
        />
      </div>
      <input
        type="text"
        name="budget"
        placeholder={t("formBudget")}
        className={inputClass}
      />
      <textarea
        name="message"
        required
        rows={5}
        placeholder={t("formMessage")}
        className={inputClass}
      />

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-[#9be3c4] px-7 py-3.5 text-sm font-medium text-[#0c1a15] transition-colors hover:bg-white disabled:opacity-60"
      >
        {status === "sending" ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Send className="size-4" />
        )}
        {status === "sending" ? t("formSending") : t("formSubmit")}
      </button>

      {status === "success" && (
        <p className="flex items-center gap-2 text-sm text-success">
          <CheckCircle2 className="size-4" /> {t("formSuccess")}
        </p>
      )}
      {status === "error" && (
        <p className="flex items-center gap-2 text-sm text-red-400">
          <AlertCircle className="size-4" /> {t("formError")}
        </p>
      )}
    </form>
  );
}
