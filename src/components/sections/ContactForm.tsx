"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Loader2, Send, CheckCircle2, AlertCircle } from "lucide-react";

type Status = "idle" | "sending" | "success" | "error";

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
    "w-full rounded-xl border border-border bg-white/[0.02] px-4 py-3 text-sm text-ink placeholder:text-ink-muted/60 outline-none transition-colors focus:border-lime/50";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
        className="group inline-flex w-fit items-center gap-2 rounded-full bg-lime px-7 py-3.5 text-sm font-medium text-bg transition-transform hover:scale-[1.02] disabled:opacity-60"
      >
        {status === "sending" ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Send className="size-4" />
        )}
        {status === "sending" ? t("formSending") : t("formSubmit")}
      </button>

      {status === "success" && (
        <p className="flex items-center gap-2 text-sm text-lime">
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
