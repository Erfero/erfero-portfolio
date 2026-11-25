"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP, MOTION_OK } from "@/lib/gsap";
import { onIntroReady } from "@/lib/intro";
import { cn } from "@/lib/utils";
import RichText from "./RichText";

type Tag = "h1" | "h2" | "h3" | "p";

/**
 * Titre révélé ligne par ligne (chaque ligne glisse depuis un masque), au
 * scroll ou à l'intro du site. Le découpage est refait automatiquement au
 * redimensionnement et au chargement des polices (autoSplit), et totalement
 * annulé en "mouvement réduit" : le texte reste alors simplement affiché.
 */
export default function SplitHeading({
  as: Tag = "h2",
  id,
  text,
  className,
  trigger = "scroll",
  delay = 0,
  stagger = 0.09,
}: {
  as?: Tag;
  id?: string;
  text: string;
  className?: string;
  trigger?: "scroll" | "intro";
  delay?: number;
  stagger?: number;
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        let cleanupIntro: (() => void) | undefined;
        const split = SplitText.create(el, {
          type: "lines",
          mask: "lines",
          linesClass: "split-line",
          autoSplit: true,
          onSplit(self) {
            gsap.set(el, { autoAlpha: 1 });
            const tween = gsap.from(self.lines, {
              yPercent: 110,
              duration: 1.1,
              ease: "expo.out",
              stagger,
              delay,
              paused: true,
              scrollTrigger:
                trigger === "scroll"
                  ? { trigger: el, start: "top 88%", once: true }
                  : undefined,
            });
            if (trigger === "intro") {
              cleanupIntro?.();
              cleanupIntro = onIntroReady(() => tween.play());
            }
            return tween;
          },
        });
        return () => {
          cleanupIntro?.();
          split.revert();
        };
      });
    },
    { scope: ref, dependencies: [text] }
  );

  return (
    <Tag ref={ref} id={id} data-reveal={trigger === "intro" ? "" : undefined} className={cn(className)}>
      <RichText text={text} />
    </Tag>
  );
}
