import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import FAQ from "@/components/sections/FAQ";
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
  const t = await getTranslations({ locale, namespace: "faq" });
  return {
    title: plainText(t("title")),
    description: t("subtitle"),
    alternates: buildAlternates(locale, "/faq"),
  };
}

export default async function FAQPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("nav");
  const tFaq = await getTranslations("faq");
  const items = tFaq.raw("items") as { q: string; a: string }[];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHeader backLabel={t("home")} title={t("faq")} />
      <FAQ />
      <Contact />
    </div>
  );
}
