import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import SplitHeading from "./SplitHeading";
import Reveal from "./Reveal";

/** En-tête des pages intérieures (fond nuit) : retour à l'accueil + grand titre h1. */
export default function PageHeader({
  backLabel,
  title,
  kicker,
}: {
  backLabel: string;
  title: string;
  kicker?: string;
}) {
  return (
    <div className="tone-dark relative isolate overflow-hidden pb-4">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid mask-radial absolute inset-0" />
        <div className="absolute -right-40 -top-40 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(closest-side,rgba(0,128,96,0.22),transparent)]" />
      </div>
      <div className="container-page pt-36 sm:pt-44">
        <Reveal y={10}>
          <Link href="/" className="btn-ghost group px-4 py-2 text-sm">
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            {backLabel}
          </Link>
        </Reveal>
        <SplitHeading
          as="h1"
          text={title}
          className="font-display mt-8 text-[clamp(3.2rem,11vw,10rem)] font-semibold leading-[0.95] tracking-[-0.05em]"
        />
        {kicker && (
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">{kicker}</p>
          </Reveal>
        )}
        <div className="mt-12 h-px w-full bg-line" />
      </div>
    </div>
  );
}
