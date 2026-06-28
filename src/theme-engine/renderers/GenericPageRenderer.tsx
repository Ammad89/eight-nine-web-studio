import SEO from "../../app/components/SEO";
import { getActiveSite } from "../";
import { SectionRenderer } from "../sections";
import type { PageDefinition } from "../../cms-core/platform";

export default function GenericPageRenderer({ page }: { page: PageDefinition }) {
  const site = getActiveSite();

  const sortedSections = [...page.sections]
    .filter(section => section.visible !== false)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <>
      <SEO
        title={page.seo.title}
        description={page.seo.description}
        keywords={page.seo.keywords}
        canonical={page.seo.canonical || `${site.domain.canonicalUrl}${page.slug === "/" ? "" : page.slug}`}
      />

      {sortedSections.length > 0 ? (
        sortedSections.map(section => (
          <SectionRenderer key={section.id} section={section} />
        ))
      ) : (
        <section className="pt-[72px] py-28 bg-background">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-muted-foreground text-[10px] tracking-[0.35em] uppercase mb-4 font-medium">
              Empty Page
            </p>
            <h1
              className="text-4xl sm:text-5xl font-medium text-foreground mb-5"
              style={{ fontFamily: "'Lora', Georgia, serif" }}
            >
              {page.title}
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed">
              This page exists in WebsiteSchema but does not have any sections yet.
            </p>
          </div>
        </section>
      )}
    </>
  );
}
