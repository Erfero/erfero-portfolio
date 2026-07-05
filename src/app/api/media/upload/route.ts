import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        const session = await auth();
        if (!session) throw new Error("Non autorisé");

        // Le CV a un chemin fixe (cv/erfero-keoula-cv.pdf) : pas de suffixe
        // aléatoire, chaque nouvel envoi remplace le précédent proprement.
        const isFixedPath = pathname.startsWith("cv/");

        return {
          allowedContentTypes: [
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
          ],
          addRandomSuffix: !isFixedPath,
          allowOverwrite: isFixedPath,
        };
      },
      onUploadCompleted: async () => {},
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    );
  }
}
