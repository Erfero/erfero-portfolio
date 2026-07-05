import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft, Download } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getCvSettings } from "@/lib/content";

// Rendu toujours dynamique : sans ça, tant qu'aucun réglage n'a jamais été
// enregistré depuis l'admin, Next.js ne détecte aucune donnée "vivante" à
// ce premier build et fige la page en statique avec les valeurs par
// défaut du code — un changement depuis /admin/cv pourrait alors tarder à
// se refléter.
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nav" });
  return { title: t("cv") };
}

export default async function CvPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("nav");
  const cv = await getCvSettings();

  if (!cv.enabled || !cv.url) notFound();

  return (
    <div className="pt-32 pb-20 sm:pt-40">
      <div className="container-page">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink"
          >
            <ArrowLeft className="size-4" />
            {t("home")}
          </Link>

          <a
            href="/api/cv"
            download="CV-Erfero.pdf"
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium hover:border-lime/50"
          >
            <Download className="size-4" />
            Télécharger le PDF
          </a>
        </div>

        <h1 className="font-display mt-6 text-3xl font-medium tracking-tight sm:text-4xl">
          {t("cv")}
        </h1>

        <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-white/[0.02]">
          <iframe
            src="/api/cv"
            title="CV-Erfero"
            className="h-[75vh] w-full sm:h-[85vh]"
          />
        </div>
      </div>
    </div>
  );
}
