import { Fragment } from "react";
import { useTranslations } from "next-intl";
import RichText from "@/components/ui/RichText";

/** Ligne 1 : l'univers Shopify (en avant). Ligne 2 : le reste de la stack. */
const SHOPIFY = ["Shopify", "Liquid", "Online Store 2.0", "Metafields", "Shopify CLI", "Checkout", "Shopify Markets", "Thème Story", "Dawn", "SEO", "Google Analytics"];
const WEB = ["HTML5", "CSS3", "JavaScript", "React", "Next.js", "Vue.js", "Tailwind CSS", "GSAP", "Node.js", "Laravel", "PHP", "WordPress"];

function Row({ items, reverse, size }: { items: string[]; reverse?: boolean; size: string }) {
  return (
    <div className="marquee-pause overflow-hidden">
      <div
        className="marquee-track flex w-max items-center"
        style={
          {
            "--marquee-name": reverse ? "marquee-x-reverse" : "marquee-x",
            "--marquee-duration": `${items.length * 5}s`,
          } as React.CSSProperties
        }
      >
        {[0, 1].map((copy) => (
          <div key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
            {items.map((item, i) => (
              <Fragment key={`${copy}-${item}`}>
                <span className={`whitespace-nowrap px-5 font-serif leading-[1.05] sm:px-7 ${size} ${i % 2 ? "italic" : ""}`}>
                  {item}
                </span>
                <span aria-hidden className="text-[0.45em] text-accent">
                  ✦
                </span>
              </Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/** « Ma boîte à outils » : les technologies en très grand, qui défilent. */
export default function Toolbox() {
  const t = useTranslations("toolbox");
  return (
    <section className="tone-stone relative overflow-hidden py-20 sm:py-28">
      <h2 className="sr-only">{t("title").replace(/\*/g, "")}</h2>
      <div className="flex flex-col gap-2 sm:gap-4">
        <Row items={SHOPIFY} size="text-[3.4rem] sm:text-[5.5rem] lg:text-[7.5rem]" />
        <Row items={WEB} reverse size="text-[2.4rem] text-ink-muted sm:text-[3.6rem] lg:text-[4.6rem]" />
      </div>
      <div className="container-page mt-12 sm:mt-16">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-ink-muted">{t("eyebrow")}</p>
        <p aria-hidden className="mt-3 max-w-xl font-serif text-3xl leading-tight sm:text-4xl">
          <RichText text={t("title")} />
        </p>
      </div>
    </section>
  );
}
