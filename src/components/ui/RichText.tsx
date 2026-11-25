import { Fragment } from "react";

/**
 * Mini-balisage pour les textes éditables (messages FR/EN, admin) :
 * `*mot*` est rendu en serif italique (couleur d'accent). Tout le reste est
 * du texte brut — aucun HTML n'est interprété.
 *
 * La ponctuation qui suit immédiatement un passage accentué (« *vendre*, »)
 * est collée à lui dans un bloc insécable, pour qu'un retour à la ligne ne
 * puisse jamais laisser une virgule seule en début de ligne.
 */
export default function RichText({
  text,
  accentClassName = "font-serif-accent text-lime",
}: {
  text: string;
  accentClassName?: string;
}) {
  const parts = text.split(/(\*[^*]+\*)/g).filter(Boolean);
  const out: React.ReactNode[] = [];

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (part.startsWith("*") && part.endsWith("*")) {
      const content = part.slice(1, -1);
      const next = parts[i + 1] ?? "";
      const punct = next.match(/^[,.;:!?…»)\]]+/)?.[0] ?? "";
      if (!punct) {
        out.push(
          <em key={i} className={accentClassName}>
            {content}
          </em>
        );
        continue;
      }
      parts[i + 1] = next.slice(punct.length);
      // Seul le dernier mot est rendu insécable avec sa ponctuation : le reste
      // du passage accentué peut toujours passer à la ligne (mobile).
      const cut = content.lastIndexOf(" ") + 1;
      out.push(
        <Fragment key={i}>
          {cut > 0 && <em className={accentClassName}>{content.slice(0, cut)}</em>}
          <span className="whitespace-nowrap">
            <em className={accentClassName}>{content.slice(cut)}</em>
            {punct}
          </span>
        </Fragment>
      );
    } else if (part) {
      out.push(<Fragment key={i}>{part}</Fragment>);
    }
  }
  return <>{out}</>;
}

/** Version texte brut (balises `*` retirées), pour les métadonnées SEO. */
export function plainText(text: string) {
  return text.replace(/\*([^*]+)\*/g, "$1");
}
