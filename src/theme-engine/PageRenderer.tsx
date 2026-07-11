import { SectionRenderer } from "./sections";
import type { PageDefinition, PageSection } from "../cms-core/platform";

interface PageRendererProps {
  page: PageDefinition;
  selectedSectionId?: string;
  onSelectSection?: (section: PageSection) => void;
  onUpdateSectionData?: (
    sectionId: string,
    field: string,
    value: unknown,
  ) => void;
  editorMode?: boolean;
}

export default function PageRenderer({
  page,
  selectedSectionId,
  onSelectSection,
  onUpdateSectionData,
  editorMode = false,
}: PageRendererProps) {
  const visibleSections = page.sections
    .filter(section => section.visible !== false)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  if (!visibleSections.length) {
    return (
      <main className="min-h-[500px] bg-background py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Empty Page
          </p>

          <h1 className="text-4xl font-semibold text-foreground">
            {page.title}
          </h1>

          <p className="mt-4 text-sm text-muted-foreground">
            This page has no visible sections yet.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main>
      {visibleSections.map(section => {
        const isSelected = section.id === selectedSectionId;

        if (!editorMode) {
          return (
            <SectionRenderer
              key={section.id}
              section={section}
            />
          );
        }

        const inlineFields = [
          "eyebrow",
          "title",
          "subtitle",
          "content",
        ].filter(
          field => typeof section.data[field] === "string",
        );

        return (
          <div
            key={section.id}
            role="button"
            tabIndex={0}
            onClick={event => {
              event.stopPropagation();
              onSelectSection?.(section);
            }}
            onKeyDown={event => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onSelectSection?.(section);
              }
            }}
            className={`group relative cursor-pointer transition ${
              isSelected
                ? "ring-2 ring-inset ring-blue-500"
                : "hover:ring-2 hover:ring-inset hover:ring-blue-300"
            }`}
          >
            <div
              className={`pointer-events-none absolute left-3 top-3 z-40 rounded-md px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] shadow ${
                isSelected
                  ? "bg-blue-600 text-white"
                  : "bg-black/70 text-white opacity-0 group-hover:opacity-100"
              }`}
            >
              {section.type}
            </div>

            <SectionRenderer section={section} />
          </div>
        );
      })}
    </main>
  );
}
