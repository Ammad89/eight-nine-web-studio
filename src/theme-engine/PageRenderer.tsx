import type { CSSProperties } from "react";
import { SectionRenderer } from "./sections";
import type {
  ElementStyle,
  PageDefinition,
  PageSection,
  ResponsiveDevice,
} from "../cms-core/platform";

interface PageRendererProps {
  page: PageDefinition;
  selectedSectionId?: string;
  previewMode?: ResponsiveDevice;
  onSelectSection?: (section: PageSection) => void;
  onSelectElement?: (
    sectionId: string,
    elementKey: string,
    type: "text" | "image" | "button" | "card",
    label: string,
  ) => void;
  onUpdateSectionData?: (
    sectionId: string,
    field: string,
    value: unknown,
  ) => void;
  onUpdateCollectionItem?: (
    collection:
      | "services"
      | "portfolio"
      | "testimonials"
      | "faqs",
    itemId: string,
    path: string,
    value: unknown,
  ) => void;
  editorMode?: boolean;
}

function resolveStyle(
  section: PageSection,
  device: ResponsiveDevice,
): ElementStyle {
  const desktop = section.style?.desktop || {};

  if (device === "desktop") return desktop;

  const tablet = section.style?.tablet || {};

  if (device === "tablet") {
    return {
      ...desktop,
      ...tablet,
    };
  }

  return {
    ...desktop,
    ...tablet,
    ...(section.style?.mobile || {}),
  };
}

function toCssStyle(
  style: ElementStyle,
): CSSProperties {
  return {
    width: style.width || undefined,
    minHeight: style.minHeight || undefined,
    paddingTop:
      typeof style.paddingTop === "number"
        ? `${style.paddingTop}px`
        : undefined,
    paddingBottom:
      typeof style.paddingBottom === "number"
        ? `${style.paddingBottom}px`
        : undefined,
    opacity:
      typeof style.opacity === "number"
        ? style.opacity
        : undefined,
    backgroundColor:
      style.backgroundColor || undefined,
    borderRadius:
      typeof style.borderRadius === "number"
        ? `${style.borderRadius}px`
        : undefined,
    overflow: style.overflow || undefined,
    zIndex:
      typeof style.zIndex === "number"
        ? style.zIndex
        : undefined,
    position:
      typeof style.zIndex === "number"
        ? "relative"
        : undefined,
    marginLeft: "auto",
    marginRight: "auto",
  };
}

export default function PageRenderer({
  page,
  selectedSectionId,
  previewMode = "desktop",
  onSelectSection,
  onSelectElement,
  onUpdateSectionData,
  onUpdateCollectionItem,
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
        const isSelected =
          section.id === selectedSectionId;

        const sectionStyle = toCssStyle(
          resolveStyle(section, previewMode),
        );

        if (!editorMode) {
          return (
            <div
              key={section.id}
              style={sectionStyle}
            >
              <SectionRenderer section={section} />
            </div>
          );
        }

        return (
          <div
            key={section.id}
            data-section-id={section.id}
            role="button"
            tabIndex={0}
            style={sectionStyle}
            data-responsive-device={previewMode}
            onClick={event => {
              event.stopPropagation();
              onSelectSection?.(section);
            }}
            onKeyDown={event => {
              const target =
                event.target as HTMLElement;

              const isEditing =
                target.isContentEditable ||
                target.closest(
                  "[contenteditable='true']",
                ) !== null ||
                target.tagName === "INPUT" ||
                target.tagName === "TEXTAREA" ||
                target.tagName === "SELECT";

              if (isEditing) return;

              if (
                event.key === "Enter" ||
                event.key === " "
              ) {
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
              className={`pointer-events-none absolute left-3 top-3 z-[90] rounded-md px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] shadow ${
                isSelected
                  ? "bg-blue-600 text-white"
                  : "bg-black/70 text-white opacity-0 group-hover:opacity-100"
              }`}
            >
              {section.type}
            </div>

            <SectionRenderer
              section={section}
              editable={editorMode}
              onEditStart={() =>
                onSelectSection?.(section)
              }
              onSelectElement={(
                elementKey,
                type,
                label,
              ) =>
                onSelectElement?.(
                  section.id,
                  elementKey,
                  type,
                  label,
                )
              }
              onUpdateField={(field, value) =>
                onUpdateSectionData?.(
                  section.id,
                  field,
                  value,
                )
              }
              onUpdateCollectionItem={
                onUpdateCollectionItem
              }
            />
          </div>
        );
      })}
    </main>
  );
}
