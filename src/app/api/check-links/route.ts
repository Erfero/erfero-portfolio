import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { checkAndUpdateProjectLinks } from "@/lib/linkChecker";

async function isAuthorized(request: Request) {
  const session = await auth();
  if (session) return true;

  const secret = request.headers.get("x-cron-secret");
  return !!secret && secret === process.env.CRON_SECRET;
}

export async function POST(request: Request) {
  if (!(await isAuthorized(request))) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { results, updated } = await checkAndUpdateProjectLinks();

  if (updated) {
    revalidatePath("/", "layout");
    revalidatePath("/[locale]", "page");
    revalidatePath("/[locale]/realisations", "page");
  }

  return NextResponse.json({
    checkedAt: new Date().toISOString(),
    updated,
    results,
  });
}

export async function GET(request: Request) {
  return POST(request);
}
