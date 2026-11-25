import { techLogos, type TechKey } from "@/data/techLogos";
import { TechTile } from "./TechIcon";

export const MARQUEE_STACK: TechKey[] = [
  "shopify",
  "liquid",
  "html",
  "css",
  "javascript",
  "react",
  "nextjs",
  "vue",
  "angular",
  "tailwind",
  "gsap",
  "node",
  "php",
  "laravel",
  "mongodb",
  "firebase",
  "wordpress",
  "flutter",
];

/** Bandeau infini de technologies (logos sobres, Shopify et Liquid en vert). */
export default function TechMarquee({
  items = MARQUEE_STACK,
  reverse,
  duration = 55,
}: {
  items?: TechKey[];
  reverse?: boolean;
  duration?: number;
}) {
  return (
    <div className="marquee-pause mask-fade-x overflow-hidden py-2">
      <p className="sr-only">{items.map((k) => techLogos[k].title).join(", ")}</p>
      <div
        aria-hidden
        className="marquee-track flex w-max gap-3 pr-3"
        style={
          {
            "--marquee-name": reverse ? "marquee-x-reverse" : "marquee-x",
            "--marquee-duration": `${duration}s`,
          } as React.CSSProperties
        }
      >
        {[...items, ...items].map((key, i) => (
          <span
            key={`${key}-${i}`}
            className="flex shrink-0 items-center gap-3 rounded-2xl border border-line bg-ink/[0.03] py-2 pl-2 pr-5"
          >
            <TechTile name={key} size="sm" />
            <span className="font-display text-base font-medium tracking-tight text-ink">
              {techLogos[key].title}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
