"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Loader2, Send, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm({ selectedPlan }: { selectedPlan?: string }) {
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
    "w-full rounded-2xl border border-white/12 bg-white/[0.05] px-5 py-4 text-base text-ink placeholder:text-ink-dim outline-none transition-[border-color,background-color,box-shadow] focus:border-pink/70 focus:bg-white/[0.08] focus:shadow-[0_0_0_4px_rgba(255,111,208,0.15)] sm:text-sm";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {selectedPlan && (
        <div className="flex items-center gap-2 rounded-xl border border-brand/30 bg-brand/6 px-4 py-3 text-sm text-brand">
          <Sparkles className="size-4 shrink-0" />
          <span>
            {t("planBadge")} <strong>{selectedPlan}</strong>
          </span>
          <input type="hidden" name="offre_demandee" value={selectedPlan} />
        </div>
      )}

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
        className="btn-primary w-fit px-8 py-4 text-sm disabled:opacity-60"
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
