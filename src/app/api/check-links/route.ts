import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { checkAndUpdateProjectLinks } from "@/lib/linkChecker";

// Les boutiques sont vérifiées une par une (≈ 2 min 30 pour 88) : on laisse
// à la fonction le maximum autorisé par Vercel.
export const maxDuration = 300;

/** Appel planifié : Vercel Cron envoie « Authorization: Bearer <CRON_SECRET> »
 * (voir vercel.json) ; l'en-tête x-cron-secret reste accepté pour les appels
 * manuels. */
function isScheduledCall(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  return (
    request.headers.get("authorization") === `Bearer ${secret}` ||
    request.headers.get("x-cron-secret") === secret
  );
}

export async function POST(request: Request) {
  if (!isScheduledCall(request) && !(await auth())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { results, updated, summary } = await checkAndUpdateProjectLinks();

  // Une boutique masquée ou revenue : toutes les pages qui listent des
  // boutiques sont régénérées à la visite suivante.
  if (updated) {
    revalidatePath("/", "layout");
    revalidatePath("/[locale]", "page");
    revalidatePath("/[locale]/realisations", "page");
  }

  return NextResponse.json({
    checkedAt: summary.finishedAt,
    updated,
    summary,
    results,
  });
}

export async function GET(request: Request) {
  return POST(request);
}
