import { NextResponse, type NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { SHORT_LINKS } from "./data/shortLinks";

const intl = createMiddleware(routing);

/**
 * 1. Liens courts à partager (voir src/data/shortLinks.ts) : /home → portfolio
 *    en anglais, /resume → CV en anglais. Le français n'en a pas besoin :
 *    « / » et « /cv » sont déjà en français.
 * 2. Tout le reste passe par le middleware de langues (next-intl).
 */
export default function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname.replace(/\/+$/, "").toLowerCase();
  const target = SHORT_LINKS.find((l) => l.path === path && l.redirectTo);
  if (target?.redirectTo) {
    const url = request.nextUrl.clone();
    url.pathname = target.redirectTo;
    url.search = "";
    return NextResponse.redirect(url, 307);
  }
  return intl(request);
}

// `icon` (favicon généré par app/icon.tsx) est exclu : sans ça, le middleware
// i18n le réécrivait en /fr/icon, qui n'existe pas -> favicon en 404.
export const config = {
  matcher: ["/((?!api|trpc|_next|_vercel|admin|icon(?:/|$)|.*\\..*).*)"],
};
