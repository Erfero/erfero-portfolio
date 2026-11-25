import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Services from "@/components/sections/Services";
import Pricing from "@/components/sections/Pricing";
import PageHeader from "@/components/ui/PageHeader";
import { plainText } from "@/components/ui/RichText";
import { getSectionsSettings } from "@/lib/content";
import { buildAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  return {
    title: plainText(t("title")),
    description: t("subtitle"),
    alternates: buildAlternates(locale, "/services"),
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("nav");
  const sections = await getSectionsSettings();

  return (
    <div>
      <PageHeader backLabel={t("home")} title={t("services")} />
      <Services />
      {sections.pricingEnabled && <Pricing />}
    </div>
  );
}
