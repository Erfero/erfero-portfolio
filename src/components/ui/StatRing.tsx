"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export default function StatRing({
  value,
  accent = "var(--color-lime)",
}: {
  value: number;
  accent?: string;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  const size = 84;
  const stroke = 7;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.min(100, Math.max(0, value));

  useEffect(() => {
    if (!isInView) return;
    const start = performance.now();
    const duration = 1200;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setDisplay(clamped * (1 - Math.pow(1 - progress, 3)));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isInView, clamped]);

  return (
    <svg ref={ref} width={size} height={size} className="-rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth={stroke}
      />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={accent}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={circumference - (display / 100) * circumference}
      />
      <text
        x={size / 2}
        y={size / 2}
        textAnchor="middle"
        dominantBaseline="central"
        className="rotate-90 fill-ink font-display text-[15px] font-semibold"
        style={{ transformOrigin: "50% 50%" }}
      >
        {value % 1 === 0 ? Math.round(display) : display.toFixed(1)}%
      </text>
    </svg>
  );
}
