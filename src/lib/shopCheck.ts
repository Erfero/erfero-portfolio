/**
 * Vérification d'UNE boutique par une requête HTTP simple (sans navigateur).
 * Aucun import : ce fichier se teste tel quel avec Node.
 *
 * Le résultat « unknown » veut dire « impossible de conclure » (Shopify qui
 * limite les requêtes, lenteur, erreur serveur passagère) : dans ce cas, on
 * ne change JAMAIS l'affichage d'une boutique.
 */
export type ShopCheckStatus = "live" | "unavailable" | "password-protected" | "unknown";

export interface ShopCheck {
  status: ShopCheckStatus;
  /** Explication courte, affichée dans l'admin (ex. « 402 : boutique suspendue »). */
  reason: string;
  /** Shopify a limité les requêtes : il faut ralentir avant la suivante. */
  rateLimited?: boolean;
}

const USER_AGENT = "Mozilla/5.0 (compatible; ErferoPortfolioLinkChecker/3.0)";

// Pages de revente de domaine (Sedo, Afternic, HugeDomains, Dan...). Ces
// expressions ne sont prises en compte que si la page n'est PAS une boutique
// Shopify, pour ne jamais masquer une vraie boutique dont le titre
// contiendrait par hasard « à vendre ».
const PARKED =
  /(sedo\.com|sedoparking|afternic|hugedomains|dan\.com|buy this domain|this domain is for sale|ce domaine est à vendre|est disponible à l.achat|window\.location\.href\s*=\s*["']\/lander)/i;
const SHOPIFY_MARKERS = /(cdn\.shopify\.com|Shopify\.shop|shopify-section)/;
// Titres des pages Shopify « boutique fermée » (FR / EN / ES).
const SHOP_CLOSED =
  /(store unavailable|this store is unavailable|this shop is (currently )?unavailable|store will be right back|boutique indisponible|boutique est actuellement indisponible|tienda no disponible|only one step left|shop is closed)/i;
// Erreurs réseau qui signifient « site mort » (et non une simple lenteur).
const DEAD_CODES = /^(ENOTFOUND|ECONNREFUSED|UNABLE_TO_VERIFY_LEAF_SIGNATURE)$|CERT|SSL|TLS/;

export async function checkShop(url: string, timeoutMs = 10000): Promise<ShopCheck> {
  let res: Response;
  try {
    res = await fetch(url, {
      redirect: "follow",
      cache: "no-store",
      signal: AbortSignal.timeout(timeoutMs),
      headers: {
        "User-Agent": USER_AGENT,
        Accept: "text/html,application/xhtml+xml",
        "Accept-Language": "fr,en;q=0.8",
      },
    });
  } catch (error) {
    // Domaine inexistant, connexion refusée ou certificat invalide = mort ;
    // simple délai dépassé / coupure = on ne conclut rien.
    const code = (error as { cause?: { code?: string } })?.cause?.code ?? "";
    if (DEAD_CODES.test(code)) return { status: "unavailable", reason: `site injoignable (${code})` };
    return { status: "unknown", reason: code ? `erreur réseau (${code})` : "délai dépassé" };
  }

  const { status } = res;
  // Shopify répond 429 (ou 403 / 503 « Verifying your connection... ») aux
  // robots trop pressés : ce n'est PAS une boutique morte.
  if (status === 429 || status === 403 || status === 503) {
    await res.body?.cancel();
    return { status: "unknown", reason: `${status} : Shopify limite les requêtes`, rateLimited: true };
  }
  if (res.url.includes("/password")) {
    await res.body?.cancel();
    return { status: "password-protected", reason: "protégée par un mot de passe" };
  }
  if (status >= 500) {
    await res.body?.cancel();
    return { status: "unknown", reason: `${status} : erreur serveur passagère` };
  }
  if (status >= 400) {
    await res.body?.cancel();
    const label =
      status === 402
        ? "boutique suspendue ou fermée"
        : status === 404 || status === 410
          ? "boutique supprimée"
          : status === 423
            ? "boutique verrouillée"
            : "page en erreur";
    return { status: "unavailable", reason: `${status} : ${label}` };
  }

  const head = (await res.text()).slice(0, 60000);
  const title = (head.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "").trim();
  if (SHOP_CLOSED.test(title)) {
    return { status: "unavailable", reason: `page « ${title.slice(0, 60)} »` };
  }
  if (!SHOPIFY_MARKERS.test(head) && PARKED.test(title + " " + head.slice(0, 3000))) {
    return { status: "unavailable", reason: "domaine parqué ou à vendre" };
  }
  return { status: "live", reason: "en ligne" };
}
