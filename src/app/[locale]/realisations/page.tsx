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
    <div className="relative isolate pb-24 pt-36 sm:pt-44">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[46rem] overflow-hidden">
        <div className="glow-orb -top-40 right-0 h-[34rem] w-[40rem] bg-brand-deep/45" />
        <div className="glow-orb -top-20 left-1/4 h-[22rem] w-[30rem] bg-pink/20" />
        <div className="bg-grid mask-radial absolute inset-0 opacity-60" />
      </div>
      <div className="container-page">
        <Reveal y={12}>
          <span className="glass inline-flex items-center gap-2.5 rounded-full py-1.5 pl-2 pr-4 text-xs font-semibold uppercase tracking-[0.18em]">
            <span className="bg-brand-gradient ml-1 size-2 rounded-full" />
            {t("eyebrow")}
          </span>
        </Reveal>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-8">
          <SplitHeading
            as="h1"
            text={t("title")}
            className="font-display max-w-[16ch] text-[clamp(2.6rem,7vw,6.5rem)] font-extrabold leading-[0.95] tracking-[-0.045em]"
          />
          <Reveal delay={0.1}>
            <p className="glass flex items-end gap-3 rounded-3xl px-6 py-4">
              <span className="text-gradient font-display text-6xl font-extrabold leading-none tracking-tight sm:text-7xl">
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
