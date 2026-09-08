import { ImageResponse } from "next/og";

export const alt = "Achraf & Molka - Wedding Invitation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#f6f0e4",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 28,
            border: "1.5px solid rgba(184, 147, 90, 0.6)",
            borderRadius: 4,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 38,
            border: "1px solid rgba(184, 147, 90, 0.32)",
            borderRadius: 2,
          }}
        />
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#8c6d3f",
            marginBottom: 28,
          }}
        >
          Wedding Invitation
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 92,
            color: "#4d3f32",
            fontWeight: 600,
            marginBottom: 24,
          }}
        >
          Achraf &amp; Molka
        </div>
        <div
          style={{
            display: "flex",
            width: 160,
            height: 1,
            background:
              "linear-gradient(90deg, transparent, rgba(184, 147, 90, 0.75), transparent)",
            marginBottom: 24,
          }}
        />
        <div
          style={{
            display: "flex",
            fontSize: 30,
            color: "#8c6d3f",
            letterSpacing: 1,
          }}
        >
          Friday, October 30, 2026
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 24,
            color: "rgba(77, 63, 50, 0.72)",
            letterSpacing: 1,
            marginTop: 10,
          }}
        >
          Tej Palace, Complexe Mariem - Sfax
        </div>
      </div>
    ),
    { ...size }
  );
}
