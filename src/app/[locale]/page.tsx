import { setRequestLocale } from "next-intl/server";
import Hero from "@/components/sections/Hero";
import Manifesto from "@/components/sections/Manifesto";
import ProjectShowcase, { type ShowcaseProject } from "@/components/sections/ProjectShowcase";
import Toolbox from "@/components/sections/Toolbox";
import VideoReels from "@/components/sections/VideoReels";
import Metrics from "@/components/sections/Metrics";
import PainPoints from "@/components/sections/PainPoints";
import Services from "@/components/sections/Services";
import ExpertiseCatalog from "@/components/sections/ExpertiseCatalog";
import Experience from "@/components/sections/Experience";
import Testimonials from "@/components/sections/Testimonials";
import Process from "@/components/sections/Process";
import Pricing from "@/components/sections/Pricing";
import TechStack from "@/components/sections/TechStack";
import Trust from "@/components/sections/Trust";
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
  // Jamais deux fois la même boutique sur l'accueil : les 8 premières sont
  // présentées en détail (vitrine), les 20 suivantes flottent dans la
  // galerie 3D du hero.
  const SHOWCASE = 8;
  const showcase: ShowcaseProject[] = allProjects.slice(0, SHOWCASE).map((p) => ({
    ...toProjectCard(p),
    description: p.description,
    tags: p.tags,
    year: p.year,
  }));
  const galleryProjects = projects.slice(SHOWCASE, SHOWCASE + 20);

  // Numérotation éditoriale (01, 02...) calculée sur les seules sections
  // activées dans l'admin, pour ne jamais afficher de trou dans la suite.
  let counter = 0;
  const num = (enabled: boolean) => (enabled ? String(++counter).padStart(2, "0") : undefined);
  const idx = {
    featured: num(sections.featuredProjectsEnabled),
    stack: num(sections.techStackEnabled),
    videos: num(sections.videoReelsEnabled && videos.length > 0),
    testimonials: num(sections.testimonialsEnabled),
    services: num(sections.servicesEnabled),
    pain: num(sections.painPointsEnabled),
    catalog: num(sections.expertiseCatalogEnabled),
    experience: num(sections.experienceEnabled),
    process: num(sections.processEnabled),
    trust: num(sections.trustEnabled),
    faq: num(sections.faqEnabled),
  };

  // Ordre : galerie de boutiques et présentation, les boutiques en détail,
  // puis les compétences Shopify (avec le code Liquid), ENSUITE les vidéos,
  // les chiffres et les avis, la boîte à outils et les services, et plus bas
  // les domaines (boutiques par secteur), le parcours, le process, les
  // tarifs, les garanties, la FAQ et le contact.
  return (
    <>
      {sections.heroEnabled && <Hero projects={galleryProjects} />}
      {sections.manifestoEnabled && <Manifesto showCv={cv.enabled} />}
      {sections.featuredProjectsEnabled && (
        <ProjectShowcase projects={showcase} totalCount={projects.length} index={idx.featured} />
      )}
      {sections.techStackEnabled && <TechStack index={idx.stack} />}
      {sections.videoReelsEnabled && <VideoReels videos={videos} index={idx.videos} />}
      {sections.metricsEnabled && <Metrics />}
      {sections.testimonialsEnabled && (
        <Testimonials testimonials={testimonials} index={idx.testimonials} />
      )}
      {sections.techStackEnabled && <Toolbox />}
      {sections.servicesEnabled && <Services index={idx.services} />}
      {sections.painPointsEnabled && <PainPoints index={idx.pain} />}
      {sections.expertiseCatalogEnabled && (
        <ExpertiseCatalog projects={projects} nicheImages={nicheImages} index={idx.catalog} />
      )}
      {sections.experienceEnabled && <Experience showCv={cv.enabled} index={idx.experience} />}
      {sections.processEnabled && <Process index={idx.process} />}
      {sections.pricingEnabled && <Pricing />}
      {sections.trustEnabled && <Trust index={idx.trust} />}
      {sections.faqEnabled && <FAQ index={idx.faq} />}
      {sections.contactEnabled && <Contact />}
    </>
  );
}
