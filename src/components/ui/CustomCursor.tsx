"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 40 });
  const springY = useSpring(y, { stiffness: 500, damping: 40 });

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canHover || reduced) return;
    setEnabled(true);

    // Un seul point de mise à jour par frame (rAF) : appeler setHovering /
    // closest() sur chaque event mousemove brut (jusqu'à 120/s) surchargeait
    // le thread principal et rendait le curseur (et le reste de la page)
    // visiblement saccadé.
    let frame = 0;
    let pendingEvent: MouseEvent | null = null;

    const applyFrame = () => {
      frame = 0;
      if (!pendingEvent) return;
      x.set(pendingEvent.clientX - 10);
      y.set(pendingEvent.clientY - 10);
      const target = pendingEvent.target as HTMLElement;
      setHovering(!!target.closest("a, button, [data-cursor-hover]"));
    };

    const move = (e: MouseEvent) => {
      pendingEvent = e;
      if (!frame) frame = requestAnimationFrame(applyFrame);
    };

    window.addEventListener("mousemove", move, { passive: true });
    return () => {
      window.removeEventListener("mousemove", move);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      style={{ x: springX, y: springY }}
      animate={{ scale: hovering ? 2.2 : 1 }}
      transition={{ scale: { duration: 0.2 } }}
      className="pointer-events-none fixed left-0 top-0 z-[70] size-5 rounded-full bg-lime mix-blend-difference"
    />
  );
}
