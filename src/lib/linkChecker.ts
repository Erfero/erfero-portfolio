import "server-only";
import type { Project, ProjectStatus } from "@/data/projects";
import { getProjects } from "./content";
import { writeJsonBlob } from "./blob";

async function checkOne(url: string): Promise<ProjectStatus> {
  try {
    const res = await fetch(url, {
      redirect: "follow",
      cache: "no-store",
      signal: AbortSignal.timeout(6000),
      headers: { "User-Agent": "Mozilla/5.0 (compatible; PortfolioLinkChecker/1.0)" },
    });

    if (res.url.includes("/password")) return "password-protected";
    if (res.status >= 200 && res.status < 400) return "live";
    return "unavailable";
  } catch {
    return "unavailable";
  }
}

export interface LinkCheckResult {
  id: string;
  url: string;
  previousStatus: ProjectStatus;
  newStatus: ProjectStatus;
  changed: boolean;
}

/** Revérifie chaque boutique en parallèle (timeout court par requête) et
 * met à jour leur statut dans le Blob si besoin. Ne touche jamais le statut
 * "coming-soon" posé manuellement depuis l'admin. */
export async function checkAndUpdateProjectLinks(): Promise<{
  results: LinkCheckResult[];
  updated: boolean;
}> {
  const projects = await getProjects();

  const results = await Promise.all(
    projects.map(async (project): Promise<LinkCheckResult> => {
      if (project.status === "coming-soon") {
        return {
          id: project.id,
          url: project.url,
          previousStatus: project.status,
          newStatus: project.status,
          changed: false,
        };
      }

      const newStatus = await checkOne(project.url);
      return {
        id: project.id,
        url: project.url,
        previousStatus: project.status,
        newStatus,
        changed: newStatus !== project.status,
      };
    })
  );

  const changedIds = new Set(
    results.filter((r) => r.changed).map((r) => r.id)
  );

  if (changedIds.size > 0) {
    const updatedProjects: Project[] = projects.map((project) => {
      const result = results.find((r) => r.id === project.id);
      return result && result.changed
        ? { ...project, status: result.newStatus }
        : project;
    });
    await writeJsonBlob("content/projects.json", updatedProjects);
  }

  return { results, updated: changedIds.size > 0 };
}
