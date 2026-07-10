import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import PageTransition from "@/components/providers/PageTransition";
import LocaleHtmlSync from "@/components/providers/LocaleHtmlSync";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import FloatingCTA from "@/components/ui/FloatingCTA";
import { getCvSettings } from "@/lib/content";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    title: t("title"),
    description: t("description"),
    metadataBase: new URL("https://erfero-portfolio.vercel.app"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const cvSettings = await getCvSettings();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Erféro Keoula — Développeur Shopify Freelance",
    description:
      locale === "fr"
        ? "Développeur Shopify freelance : création de boutique Shopify sur-mesure, refonte, optimisation de conversion (CRO) et SEO."
        : "Freelance Shopify developer: custom store builds, redesigns, conversion rate optimization (CRO) and SEO.",
    url: "https://erfero-portfolio.vercel.app",
    email: "mailto:erferokam@gmail.com",
    priceRange: "€€",
    areaServed: "Worldwide",
    knowsAbout: [
      "Shopify",
      "Shopify development",
      "E-commerce",
      "Conversion rate optimization",
      "SEO",
      "Liquid",
    ],
    founder: {
      "@type": "Person",
      name: "Erféro Keoula",
      jobTitle:
        locale === "fr" ? "Développeur Shopify freelance" : "Freelance Shopify Developer",
      sameAs: [
        "https://www.linkedin.com/in/erfero-keoula-905b7220",
        "https://www.instagram.com/erfero04",
      ],
    },
  };

  return (
    <NextIntlClientProvider messages={messages}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LocaleHtmlSync locale={locale} />
      <CustomCursor />
      <Navbar showCv={cvSettings.enabled} />
      <main>
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
      <FloatingCTA />
    </NextIntlClientProvider>
  );
}
