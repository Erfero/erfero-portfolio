import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #6d4dff 0%, #ff6fd0 60%, #ffbe6b 100%)",
          borderRadius: 16,
        }}
      >
        <span
          style={{
            fontSize: 32,
            fontWeight: 800,
            color: "#0b0920",
            fontFamily: "sans-serif",
          }}
        >
          EK
        </span>
      </div>
    ),
    size
  );
}
