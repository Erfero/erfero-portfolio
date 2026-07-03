import { useTranslations } from "next-intl";
import Reveal from "@/components/ui/Reveal";
import Marquee from "@/components/ui/Marquee";

const row1 = ["Shopify", "Liquid", "React", "Next.js", "Vue.js", "Tailwind CSS"];
const row2 = ["Node.js", "Laravel", "PHP", "MongoDB", "Firebase", "SEO"];

export default function TechStack() {
  const t = useTranslations("techStack");

  return (
    <section className="relative overflow-hidden border-y border-border py-20">
      <div className="container-page">
        <Reveal className="text-center">
          <span className="text-xs font-medium uppercase tracking-widest text-lime">
            {t("eyebrow")}
          </span>
          <h2 className="font-display mt-3 text-2xl font-medium sm:text-3xl">
            {t("title")}
          </h2>
        </Reveal>
      </div>

      <div className="mt-12 flex flex-col gap-4">
        <Marquee items={row1} speed={32} />
        <Marquee items={row2} speed={32} reverse />
      </div>
    </section>
  );
}
