import type { PageSection } from "../../cms-core/platform";
import HeroSectionRenderer from "./HeroSectionRenderer";
import TextSectionRenderer from "./TextSectionRenderer";
import CtaSectionRenderer from "./CtaSectionRenderer";
import ImageTextSectionRenderer from "./ImageTextSectionRenderer";
import CollectionSectionRenderer from "./CollectionSectionRenderer";

export default function SectionRenderer({ section }: { section: PageSection }) {
  if (!section.visible) return null;

  switch (section.type) {
    case "hero":
      return <HeroSectionRenderer data={section.data} />;

    case "text":
      return <TextSectionRenderer data={section.data} />;

    case "cta":
      return <CtaSectionRenderer data={section.data} />;

    case "imageText":
      return <ImageTextSectionRenderer data={section.data} />;

    case "servicesGrid":
    case "portfolioGrid":
    case "testimonials":
    case "faq":
      return <CollectionSectionRenderer data={section.data} />;

    default:
      return (
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-6">
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
