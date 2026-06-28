export interface TextSectionData {
  eyebrow?: string;
  title?: string;
  content?: string;
  align?: "left" | "center";
  maxWidth?: "sm" | "md" | "lg" | "xl";
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

function renderParagraphs(text?: string) {
  if (!text) return null;

  return text.split("\n\n").map((paragraph, index) => (
    <p key={index} className="mb-6 last:mb-0 leading-8 text-muted-foreground">
      {paragraph}
    </p>
  ));
}

export default function TextSectionRenderer({
  data,
}: {
  data: unknown;
}) {
  if (!data || typeof data !== "object") return null;

  const section = data as TextSectionData;

  const align = section.align || "left";

  return (
    <section className="py-24 bg-background">
      <div
        className={`mx-auto px-6 ${widthClass(section.maxWidth)} ${
          align === "center" ? "text-center" : ""
        }`}
      >
        {section.eyebrow && (
          <p className="mb-4 text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
            {section.eyebrow}
          </p>
        )}

        {section.title && (
          <h2
            className="mb-8 text-4xl font-medium text-foreground"
            style={{ fontFamily: "'Lora', Georgia, serif" }}
          >
            {section.title}
          </h2>
        )}

        {renderParagraphs(section.content)}
      </div>
    </section>
  );
}
