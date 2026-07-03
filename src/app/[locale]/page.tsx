import { setRequestLocale } from "next-intl/server";
import Hero from "@/components/sections/Hero";
import PainPoints from "@/components/sections/PainPoints";
import Services from "@/components/sections/Services";
import Metrics from "@/components/sections/Metrics";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import VideoReels from "@/components/sections/VideoReels";
import Process from "@/components/sections/Process";
import TechStack from "@/components/sections/TechStack";
import Trust from "@/components/sections/Trust";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <PainPoints />
      <Services />
      <Metrics />
      <FeaturedProjects />
      <VideoReels />
      <Process />
      <TechStack />
      <Trust />
      <FAQ />
      <Contact />
    </>
  );
}
