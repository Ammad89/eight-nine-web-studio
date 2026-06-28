import { useMemo, useState } from "react";
import { useWebsite } from "../../platform";
import type { PageSection, SectionType } from "../../platform";
import { getDefaultSectionData } from "../../platform";

const sectionTypes: SectionType[] = [
  "hero",
  "text",
  "imageText",
  "gallery",
  "portfolioGrid",
  "servicesGrid",
  "stats",
  "testimonials",
  "faq",
  "pricing",
  "timeline",
  "team",
  "contact",
  "cta",
  "logos",
  "map",
  "blogFeed",
  "featureGrid",
  "comparison",
  "video",
];

function inputClass() {
  return "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm";
}

function selectClass() {
  return "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm";
}

function createSection(type: SectionType, sortOrder: number): PageSection {
  return {
    id: `section-${Date.now()}`,
    type,
    variant: "default",
    visible: true,
    sortOrder,
    data: getDefaultSectionData(type),
  };
}

export default function PlatformSectionsPanel() {
  const { website, setWebsite } = useWebsite();
  const [selectedPageId, setSelectedPageId] = useState(website.pages[0]?.id || "");

  const selectedPage = useMemo(
    () => website.pages.find(page => page.id === selectedPageId) || website.pages[0],
    [selectedPageId, website.pages],
  );

  function updateSelectedPageSections(nextSections: PageSection[]) {
    if (!selectedPage) return;

    setWebsite(current => ({
      ...current,
      pages: current.pages.map(page =>
        page.id === selectedPage.id
          ? {
              ...page,
              sections: nextSections,
            }
          : page
      ),
      publishing: {
        ...current.publishing,
        updatedAt: new Date().toISOString(),
      },
    }));
  }

  function addSection(type: SectionType = "hero") {
    if (!selectedPage) return;

    const nextOrder = selectedPage.sections.length + 1;
    updateSelectedPageSections([
      ...selectedPage.sections,
      createSection(type, nextOrder),
    ]);
  }

  function updateSection(id: string, patch: Partial<PageSection>) {
    if (!selectedPage) return;

    updateSelectedPageSections(
      selectedPage.sections.map(section =>
        section.id === id ? { ...section, ...patch } : section
      ),
    );
  }

  function duplicateSection(section: PageSection) {
    if (!selectedPage) return;

    updateSelectedPageSections([
      ...selectedPage.sections,
      {
        ...section,
        id: `section-${Date.now()}`,
        sortOrder: selectedPage.sections.length + 1,
      },
    ]);
  }

  function deleteSection(id: string) {
    if (!selectedPage) return;

    updateSelectedPageSections(
      selectedPage.sections.filter(section => section.id !== id),
    );
  }

  function moveSection(id: string, direction: "up" | "down") {
    if (!selectedPage) return;

    const sorted = [...selectedPage.sections].sort((a, b) => a.sortOrder - b.sortOrder);
    const index = sorted.findIndex(section => section.id === id);

    if (index < 0) return;

    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= sorted.length) return;

    const next = [...sorted];
    const current = next[index];
    const target = next[targetIndex];

    next[index] = { ...target, sortOrder: current.sortOrder };
    next[targetIndex] = { ...current, sortOrder: target.sortOrder };

    updateSelectedPageSections(next);
  }

  function updateSectionData(id: string, rawJson: string) {
    try {
      const parsed = rawJson.trim() ? JSON.parse(rawJson) : {};
      updateSection(id, { data: parsed });
    } catch {
      alert("Invalid JSON. Please check the section data.");
    }
  }

  const sortedSections = [...(selectedPage?.sections || [])].sort(
    (a, b) => a.sortOrder - b.sortOrder,
  );

  return (
    <div className="p-6">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="mb-2 text-xs uppercase tracking-[0.2em] opacity-60">
            Platform Sections
          </p>
          <h2 className="text-2xl font-semibold">
            Page sections
          </h2>
          <p className="mt-2 max-w-2xl text-sm opacity-70">
            Manage the sections array for each WebsiteSchema page. This is the foundation for the universal page builder.
          </p>
        </div>

        <button
          type="button"
          onClick={() => addSection("hero")}
          className="rounded-lg bg-foreground px-4 py-2 text-sm text-background"
        >
          Add Section
        </button>
      </div>

      <section className="mb-6 rounded-2xl border border-border p-5">
        <label className="block max-w-md">
          <span className="mb-2 block text-sm font-medium">Select page</span>
          <select
            className={selectClass()}
            value={selectedPage?.id || ""}
            onChange={event => setSelectedPageId(event.target.value)}
          >
            {website.pages.map(page => (
              <option key={page.id} value={page.id}>
                {page.title} ({page.slug})
              </option>
            ))}
          </select>
        </label>
      </section>

      {!selectedPage && (
        <div className="rounded-2xl border border-border p-5 text-sm opacity-70">
          No pages found. Create a page first.
        </div>
      )}

      {selectedPage && (
        <div className="space-y-5">
          {sortedSections.length === 0 && (
            <div className="rounded-2xl border border-border p-5 text-sm opacity-70">
              This page has no sections yet.
            </div>
          )}

          {sortedSections.map(section => (
            <section key={section.id} className="rounded-2xl border border-border p-5">
              <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{section.type}</h3>
                  <p className="text-xs opacity-60">{section.id}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => moveSection(section.id, "up")}
                    className="rounded-lg border border-border px-3 py-2 text-sm"
                  >
                    Up
                  </button>

                  <button
                    type="button"
                    onClick={() => moveSection(section.id, "down")}
                    className="rounded-lg border border-border px-3 py-2 text-sm"
                  >
                    Down
                  </button>

                  <button
                    type="button"
                    onClick={() => duplicateSection(section)}
                    className="rounded-lg border border-border px-3 py-2 text-sm"
                  >
                    Duplicate
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteSection(section.id)}
                    className="rounded-lg border border-border px-3 py-2 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-4">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium">Type</span>
                  <select
                    className={selectClass()}
                    value={section.type}
                    onChange={event => {
                      const nextType = event.target.value as SectionType;
                      updateSection(section.id, {
                        type: nextType,
                        data: getDefaultSectionData(nextType),
                      });
                    }}
                  >
                    {sectionTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium">Variant</span>
                  <input
                    className={inputClass()}
                    value={section.variant || ""}
                    onChange={event => updateSection(section.id, { variant: event.target.value })}
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium">Sort order</span>
                  <input
                    type="number"
                    className={inputClass()}
                    value={section.sortOrder}
                    onChange={event => updateSection(section.id, { sortOrder: Number(event.target.value) })}
                  />
                </label>

                <label className="flex items-center gap-2 pt-8 text-sm">
                  <input
                    type="checkbox"
                    checked={section.visible}
                    onChange={event => updateSection(section.id, { visible: event.target.checked })}
                  />
                  Visible
                </label>
              </div>

              <label className="mt-5 block">
                <span className="mb-2 block text-sm font-medium">Section data JSON</span>
                <textarea
                  className={`${inputClass()} min-h-[160px] font-mono text-xs`}
                  defaultValue={JSON.stringify(section.data, null, 2)}
                  onBlur={event => updateSectionData(section.id, event.target.value)}
                />
              </label>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
