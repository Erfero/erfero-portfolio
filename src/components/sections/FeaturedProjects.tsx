import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "@/components/ui/ProjectCard";
import { visibleProjects } from "@/data/projects";

export default function FeaturedProjects() {
  const t = useTranslations("projects");

  return (
    <section
      id="realisations"
      className="relative scroll-mt-28 py-24 sm:py-32"
    >
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
            {t("viewAll")}
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleProjects.map((project, i) => (
            <Reveal key={project.id} delay={i * 0.06}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 flex justify-center sm:hidden">
          <Link
            href="/realisations"
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-6 py-3 text-sm font-medium"
          >
            {t("viewAll")}
            <ArrowUpRight className="size-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
