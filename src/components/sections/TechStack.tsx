import { useTranslations } from "next-intl";
import SplitHeading from "@/components/ui/SplitHeading";

const row1 = ["Shopify", "Liquid", "Story Theme", "React", "Next.js", "Vue.js", "Tailwind CSS"];
const row2 = ["Node.js", "Laravel", "PHP", "MongoDB", "Firebase", "SEO", "CRO", "GSAP"];

function Row({ items, reverse }: { items: string[]; reverse?: boolean }) {
  return (
    <div className="overflow-hidden" aria-hidden>
      <div
        className="marquee-track flex w-max items-center gap-10 whitespace-nowrap pr-10 sm:gap-16 sm:pr-16"
        style={
          {
            "--marquee-name": reverse ? "marquee-x-reverse" : "marquee-x",
            "--marquee-duration": "38s",
          } as React.CSSProperties
        }
      >
        {[...items, ...items].map((item, i) => (
          <span key={i} className="flex items-center gap-10 sm:gap-16">
            <span
              className={`font-display text-5xl font-semibold tracking-[-0.04em] sm:text-7xl lg:text-8xl ${
                i % 2 === 0 ? "text-ink/90" : "text-outline"
              }`}
            >
              {item}
            </span>
            <span className="size-3 rounded-full bg-lime sm:size-4" />
          </span>
        ))}
      </div>
    </div>
  );
}

/** Stack technique en grandes bandes défilantes (pleines / contour). */
export default function TechStack() {
  const t = useTranslations("techStack");
  const all = [...row1, ...row2];

  return (
    <section className="relative overflow-hidden border-y border-white/10 py-20 sm:py-28">
      <div className="container-page">
        <span className="inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.22em] text-lime">
          <span className="h-px w-8 bg-lime/70" />
          {t("eyebrow")}
        </span>
        <SplitHeading
          text={t("title")}
          className="font-display mt-5 max-w-2xl text-3xl font-medium leading-[1.05] tracking-[-0.03em] sm:text-5xl"
        />
        <p className="sr-only">{all.join(", ")}</p>
      </div>
      <div className="mt-14 flex flex-col gap-4 sm:gap-6">
        <Row items={row1} />
        <Row items={row2} reverse />
      </div>
    </section>
  );
}
