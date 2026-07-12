import EditableText from "./EditableText";

export interface TextSectionData {
  eyebrow?: string;
  title?: string;
  content?: string;
  align?: "left" | "center";
  maxWidth?: "sm" | "md" | "lg" | "xl";
}

interface RendererProps {
  data: unknown;
  editable?: boolean;
  onEditStart?: () => void;
  onUpdateField?: (field: string, value: unknown) => void;
}

function widthClass(width?: string) {
  switch (width) {
    case "sm":
      return "max-w-xl";
    case "md":
      return "max-w-3xl";
    case "lg":
      return "max-w-5xl";
    default:
      return "max-w-4xl";
  }
}

export default function TextSectionRenderer({
  data,
  editable = false,
  onEditStart,
  onUpdateField,
}: RendererProps) {
  if (!data || typeof data !== "object") return null;

  const section = data as TextSectionData;
  const align = section.align || "left";

  return (
    <section className="bg-background py-24">
      <div
        className={`mx-auto px-6 ${widthClass(section.maxWidth)} ${
          align === "center" ? "text-center" : ""
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
            className="mb-4 text-[10px] uppercase tracking-[0.35em] text-muted-foreground"
          />
        )}

        {(section.title || editable) && (
          <EditableText
            as="h2"
            value={section.title || "Section title"}
            editable={editable}
            multiline
            onEditStart={onEditStart}
            onCommit={value =>
              onUpdateField?.("title", value)
            }
            className="mb-8 text-4xl font-medium text-foreground"
            style={{ fontFamily: "'Lora', Georgia, serif" }}
          />
        )}

        {(section.content || editable) && (
          <EditableText
            as="p"
            value={section.content || "Section content"}
            editable={editable}
            multiline
            onEditStart={onEditStart}
            onCommit={value =>
              onUpdateField?.("content", value)
            }
            className="whitespace-pre-line leading-8 text-muted-foreground"
          />
        )}
      </div>
    </section>
  );
}
