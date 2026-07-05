import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import Services from "@/components/sections/Services";
import Pricing from "@/components/sections/Pricing";
import { getSectionsSettings } from "@/lib/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  return { title: t("title"), description: t("subtitle") };
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
    <div className="pt-32 sm:pt-40">
      <div className="container-page">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink"
        >
          <ArrowLeft className="size-4" />
          {t("home")}
        </Link>
      </div>
      <Services />
      {sections.pricingEnabled && <Pricing />}
    </div>
  );
}
