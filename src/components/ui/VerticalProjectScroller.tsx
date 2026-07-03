import ProjectCard from "./ProjectCard";
import type { Project } from "@/data/projects";
import type { VideoEntry } from "@/data/videos";
import { resolveRelatedVideo } from "@/lib/resolveVideo";

function Column({
  projects,
  videos,
  reverse,
  pauseSeconds,
  durationSeconds,
  hideOnMobile,
}: {
  projects: Project[];
  videos: VideoEntry[];
  reverse?: boolean;
  pauseSeconds: number;
  durationSeconds: number;
  hideOnMobile?: boolean;
}) {
  const doubled = [...projects, ...projects];

  return (
    <div
      className={`relative h-[420px] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_8%,black_92%,transparent)] sm:h-[720px] ${
        hideOnMobile ? "hidden sm:block" : ""
      }`}
    >
      <div
        className="marquee-track flex flex-col gap-6"
        style={
          {
            "--marquee-name": reverse ? "scroll-col-down" : "scroll-col-up",
            "--marquee-duration": `${durationSeconds}s`,
            "--marquee-delay": `${pauseSeconds}s`,
            "--marquee-fill": "backwards",
          } as React.CSSProperties
        }
      >
        {doubled.map((project, i) => (
          <div key={`${project.id}-${i}`} className="w-full">
            <ProjectCard
              project={project}
              relatedVideo={resolveRelatedVideo(project, videos)}
              thumbWidth={480}
              thumbHeight={700}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function VerticalProjectScroller({
  projects,
  videos,
}: {
  projects: Project[];
  videos: VideoEntry[];
}) {
  const colA = projects.filter((_, i) => i % 2 === 0);
  const colB = projects.filter((_, i) => i % 2 === 1);

  // Durée proportionnelle au nombre de boutiques : avec plus de boutiques
  // affichées, une durée fixe faisait défiler chaque carte trop vite pour
  // avoir le temps de cliquer "Voir la boutique".
  const secondsPerItem = 14;
  const durationA = Math.max(colA.length * secondsPerItem, 60);
  const durationB = Math.max(colB.length * secondsPerItem, 60);

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <Column projects={colA} videos={videos} pauseSeconds={2.5} durationSeconds={durationA} />
      <Column
        projects={colB.length > 0 ? colB : colA}
        videos={videos}
        reverse
        pauseSeconds={2.5}
        durationSeconds={durationB}
        hideOnMobile
      />
    </div>
  );
}
