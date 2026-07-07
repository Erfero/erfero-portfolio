import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { supabaseAdmin, SUPABASE_BUCKET } from "@/lib/supabase";

const ALLOWED_TYPES = [
  "video/mp4",
  "video/quicktime",
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/gif",
  "audio/mpeg",
  "audio/mp3",
  "audio/wav",
  "application/pdf",
];

function withRandomSuffix(pathname: string) {
  const dot = pathname.lastIndexOf(".");
  const suffix = Math.random().toString(36).slice(2, 10);
  if (dot === -1) return `${pathname}-${suffix}`;
  return `${pathname.slice(0, dot)}-${suffix}${pathname.slice(dot)}`;
}

export async function POST(request: Request): Promise<NextResponse> {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  const pathname = formData.get("pathname");

  if (!(file instanceof File) || typeof pathname !== "string" || !pathname) {
    return NextResponse.json({ error: "Fichier manquant" }, { status: 400 });
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json(
      { error: `Type de fichier non autorisé : ${file.type}` },
      { status: 400 }
    );
  }

  // Le CV a un chemin fixe (cv/...) : pas de suffixe aléatoire, chaque
  // nouvel envoi remplace le précédent proprement. Les autres médias
  // reçoivent un suffixe aléatoire pour ne jamais s'écraser entre eux.
  const isFixedPath = pathname.startsWith("cv/");
  const finalPath = isFixedPath ? pathname : withRandomSuffix(pathname);

  const { error } = await supabaseAdmin.storage
    .from(SUPABASE_BUCKET)
    .upload(finalPath, file, { upsert: isFixedPath, contentType: file.type });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data } = supabaseAdmin.storage.from(SUPABASE_BUCKET).getPublicUrl(finalPath);
  return NextResponse.json({ url: data.publicUrl, pathname: finalPath });
}
