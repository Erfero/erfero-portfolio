import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, Briefcase } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/data/site.config";
import { getCvSettings } from "@/lib/content";
import Reveal from "@/components/ui/Reveal";
import PrintButton from "@/components/ui/PrintButton";

type SkillItem = { name: string; highlight?: boolean };
type SkillGroup = { title: string; items: SkillItem[] };
type ContactItem = { label: string; value: string; href: string };

type CvData = {
  print: string;
  contactLabel: string;
  mobilityLabel: string;
  mobility: string;
  contacts: ContactItem[];
  profileEyebrow: string;
  profile: string;
  stats: { value: string; label: string }[];
  skillsEyebrow: string;
  skillGroups: SkillGroup[];
  experienceEyebrow: string;
  experience: { title: string; company: string; period: string; bullets: string[] }[];
  educationEyebrow: string;
  education: { title: string; school: string; period: string }[];
  languagesEyebrow: string;
  languages: { name: string; level: string }[];
  interestsEyebrow: string;
  interests: string[];
  strengthsEyebrow: string;
  strengths: string[];
  referenceEyebrow: string;
  referenceText?: string;
  referenceNote?: string;
  referenceName?: string;
  referenceRole?: string;
  referenceContact?: string;
};

// Rendu toujours dynamique : sinon, tant qu'aucun réglage n'a jamais été
// enregistré depuis l'admin, Next.js ne détecte aucune donnée "vivante" au
// premier build et fige la page (activée) en statique — désactiver le CV
// depuis /admin/cv ne serait alors visible qu'après un redéploiement.
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nav" });
  return { title: `${siteConfig.name} — ${t("cv")}` };
}

// Convention légère utilisée dans les textes du CV (éditables depuis
// /admin/content ou /admin/cv) : **mot** devient un <strong>, pour retrouver
// les mêmes mise en avant que sur le CV PDF d'origine sans avoir à coder du
// JSX dans les traductions.
function renderBold(text: string) {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-semibold text-ink">
        {part}
      </strong>
    ) : (
      part
    )
  );
}

export default async function CvPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const cvSettings = await getCvSettings();
  if (!cvSettings.enabled) notFound();

  const t = await getTranslations({ locale });
  const nav = await getTranslations({ locale, namespace: "nav" });
  const cv = t.raw("cvPage") as CvData;

  return (
    <div className="cv-print-dark pt-32 pb-20 sm:pt-40 print:pt-8">
      <div className="container-page max-w-5xl">
        <div className="flex flex-wrap items-center justify-between gap-4 print:hidden">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink"
          >
            <ArrowLeft className="size-4" />
            {nav("home")}
          </Link>
          <PrintButton label={cv.print} />
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-[300px_1fr] lg:gap-12 print:grid-cols-[260px_1fr] print:gap-8">
          <Reveal className="flex flex-col gap-8 lg:sticky lg:top-28 lg:self-start">
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/cv-photo.jpg"
                alt={siteConfig.name}
                className="size-36 rounded-2xl border border-border object-cover sm:size-40"
              />
              <h1 className="mt-6 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                {siteConfig.name}
              </h1>
              <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-lime">
                <Briefcase className="size-4" />
                {siteConfig.role}
              </p>
            </div>

            <div className="border-t border-border pt-6">
              <span className="text-xs font-medium uppercase tracking-widest text-ink">
                {cv.contactLabel}
              </span>
              <div className="mt-4 flex flex-col gap-3">
                {cv.contacts.map((c) => (
                  <div key={c.label}>
                    <p className="text-[11px] uppercase tracking-wide text-ink-muted">
                      {c.label}
                    </p>
                    <a
                      href={c.href}
                      target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      className="break-words text-sm hover:text-lime"
                    >
                      {c.value}
                    </a>
                  </div>
                ))}
                <div>
                  <p className="text-[11px] uppercase tracking-wide text-ink-muted">
                    {cv.mobilityLabel}
                  </p>
                  <p className="text-sm">{cv.mobility}</p>
                </div>
              </div>
            </div>

            <div>
              <span className="text-xs font-medium uppercase tracking-widest text-ink">
                {cv.skillsEyebrow}
              </span>
              <div className="mt-4 flex flex-col gap-4">
                {cv.skillGroups.map((g) => (
                  <div key={g.title}>
                    <p className="text-[11px] uppercase tracking-wide text-ink-muted">
                      {g.title}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {g.items.map((item) => (
                        <span
                          key={item.name}
                          className={
                            item.highlight
                              ? "rounded-full border border-lime/40 bg-lime/10 px-3 py-1 text-xs text-lime"
                              : "rounded-full border border-border px-3 py-1 text-xs text-ink-muted"
                          }
                        >
                          {item.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs font-medium uppercase tracking-widest text-lime">
                {cv.languagesEyebrow}
              </span>
              <div className="mt-3 flex flex-col gap-1.5 text-sm">
                {cv.languages.map((l) => (
                  <div key={l.name} className="flex justify-between gap-2 text-ink-muted">
                    <span className="text-ink">{l.name}</span>
                    <span>{l.level}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs font-medium uppercase tracking-widest text-lime">
                {cv.interestsEyebrow}
              </span>
              <p className="mt-3 text-sm text-ink-muted">{cv.interests.join(" · ")}</p>
            </div>
          </Reveal>

          <div className="flex flex-col gap-12 lg:border-l lg:border-border lg:pl-12">
            <Reveal delay={0.05} className="border-l-2 border-lime pl-4">
              <span className="text-xs font-medium uppercase tracking-widest text-lime">
                {cv.profileEyebrow}
              </span>
              <p className="mt-2 max-w-2xl text-base leading-relaxed text-ink-muted">
                {renderBold(cv.profile)}
              </p>
            </Reveal>

            <Reveal className="grid grid-cols-3 gap-4" delay={0.1}>
              {cv.stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-border bg-white/[0.02] p-5 text-center print:bg-transparent"
                >
                  <div className="font-display text-2xl font-semibold text-lime sm:text-3xl">
                    {s.value}
                  </div>
                  <div className="mt-1 text-xs text-ink-muted">{s.label}</div>
                </div>
              ))}
            </Reveal>

            <div>
              <div className="flex items-center gap-4">
                <span className="shrink-0 text-xs font-medium uppercase tracking-widest text-ink">
                  {cv.experienceEyebrow}
                </span>
                <span className="h-px flex-1 bg-border" />
              </div>
              <div className="relative mt-6 flex flex-col gap-8 border-l border-border pl-6">
                {cv.experience.map((exp, i) => (
                  <Reveal key={exp.title + exp.period} delay={i * 0.05} className="relative">
                    <span className="absolute -left-[27px] top-1 size-3 rounded-full bg-lime ring-4 ring-bg" />
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-display text-lg font-medium">{exp.title}</h3>
                      <span className="text-xs text-ink-muted">{exp.period}</span>
                    </div>
                    <p className="mt-1 text-sm text-lime">{exp.company}</p>
                    <ul className="mt-3 flex flex-col gap-1.5 text-sm text-ink-muted">
                      {exp.bullets.map((b) => (
                        <li key={b} className="flex gap-2">
                          <span className="mt-2 size-1 shrink-0 rounded-full bg-ink-muted" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-4">
                <span className="shrink-0 text-xs font-medium uppercase tracking-widest text-ink">
                  {cv.educationEyebrow}
                </span>
                <span className="h-px flex-1 bg-border" />
              </div>
              <div className="mt-5 grid gap-6 sm:grid-cols-2">
                {cv.education.map((ed) => (
                  <div key={ed.title}>
                    <p className="text-sm font-medium">{ed.title}</p>
                    <p className="text-sm text-lime">{ed.school}</p>
                    <p className="text-xs text-ink-muted">{ed.period}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <span className="text-xs font-medium uppercase tracking-widest text-ink">
                  {cv.strengthsEyebrow}
                </span>
                <div className="mt-3 flex flex-wrap gap-2">
                  {cv.strengths.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-border px-3 py-1 text-xs text-ink-muted"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-xs font-medium uppercase tracking-widest text-lime">
                  {cv.referenceEyebrow}
                </span>
                {cv.referenceName ? (
                  <div className="mt-3 text-sm">
                    <p className="font-medium">{cv.referenceName}</p>
                    <p className="text-ink-muted">{cv.referenceRole}</p>
                    <p className="text-ink-muted">{cv.referenceContact}</p>
                  </div>
                ) : (
                  <div className="mt-3 text-sm">
                    <p className="font-medium">{cv.referenceText}</p>
                    <p className="text-ink-muted">{cv.referenceNote}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
