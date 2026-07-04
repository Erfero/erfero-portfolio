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

/** Sac deux tons vert Shopify (#95BF47 / #5E8E3E) avec le swoosh blanc, en
 * clin d'œil à la plateforme — couleurs de marque, pas d'usage trompeur. */
export function ShopifyBagIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 109 124" {...props}>
      <path
        fill="#95BF47"
        d="M74.7 14.8c-.1-.5-.5-.8-.9-.8-.4 0-8.4-.2-8.4-.2s-6.6-6.4-7.3-7.1c-.7-.7-2.1-.5-2.6-.3 0 0-1.4.4-3.6 1.1-.4-1.2-1-2.7-1.8-4.2C48.1 1 45.5 0 42.4 0c-.2 0-.4 0-.6.1-.1-.1-.2-.2-.3-.3C40.1-.9 38-1 35.7.3c-6.5 3.8-11.4 12.3-13 16.2-3.4 1.1-5.8 1.8-6.1 1.9-1.9.6-2 .6-2.2 2.4C14.2 22.2 4.6 96.8 4.6 96.8L75 109.6l30.4-7.5S74.8 15.3 74.7 14.8z"
      />
      <path
        fill="#5E8E3E"
        d="M74.7 14.8c-.1-.5-.5-.8-.9-.8-.4 0-8.4-.2-8.4-.2s-6.6-6.4-7.3-7.1c-.2-.2-.6-.4-.9-.5l-4.7 102.9 30.4-7.5S74.8 15.3 74.7 14.8z"
      />
      <path
        fill="#fff"
        d="M52.6 27.9l-3.7 11s-3.3-1.8-7.2-1.8c-5.8 0-6.1 3.6-6.1 4.5 0 5 13 6.9 13 18.6 0 9.2-5.8 15.1-13.7 15.1-9.4 0-14.2-5.9-14.2-5.9l2.5-8.3s4.9 4.2 9 4.2c2.7 0 3.8-2.1 3.8-3.7 0-6.5-10.6-6.8-10.6-17.5 0-9 6.4-17.7 19.4-17.7 5 0 7.8 1.5 7.8 1.5z"
      />
    </svg>
  );
}

/** Étoile pleine dans le vert Trustpilot (#00B67A). */
export function TrustpilotStar(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path
        fill="#00B67A"
        d="M12 .8l3.3 7.3 8 .9-6 5.5 1.7 8-7-4.2-7 4.2 1.7-8-6-5.5 8-.9L12 .8z"
      />
    </svg>
  );
}
