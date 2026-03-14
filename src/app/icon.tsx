import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0e1a",
          borderRadius: 6,
          color: "#f0c040",
          fontWeight: 700,
        }}
      >
        ⚡
      </div>
    ),
    { ...size }
  );
}
