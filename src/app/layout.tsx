import type { Metadata, Viewport } from "next";
import { fontMono, fontSans, fontSerif } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://erfero-portfolio.vercel.app"),
};

export const viewport: Viewport = {
  themeColor: "#0c1a15",
  colorScheme: "dark",
};

// Exécuté de façon synchrone avant le premier rendu (voir le guide Next.js
// "Preventing flash before hydration") :
// - ajoute la classe "js" pour que les éléments du Hero animés par GSAP
//   partent masqués (sans JS, tout reste visible) ;
// - marque le préchargeur comme déjà vu dans cette session d'onglet, pour ne
//   l'afficher qu'à la toute première visite ;
// - filet de sécurité : si une animation n'a pas pu se lancer, tout est
//   rendu visible après 6 s.
const bootScript = `(function(){var d=document.documentElement;d.classList.add('js');try{if(sessionStorage.getItem('erfero-preloaded')){d.setAttribute('data-preloaded','1')}}catch(e){}setTimeout(function(){d.classList.add('reveal-failsafe')},6000)})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`${fontSans.variable} ${fontMono.variable} ${fontSerif.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body className="grain min-h-screen bg-bg font-sans text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
