import "server-only";
import type { ProjectStatus } from "@/data/projects";
import { getBaseProjects } from "./content";
import { readJsonBlob, writeJsonBlob } from "./blob";
import { checkShop, type ShopCheck } from "./shopCheck";

/** Statuts appliqués par-dessus la liste du code (lu par getProjects). */
const STATUS_PATH = "content/project-status.json";
/** Date de dernière vérification de chaque boutique + bilan du dernier passage. */
const STATE_PATH = "content/link-check-state.json";

// Rythme mesuré : à 6 requêtes en parallèle, Shopify bloque (429) après une
// quarantaine de boutiques ; une par une avec 1 s de pause, les 88 passent
// sans aucun blocage (≈ 2 min 30).
const GAP_MS = 1000;
const RATE_LIMIT_PAUSE_MS = 20000;
const CONFIRM_DELAY_MS = 3000;
/** Au-delà, on s'arrête proprement (la fonction Vercel est coupée à 300 s) :
 * les boutiques restantes passent en premier la fois suivante. */
const TIME_BUDGET_MS = 230_000;

export interface LinkCheckResult {
  id: string;
  url: string;
  previousStatus: ProjectStatus;
  newStatus: ProjectStatus;
  changed: boolean;
  /** false = impossible de conclure, la boutique garde son statut. */
  conclusive: boolean;
  reason: string;
}

export interface LinkCheckSummary {
  startedAt: string;
  finishedAt: string;
  /** Boutiques affichables d'après la liste (statut « live »). */
  total: number;
  /** Vérifiées avec une réponse claire pendant ce passage. */
  checked: number;
  /** Affichées sur le site à l'issue du passage. */
  live: number;
  /** Masquées à l'issue du passage, avec la raison. */
  hidden: { id: string; name: string; status: ProjectStatus; reason: string }[];
  /** Interrogées sans réponse claire : statut précédent conservé. */
  inconclusive: number;
  /** Pas encore interrogées (passage arrêté avant la fin). */
  notReached: number;
  stoppedEarly: string | null;
}

export interface LinkCheckState {
  lastRun: LinkCheckSummary | null;
  checkedAt: Record<string, string>;
  /** Raison du dernier masquage, pour l'afficher tant qu'il dure. */
  hiddenReason: Record<string, string>;
}

export async function getLinkCheckState(): Promise<LinkCheckState> {
  const state = await readJsonBlob<Partial<LinkCheckState>>(STATE_PATH);
  return {
    lastRun: state?.lastRun ?? null,
    checkedAt: state?.checkedAt ?? {},
    hiddenReason: state?.hiddenReason ?? {},
  };
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/** Une boutique n'est masquée que si deux essais à quelques secondes
 * d'intervalle donnent la même réponse : une coupure d'une seconde ne fait
 * jamais disparaître une boutique du portfolio. */
async function checkWithConfirmation(url: string): Promise<ShopCheck> {
  let first = await checkShop(url);
  if (first.rateLimited) {
    await sleep(RATE_LIMIT_PAUSE_MS);
    first = await checkShop(url);
    if (first.rateLimited) return first;
  }
  if (first.status === "unavailable" || first.status === "password-protected") {
    await sleep(CONFIRM_DELAY_MS);
    const second = await checkShop(url);
    if (second.status !== first.status) {
      return {
        status: "unknown",
        reason: `réponse instable (${first.reason}, puis ${second.reason})`,
        rateLimited: second.rateLimited,
      };
    }
  }
  return first;
}

/** Ne garde que les boutiques masquées, triées : sert à comparer deux tables
 * sans tenir compte de l'ordre ni des anciennes entrées « live ». */
function hiddenOnly(map: Record<string, ProjectStatus> | null) {
  return Object.entries(map ?? {})
    .filter(([, status]) => status !== "live")
    .sort(([a], [b]) => a.localeCompare(b));
}

/**
 * Revérifie les boutiques affichables (statut « live » dans la liste), une
 * par une, et met à jour la table des statuts :
 * - boutique fermée, supprimée, suspendue ou sous mot de passe → masquée ;
 * - boutique masquée qui fonctionne de nouveau → ré-affichée ;
 * - pas de réponse claire → rien ne change.
 * Les boutiques marquées autrement que « live » dans la liste ne sont pas
 * interrogées : elles ne peuvent pas être ré-affichées automatiquement (voir
 * resolveStatus dans content.ts).
 */
export async function checkAndUpdateProjectLinks(): Promise<{
  results: LinkCheckResult[];
  updated: boolean;
  summary: LinkCheckSummary;
}> {
  const t0 = Date.now();
  const [projects, previousMap, state] = await Promise.all([
    getBaseProjects(),
    readJsonBlob<Record<string, ProjectStatus>>(STATUS_PATH),
    getLinkCheckState(),
  ]);
  const listed = projects.filter((p) => p.status === "live");
  // Les moins récemment vérifiées d'abord : si un passage s'arrête avant la
  // fin, le suivant reprend là où il en était.
  const queue = [...listed].sort((a, b) =>
    (state.checkedAt[a.id] ?? "").localeCompare(state.checkedAt[b.id] ?? "")
  );

  const results: LinkCheckResult[] = [];
  const checkedAt: Record<string, string> = {};
  let stoppedEarly: string | null = null;
  let blockedInARow = 0;

  for (const [i, project] of queue.entries()) {
    if (Date.now() - t0 > TIME_BUDGET_MS) {
      stoppedEarly = "temps écoulé, la suite au prochain passage";
      break;
    }
    if (i > 0) await sleep(GAP_MS);

    const previousStatus = previousMap?.[project.id] ?? project.status;
    const outcome = await checkWithConfirmation(project.url);
    const conclusive = outcome.status !== "unknown";
    const newStatus: ProjectStatus =
      outcome.status === "unknown" ? previousStatus : outcome.status;
    if (conclusive) checkedAt[project.id] = new Date().toISOString();
    results.push({
      id: project.id,
      url: project.url,
      previousStatus,
      newStatus,
      changed: newStatus !== previousStatus,
      conclusive,
      reason: outcome.reason,
    });

    blockedInARow = outcome.rateLimited ? blockedInARow + 1 : 0;
    if (blockedInARow >= 2) {
      // Insister prolongerait le blocage : on reprendra au prochain passage.
      stoppedEarly = "Shopify limite les requêtes, la suite au prochain passage";
      break;
    }
  }

  // Nouvelle table, dans l'ordre de la liste. Une boutique non interrogée ce
  // coup-ci garde son statut précédent ; une boutique retirée de la liste
  // sort de la table.
  const byId = new Map(results.map((r) => [r.id, r]));
  const statusMap: Record<string, ProjectStatus> = {};
  const hiddenReason: Record<string, string> = {};
  const hidden: LinkCheckSummary["hidden"] = [];
  const nextCheckedAt: Record<string, string> = {};
  for (const project of listed) {
    const result = byId.get(project.id);
    const status = result ? result.newStatus : (previousMap?.[project.id] ?? "live");
    const at = checkedAt[project.id] ?? state.checkedAt[project.id];
    if (at) nextCheckedAt[project.id] = at;
    if (status === "live") continue;
    statusMap[project.id] = status;
    const reason =
      result?.conclusive && result.newStatus !== "live"
        ? result.reason
        : (state.hiddenReason[project.id] ?? "masquée lors d'un passage précédent");
    hiddenReason[project.id] = reason;
    hidden.push({ id: project.id, name: project.name.fr, status, reason });
  }

  const updated = JSON.stringify(hiddenOnly(previousMap)) !== JSON.stringify(hiddenOnly(statusMap));
  if (updated) await writeJsonBlob(STATUS_PATH, statusMap);

  const summary: LinkCheckSummary = {
    startedAt: new Date(t0).toISOString(),
    finishedAt: new Date().toISOString(),
    total: listed.length,
    checked: results.filter((r) => r.conclusive).length,
    live: listed.length - hidden.length,
    hidden,
    inconclusive: results.filter((r) => !r.conclusive).length,
    notReached: listed.length - results.length,
    stoppedEarly,
  };
  await writeJsonBlob(STATE_PATH, {
    lastRun: summary,
    checkedAt: nextCheckedAt,
    hiddenReason,
  } satisfies LinkCheckState);

  return { results, updated, summary };
}
