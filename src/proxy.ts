import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

// `icon` (favicon généré par app/icon.tsx) est exclu : sans ça, le middleware
// i18n le réécrivait en /fr/icon, qui n'existe pas -> favicon en 404.
export const config = {
  matcher: ["/((?!api|trpc|_next|_vercel|admin|icon(?:/|$)|.*\\..*).*)"],
};