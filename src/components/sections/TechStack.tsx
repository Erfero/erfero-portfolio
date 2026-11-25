"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import {
  ArrowUpRight,
  Braces,
  Gauge,
  MessagesSquare,
  ShieldCheck,
  Smartphone,
  Terminal,
  TrendingUp,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { techLogos, type TechKey } from "@/data/techLogos";
import SectionHeading from "@/components/ui/SectionHeading";
import TechIcon from "@/components/ui/TechIcon";
import RichText from "@/components/ui/RichText";

type Text = { title: string; description: string };

/* ---------- Éditeur de code : un vrai extrait de section Liquid ---------- */
type Tok = [kind: "k" | "o" | "s" | "t" | "c" | "p", text: string];
// k = balise Liquid, o = objet/variable, s = chaîne, t = HTML, c = commentaire, p = texte brut
const CODE: Tok[][] = [
  [["c", "{% comment %} Section Online Store 2.0 {% endcomment %}"]],
  [["t", '<section class="'], ["s", "produits-vedettes"], ["t", '">']],
  [["p", "  "], ["k", "{%- for "], ["o", "product"], ["k", " in "], ["o", "section.settings.collection.products"], ["k", " limit: 4 -%}"]],
  [["p", "    "], ["t", '<a href="'], ["o", "{{ product.url }}"], ["t", '" class="'], ["s", "carte"], ["t", '">']],
  [["p", "      "], ["o", "{{ product.featured_image "], ["k", "| image_url: width: 800 | image_tag"], ["o", " }}"]],
  [["p", "      "], ["t", "<h3>"], ["o", "{{ product.title }}"], ["t", "</h3>"]],
  [["p", "      "], ["t", "<p>"], ["o", "{{ product.price "], ["k", "| money"], ["o", " }}"], ["t", "</p>"]],
  [["p", "      "], ["k", "{%- if "], ["o", "product.compare_at_price > product.price"], ["k", " -%}"]],
  [["p", "        "], ["t", '<span class="'], ["s", "badge"], ["t", '">'], ["s", "Promo"], ["t", "</span>"]],
  [["p", "      "], ["k", "{%- endif -%}"]],
  [["p", "    "], ["t", "</a>"]],
  [["p", "  "], ["k", "{%- endfor -%}"]],
  [["t", "</section>"]],
  [["k", "{% schema %}"], ["p", " "], ["s", '{ "name": "Produits vedettes" }'], ["p", " "], ["k", "{% endschema %}"]],
];
const TOK_CLASS: Record<Tok[0], string> = {
  k: "text-[#3cc896]",
  o: "text-[#f4f2ed]",
  s: "text-[#d9cfbc]",
  t: "text-[#8c938f]",
  c: "text-[#6f7773] italic",
  p: "",
};

/* ---------- Langages de Shopify (en avant) ---------- */
const SHOPIFY_LANGS: { label: string; icon: TechKey | LucideIcon }[] = [
  { label: "Liquid", icon: "liquid" },
  { label: "HTML5", icon: "html" },
  { label: "CSS3", icon: "css" },
  { label: "JavaScript", icon: "javascript" },
  { label: "JSON", icon: Braces },
  { label: "Shopify CLI", icon: Terminal },
  { label: "Git & GitHub", icon: "github" },
];

/* ---------- Le reste de la stack (secondaire) ---------- */
const OTHERS: { key: "frontend" | "backend" | "cms"; items: TechKey[] }[] = [
  { key: "frontend", items: ["react", "nextjs", "vue", "angular", "tailwind", "gsap"] },
  { key: "backend", items: ["node", "php", "laravel", "mongodb", "firebase"] },
  { key: "cms", items: ["wordpress", "flutter"] },
];

const QUALITY_ICONS: LucideIcon[] = [Wrench, Smartphone, TrendingUp, Gauge, MessagesSquare, ShieldCheck];

function Glyph({ icon, className }: { icon: TechKey | LucideIcon; className?: string }) {
  if (typeof icon === "string") return <TechIcon name={icon} color="currentColor" className={className} />;
  const Icon = icon;
  return <Icon className={className} aria-hidden />;
}

/**
 * Expertise Shopify : la section qui montre le métier.
 * 1. Un éditeur affiche un vrai extrait de section Liquid (tapé ligne par
 *    ligne à l'arrivée) + les langages de Shopify ;
 * 2. la liste des compétences Shopify, de la théorie au checkout ;
 * 3. les qualités d'un bon développeur Shopify ;
 * 4. en second plan seulement : le reste de la stack web.
 */
export default function TechStack({ index }: { index?: string }) {
  const t = useTranslations("techStack");
  const skills = t.raw("skills") as Text[];
  const qualities = t.raw("qualities") as Text[];
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // Le code « s'écrit » ligne par ligne.
        gsap.fromTo(
          ".ts-line",
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.14,
            scrollTrigger: { trigger: ".ts-editor", start: "top 75%", once: true },
          }
        );
        gsap.from(".ts-editor, .ts-langs", {
          y: 50,
          autoAlpha: 0,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.12,
          scrollTrigger: { trigger: ".ts-editor", start: "top 90%", once: true },
        });
        gsap.from(".ts-skill", {
          y: 26,
          autoAlpha: 0,
          duration: 0.9,
          ease: "expo.out",
          stagger: 0.06,
          scrollTrigger: { trigger: ".ts-skills", start: "top 85%", once: true },
        });
        gsap.from(".ts-quality", {
          y: 40,
          autoAlpha: 0,
          duration: 1,
          ease: "expo.out",
          stagger: 0.07,
          scrollTrigger: { trigger: ".ts-qualities", start: "top 88%", once: true },
        });
        gsap.from(".ts-others", {
          y: 40,
          autoAlpha: 0,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: { trigger: ".ts-others", start: "top 90%", once: true },
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="expertise" className="tone-dark relative scroll-mt-24 overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="bg-grid mask-radial pointer-events-none absolute inset-0 -z-0 opacity-60" />

      <div className="container-page relative">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} index={index} size="lg" />

        {/* 1 + 2 : code Liquid et compétences Shopify */}
        <div className="mt-16 grid gap-10 lg:mt-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-14">
          <div className="min-w-0">
            <figure
              className="ts-editor overflow-hidden rounded-2xl border border-line bg-[#0a0e0c] shadow-[0_40px_90px_-50px_rgba(0,0,0,1)]"
              aria-label={t("editorLabel")}
            >
              <div className="flex h-10 items-center gap-3 border-b border-line bg-bg-soft px-4">
                <span className="flex gap-1.5" aria-hidden>
                  <span className="size-2.5 rounded-full bg-ink/20" />
                  <span className="size-2.5 rounded-full bg-ink/20" />
                  <span className="size-2.5 rounded-full bg-ink/20" />
                </span>
                <span className="truncate font-mono text-xs text-ink-muted">{t("editorFile")}</span>
                <span className="ml-auto inline-flex items-center gap-1.5 rounded-md bg-accent/12 px-2 py-0.5 font-mono text-[11px] font-medium text-accent">
                  <TechIcon name="liquid" color="currentColor" className="size-3.5" />
                  Liquid
                </span>
              </div>
              <pre className="no-scrollbar overflow-x-auto p-5 font-mono text-[12px] leading-[1.75] sm:p-6 sm:text-[13px]">
                <code>
                  {CODE.map((line, i) => (
                    <span key={i} className="flex">
                      <span aria-hidden className="mr-5 w-5 shrink-0 select-none text-right text-ink-dim/60">
                        {i + 1}
                      </span>
                      <span className="ts-line whitespace-pre">
                        {line.map(([kind, text], j) => (
                          <span key={j} className={TOK_CLASS[kind]}>
                            {text}
                          </span>
                        ))}
                        {i === CODE.length - 1 && (
                          <span aria-hidden className="caret-blink ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[3px] bg-accent" />
                        )}
                      </span>
                    </span>
                  ))}
                </code>
              </pre>
            </figure>

            <div className="ts-langs mt-6">
              <p className="label-mono text-ink-dim">{t("languagesTitle")}</p>
              <ul className="mt-4 flex flex-wrap gap-2.5">
                {SHOPIFY_LANGS.map(({ label, icon }) => (
                  <li
                    key={label}
                    className={
                      label === "Liquid"
                        ? "inline-flex items-center gap-2.5 rounded-full border border-accent/40 bg-accent/10 py-2 pl-3 pr-4 text-sm font-medium text-accent"
                        : "inline-flex items-center gap-2.5 rounded-full border border-line bg-ink/[0.04] py-2 pl-3 pr-4 text-sm font-medium text-ink"
                    }
                  >
                    <Glyph icon={icon} className="size-4" />
                    {label}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="ts-skills min-w-0">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl bg-[#008060] text-white">
                <TechIcon name="shopify" color="currentColor" className="size-5" />
              </span>
              <h3 className="font-display text-xl font-semibold tracking-[-0.02em] sm:text-2xl">{t("skillsTitle")}</h3>
            </div>
            <ol className="mt-6 border-t border-line">
              {skills.map((s, i) => (
                <li key={s.title} className="ts-skill group grid grid-cols-[2.5rem_1fr] gap-x-3 border-b border-line py-4 sm:py-5">
                  <span className="pt-1 font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <p className="flex items-center gap-2 font-display text-lg font-semibold tracking-[-0.02em] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1 sm:text-xl">
                      {s.title}
                      <ArrowUpRight className="size-4 text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden />
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-ink-muted sm:text-[15px]">{s.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* 3 : les qualités d'un bon développeur Shopify */}
        <div className="ts-qualities mt-24">
          <h3 className="font-display max-w-2xl text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
            <RichText text={t("qualitiesTitle")} />
          </h3>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {qualities.map((q, i) => {
              const Icon = QUALITY_ICONS[i % QUALITY_ICONS.length];
              return (
                <li key={q.title} className="ts-quality spotlight p-6 sm:p-7">
                  <span className="grid size-11 place-items-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <p className="font-display mt-5 text-lg font-semibold tracking-[-0.02em]">{q.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted sm:text-[15px]">{q.description}</p>
                </li>
              );
            })}
          </ul>
        </div>

        {/* 4 : le reste de la stack, en second plan */}
        <div className="ts-others mt-16 rounded-3xl border border-line p-6 sm:p-8">
          <div className="flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
            <p className="font-display text-xl font-semibold tracking-[-0.02em]">{t("othersTitle")}</p>
            <p className="max-w-xl text-sm leading-relaxed text-ink-muted">{t("othersSubtitle")}</p>
          </div>
          <div className="mt-6 grid gap-6 border-t border-line pt-6 md:grid-cols-3">
            {OTHERS.map((group) => (
              <div key={group.key}>
                <p className="label-mono text-ink-dim">{t(`groups.${group.key}`)}</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((key) => (
                    <li
                      key={key}
                      className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-[13px] text-ink-muted"
                    >
                      <TechIcon name={key} color="currentColor" className="size-3.5" />
                      {techLogos[key].title}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
