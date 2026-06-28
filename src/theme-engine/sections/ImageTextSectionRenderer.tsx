import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { resolveThemeAsset } from "../";

export interface ImageTextSectionData {
  eyebrow?: string;
  title?: string;
  content?: string;
  image?: string;
  imageAlt?: string;
  imagePosition?: "left" | "right";
  ctaLabel?: string;
  ctaHref?: string;
}

function renderParagraphs(text?: string) {
  if (!text) return null;

  return text.split("\n\n").map((paragraph, index) => (
    <p key={index} className="mb-5 last:mb-0 text-[15px] leading-8 text-muted-foreground">
      {paragraph}
    </p>
  ));
}

export default function ImageTextSectionRenderer({ data }: { data: unknown }) {
  if (!data || typeof data !== "object") return null;

  const section = data as ImageTextSectionData;
  const imageSrc = section.image ? resolveThemeAsset(section.image) : "";
  const imageFirst = section.imagePosition === "left";

  const imageBlock = (
    <div className="overflow-hidden rounded-3xl bg-muted" style={{ aspectRatio: "4/5" }}>
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={section.imageAlt || section.title || "Section image"}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
          No image selected
        </div>
      )}
    </div>
  );

  const textBlock = (
    <div>
      {section.eyebrow && (
        <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.35em] text-muted-foreground">
          {section.eyebrow}
        </p>
      )}

      {section.title && (
        <h2
          className="mb-7 text-3xl font-medium leading-tight text-foreground sm:text-5xl"
          style={{ fontFamily: "'Lora', Georgia, serif" }}
        >
          {section.title}
        </h2>
      )}

      {renderParagraphs(section.content)}

      {section.ctaLabel && section.ctaHref && (
        <Link
          to={section.ctaHref}
          className="group mt-8 inline-flex items-center gap-[18px] text-xs font-medium uppercase tracking-[0.12em] text-foreground"
        >
          <span className="group-hover:[order:1]">{section.ctaLabel}</span>
          <span className="group-hover:[order:0] flex items-center">
            <ArrowRight size={14} />
          </span>
        </Link>
      )}
    </div>
  );

  return (
    <section className="bg-background py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 md:grid-cols-2 lg:gap-20">
        {imageFirst ? (
          <>
            {imageBlock}
            {textBlock}
          </>
        ) : (
          <>
            {textBlock}
            {imageBlock}
          </>
        )}
      </div>
    </section>
  );
}
