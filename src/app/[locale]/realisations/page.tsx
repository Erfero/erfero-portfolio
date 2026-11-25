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
    <div className="tone-light relative isolate pb-24 pt-36 sm:pt-44">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[46rem] overflow-hidden">
        <div className="bg-grid mask-radial absolute inset-0" />
      </div>
      <div className="container-page">
        <Reveal y={12}>
          <p className="label-mono flex items-center gap-3">
            <span aria-hidden className="h-px w-8 bg-ink/30" />
            <span className="text-ink-muted">{t("eyebrow")}</span>
          </p>
        </Reveal>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-8">
          <SplitHeading
            as="h1"
            text={t("title")}
            className="max-w-[16ch] font-serif text-[clamp(3rem,7.5vw,7rem)] font-normal leading-[0.95] tracking-[-0.02em]"
          />
          <Reveal delay={0.1}>
            <p className="flex items-end gap-3 rounded-3xl border border-line bg-surface px-6 py-4">
              <span className="font-serif text-6xl leading-none tracking-[-0.02em] text-accent sm:text-7xl">
                {projects.length}
              </span>
              <span className="pb-1 text-sm font-semibold text-ink-muted">{t("liveCount")}</span>
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
