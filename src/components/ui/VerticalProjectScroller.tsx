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
        className="flex flex-col gap-6 [animation-fill-mode:backwards] hover:[animation-play-state:paused]"
        style={{
          animation: `${reverse ? "scroll-col-down" : "scroll-col-up"} ${durationSeconds}s linear ${pauseSeconds}s infinite`,
        }}
      >
        {doubled.map((project, i) => (
          <div key={`${project.id}-${i}`} className="w-full">
            <ProjectCard
              project={project}
              relatedVideo={resolveRelatedVideo(project, videos)}
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

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <Column projects={colA} videos={videos} pauseSeconds={2.5} durationSeconds={100} />
      <Column
        projects={colB.length > 0 ? colB : colA}
        videos={videos}
        reverse
        pauseSeconds={2.5}
        durationSeconds={55}
        hideOnMobile
      />
    </div>
  );
}
