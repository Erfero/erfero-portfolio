import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import VideoCard from "@/components/ui/VideoCard";
import { videos } from "@/data/videos";

export default function VideoReels() {
  const t = useTranslations("videoReels");
  const projectsT = useTranslations("projects");

  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            subtitle={t("subtitle")}
          />
          <Link
            href="/realisations"
            className="group mb-1 hidden shrink-0 items-center gap-1.5 text-sm font-medium text-ink-muted hover:text-ink sm:inline-flex"
          >
            {t("cta")}
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>

      <Reveal className="mt-12">
        <div className="container-page">
          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {videos.map((video) => (
              <div
                key={video.id}
                className="w-[62vw] shrink-0 snap-start sm:w-[38vw] lg:w-[22vw]"
              >
                <VideoCard
                  video={video}
                  caption={projectsT(`items.${video.captionKey}.name`)}
                />
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="container-page mt-8 flex justify-center sm:hidden">
        <Link
          href="/realisations"
          className="inline-flex items-center gap-1.5 rounded-full border border-border px-6 py-3 text-sm font-medium"
        >
          {t("cta")}
          <ArrowUpRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}
