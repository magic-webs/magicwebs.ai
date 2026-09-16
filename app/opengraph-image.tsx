import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { company } from "@/lib/site";

export const alt = `${company.name} — ${company.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  // Satori needs the bytes inline; it will not fetch a relative URL.
  const mark = await readFile(join(process.cwd(), "public/logo-mark.png"));
  const markSrc = `data:image/png;base64,${mark.toString("base64")}`;

  // Satori lays every node out as flex and will not wrap a coloured span
  // inline inside a sentence, so each headline line is its own block.
  const line = {
    fontSize: 76,
    fontWeight: 700,
    lineHeight: 1.04,
    letterSpacing: "-0.05em",
  } as const;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#fbfaf4",
          padding: "68px 80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={markSrc} width={62} height={35} alt="" />
          <span
            style={{
              fontSize: 32,
              fontWeight: 600,
              color: "#0e1113",
              letterSpacing: "-0.03em",
            }}
          >
            {company.name}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <span style={{ ...line, color: "#0e1113" }}>
            Automate your business with
          </span>
          <span style={{ ...line, color: "#db704c" }}>Magic Webs.</span>
          <span
            style={{
              fontSize: 29,
              color: "#57606a",
              letterSpacing: "-0.01em",
              marginTop: 10,
            }}
          >
            {company.heroSub}
          </span>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          {[
            "Magic Agent",
            "RichyReach",
            "Magic Reward",
            "Magic Forms",
            "Native UI",
          ].map((t) => (
            <span
              key={t}
              style={{
                fontSize: 20,
                color: "#2c3134",
                border: "1px solid rgba(14,17,19,0.2)",
                borderRadius: 999,
                padding: "8px 18px",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
