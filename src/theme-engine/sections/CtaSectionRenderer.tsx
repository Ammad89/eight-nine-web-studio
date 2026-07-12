import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import EditableText from "./EditableText";

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

interface RendererProps {
  data: unknown;
  editable?: boolean;
  onEditStart?: () => void;
  onUpdateField?: (field: string, value: unknown) => void;
}

export default function CtaSectionRenderer({
  data,
  editable = false,
  onEditStart,
  onUpdateField,
}: RendererProps) {
  if (!data || typeof data !== "object") return null;

  const section = data as CtaSectionData;
  const tone = section.tone || "dark";
  const align = section.align || "center";
  const isDark = tone === "dark";

  return (
    <section
      className={`py-24 ${
        isDark ? "bg-primary" : "bg-secondary"
      }`}
    >
      <div
        className={`mx-auto max-w-5xl px-6 ${
          align === "center" ? "text-center" : "text-left"
        }`}
      >
        {(section.eyebrow || editable) && (
          <EditableText
            as="p"
            value={section.eyebrow || "Eyebrow text"}
            editable={editable}
            onEditStart={onEditStart}
            onCommit={value =>
              onUpdateField?.("eyebrow", value)
            }
            className={`mb-5 text-[10px] font-medium uppercase tracking-[0.35em] ${
              isDark
                ? "text-white/45"
                : "text-muted-foreground"
            }`}
          />
        )}

        {(section.title || editable) && (
          <EditableText
            as="h2"
            value={section.title || "Call to action title"}
            editable={editable}
            multiline
            onEditStart={onEditStart}
            onCommit={value =>
              onUpdateField?.("title", value)
            }
            className={`mb-6 text-4xl font-medium leading-tight sm:text-5xl ${
              isDark ? "text-white" : "text-foreground"
            }`}
            style={{ fontFamily: "'Lora', Georgia, serif" }}
          />
        )}

        {(section.subtitle || editable) && (
          <EditableText
            as="p"
            value={section.subtitle || "Supporting call to action text"}
            editable={editable}
            multiline
            onEditStart={onEditStart}
            onCommit={value =>
              onUpdateField?.("subtitle", value)
            }
            className={`mb-10 max-w-2xl text-base leading-relaxed ${
              align === "left" ? "mx-0" : "mx-auto"
            } ${
              isDark
                ? "text-white/60"
                : "text-muted-foreground"
            }`}
          />
        )}

        {(section.primaryCtaLabel || section.secondaryCtaLabel) && (
          <div
            className={`flex flex-wrap gap-3 ${
              align === "center"
                ? "justify-center"
                : "justify-start"
            }`}
          >
            {section.primaryCtaLabel && section.primaryCtaHref && (
              <Link
                to={editable ? "#" : section.primaryCtaHref}
                onClick={event => {
                  if (editable) event.preventDefault();
                }}
                className={`group inline-flex h-11 items-center gap-[18px] rounded-full pl-6 pr-3.5 text-xs font-medium uppercase tracking-[0.12em] transition-opacity duration-500 hover:opacity-80 ${
                  isDark
                    ? "bg-white text-primary"
                    : "bg-primary text-primary-foreground"
                }`}
              >
                <EditableText
                  as="span"
                  value={section.primaryCtaLabel}
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

            {section.secondaryCtaLabel && section.secondaryCtaHref && (
              <Link
                to={editable ? "#" : section.secondaryCtaHref}
                onClick={event => {
                  if (editable) event.preventDefault();
                }}
                className={`inline-flex h-11 items-center rounded-full border px-6 text-xs font-medium uppercase tracking-[0.12em] transition-colors duration-500 ${
                  isDark
                    ? "border-white/25 text-white hover:bg-white hover:text-primary"
                    : "border-border text-foreground hover:bg-muted"
                }`}
              >
                <EditableText
                  as="span"
                  value={section.secondaryCtaLabel}
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
    </section>
  );
}
