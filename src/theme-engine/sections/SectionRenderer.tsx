import type { PageSection } from "../../cms-core/platform";
import HeroSectionRenderer from "./HeroSectionRenderer";
import TextSectionRenderer from "./TextSectionRenderer";
import CtaSectionRenderer from "./CtaSectionRenderer";
import ImageTextSectionRenderer from "./ImageTextSectionRenderer";
import CollectionSectionRenderer from "./CollectionSectionRenderer";

interface SectionRendererProps {
  section: PageSection;
  editable?: boolean;
  onEditStart?: () => void;
  onSelectElement?: (
    elementKey: string,
    type: "text" | "image" | "button" | "card",
    label: string,
  ) => void;
  onUpdateField?: (field: string, value: unknown) => void;
  onUpdateCollectionItem?: (
    collection: "services" | "portfolio" | "testimonials" | "faqs",
    itemId: string,
    path: string,
    value: unknown,
  ) => void;
}

export default function SectionRenderer({
  section,
  editable = false,
  onEditStart,
  onSelectElement,
  onUpdateField,
  onUpdateCollectionItem,
}: SectionRendererProps) {
  if (!section.visible) return null;

  const editorProps = {
    editable,
    onEditStart,
    onSelectElement,
    onUpdateField,
  };

  switch (section.type) {
    case "hero":
      return (
        <HeroSectionRenderer
          data={section.data}
          {...editorProps}
        />
      );

    case "text":
      return (
        <TextSectionRenderer
          data={section.data}
          {...editorProps}
        />
      );

    case "cta":
      return (
        <CtaSectionRenderer
          data={section.data}
          {...editorProps}
        />
      );

    case "imageText":
      return (
        <ImageTextSectionRenderer
          data={section.data}
          {...editorProps}
        />
      );

    case "servicesGrid":
    case "portfolioGrid":
    case "testimonials":
    case "faq":
      return (
        <CollectionSectionRenderer
          data={section.data}
          editable={editable}
          onEditStart={onEditStart}
          onUpdateField={onUpdateField}
          onUpdateCollectionItem={onUpdateCollectionItem}
        />
      );

    default:
      return (
        <section className="bg-background py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="rounded-2xl border border-border p-6">
              <p className="text-xs uppercase tracking-[0.2em] opacity-60">
                Unsupported section
              </p>

              <h2 className="mt-2 text-xl font-semibold">
                {section.type}
              </h2>

              <p className="mt-2 text-sm opacity-70">
                This section type has not been connected to a renderer yet.
              </p>
            </div>
          </div>
        </section>
      );
  }
}
