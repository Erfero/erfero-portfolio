import "server-only";

export interface SiteMeta {
  title: string;
  description: string;
}

function extract(html: string, re: RegExp): string {
  const m = html.match(re);
  return m ? m[1].trim() : "";
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function decodeEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&ndash;/g, "–")
    .replace(/&nbsp;/g, " ");
}

interface ShopifyProduct {
  title: string;
  body_html?: string;
}

/** Meilleur effort pour pré-remplir une fiche boutique à partir de sa page
 * d'accueil (titre/description) et, si c'est une boutique Shopify, de son
 * premier produit via /products.json (souvent plus parlant que la meta
 * description générique du thème). Ne lève jamais — retourne des chaînes
 * vides si rien n'a pu être récupéré, à charge de l'admin de compléter. */
export async function fetchSiteMeta(url: string): Promise<SiteMeta> {
  let title = "";
  let description = "";

  try {
    const res = await fetch(url, {
      redirect: "follow",
      signal: AbortSignal.timeout(10000),
      headers: { "User-Agent": "Mozilla/5.0 (compatible; PortfolioBot/1.0)" },
    });
    const html = await res.text();
    title = decodeEntities(
      extract(html, /<title[^>]*>([^<]*)<\/title>/i) ||
        extract(html, /<meta\s+property=["']og:title["']\s+content=["']([^"']*)["']/i)
    ).split("–")[0].trim();
    description = decodeEntities(
      extract(html, /<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i) ||
        extract(html, /<meta\s+content=["']([^"']*)["']\s+name=["']description["']/i) ||
        extract(html, /<meta\s+property=["']og:description["']\s+content=["']([^"']*)["']/i)
    );
  } catch {
    // best effort — on continue avec ce qu'on a
  }

  try {
    const productsUrl = url.replace(/\/$/, "") + "/products.json?limit=1";
    const res = await fetch(productsUrl, {
      redirect: "follow",
      signal: AbortSignal.timeout(10000),
      headers: { "User-Agent": "Mozilla/5.0 (compatible; PortfolioBot/1.0)" },
    });
    const contentType = res.headers.get("content-type") || "";
    if (res.status === 200 && contentType.includes("json")) {
      const data = (await res.json()) as { products?: ShopifyProduct[] };
      const product = data.products?.[0];
      if (product) {
        const blurb = stripHtml(decodeEntities(product.body_html || "")).slice(0, 240);
        if (blurb) description = blurb;
        if (!title || title.length < 3) title = decodeEntities(product.title);
      }
    }
  } catch {
    // pas une boutique Shopify (ou /products.json désactivé) — on ignore
  }

  return { title, description };
}
