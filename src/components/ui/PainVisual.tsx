"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";

type Kind = "mobile" | "design" | "apps" | "seo";

function MobileVisual() {
  return (
    <div className="relative flex h-16 w-10 items-center justify-center rounded-lg border-2 border-white/15">
      <motion.div
        className="size-5 rounded-full border-2 border-lime border-t-transparent"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      <div className="absolute inset-x-1.5 bottom-1.5 h-1 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full bg-lime/70"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}

function DesignVisual() {
  return (
    <div className="relative size-16">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-lg border-2 border-white/20"
          style={{ translateX: i * 6, translateY: i * 6 }}
          animate={{ opacity: [0.3, 0.9, 0.3] }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function AppsVisual() {
  return (
    <div className="flex h-16 flex-col-reverse items-center gap-1">
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="h-2.5 rounded bg-lime/60"
          style={{ width: 14 + i * 8 }}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1 - i * 0.15, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.15, repeat: Infinity, repeatDelay: 1.6 }}
        />
      ))}
    </div>
  );
}

function SeoVisual() {
  return (
    <div className="relative flex h-16 w-20 flex-col justify-center gap-1.5">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="h-1.5 rounded-full bg-white/10"
          style={{ width: `${80 - i * 18}%` }}
        />
      ))}
      <motion.div
        className="absolute right-0 top-0 text-ink-muted/70"
        animate={{ x: [-6, 6, -6], y: [-2, 4, -2] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <Search className="size-6" />
      </motion.div>
    </div>
  );
}

export default function PainVisual({ kind }: { kind: Kind }) {
  switch (kind) {
    case "mobile":
      return <MobileVisual />;
    case "design":
      return <DesignVisual />;
    case "apps":
      return <AppsVisual />;
    case "seo":
      return <SeoVisual />;
  }
}
