import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { resolveThemeAsset } from "../";
import EditableText from "./EditableText";

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

interface RendererProps {
  data: unknown;
  editable?: boolean;
  onEditStart?: () => void;
  onUpdateField?: (field: string, value: unknown) => void;
}

function isHeroSectionData(value: unknown): value is HeroSectionData {
  return Boolean(value && typeof value === "object");
}

export default function HeroSectionRenderer({
  data,
  editable = false,
  onEditStart,
  onUpdateField,
}: RendererProps) {
  if (!isHeroSectionData(data)) return null;

  const alignment = data.align || "center";
  const imageSrc = data.image ? resolveThemeAsset(data.image) : "";

  return (
    <section className="relative min-h-[78vh] overflow-hidden bg-background pt-[72px]">
      {imageSrc && (
        <div className="absolute inset-0">
          <div className="group/image relative h-full w-full">
            <img
              src={imageSrc}
              alt={data.imageAlt || data.title || "Hero image"}
              className="h-full w-full object-cover"
            />

            {editable && (
              <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center bg-black/0 transition group-hover/image:bg-black/20">
                <span className="rounded-full bg-black/80 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-white opacity-0 shadow transition group-hover/image:opacity-100">
                  Replace Image
                </span>
              </div>
            )}
          </div>

          <div className="absolute inset-0 bg-black/45" />
        </div>
      )}

      <div
        className={`relative z-10 mx-auto flex min-h-[78vh] max-w-7xl items-center px-6 py-24 ${
          alignment === "center"
            ? "justify-center text-center"
            : "justify-start text-left"
        }`}
      >
        <div
          className={
            alignment === "center"
              ? "mx-auto max-w-3xl"
              : "max-w-2xl"
          }
        >
          {(data.eyebrow || editable) && (
            <EditableText
              as="p"
              value={data.eyebrow || "Eyebrow text"}
              editable={editable}
              onEditStart={onEditStart}
              onCommit={value =>
                onUpdateField?.("eyebrow", value)
              }
              className={`mb-5 text-[10px] font-medium uppercase tracking-[0.35em] ${
                imageSrc
                  ? "text-white/70"
                  : "text-muted-foreground"
              }`}
            />
          )}

          {(data.title || editable) && (
            <EditableText
              as="h1"
              value={data.title || "Hero title"}
              editable={editable}
              multiline
              onEditStart={onEditStart}
              onCommit={value =>
                onUpdateField?.("title", value)
              }
              className={`mb-6 text-4xl font-medium leading-tight sm:text-6xl ${
                imageSrc ? "text-white" : "text-foreground"
              }`}
              style={{ fontFamily: "'Lora', Georgia, serif" }}
            />
          )}

          {(data.subtitle || editable) && (
            <EditableText
              as="p"
              value={data.subtitle || "Hero subtitle"}
              editable={editable}
              multiline
              onEditStart={onEditStart}
              onCommit={value =>
                onUpdateField?.("subtitle", value)
              }
              className={`mb-9 text-base leading-relaxed sm:text-lg ${
                imageSrc
                  ? "text-white/75"
                  : "text-muted-foreground"
              }`}
            />
          )}

          {(data.primaryCtaLabel || data.secondaryCtaLabel) && (
            <div
              className={`flex flex-wrap gap-3 ${
                alignment === "center"
                  ? "justify-center"
                  : "justify-start"
              }`}
            >
              {data.primaryCtaLabel && data.primaryCtaHref && (
                <Link
                  to={editable ? "#" : data.primaryCtaHref}
                  onClick={event => {
                    if (editable) event.preventDefault();
                  }}
                  className="group inline-flex h-11 items-center gap-[18px] rounded-full bg-primary pl-6 pr-3.5 text-xs font-medium uppercase tracking-[0.12em] text-primary-foreground transition-opacity duration-500 hover:opacity-80"
                >
                  <EditableText
                    as="span"
                    value={data.primaryCtaLabel}
                    editable={editable}
                    onEditStart={onEditStart}
                    onCommit={value =>
                      onUpdateField?.("primaryCtaLabel", value)
                    }
                    className="group-hover:[order:1]"
                  />

                  <span className="group-hover:[order:0] flex h-5 w-5 items-center justify-center">
                    <ArrowRight size={14} />
                  </span>
                </Link>
              )}

              {data.secondaryCtaLabel && data.secondaryCtaHref && (
                <Link
                  to={editable ? "#" : data.secondaryCtaHref}
                  onClick={event => {
                    if (editable) event.preventDefault();
                  }}
                  className={`inline-flex h-11 items-center rounded-full border px-6 text-xs font-medium uppercase tracking-[0.12em] transition-colors duration-500 ${
                    imageSrc
                      ? "border-white/30 text-white hover:bg-white hover:text-foreground"
                      : "border-border text-foreground hover:bg-muted"
                  }`}
                >
                  <EditableText
                    as="span"
                    value={data.secondaryCtaLabel}
                    editable={editable}
                    onEditStart={onEditStart}
                    onCommit={value =>
                      onUpdateField?.("secondaryCtaLabel", value)
                    }
                  />
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
