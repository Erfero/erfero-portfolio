import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import Reveal from "@/components/ui/Reveal";
import ProjectCard from "@/components/ui/ProjectCard";
import VideoCard from "@/components/ui/VideoCard";
import { projects } from "@/data/projects";
import { videos } from "@/data/videos";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "realisationsPage" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function RealisationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("realisationsPage");
  const projectsT = await getTranslations("projects");

  return (
    <div className="pb-24 pt-32 sm:pt-40">
      <div className="container-page">
        <Reveal>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink"
          >
            <ArrowLeft className="size-4" />
            {t("backHome")}
          </Link>

          <h1 className="font-display mt-6 text-4xl font-medium tracking-tight sm:text-5xl lg:text-6xl">
            {t("title")}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-ink-muted">
            {t("subtitle")}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={i * 0.05}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-28">
          <h2 className="font-display text-2xl font-medium sm:text-3xl">
            {t("videoSectionTitle")}
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {videos.map((video, i) => (
            <Reveal key={video.id} delay={(i % 5) * 0.05}>
              <VideoCard
                video={video}
                caption={projectsT(`items.${video.captionKey}.name`)}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
