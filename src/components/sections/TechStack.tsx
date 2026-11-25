"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Check, Sparkles, TrendingUp, type LucideIcon } from "lucide-react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { techLogos, type TechKey } from "@/data/techLogos";
import SectionHeading from "@/components/ui/SectionHeading";
import TechIcon, { TechTile } from "@/components/ui/TechIcon";
import TechMarquee from "@/components/ui/TechMarquee";

type Extra = { label: string; icon: LucideIcon | TechKey; color: string };
type Item = TechKey | Extra;

const GROUPS: { key: string; spot: string; items: Item[] }[] = [
  { key: "languages", spot: "#3FD0C9", items: ["liquid", "html", "css", "javascript", "php"] },
  { key: "frontend", spot: "#61DAFB", items: ["react", "nextjs", "vue", "angular", "tailwind", "gsap"] },
  { key: "backend", spot: "#6CC24A", items: ["node", "laravel", "mongodb", "firebase"] },
  {
    key: "cms",
    spot: "#95BF47",
    items: ["shopify", { label: "Story Theme", icon: Sparkles, color: "#ff6fd0" }, "wordpress", "flutter"],
  },
  {
    key: "growth",
    spot: "#FFBE6B",
    items: [
      { label: "SEO", icon: "google", color: "#4C8BF5" },
      { label: "CRO", icon: TrendingUp, color: "#ffbe6b" },
    ],
  },
];

const INNER: TechKey[] = ["liquid", "html", "css", "javascript"];
const OUTER: TechKey[] = ["react", "vue", "tailwind", "gsap", "node", "php"];

function Chip({ item }: { item: Item }) {
  if (typeof item === "string") {
    return (
      <li className="st-chip flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] py-1.5 pl-1.5 pr-3.5 transition-colors hover:border-white/25 hover:bg-white/[0.07]">
        <TechTile name={item} size="sm" />
        <span className="text-sm font-semibold text-ink">{techLogos[item].title}</span>
      </li>
    );
  }
  const Icon = typeof item.icon === "string" ? null : item.icon;
  return (
    <li className="st-chip flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] py-1.5 pl-1.5 pr-3.5 transition-colors hover:border-white/25 hover:bg-white/[0.07]">
      <span
        className="grid size-10 shrink-0 place-items-center rounded-xl border"
        style={{ background: `linear-gradient(145deg, ${item.color}2e, ${item.color}0d)`, borderColor: `${item.color}40` }}
      >
        {Icon ? (
          <Icon className="size-5" style={{ color: item.color }} />
        ) : (
          <TechIcon name={item.icon as TechKey} className="size-5" color={item.color} />
        )}
      </span>
      <span className="text-sm font-semibold text-ink">{item.label}</span>
    </li>
  );
}

/**
 * Stack technique, mise en avant : la spécialité Shopify/Liquid au centre
 * d'une orbite de logos, puis chaque famille de langages et d'outils avec
 * les logos officiels en couleur, et un bandeau défilant.
 */
export default function TechStack({ index }: { index?: string }) {
  const t = useTranslations("techStack");
  const points = t.raw("core.points") as string[];
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(".st-card", {
          y: 50,
          autoAlpha: 0,
          duration: 1,
          ease: "expo.out",
          stagger: 0.08,
          scrollTrigger: { trigger: ".st-grid", start: "top 85%", once: true },
        });
        gsap.from(".st-chip", {
          scale: 0.7,
          autoAlpha: 0,
          duration: 0.6,
          ease: "back.out(2)",
          stagger: 0.025,
          scrollTrigger: { trigger: ".st-grid", start: "top 75%", once: true },
        });
        gsap.from(".st-orbit", {
          scale: 0.6,
          rotate: -40,
          autoAlpha: 0,
          duration: 1.6,
          ease: "expo.out",
          scrollTrigger: { trigger: ".st-grid", start: "top 85%", once: true },
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="stack" className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28">
      <div aria-hidden className="glow-orb -right-40 top-20 h-[30rem] w-[30rem] bg-pink/25" />
      <div aria-hidden className="glow-orb -left-32 top-1/2 h-[26rem] w-[26rem] bg-cyan/15" />

      <div className="container-page">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} index={index} />

        <div className="st-grid mt-14 grid gap-5 lg:grid-cols-12">
          {/* Spécialité : Shopify & Liquid */}
          <article className="st-card spotlight p-6 sm:p-8 lg:col-span-5 lg:row-span-2" style={{ "--spot": "#95BF47" } as React.CSSProperties}>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#95BF47]/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[#b5dc6d]">
              <Sparkles className="size-3.5" />
              {t("core.badge")}
            </span>

            <div className="st-orbit relative mx-auto my-6 aspect-square w-full max-w-[330px] [container-type:inline-size]">
              <span aria-hidden className="absolute inset-[18%] rounded-full border border-white/10" />
              <span aria-hidden className="absolute inset-[2%] rounded-full border border-dashed border-white/10" />
              <span
                aria-hidden
                className="absolute inset-[34%] rounded-full bg-[radial-gradient(closest-side,rgba(149,191,71,0.45),transparent)] blur-md"
              />
              <span className="absolute inset-0 m-auto grid size-[28cqw] place-items-center rounded-[28%] border border-[#95BF47]/50 bg-[#0f1a12] shadow-[0_0_60px_-10px_rgba(149,191,71,0.8)]">
                <TechIcon name="shopify" className="size-[15cqw]" />
              </span>
              {INNER.map((key, i) => (
                <span
                  key={key}
                  className="orbit-item absolute left-1/2 top-1/2 -ml-[7cqw] -mt-[7cqw]"
                  style={
                    {
                      "--orbit-r": "32cqw",
                      "--orbit-start": `${i * 90}deg`,
                      "--orbit-duration": "26s",
                    } as React.CSSProperties
                  }
                >
                  <span
                    className="grid size-[14cqw] place-items-center rounded-2xl border bg-bg-soft"
                    style={{ borderColor: `${techLogos[key].color}66`, boxShadow: `0 0 24px -6px ${techLogos[key].color}` }}
                    title={techLogos[key].title}
                  >
                    <TechIcon name={key} className="size-[7cqw]" />
                  </span>
                </span>
              ))}
              {OUTER.map((key, i) => (
                <span
                  key={key}
                  className="orbit-item absolute left-1/2 top-1/2 -ml-[6cqw] -mt-[6cqw]"
                  style={
                    {
                      "--orbit-r": "48cqw",
                      "--orbit-start": `${i * 60 + 30}deg`,
                      "--orbit-duration": "40s",
                      "--orbit-direction": "reverse",
                    } as React.CSSProperties
                  }
                >
                  <span
                    className="grid size-[12cqw] place-items-center rounded-full border bg-bg-soft"
                    style={{ borderColor: `${techLogos[key].color}55` }}
                    title={techLogos[key].title}
                  >
                    <TechIcon name={key} className="size-[6cqw]" />
                  </span>
                </span>
              ))}
            </div>

            <h3 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">{t("core.title")}</h3>
            <p className="mt-3 text-base leading-relaxed text-ink-muted">{t("core.description")}</p>
            <ul className="mt-5 grid gap-2.5">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm text-ink sm:text-base">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-[#95BF47]/20 text-[#b5dc6d]">
                    <Check className="size-3" strokeWidth={3} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </article>

          {/* Familles de technologies */}
          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
            {GROUPS.map((group, gi) => (
              <article
                key={group.key}
                className={`st-card spotlight p-6 sm:p-7 ${gi === GROUPS.length - 1 ? "sm:col-span-2" : ""}`}
                style={{ "--spot": group.spot } as React.CSSProperties}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
                    {t(`groups.${group.key}.title`)}
                  </h3>
                  <span className="size-2.5 rounded-full" style={{ background: group.spot, boxShadow: `0 0 14px ${group.spot}` }} />
                </div>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{t(`groups.${group.key}.description`)}</p>
                <ul className="mt-5 flex flex-wrap gap-2.5">
                  {group.items.map((item) => (
                    <Chip key={typeof item === "string" ? item : item.label} item={item} />
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-14 flex flex-col gap-3">
        <TechMarquee duration={60} />
        <TechMarquee reverse duration={70} items={["php", "laravel", "node", "mongodb", "firebase", "wordpress", "flutter", "git", "github", "google", "shopify", "liquid", "javascript", "css", "html", "react"]} />
      </div>
    </section>
  );
}
