import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { refreshThumbnails } from "@/lib/refreshThumbnails";

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

  const result = await refreshThumbnails();

  if (result.captured.length > 0) {
    revalidatePath("/", "layout");
    revalidatePath("/[locale]", "page");
    revalidatePath("/[locale]/realisations", "page");
  }

  return NextResponse.json({
    refreshedAt: new Date().toISOString(),
    ...result,
  });
}

export async function GET(request: Request) {
  return POST(request);
}
