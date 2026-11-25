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

export default async function ContactPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ plan?: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("nav");
  const { plan } = await searchParams;

  return (
    <div>
      <PageHeader backLabel={t("home")} title={t("contact")} />
      <Contact selectedPlan={plan} />
    </div>
  );
}
