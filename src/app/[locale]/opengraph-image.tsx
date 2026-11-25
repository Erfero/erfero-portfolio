import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage({
  params,
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({
    locale: params.locale,
    namespace: "hero",
  });

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
            "radial-gradient(120% 120% at 85% 0%, rgba(109,77,255,0.55), transparent 55%), radial-gradient(100% 100% at 10% 100%, rgba(255,111,208,0.35), transparent 55%), #07061a",
        }}
      >
        <span
          style={{
            fontSize: 28,
            color: "#ff6fd0",
            letterSpacing: 2,
            textTransform: "uppercase",
            fontFamily: "sans-serif",
          }}
        >
          Erféro Keoula
        </span>
        <span
          style={{
            marginTop: 24,
            fontSize: 64,
            fontWeight: 600,
            color: "#f8f7ff",
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
