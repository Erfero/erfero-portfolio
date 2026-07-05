"use client";

import type { CSSProperties } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ShoppingBag, CheckCircle2, TrendingUp, MousePointer2 } from "lucide-react";
import type { Project } from "@/data/projects";
import { getScreenshotUrl } from "@/lib/screenshot";

function hostnameOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

const CYCLE = "10s linear infinite";

/**
 * Scène "A" du Hero : reproduction fidèle (dimensions px, timings, mise en
 * scène) de la maquette navigateur + téléphone fournie — un canevas fixe de
 * 700x540, mis à l'échelle par breakpoint, exactement comme dans la source.
 */
export default function HeroSceneBrowser({ projects }: { projects: Project[] }) {
  const locale = useLocale() as "fr" | "en";
  const t = useTranslations("hero.mock");
  const main = projects[0];
  if (!main) return null;

  const pool = projects.length > 1 ? projects.slice(1) : projects;
  const products = Array.from({ length: 3 }, (_, i) => pool[i % pool.length]);

  const stageBase: CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: 700,
    height: 540,
    transformOrigin: "top left",
    color: "#eef3ec",
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
      className="absolute inset-0"
    >
      <div
        style={stageBase}
        className="scale-[0.86] max-lg:scale-[0.74] max-[720px]:scale-[0.485] max-[380px]:scale-[0.428]"
      >
        {/* fenêtre navigateur */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 12,
            width: 530,
            height: 414,
            borderRadius: 16,
            background: "#0b0f0b",
            border: "1px solid rgba(255,255,255,.09)",
            boxShadow: "0 40px 90px -30px rgba(0,0,0,.85), 0 8px 30px -12px rgba(0,0,0,.6)",
            overflow: "hidden",
            animation: `heroSmChrome ${CYCLE}`,
          }}
        >
          <div
            style={{
              height: 38,
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "0 14px",
              borderBottom: "1px solid rgba(255,255,255,.06)",
            }}
          >
            <div style={{ display: "flex", gap: 7 }}>
              <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#ff5f57" }} />
              <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#febc2e" }} />
              <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#28c840" }} />
            </div>
            <div
              style={{
                flex: 1,
                height: 22,
                borderRadius: 7,
                background: "rgba(255,255,255,.05)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 7,
                fontSize: 11,
                color: "#8e988c",
                maxWidth: 300,
                margin: "0 auto",
              }}
            >
              <span style={{ width: 9, height: 9, borderRadius: 2, border: "1.5px solid #57c07a" }} />
              {hostnameOf(main.url)}
            </div>
            <div style={{ width: 44 }} />
          </div>
          <div
            style={{
              height: 44,
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "0 18px",
              borderBottom: "1px solid rgba(255,255,255,.05)",
              animation: `heroSmTop ${CYCLE}`,
            }}
          >
            <span className="font-display" style={{ fontWeight: 700, letterSpacing: ".14em", fontSize: 14 }}>
              {main.name[locale].toUpperCase()}
            </span>
            <div style={{ flex: 1, display: "flex", gap: 16, fontSize: 11, color: "#9aa494" }}>
              <span>Shop</span>
              <span>New</span>
              <span>Sale</span>
            </div>
            <div
              style={{
                position: "relative",
                width: 26,
                height: 26,
                borderRadius: 8,
                background: "rgba(255,255,255,.06)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ShoppingBag size={14} color="#cdd7c2" />
              <span
                style={{
                  position: "absolute",
                  top: -6,
                  right: -6,
                  minWidth: 16,
                  height: 16,
                  padding: "0 4px",
                  borderRadius: 8,
                  background: "#c2f24e",
                  color: "#0a0d09",
                  fontSize: 10,
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  animation: `heroSmBadge ${CYCLE}`,
                }}
              >
                3
              </span>
            </div>
          </div>
          <div style={{ position: "relative", height: 168, overflow: "hidden", animation: `heroSmHero ${CYCLE}` }}>
            <img
              src={main.thumbnailOverride || getScreenshotUrl(main.url, 700, 500)}
              alt=""
              loading="lazy"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center 28%",
                animation: "heroSmKen 12s ease-in-out infinite alternate",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(90deg, rgba(6,9,6,.82) 0%, rgba(6,9,6,.25) 55%, rgba(6,9,6,0) 100%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: 20,
                top: 26,
                right: 180,
                animation: `heroSmText ${CYCLE}`,
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  fontSize: 10,
                  letterSpacing: ".12em",
                  textTransform: "uppercase",
                  color: "#c2f24e",
                  border: "1px solid rgba(194,242,78,.4)",
                  borderRadius: 20,
                  padding: "3px 9px",
                  marginBottom: 10,
                }}
              >
                {t("badge")}
              </span>
              <div
                className="font-display"
                style={{ fontWeight: 700, fontSize: 22, lineHeight: 1.05, marginBottom: 12 }}
              >
                {t("heading")}
                <br />
                {t("headingLine2")}
              </div>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  background: "#c2f24e",
                  color: "#0a0d09",
                  fontWeight: 700,
                  fontSize: 12,
                  padding: "8px 14px",
                  borderRadius: 10,
                }}
              >
                {t("cta")}
              </span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, padding: "12px 14px" }}>
            {products.map((p, i) => (
              <div
                key={`${p.id}-${i}`}
                style={{
                  flex: 1,
                  borderRadius: 11,
                  overflow: "hidden",
                  background: "#10150f",
                  border: "1px solid rgba(255,255,255,.06)",
                  animation: `${i === 0 ? "heroSmC1" : i === 1 ? "heroSmC2" : "heroSmC3"} ${CYCLE}`,
                }}
              >
                <img
                  src={p.thumbnailOverride || getScreenshotUrl(p.url, 220, 220)}
                  alt=""
                  loading="lazy"
                  style={{ height: 74, width: "100%", objectFit: "cover", objectPosition: "top" }}
                />
                <div style={{ padding: "8px 9px" }}>
                  <div style={{ fontSize: 11, fontWeight: 600 }}>{p.name[locale]}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* mockup téléphone */}
        <div
          style={{
            position: "absolute",
            left: 2,
            bottom: 8,
            width: 162,
            height: 330,
            borderRadius: 28,
            background: "#0b0f0b",
            border: "1px solid rgba(255,255,255,.12)",
            boxShadow: "0 30px 60px -20px rgba(0,0,0,.85)",
            overflow: "hidden",
            transform: "rotate(-4deg)",
            transformOrigin: "bottom left",
            animation: `heroSmPhone ${CYCLE}`,
          }}
        >
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: 9,
              transform: "translateX(-50%)",
              width: 52,
              height: 15,
              borderRadius: 10,
              background: "#000",
              zIndex: 3,
            }}
          />
          <div style={{ height: 150, position: "relative" }}>
            <img
              src={main.thumbnailOverride || getScreenshotUrl(main.url, 300, 500)}
              alt=""
              loading="lazy"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%" }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(180deg, rgba(6,9,6,.5), rgba(6,9,6,0) 45%, rgba(6,9,6,.7))",
              }}
            />
            <div className="font-display" style={{ position: "absolute", left: 12, bottom: 10, fontWeight: 700, fontSize: 14 }}>
              {main.name[locale]}
            </div>
          </div>
          <div style={{ padding: "14px 12px 0" }}>
            <div style={{ height: 8, borderRadius: 5, background: "rgba(255,255,255,.06)", marginBottom: 7 }} />
            <div style={{ height: 8, width: "70%", borderRadius: 5, background: "rgba(255,255,255,.06)" }} />
          </div>
          <div
            style={{
              position: "absolute",
              left: 12,
              right: 12,
              bottom: 12,
              height: 38,
              borderRadius: 12,
              background: "#c2f24e",
              color: "#0a0d09",
              fontWeight: 700,
              fontSize: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
            }}
          >
            <ShoppingBag size={12} />
            {t("addToCart")}
          </div>
        </div>

        {/* ripple + curseur + toast, synchronisés sur le cycle de 10s */}
        <span
          aria-hidden
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 22,
            height: 22,
            pointerEvents: "none",
            zIndex: 20,
            animation: `heroSmRipple ${CYCLE}`,
          }}
        >
          <span
            style={{
              display: "block",
              width: 44,
              height: 44,
              margin: -11,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(194,242,78,.55), transparent 70%)",
            }}
          />
        </span>
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            pointerEvents: "none",
            zIndex: 21,
            filter: "drop-shadow(0 3px 5px rgba(0,0,0,.5))",
            animation: `heroSmCursor ${CYCLE}`,
            color: "#fff",
          }}
        >
          <MousePointer2 size={22} fill="#fff" />
        </div>
        <div
          style={{
            position: "absolute",
            right: 14,
            top: 70,
            zIndex: 22,
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(12,17,11,.92)",
            border: "1px solid rgba(194,242,78,.35)",
            backdropFilter: "blur(6px)",
            borderRadius: 12,
            padding: "9px 13px",
            boxShadow: "0 16px 40px -16px rgba(0,0,0,.8)",
            animation: `heroSmToast ${CYCLE}`,
          }}
        >
          <CheckCircle2 size={20} color="#c2f24e" />
          <div style={{ lineHeight: 1.15 }}>
            <div style={{ fontSize: 12, fontWeight: 700 }}>{t("toastTitle")}</div>
            <div style={{ fontSize: 10, color: "#8e988c" }}>{t("toastSub")}</div>
          </div>
        </div>

        {/* chips flottants */}
        <div
          style={{
            position: "absolute",
            top: -4,
            right: -4,
            display: "flex",
            alignItems: "center",
            gap: 9,
            background: "rgba(12,17,11,.94)",
            border: "1px solid rgba(255,255,255,.12)",
            borderRadius: 13,
            padding: "11px 14px",
            boxShadow: "0 18px 44px -16px rgba(0,0,0,.85)",
            animation: "heroChipFloat 5s ease-in-out infinite",
            zIndex: 30,
          }}
        >
          <span
            style={{
              width: 32,
              height: 32,
              borderRadius: 9,
              background: "rgba(194,242,78,.16)",
              color: "#c2f24e",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TrendingUp size={16} />
          </span>
          <div style={{ lineHeight: 1.15 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#f0f4ee" }}>{t("growth")}</div>
            <div style={{ fontSize: 11.5, color: "#8b9585" }}>{t("growthSub")}</div>
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            top: 392,
            right: -10,
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(12,17,11,.94)",
            border: "1px solid rgba(255,255,255,.12)",
            borderRadius: 13,
            padding: "10px 14px",
            boxShadow: "0 18px 44px -16px rgba(0,0,0,.85)",
            animation: "heroChipFloat2 6s ease-in-out infinite",
            zIndex: 30,
          }}
        >
          <span style={{ color: "#c2f24e", fontSize: 15 }}>★★★★★</span>
          <span style={{ fontSize: 14, fontWeight: 700, color: "#f0f4ee" }}>{t("rating")}</span>
        </div>
      </div>
    </motion.div>
  );
}