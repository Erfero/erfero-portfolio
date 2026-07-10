"use client";

import { useState, useTransition } from "react";
import { Plus, Trash2, Save, Check } from "lucide-react";
import { saveContentAction } from "@/lib/actions";

export type Json = string | number | boolean | Json[] | { [key: string]: Json } | null;
export type JsonObject = Record<string, Json>;

const inputClass =
  "w-full rounded-lg border border-border bg-white/[0.02] px-3 py-2 text-sm outline-none focus:border-lime/50";

function isObject(value: Json): value is JsonObject {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function humanize(key: string) {
  return key
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, (c) => c.toUpperCase());
}

function emptyLike(sample: Json): Json {
  if (typeof sample === "string") return "";
  if (typeof sample === "number") return 0;
  if (Array.isArray(sample)) return [];
  if (isObject(sample)) {
    const out: JsonObject = {};
    for (const k of Object.keys(sample)) out[k] = emptyLike(sample[k]);
    return out;
  }
  return sample;
}

export function RecursiveField({
  value,
  onChange,
}: {
  value: Json;
  onChange: (next: Json) => void;
}) {
  if (typeof value === "string") {
    const long = value.length > 70 || value.includes("\n");
    return long ? (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className={inputClass}
      />
    ) : (
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass}
      />
    );
  }

  if (typeof value === "number") {
    return (
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={inputClass}
      />
    );
  }

  if (Array.isArray(value)) {
    const isPrimitiveArray = value.every((v) => typeof v !== "object" || v === null);

    return (
      <div className="flex flex-col gap-3">
        {value.map((item, i) => (
          <div
            key={i}
            className={
              isPrimitiveArray
                ? "flex items-center gap-2"
                : "flex items-start gap-2 rounded-xl border border-border p-3"
            }
          >
            <div className="flex-1">
              <RecursiveField
                value={item}
                onChange={(next) => {
                  const copy = [...value];
                  copy[i] = next;
                  onChange(copy);
                }}
              />
            </div>
            <button
              type="button"
              onClick={() => onChange(value.filter((_, idx) => idx !== i))}
              className="grid size-8 shrink-0 place-items-center rounded-lg border border-border text-red-400 hover:bg-red-500/10"
            >
              <Trash2 className="size-3.5" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            onChange([...value, value.length > 0 ? emptyLike(value[0]) : ""])
          }
          className="inline-flex w-fit items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs"
        >
          <Plus className="size-3.5" />
          Ajouter un élément
        </button>
      </div>
    );
  }

  if (isObject(value)) {
    return (
      <div className="flex flex-col gap-4">
        {Object.keys(value).map((key) => (
          <div key={key}>
            <span className="mb-1 block text-xs font-medium text-ink-muted">
              {humanize(key)}
            </span>
            <RecursiveField
              value={value[key]}
              onChange={(next) => onChange({ ...value, [key]: next })}
            />
          </div>
        ))}
      </div>
    );
  }

  return null;
}

export default function ContentEditor({
  initial,
}: {
  initial: { fr: JsonObject; en: JsonObject };
}) {
  const [data, setData] = useState(initial);
  const [locale, setLocale] = useState<"fr" | "en">("fr");
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    startTransition(async () => {
      await saveContentAction(locale, data[locale]);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    });
  };

  const namespaces = Object.keys(data[locale]);

  return (
    <div className="mt-6">
      <div className="mb-6 flex items-center gap-2">
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

      <div className="flex flex-col gap-3">
        {namespaces.map((ns) => (
          <details
            key={ns}
            className="rounded-2xl border border-border bg-white/[0.02] p-5"
          >
            <summary className="cursor-pointer font-display text-base font-medium">
              {humanize(ns)}
            </summary>
            <div className="mt-4">
              <RecursiveField
                value={data[locale][ns]}
                onChange={(next) =>
                  setData((prev) => ({
                    ...prev,
                    [locale]: { ...prev[locale], [ns]: next },
                  }))
                }
              />
            </div>
          </details>
        ))}
      </div>

      <div className="sticky bottom-4 mt-6 flex justify-end">
        <button
          onClick={handleSave}
          disabled={isPending}
          className="inline-flex items-center gap-1.5 rounded-full bg-lime px-6 py-3 text-sm font-medium text-bg shadow-xl shadow-black/30 disabled:opacity-60"
        >
          {saved ? <Check className="size-4" /> : <Save className="size-4" />}
          {isPending
            ? "Enregistrement..."
            : saved
              ? "Enregistré"
              : `Enregistrer (${locale.toUpperCase()})`}
        </button>
      </div>
    </div>
  );
}
