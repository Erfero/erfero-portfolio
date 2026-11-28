import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { BALISE_SVG, SCEAU_VERT_SVG } from "@/lib/brandArt";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const dataUri = (svg: string) => `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;

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
  const seal = SCEAU_VERT_SVG[locale === "en" ? "en" : "fr"];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "radial-gradient(90% 90% at 90% 0%, rgba(0,128,96,0.35), transparent 60%), #0e1311",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 700 }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={dataUri(BALISE_SVG)} width={64} height={64} alt="" />
            <span
              style={{
                marginLeft: 20,
                fontSize: 24,
                color: "#3cc896",
                letterSpacing: 2,
                textTransform: "uppercase",
                fontFamily: "sans-serif",
              }}
            >
              {name} Keoula · Développeur Shopify
            </span>
          </div>
          <span
            style={{
              marginTop: 32,
              fontSize: 60,
              fontWeight: 600,
              color: "#f4f2ed",
              fontFamily: "sans-serif",
              lineHeight: 1.15,
            }}
          >
            {t("titleLine1")} {t("titleHighlight")}
          </span>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={dataUri(seal)} width={290} height={290} alt="" />
      </div>
    ),
    size
  );
}
