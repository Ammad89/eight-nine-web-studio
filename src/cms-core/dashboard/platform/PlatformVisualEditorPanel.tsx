import { useMemo, useState } from "react";
import { useWebsite } from "../../platform";
import type { PageSection } from "../../platform";
import PageRenderer from "../../../theme-engine/PageRenderer";

function fieldClass() {
  return "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm";
}

function toLabel(value: string) {
  return value
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, character => character.toUpperCase());
}

export default function PlatformVisualEditorPanel() {
  const { website, setWebsite } = useWebsite();

  const firstPageId = website.pages[0]?.id || "";
  const [selectedPageId, setSelectedPageId] = useState(firstPageId);
  const [selectedSectionId, setSelectedSectionId] = useState("");

  const selectedPage = useMemo(
    () =>
      website.pages.find(page => page.id === selectedPageId) ||
      website.pages[0],
    [website.pages, selectedPageId],
  );

  const selectedSection = useMemo(
    () =>
      selectedPage?.sections.find(
        section => section.id === selectedSectionId,
      ),
    [selectedPage, selectedSectionId],
  );

  function selectSection(section: PageSection) {
    setSelectedSectionId(section.id);
  }

  function updateSectionData(field: string, value: unknown) {
    if (!selectedPage || !selectedSection) return;

    setWebsite(current => ({
      ...current,
      pages: current.pages.map(page =>
        page.id !== selectedPage.id
          ? page
          : {
              ...page,
              sections: page.sections.map(section =>
                section.id !== selectedSection.id
                  ? section
                  : {
                      ...section,
                      data: {
                        ...section.data,
                        [field]: value,
                      },
                    },
              ),
            },
      ),
      publishing: {
        ...current.publishing,
        updatedAt: new Date().toISOString(),
      },
    }));
  }

  function updateSection(
    patch: Partial<Pick<PageSection, "visible" | "sortOrder" | "variant">>,
  ) {
    if (!selectedPage || !selectedSection) return;

    setWebsite(current => ({
      ...current,
      pages: current.pages.map(page =>
        page.id !== selectedPage.id
          ? page
          : {
              ...page,
              sections: page.sections.map(section =>
                section.id === selectedSection.id
                  ? { ...section, ...patch }
                  : section,
              ),
            },
      ),
      publishing: {
        ...current.publishing,
        updatedAt: new Date().toISOString(),
      },
    }));
  }

  function moveSelectedSection(direction: "up" | "down") {
    if (!selectedPage || !selectedSection) return;

    const orderedSections = [...selectedPage.sections].sort(
      (a, b) => a.sortOrder - b.sortOrder,
    );

    const currentIndex = orderedSections.findIndex(
      section => section.id === selectedSection.id,
    );

    const targetIndex =
      direction === "up" ? currentIndex - 1 : currentIndex + 1;

    if (
      currentIndex < 0 ||
      targetIndex < 0 ||
      targetIndex >= orderedSections.length
    ) {
      return;
    }

    const targetSection = orderedSections[targetIndex];

    setWebsite(current => ({
      ...current,
      pages: current.pages.map(page => {
        if (page.id !== selectedPage.id) return page;

        return {
          ...page,
          sections: page.sections.map(section => {
            if (section.id === selectedSection.id) {
              return {
                ...section,
                sortOrder: targetSection.sortOrder,
              };
            }

            if (section.id === targetSection.id) {
              return {
                ...section,
                sortOrder: selectedSection.sortOrder,
              };
            }

            return section;
          }),
        };
      }),
      publishing: {
        ...current.publishing,
        updatedAt: new Date().toISOString(),
      },
    }));
  }

  function duplicateSelectedSection() {
    if (!selectedPage || !selectedSection) return;

    const duplicateId = `${selectedSection.id}-copy-${Date.now()}`;
    const duplicateSortOrder = selectedSection.sortOrder + 1;

    setWebsite(current => ({
      ...current,
      pages: current.pages.map(page => {
        if (page.id !== selectedPage.id) return page;

        const shiftedSections = page.sections.map(section =>
          section.sortOrder >= duplicateSortOrder
            ? {
                ...section,
                sortOrder: section.sortOrder + 1,
              }
            : section,
        );

        const duplicate: PageSection = {
          ...selectedSection,
          id: duplicateId,
          sortOrder: duplicateSortOrder,
          data: {
            ...selectedSection.data,
          },
        };

        return {
          ...page,
          sections: [...shiftedSections, duplicate],
        };
      }),
      publishing: {
        ...current.publishing,
        updatedAt: new Date().toISOString(),
      },
    }));

    setSelectedSectionId(duplicateId);
  }

  function deleteSelectedSection() {
    if (!selectedPage || !selectedSection) return;

    const confirmed = window.confirm(
      `Delete the ${selectedSection.type} section? This cannot be undone unless you restore a saved version.`,
    );

    if (!confirmed) return;

    setWebsite(current => ({
      ...current,
      pages: current.pages.map(page => {
        if (page.id !== selectedPage.id) return page;

        const remainingSections = page.sections
          .filter(section => section.id !== selectedSection.id)
          .sort((a, b) => a.sortOrder - b.sortOrder)
          .map((section, index) => ({
            ...section,
            sortOrder: index + 1,
          }));

        return {
          ...page,
          sections: remainingSections,
        };
      }),
      publishing: {
        ...current.publishing,
        updatedAt: new Date().toISOString(),
      },
    }));

    setSelectedSectionId("");
  }

  function renderField(field: string, value: unknown) {
    if (typeof value === "boolean") {
      return (
        <label key={field} className="flex items-center justify-between gap-4">
          <span className="text-sm font-medium">{toLabel(field)}</span>
          <input
            id={`section-field-${field}`}
            name={field}
            type="checkbox"
            checked={value}
            onChange={event =>
              updateSectionData(field, event.target.checked)
            }
            className="h-4 w-4"
          />
        </label>
      );
    }

    if (typeof value === "number") {
      return (
        <label key={field} className="block">
          <span className="mb-2 block text-sm font-medium">
            {toLabel(field)}
          </span>
          <input
            id={`section-field-${field}`}
            name={field}
            type="number"
            value={value}
            onChange={event =>
              updateSectionData(field, Number(event.target.value))
            }
            className={fieldClass()}
          />
        </label>
      );
    }

    if (typeof value === "string") {
      const isLongText =
        value.length > 80 ||
        field.toLowerCase().includes("content") ||
        field.toLowerCase().includes("description") ||
        field.toLowerCase().includes("subtitle");

      return (
        <label key={field} className="block">
          <span className="mb-2 block text-sm font-medium">
            {toLabel(field)}
          </span>

          {isLongText ? (
            <textarea
              id={`section-field-${field}`}
              name={field}
              rows={5}
              value={value}
              onChange={event =>
                updateSectionData(field, event.target.value)
              }
              className={fieldClass()}
            />
          ) : (
            <input
              id={`section-field-${field}`}
              name={field}
              type="text"
              value={value}
              onChange={event =>
                updateSectionData(field, event.target.value)
              }
              className={fieldClass()}
            />
          )}
        </label>
      );
    }

    return (
      <div key={field}>
        <p className="mb-2 text-sm font-medium">{toLabel(field)}</p>
        <p className="rounded-lg border border-dashed border-border p-3 text-xs opacity-60">
          Complex field editing will be added in a later Build 71 step.
        </p>
      </div>
    );
  }

  if (!selectedPage) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-semibold">Visual Editor</h2>
        <p className="mt-2 text-sm opacity-70">
          Create a page before opening the visual editor.
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-145px)] flex-col">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] opacity-60">
            Build 71
          </p>
          <h2 className="mt-1 text-lg font-semibold">Visual Editor</h2>
        </div>

        <select
          id="visual-editor-page"
          name="visualEditorPage"
          aria-label="Select page to edit"
          value={selectedPage.id}
          onChange={event => {
            setSelectedPageId(event.target.value);
            setSelectedSectionId("");
          }}
          className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
        >
          {website.pages.map(page => (
            <option key={page.id} value={page.id}>
              {page.title}
            </option>
          ))}
        </select>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-1 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div
          className="overflow-auto bg-neutral-100 p-5"
          onClick={() => setSelectedSectionId("")}
        >
          <div className="mx-auto min-h-[700px] max-w-[1200px] overflow-hidden rounded-xl bg-white shadow">
            <PageRenderer
              page={selectedPage}
              editorMode
              selectedSectionId={selectedSectionId}
              onSelectSection={selectSection}
            />
          </div>
        </div>

        <aside className="overflow-y-auto border-l border-border bg-background">
          {!selectedSection ? (
            <div className="p-6">
              <p className="text-xs uppercase tracking-[0.2em] opacity-60">
                Inspector
              </p>
              <h3 className="mt-2 text-lg font-semibold">
                Select a section
              </h3>
              <p className="mt-3 text-sm leading-6 opacity-70">
                Click any visible section in the preview to edit its content.
              </p>
            </div>
          ) : (
            <div className="p-6">
              <p className="text-xs uppercase tracking-[0.2em] opacity-60">
                Section Inspector
              </p>

              <div className="mt-2 flex items-center justify-between gap-3">
                <h3 className="text-lg font-semibold capitalize">
                  {selectedSection.type}
                </h3>

                <span className="rounded-full border border-border px-2 py-1 text-[10px] uppercase tracking-[0.15em]">
                  {selectedSection.id}
                </span>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => moveSelectedSection("up")}
                  className="rounded-lg border border-border px-3 py-2 text-xs font-medium hover:bg-muted"
                >
                  Move Up
                </button>

                <button
                  type="button"
                  onClick={() => moveSelectedSection("down")}
                  className="rounded-lg border border-border px-3 py-2 text-xs font-medium hover:bg-muted"
                >
                  Move Down
                </button>

                <button
                  type="button"
                  onClick={duplicateSelectedSection}
                  className="rounded-lg border border-border px-3 py-2 text-xs font-medium hover:bg-muted"
                >
                  Duplicate
                </button>

                <button
                  type="button"
                  onClick={() =>
                    updateSection({
                      visible: selectedSection.visible === false,
                    })
                  }
                  className="rounded-lg border border-border px-3 py-2 text-xs font-medium hover:bg-muted"
                >
                  {selectedSection.visible === false ? "Show" : "Hide"}
                </button>

                <button
                  type="button"
                  onClick={deleteSelectedSection}
                  className="col-span-2 rounded-lg border border-red-300 px-3 py-2 text-xs font-medium text-red-700 hover:bg-red-50"
                >
                  Delete Section
                </button>
              </div>

              <div className="mt-6 space-y-5">
                <label className="flex items-center justify-between gap-4">
                  <span className="text-sm font-medium">Visible</span>
                  <input
                    id="section-visible"
                    name="sectionVisible"
                    type="checkbox"
                    checked={selectedSection.visible !== false}
                    onChange={event =>
                      updateSection({ visible: event.target.checked })
                    }
                    className="h-4 w-4"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium">
                    Sort Order
                  </span>
                  <input
                    id="section-sort-order"
                    name="sectionSortOrder"
                    type="number"
                    value={selectedSection.sortOrder}
                    onChange={event =>
                      updateSection({
                        sortOrder: Number(event.target.value),
                      })
                    }
                    className={fieldClass()}
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium">
                    Variant
                  </span>
                  <input
                    id="section-variant"
                    name="sectionVariant"
                    type="text"
                    value={selectedSection.variant || ""}
                    onChange={event =>
                      updateSection({ variant: event.target.value })
                    }
                    className={fieldClass()}
                    placeholder="default"
                  />
                </label>

                <div className="border-t border-border pt-5">
                  <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] opacity-60">
                    Content
                  </p>

                  <div className="space-y-5">
                    {Object.entries(selectedSection.data).map(
                      ([field, value]) => renderField(field, value),
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
