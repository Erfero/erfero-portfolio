import { setRequestLocale } from "next-intl/server";
import Hero from "@/components/sections/Hero";
import Manifesto from "@/components/sections/Manifesto";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
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

  // Numérotation éditoriale (01, 02...) calculée sur les seules sections
  // activées dans l'admin, pour ne jamais afficher de trou dans la suite.
  let counter = 0;
  const num = (enabled: boolean) => (enabled ? String(++counter).padStart(2, "0") : undefined);
  const idx = {
    featured: num(sections.featuredProjectsEnabled),
    videos: num(sections.videoReelsEnabled && videos.length > 0),
    pain: num(sections.painPointsEnabled),
    services: num(sections.servicesEnabled),
    catalog: num(sections.expertiseCatalogEnabled),
    experience: num(sections.experienceEnabled),
    testimonials: num(sections.testimonialsEnabled),
    process: num(sections.processEnabled),
    trust: num(sections.trustEnabled),
    faq: num(sections.faqEnabled),
  };

  // Ordre pensé comme un récit : qui je suis -> la preuve (boutiques,
  // vidéos, chiffres) -> le problème et ma méthode -> mon parcours et les
  // avis -> comment on travaille -> contact.
  return (
    <>
      {sections.heroEnabled && <Hero projects={projects} />}
      {sections.manifestoEnabled && <Manifesto showCv={cv.enabled} />}
      {sections.featuredProjectsEnabled && (
        <FeaturedProjects projects={projects} totalCount={projects.length} index={idx.featured} />
      )}
      {sections.videoReelsEnabled && <VideoReels videos={videos} index={idx.videos} />}
      {sections.metricsEnabled && <Metrics />}
      {sections.painPointsEnabled && <PainPoints index={idx.pain} />}
      {sections.servicesEnabled && <Services index={idx.services} />}
      {sections.expertiseCatalogEnabled && (
        <ExpertiseCatalog projects={projects} nicheImages={nicheImages} index={idx.catalog} />
      )}
      {sections.experienceEnabled && <Experience showCv={cv.enabled} index={idx.experience} />}
      {sections.testimonialsEnabled && (
        <Testimonials testimonials={testimonials} index={idx.testimonials} />
      )}
      {sections.processEnabled && <Process index={idx.process} />}
      {sections.pricingEnabled && <Pricing />}
      {sections.techStackEnabled && <TechStack />}
      {sections.trustEnabled && <Trust index={idx.trust} />}
      {sections.faqEnabled && <FAQ index={idx.faq} />}
      {sections.contactEnabled && <Contact />}
    </>
  );
}
