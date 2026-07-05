import { SectionRenderer } from "./sections";
import type { PageDefinition } from "../cms-core/platform";

export default function PageRenderer({
  page,
}: {
  page: PageDefinition;
}) {
  const visibleSections = page.sections
    .filter(section => !section.hidden)
    .sort((a, b) => a.order - b.order);

  if (!visibleSections.length) {
    return (
      <main className="min-h-screen bg-background pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Empty Page
          </p>
          <h1 className="text-4xl font-semibold text-foreground">
            {page.title}
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">
            This page has no sections yet. Add sections from the Platform Sections panel in Dashboard V2.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main>
      {visibleSections.map(section => (
        <SectionRenderer
          key={section.id}
          section={section}
        />
      ))}
    </main>
  );
}
