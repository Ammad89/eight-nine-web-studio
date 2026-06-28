import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

export interface CtaSectionData {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  tone?: "light" | "dark";
  align?: "left" | "center";
}

export default function CtaSectionRenderer({ data }: { data: unknown }) {
  if (!data || typeof data !== "object") return null;

  const section = data as CtaSectionData;
  const tone = section.tone || "dark";
  const align = section.align || "center";
  const isDark = tone === "dark";

  return (
    <section className={`py-24 ${isDark ? "bg-primary" : "bg-secondary"}`}>
      <div
        className={`max-w-5xl mx-auto px-6 ${
          align === "center" ? "text-center" : "text-left"
        }`}
      >
        {section.eyebrow && (
          <p
            className={`mb-5 text-[10px] uppercase tracking-[0.35em] font-medium ${
              isDark ? "text-white/45" : "text-muted-foreground"
            }`}
          >
            {section.eyebrow}
          </p>
        )}

        {section.title && (
          <h2
            className={`mb-6 text-4xl sm:text-5xl font-medium leading-tight ${
              isDark ? "text-white" : "text-foreground"
            }`}
            style={{ fontFamily: "'Lora', Georgia, serif" }}
          >
            {section.title}
          </h2>
        )}

        {section.subtitle && (
          <p
            className={`mx-auto mb-10 max-w-2xl text-base leading-relaxed ${
              align === "left" ? "mx-0" : ""
            } ${isDark ? "text-white/60" : "text-muted-foreground"}`}
          >
            {section.subtitle}
          </p>
        )}

        {(section.primaryCtaLabel || section.secondaryCtaLabel) && (
          <div
            className={`flex flex-wrap gap-3 ${
              align === "center" ? "justify-center" : "justify-start"
            }`}
          >
            {section.primaryCtaLabel && section.primaryCtaHref && (
              <Link
                to={section.primaryCtaHref}
                className={`group inline-flex h-11 items-center gap-[18px] rounded-full pl-6 pr-3.5 text-xs font-medium uppercase tracking-[0.12em] transition-opacity duration-500 hover:opacity-80 ${
                  isDark
                    ? "bg-white text-primary"
                    : "bg-primary text-primary-foreground"
                }`}
              >
                <span className="group-hover:[order:1]">
                  {section.primaryCtaLabel}
                </span>
                <span className="group-hover:[order:0] flex h-5 w-5 items-center justify-center">
                  <ArrowRight size={14} />
                </span>
              </Link>
            )}

            {section.secondaryCtaLabel && section.secondaryCtaHref && (
              <Link
                to={section.secondaryCtaHref}
                className={`inline-flex h-11 items-center rounded-full border px-6 text-xs font-medium uppercase tracking-[0.12em] transition-colors duration-500 ${
                  isDark
                    ? "border-white/25 text-white hover:bg-white hover:text-primary"
                    : "border-border text-foreground hover:bg-muted"
                }`}
              >
                {section.secondaryCtaLabel}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
