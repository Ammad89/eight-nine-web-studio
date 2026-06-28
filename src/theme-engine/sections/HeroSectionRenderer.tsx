import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { resolveThemeAsset } from "../";

export interface HeroSectionData {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  image?: string;
  imageAlt?: string;
  align?: "left" | "center";
}

function renderLines(value: string) {
  return value.split("\n").map((line, index, lines) => (
    <span key={`${line}-${index}`}>
      {line}
      {index < lines.length - 1 && <br />}
    </span>
  ));
}

function isHeroSectionData(value: unknown): value is HeroSectionData {
  return Boolean(value && typeof value === "object");
}

export default function HeroSectionRenderer({ data }: { data: unknown }) {
  if (!isHeroSectionData(data)) return null;

  const alignment = data.align || "center";
  const imageSrc = data.image ? resolveThemeAsset(data.image) : "";

  return (
    <section className="relative min-h-[78vh] bg-background pt-[72px] overflow-hidden">
      {imageSrc && (
        <div className="absolute inset-0">
          <img
            src={imageSrc}
            alt={data.imageAlt || data.title || "Hero image"}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/45" />
        </div>
      )}

      <div
        className={`relative z-10 max-w-7xl mx-auto px-6 py-24 min-h-[78vh] flex items-center ${
          alignment === "center" ? "justify-center text-center" : "justify-start text-left"
        }`}
      >
        <div className={alignment === "center" ? "max-w-3xl mx-auto" : "max-w-2xl"}>
          {data.eyebrow && (
            <p className={`text-[10px] tracking-[0.35em] uppercase mb-5 font-medium ${
              imageSrc ? "text-white/70" : "text-muted-foreground"
            }`}>
              {data.eyebrow}
            </p>
          )}

          {data.title && (
            <h1
              className={`text-4xl sm:text-6xl font-medium mb-6 leading-tight ${
                imageSrc ? "text-white" : "text-foreground"
              }`}
              style={{ fontFamily: "'Lora', Georgia, serif" }}
            >
              {renderLines(data.title)}
            </h1>
          )}

          {data.subtitle && (
            <p className={`text-base sm:text-lg leading-relaxed mb-9 ${
              imageSrc ? "text-white/75" : "text-muted-foreground"
            }`}>
              {data.subtitle}
            </p>
          )}

          {(data.primaryCtaLabel || data.secondaryCtaLabel) && (
            <div className={`flex flex-wrap gap-3 ${alignment === "center" ? "justify-center" : "justify-start"}`}>
              {data.primaryCtaLabel && data.primaryCtaHref && (
                <Link
                  to={data.primaryCtaHref}
                  className="group inline-flex items-center gap-[18px] h-11 pl-6 pr-3.5 bg-primary text-primary-foreground text-xs tracking-[0.12em] uppercase font-medium rounded-full hover:opacity-80 transition-opacity duration-500"
                >
                  <span className="group-hover:[order:1]">{data.primaryCtaLabel}</span>
                  <span className="group-hover:[order:0] flex items-center justify-center w-5 h-5">
                    <ArrowRight size={14} />
                  </span>
                </Link>
              )}

              {data.secondaryCtaLabel && data.secondaryCtaHref && (
                <Link
                  to={data.secondaryCtaHref}
                  className={`inline-flex items-center h-11 px-6 rounded-full border text-xs tracking-[0.12em] uppercase font-medium transition-colors duration-500 ${
                    imageSrc
                      ? "border-white/30 text-white hover:bg-white hover:text-foreground"
                      : "border-border text-foreground hover:bg-muted"
                  }`}
                >
                  {data.secondaryCtaLabel}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
