import "server-only";
import type { ProjectStatus } from "@/data/projects";
import { getBaseProjects } from "./content";
import { readJsonBlob, writeJsonBlob } from "./blob";

/** Résultat brut d'une vérification : "unknown" quand le serveur ne permet
 * pas de conclure (challenge anti-bot Shopify, timeout ponctuel...). */
type CheckOutcome = ProjectStatus | "unknown";

// Pages de revente de domaine (Sedo, Afternic, HugeDomains, Dan...). Ces
// expressions ne sont prises en compte que si la page n'est PAS une boutique
// Shopify, pour ne jamais masquer une vraie boutique dont le titre
// contiendrait par hasard « à vendre ».
const PARKED = /(sedo\.com|sedoparking|afternic|hugedomains|dan\.com|buy this domain|this domain is for sale|ce domaine est à vendre|est disponible à l.achat|window\.location\.href\s*=\s*["']\/lander)/i;
const SHOPIFY_MARKERS = /(cdn\.shopify\.com|Shopify\.shop|shopify-section)/;
const SHOP_CLOSED = /(store unavailable|this store is unavailable|boutique indisponible|tienda no disponible|only one step left|shop is closed)/i;
// Erreurs réseau qui signifient « site mort » (et non une simple lenteur).
const DEAD_CODES = /^(ENOTFOUND|ECONNREFUSED|UNABLE_TO_VERIFY_LEAF_SIGNATURE)$|CERT|SSL|TLS/;

export async function checkOne(url: string): Promise<CheckOutcome> {
  try {
    const res = await fetch(url, {
      redirect: "follow",
      cache: "no-store",
      signal: AbortSignal.timeout(9000),
      headers: { "User-Agent": "Mozilla/5.0 (compatible; ErferoPortfolioLinkChecker/2.0)" },
    });

    // Shopify répond 429 "Verifying your connection..." aux robots trop
    // pressés : ce n'est PAS une boutique morte, on ne conclut rien.
    if (res.status === 429 || res.status === 503) return "unknown";
    if (res.url.includes("/password")) return "password-protected";
    // 402 = boutique Shopify suspendue, 404 = boutique supprimée, 423 = fermée.
    if (res.status >= 400) return "unavailable";

    const head = (await res.text()).slice(0, 60000);
    const title = head.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "";
    if (SHOP_CLOSED.test(title)) return "unavailable";
    if (!SHOPIFY_MARKERS.test(head) && PARKED.test(title + " " + head.slice(0, 3000))) {
      return "unavailable";
    }
    return "live";
  } catch (error) {
    // Domaine inexistant, connexion refusée ou certificat invalide = mort ;
    // simple timeout / coupure = on ne conclut rien (lenteur ponctuelle).
    const code = (error as { cause?: { code?: string } })?.cause?.code ?? "";
    if (DEAD_CODES.test(code)) return "unavailable";
    return "unknown";
  }
}

export interface LinkCheckResult {
  id: string;
  url: string;
  previousStatus: ProjectStatus;
  newStatus: ProjectStatus;
  changed: boolean;
}

/** Exécute `fn` sur chaque élément avec au plus `limit` requêtes en vol :
 * lancer des centaines de requêtes simultanées vers Shopify déclenche sa
 * protection anti-bot et faussait tous les résultats. */
async function mapLimit<T, R>(items: T[], limit: number, fn: (item: T) => Promise<R>) {
  const out: R[] = new Array(items.length);
  let next = 0;
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, async () => {
      while (next < items.length) {
        const i = next++;
        out[i] = await fn(items[i]);
      }
    })
  );
  return out;
}

/** Revérifie les boutiques affichables et met à jour la table de statuts.
 * Ne vérifie que les boutiques marquées "live" dans le code : les autres ne
 * peuvent de toute façon pas être ré-affichées automatiquement (voir
 * resolveStatus dans content.ts). */
export async function checkAndUpdateProjectLinks(): Promise<{
  results: LinkCheckResult[];
  updated: boolean;
}> {
  const [projects, previousMap] = await Promise.all([
    getBaseProjects(),
    readJsonBlob<Record<string, ProjectStatus>>("content/project-status.json"),
  ]);
  const candidates = projects.filter((p) => p.status === "live");

  const results = await mapLimit(candidates, 6, async (project): Promise<LinkCheckResult> => {
    const previousStatus = previousMap?.[project.id] ?? project.status;
    const outcome = await checkOne(project.url);
    // Sans conclusion possible, on considère la boutique telle que vérifiée
    // dans le code (en ligne) plutôt que de la masquer sur un doute.
    const newStatus = outcome === "unknown" ? project.status : outcome;
    return {
      id: project.id,
      url: project.url,
      previousStatus,
      newStatus,
      changed: newStatus !== previousStatus,
    };
  });

  // Table id -> statut appliquée par-dessus la liste du code. On repart de
  // zéro à chaque passage pour les boutiques vérifiées : une boutique revenue
  // en ligne efface automatiquement une ancienne panne enregistrée.
  const statusMap: Record<string, ProjectStatus> = {};
  for (const r of results) statusMap[r.id] = r.newStatus;

  const before = JSON.stringify(previousMap ?? {});
  const after = JSON.stringify(statusMap);
  const updated = before !== after;
  if (updated) {
    await writeJsonBlob("content/project-status.json", statusMap);
  }

  return { results, updated };
}
