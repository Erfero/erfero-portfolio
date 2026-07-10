"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Rocket } from "lucide-react";
import { Link } from "@/i18n/navigation";

export default function FloatingCTA() {
  const t = useTranslations("floatingCta");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const nearContact =
        window.scrollY + window.innerHeight >
        document.body.scrollHeight - 400;
      setVisible(window.scrollY > 500 && !nearContact);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Link
      href="/#contact"
      className={`fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-lime px-5 py-3.5 text-sm font-semibold text-bg shadow-2xl shadow-lime/20 transition-all duration-300 sm:bottom-8 sm:right-8 relative print:hidden ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-20 opacity-0"
      }`}
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-lime/40" />
      <Rocket className="size-4" />
      {t("label")}
    </Link>
  );
}
