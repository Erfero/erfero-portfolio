import { getBaseProjects } from "@/lib/content";
import { listMedia } from "@/lib/blob";
import { getLinkCheckState } from "@/lib/linkChecker";
import ProjectsManager from "@/components/admin/ProjectsManager";

export default async function ProjectsPage() {
  // Liste de référence SANS les corrections automatiques du vérificateur de
  // liens : sinon, enregistrer n'importe quelle modification figerait une
  // panne temporaire ("indisponible") comme statut définitif.
  const [projects, media, linkCheck] = await Promise.all([
    getBaseProjects(),
    listMedia(),
    getLinkCheckState(),
  ]);

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold">Boutiques</h1>
      <p className="mt-1 text-sm text-ink-muted">
        Ajoute, modifie ou retire une boutique. Seules celles au statut
        &laquo; En ligne &raquo; apparaissent sur le site public.
      </p>

      <ProjectsManager
        initialProjects={projects}
        mediaUrls={media.map((m) => m.url)}
        lastCheck={linkCheck.lastRun}
      />
    </div>
  );
}
