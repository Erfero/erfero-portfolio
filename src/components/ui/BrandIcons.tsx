import type { SVGProps } from "react";

/**
 * lucide-react dropped brand glyphs from its exports, so these three are
 * hand-kept as local SVGs (classic Feather/Lucide MIT-licensed paths).
 */
type IconProps = SVGProps<SVGSVGElement>;

const base = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function InstagramIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export function GithubIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

export function LinkedinIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function WhatsappIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 21l1.65-4.95A8.5 8.5 0 1 1 8.5 19.35z" />
      <path d="M8.5 13.5c.5 1.5 2.5 3.5 4 4" />
    </svg>
  );
}

/** Silhouette de sac stylisée en vert Shopify (#95BF47) — un clin d'œil
 * visuel à la plateforme, pas une reproduction du logo officiel. */
export function ShopifyBagIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M17.5 6.2c-.4 0-1 .1-1.6.3-.5-1.4-1.5-2.8-3.2-2.8-.5 0-1 .1-1.4.4C10.7 3 9.9 2.5 9.1 2.5c-3.3 0-4.9 4.1-5.4 6.2-1.4.4-2.4.8-2.6.8-.7.2-.8.3-.9 1C0 11 0 21 0 21l14.8 2.7 6.7-1.5S19 6.6 19 6.4c0-.1-.1-.2-.3-.2 0 0-.6 0-1.2 0zm-3.9.4l-1.9.6c0-1.2-.2-2.9-.7-3.9 1.5.3 2.2 1.9 2.6 3.3zm-2.3-3.1c.5 1 .7 2.5.8 3.7L9 8.1c.4-1.6 1.2-3.3 2.3-4.6zM8.9 3.5c.2 0 .4 0 .5.1-1.3 1.4-2.1 3.3-2.5 4.9l-2.5.8c.6-2.2 2-5.8 4.5-5.8z"
      />
    </svg>
  );
}
