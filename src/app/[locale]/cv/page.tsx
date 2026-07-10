import type { Metadata } from "next";
import { Mail, Phone, MapPin, ArrowLeft } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/data/site.config";
import Reveal from "@/components/ui/Reveal";
import PrintButton from "@/components/ui/PrintButton";
import { LinkedinIcon } from "@/components/ui/BrandIcons";

type CvData = {
  print: string;
  profileEyebrow: string;
  profile: string;
  stats: { value: string; label: string }[];
  skillsEyebrow: string;
  skillGroups: { title: string; items: string[] }[];
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nav" });
  return { title: `${siteConfig.name} — ${t("cv")}` };
}

export default async function CvPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  const nav = await getTranslations({ locale, namespace: "nav" });
  const cv = t.raw("cvPage") as CvData;

  return (
    <div className="pt-32 pb-20 sm:pt-40 print:pt-6">
      <div className="container-page max-w-4xl">
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

        <Reveal className="mt-8">
          <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            {siteConfig.name}
          </h1>
          <p className="mt-1 text-lg text-lime">{siteConfig.role}</p>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-muted">
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center gap-1.5 hover:text-ink"
            >
              <Mail className="size-4" /> {siteConfig.email}
            </a>
            <a
              href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-1.5 hover:text-ink"
            >
              <Phone className="size-4" /> {siteConfig.phone}
            </a>
            {siteConfig.socials.linkedin && (
              <a
                href={siteConfig.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-ink"
              >
                <LinkedinIcon className="size-4" /> LinkedIn
              </a>
            )}
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-4" /> {siteConfig.location}
            </span>
          </div>
        </Reveal>

        <Reveal className="mt-10" delay={0.05}>
          <span className="text-xs font-medium uppercase tracking-widest text-lime">
            {cv.profileEyebrow}
          </span>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-muted">
            {cv.profile}
          </p>
        </Reveal>

        <Reveal className="mt-8 grid grid-cols-3 gap-4" delay={0.1}>
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

        <div className="mt-14">
          <span className="text-xs font-medium uppercase tracking-widest text-lime">
            {cv.experienceEyebrow}
          </span>
          <div className="mt-6 flex flex-col gap-6">
            {cv.experience.map((exp, i) => (
              <Reveal
                key={exp.title + exp.period}
                delay={i * 0.05}
                className="rounded-2xl border border-border bg-white/[0.02] p-6 print:bg-transparent"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-lg font-medium">{exp.title}</h3>
                  <span className="text-xs text-ink-muted">{exp.period}</span>
                </div>
                <p className="mt-1 text-sm text-lime">{exp.company}</p>
                <ul className="mt-3 flex flex-col gap-1.5 text-sm text-ink-muted">
                  {exp.bullets.map((b) => (
                    <li key={b} className="flex gap-2">
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-lime" />
                      {b}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-10 sm:grid-cols-2">
          <div>
            <span className="text-xs font-medium uppercase tracking-widest text-lime">
              {cv.skillsEyebrow}
            </span>
            <div className="mt-5 flex flex-col gap-4">
              {cv.skillGroups.map((g) => (
                <div key={g.title}>
                  <p className="text-sm font-medium">{g.title}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {g.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-border px-3 py-1 text-xs text-ink-muted"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <span className="text-xs font-medium uppercase tracking-widest text-lime">
              {cv.educationEyebrow}
            </span>
            <div className="mt-5 flex flex-col gap-4">
              {cv.education.map((ed) => (
                <div key={ed.title}>
                  <p className="text-sm font-medium">{ed.title}</p>
                  <p className="text-sm text-lime">{ed.school}</p>
                  <p className="text-xs text-ink-muted">{ed.period}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
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
          <div>
            <span className="text-xs font-medium uppercase tracking-widest text-lime">
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
  );
}
