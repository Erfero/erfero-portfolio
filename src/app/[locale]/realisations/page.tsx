import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Reveal from "@/components/ui/Reveal";
import SplitHeading from "@/components/ui/SplitHeading";
import SectionHeading from "@/components/ui/SectionHeading";
import ShopGallery from "@/components/sections/ShopGallery";
import VideoWall from "@/components/sections/VideoWall";
import { getVisibleProjects, getVideos } from "@/lib/content";
import { toProjectCard } from "@/lib/projectMedia";
import { buildAlternates } from "@/lib/seo";
import { plainText } from "@/components/ui/RichText";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "realisationsPage" });
  return {
    title: plainText(t("title")),
    description: t("subtitle"),
    alternates: buildAlternates(locale, "/realisations"),
  };
}

export default async function RealisationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("realisationsPage");
  const [projects, videos] = await Promise.all([getVisibleProjects(), getVideos()]);

  return (
    <div className="pb-24 pt-36 sm:pt-44">
      <div className="container-page">
        <Reveal y={12}>
          <span className="inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.22em] text-lime">
            <span className="h-px w-8 bg-lime/70" />
            {t("eyebrow")}
          </span>
        </Reveal>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-8">
          <SplitHeading
            as="h1"
            text={t("title")}
            className="font-display max-w-[16ch] text-[clamp(2.6rem,7vw,6.5rem)] font-semibold leading-[0.95] tracking-[-0.045em]"
          />
          <Reveal delay={0.1}>
            <p className="font-display text-6xl font-semibold tracking-tight sm:text-7xl">
              {projects.length}
              <span className="ml-2 align-top text-base font-medium tracking-normal text-ink-muted">
                {t("liveCount")}
              </span>
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.15}>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">{t("subtitle")}</p>
        </Reveal>

        <div className="mt-14">
          <ShopGallery projects={projects.map(toProjectCard)} />
        </div>

        {videos.length > 0 && (
          <section id="videos" className="mt-32 scroll-mt-28">
            <SectionHeading eyebrow={t("videoEyebrow")} title={t("videoSectionTitle")} subtitle={t("videoSubtitle")} />
            <div className="mt-12">
              <VideoWall videos={videos} />
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
