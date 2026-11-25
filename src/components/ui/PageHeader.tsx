import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import SplitHeading from "./SplitHeading";
import Reveal from "./Reveal";

/** En-tête des pages intérieures : retour à l'accueil + grand titre h1. */
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
    <div className="container-page pt-36 sm:pt-44">
      <Reveal y={10}>
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-ink"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          {backLabel}
        </Link>
      </Reveal>
      <SplitHeading
        as="h1"
        text={title}
        className="font-display mt-8 text-[clamp(3.2rem,11vw,10rem)] font-semibold leading-[0.88] tracking-[-0.05em]"
      />
      {kicker && (
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">{kicker}</p>
        </Reveal>
      )}
      <div className="mt-12 h-px w-full bg-white/10" />
    </div>
  );
}
