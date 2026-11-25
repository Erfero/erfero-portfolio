import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Process from "@/components/sections/Process";
import Trust from "@/components/sections/Trust";
import PageHeader from "@/components/ui/PageHeader";
import { plainText } from "@/components/ui/RichText";
import { buildAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "process" });
  return {
    title: plainText(t("title")),
    description: t("subtitle"),
    alternates: buildAlternates(locale, "/process"),
  };
}

export default async function ProcessPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("nav");

  return (
    <div>
      <PageHeader backLabel={t("home")} title={t("process")} />
      <Process />
      <Trust />
    </div>
  );
}
