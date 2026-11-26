import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  // Next 16 : params est une promesse.
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hero" });
  // Le prénom garde son accent en français, pas en anglais.
  const name = locale === "en" ? "Erfero" : "Erféro";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "radial-gradient(90% 90% at 90% 0%, rgba(0,128,96,0.35), transparent 60%), #0e1311",
        }}
      >
        <span
          style={{
            fontSize: 28,
            color: "#3cc896",
            letterSpacing: 2,
            textTransform: "uppercase",
            fontFamily: "sans-serif",
          }}
        >
          {name} Keoula · Développeur Shopify
        </span>
        <span
          style={{
            marginTop: 24,
            fontSize: 64,
            fontWeight: 600,
            color: "#f4f2ed",
            fontFamily: "sans-serif",
            lineHeight: 1.15,
            maxWidth: 900,
          }}
        >
          {t("titleLine1")} {t("titleHighlight")}
        </span>
      </div>
    ),
    size
  );
}
