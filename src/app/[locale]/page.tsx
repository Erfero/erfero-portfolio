import { setRequestLocale } from "next-intl/server";
import Hero from "@/components/sections/Hero";
import Manifesto from "@/components/sections/Manifesto";
import ProjectShowcase, { type ShowcaseProject } from "@/components/sections/ProjectShowcase";
import VideoReels from "@/components/sections/VideoReels";
import Metrics from "@/components/sections/Metrics";
import ExpertiseCatalog from "@/components/sections/ExpertiseCatalog";
import Experience from "@/components/sections/Experience";
import Testimonials from "@/components/sections/Testimonials";
import Process from "@/components/sections/Process";
import Pricing from "@/components/sections/Pricing";
import TechStack from "@/components/sections/TechStack";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
import {
  getVisibleProjects,
  getVideos,
  getTestimonials,
  getNicheImages,
  getSectionsSettings,
  getCvSettings,
} from "@/lib/content";
import { toProjectCard } from "@/lib/projectMedia";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [allProjects, videos, testimonials, nicheImages, sections, cv] = await Promise.all([
    getVisibleProjects(),
    getVideos(),
    getTestimonials(),
    getNicheImages(),
    getSectionsSettings(),
    getCvSettings(),
  ]);

  // Seuls les champs affichés par les cartes partent vers le navigateur.
  const projects = allProjects.map(toProjectCard);
  // Vitrine : une sélection des boutiques les plus belles, dans cet ordre
  // (complétée par les mieux notées si l'une d'elles est hors ligne).
  // Jamais deux fois la même boutique sur l'accueil : la fenêtre de
  // navigateur du hero prend 6 autres boutiques.
  const SHOWCASE_IDS = [
    "kyraCosmetic",
    "zylvea",
    "lumiNuit",
    "locksPassion",
    "mellaya",
    "theSoftTie",
    "malabarRoi",
    "curvyaBeauty",
    "omiraCosmetics",
    "crewEssentiels",
    "roselia",
  ];
  const SHOWCASE_MIN = 10;
  const picked = SHOWCASE_IDS.map((id) => allProjects.find((p) => p.id === id)).filter(
    (p): p is (typeof allProjects)[number] => Boolean(p)
  );
  for (const p of allProjects) {
    if (picked.length >= SHOWCASE_MIN) break;
    if (!picked.includes(p)) picked.push(p);
  }
  const showcase: ShowcaseProject[] = picked.map((p) => ({
    ...toProjectCard(p),
    description: p.description,
    tags: p.tags,
    year: p.year,
  }));
  const heroProjects = projects.filter((p) => !picked.some((s) => s.id === p.id)).slice(0, 6);

  // Numérotation éditoriale (01, 02...) calculée sur les seules sections
  // activées dans l'admin, pour ne jamais afficher de trou dans la suite.
  let counter = 0;
  const num = (enabled: boolean) => (enabled ? String(++counter).padStart(2, "0") : undefined);
  const idx = {
    featured: num(sections.featuredProjectsEnabled),
    stack: num(sections.techStackEnabled),
    videos: num(sections.videoReelsEnabled && videos.length > 0),
    experience: num(sections.experienceEnabled),
    testimonials: num(sections.testimonialsEnabled),
    catalog: num(sections.expertiseCatalogEnabled),
    process: num(sections.processEnabled),
    faq: num(sections.faqEnabled),
  };

  // Accueil volontairement resserré, centré sur le développeur Shopify :
  // bannière, boutiques en détail, présentation, compétences Shopify (code
  // Liquid) puis les vidéos, parcours, chiffres et avis, boutiques par
  // domaine, process, tarifs, FAQ et contact. Services et garanties restent
  // sur leurs propres pages.
  return (
    <>
      {sections.heroEnabled && <Hero projects={heroProjects} />}
      {sections.featuredProjectsEnabled && (
        <ProjectShowcase projects={showcase} totalCount={projects.length} index={idx.featured} />
      )}
      {sections.manifestoEnabled && <Manifesto showCv={cv.enabled} />}
      {sections.techStackEnabled && <TechStack index={idx.stack} />}
      {sections.videoReelsEnabled && <VideoReels videos={videos} index={idx.videos} />}
      {sections.experienceEnabled && <Experience showCv={cv.enabled} index={idx.experience} />}
      {sections.metricsEnabled && <Metrics />}
      {sections.testimonialsEnabled && (
        <Testimonials testimonials={testimonials} index={idx.testimonials} />
      )}
      {sections.expertiseCatalogEnabled && (
        <ExpertiseCatalog projects={projects} nicheImages={nicheImages} index={idx.catalog} />
      )}
      {sections.processEnabled && <Process index={idx.process} />}
      {sections.pricingEnabled && <Pricing />}
      {sections.faqEnabled && <FAQ index={idx.faq} />}
      {sections.contactEnabled && <Contact />}
    </>
  );
}
