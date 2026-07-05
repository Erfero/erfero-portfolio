import { readFile } from "fs/promises";
import path from "path";
import { PDFDocument } from "pdf-lib";
import { getCvSettings } from "@/lib/content";

// Sert le CV avec un nom et un titre propres ("CV-Erfero") quel que soit le
// nom réel du fichier en stockage (un upload Vercel Blob ajoute un suffixe
// aléatoire illisible) — le visualiseur PDF du navigateur affiche ce titre
// dans sa barre d'outils au lieu du nom de fichier brut.
export async function GET() {
  const cv = await getCvSettings();
  if (!cv.enabled || !cv.url) {
    return new Response("Not found", { status: 404 });
  }

  let bytes: Uint8Array;
  if (cv.url.startsWith("/")) {
    bytes = await readFile(path.join(process.cwd(), "public", cv.url));
  } else {
    const res = await fetch(cv.url, { cache: "no-store" });
    if (!res.ok) return new Response("Not found", { status: 404 });
    bytes = new Uint8Array(await res.arrayBuffer());
  }

  const pdf = await PDFDocument.load(bytes);
  pdf.setTitle("CV-Erfero");
  const renamed = Buffer.from(await pdf.save());

  return new Response(renamed, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'inline; filename="CV-Erfero.pdf"',
      "Cache-Control": "no-store",
    },
  });
}
