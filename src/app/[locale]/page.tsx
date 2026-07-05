import { setRequestLocale } from "next-intl/server";
import Hero from "@/components/sections/Hero";
import PainPoints from "@/components/sections/PainPoints";
import Services from "@/components/sections/Services";
import Pricing from "@/components/sections/Pricing";
import ExpertiseCatalog from "@/components/sections/ExpertiseCatalog";
import Metrics from "@/components/sections/Metrics";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import VideoReels from "@/components/sections/VideoReels";
import Testimonials from "@/components/sections/Testimonials";
import Process from "@/components/sections/Process";
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
} from "@/lib/content";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [projects, videos, testimonials, nicheImages, sections] = await Promise.all([
    getVisibleProjects(),
    getVideos(),
    getTestimonials(),
    getNicheImages(),
    getSectionsSettings(),
  ]);

  return (
    <>
      {sections.heroEnabled && <Hero projects={projects} />}
      {sections.featuredProjectsEnabled && (
        <FeaturedProjects projects={projects} videos={videos} />
      )}
      {sections.videoReelsEnabled && <VideoReels videos={videos} />}
      {sections.servicesEnabled && <Services />}
      {sections.testimonialsEnabled && (
        <Testimonials testimonials={testimonials} />
      )}
      {sections.pricingEnabled && <Pricing />}
      {sections.painPointsEnabled && <PainPoints />}
      {sections.expertiseCatalogEnabled && (
        <ExpertiseCatalog projects={projects} nicheImages={nicheImages} />
      )}
      {sections.metricsEnabled && <Metrics />}
      {sections.processEnabled && <Process />}
      {sections.techStackEnabled && <TechStack />}
      {sections.trustEnabled && <Trust />}
      {sections.faqEnabled && <FAQ />}
      {sections.contactEnabled && <Contact />}
    </>
  );
}
