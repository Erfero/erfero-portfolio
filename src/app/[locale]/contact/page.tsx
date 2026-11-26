import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Contact from "@/components/sections/Contact";
import PageHeader from "@/components/ui/PageHeader";
import { plainText } from "@/components/ui/RichText";
import { buildAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return {
    title: plainText(t("title")),
    description: t("subtitle"),
    alternates: buildAlternates(locale, "/contact"),
  };
}

// Page pré-générée : l'offre choisie (?plan=…) est lue côté navigateur par le
// formulaire, pour ne pas recalculer la page à chaque visite.
export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("nav");

  return (
    <div>
      <PageHeader backLabel={t("home")} title={t("contact")} />
      <Contact />
    </div>
  );
}
