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

export function WhatsappIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.48 1.32 5L2 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2Zm0 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.188 8.188 0 0 1-1.26-4.38c.01-4.54 3.71-8.25 8.26-8.25ZM8.51 7.43c-.16 0-.42.06-.64.31-.22.25-.85.83-.85 2.02 0 1.19.87 2.34 1 2.5.12.16 1.7 2.72 4.2 3.7 2.08.82 2.5.66 2.96.62.46-.04 1.48-.6 1.68-1.19.21-.58.21-1.08.15-1.19-.06-.1-.23-.16-.48-.28-.25-.13-1.48-.73-1.71-.81-.23-.08-.4-.13-.56.13-.17.25-.64.81-.79.98-.14.16-.29.19-.54.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.24-1.48-1.39-1.73-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.24-.41.08-.16.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.43l-.48-.01Z" />
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
