import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
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
  const cv = await getCvSettings();

  if (!cv.enabled || !cv.url) notFound();

  // Juste le PDF, sans cadre ni carte autour : plein écran sous la nav fixe
  // (la nav est en position fixed, d'où le margin-top pour ne pas passer
  // dessous).
  return (
    <iframe
      src="/api/cv"
      title="CV-Erfero"
      className="mt-24 block h-[calc(100svh-6rem)] w-full border-0"
    />
  );
}
