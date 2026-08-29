import "server-only";
import { uploadScreenshot } from "./blob";

/**
 * Capture une fois la boutique via microlink.io et fige le résultat comme
 * fichier permanent (voir uploadScreenshot). On a d'abord utilisé thum.io en
 * direct dans chaque carte, mais son service gratuit a deux défauts rédhibitoires :
 * il tient très mal la charge quand plusieurs cartes le sollicitent en même
 * temps (la page /realisations en fait la demande), ET son rendu est
 * plafonné à un navigateur de 1200x1200px sur le tier gratuit quels que
 * soient les paramètres demandés — d'où des captures floues une fois
 * agrandies dans les cartes. microlink.io permet de choisir un viewport et un
 * deviceScaleFactor (rendu "rétina"), donc un vrai rendu net à haute
 * résolution, au prix d'un quota strict (25 requêtes/jour, sans clé API) —
 * voir refreshThumbnails.ts pour l'étalement du quota dans le temps.
 * Retourne null si la capture échoue.
 */
export async function captureThumbnail(
  id: string,
  url: string
): Promise<string | null> {
  const microlinkUrl =
    `https://api.microlink.io/?url=${encodeURIComponent(url)}` +
    `&screenshot=true&meta=false&waitUntil=networkidle2` +
    `&viewport.width=900&viewport.height=1400&viewport.deviceScaleFactor=1.5`;

  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const res = await fetch(microlinkUrl, {
        signal: AbortSignal.timeout(45000),
        headers: { "User-Agent": "Mozilla/5.0" },
      });
      if (!res.ok) throw new Error(`microlink http ${res.status}`);
      const json = (await res.json()) as {
        status: string;
        data?: { screenshot?: { url: string } };
      };
      const shotUrl = json.data?.screenshot?.url;
      if (json.status !== "success" || !shotUrl) {
        throw new Error(`microlink status ${json.status}`);
      }

      const imgRes = await fetch(shotUrl, { signal: AbortSignal.timeout(30000) });
      const contentType = imgRes.headers.get("content-type") || "";
      const bytes = Buffer.from(await imgRes.arrayBuffer());
      if (imgRes.status === 200 && contentType.startsWith("image/") && bytes.length > 8000) {
        return await uploadScreenshot(id, bytes);
      }
      throw new Error(`bad image response status=${imgRes.status}`);
    } catch {
      // on retente une fois, sinon on abandonne silencieusement
    }
  }
  return null;
}
