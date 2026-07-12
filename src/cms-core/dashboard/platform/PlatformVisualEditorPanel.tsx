import { useMemo, useState } from "react";
import {
  getDefaultSectionData,
  setValueAtPath,
  useWebsite,
} from "../../platform";
import type {
  PageSection,
  SectionType,
} from "../../platform";
import PageRenderer from "../../../theme-engine/PageRenderer";

type SectionLibraryCategory =
  | "all"
  | "hero"
  | "content"
  | "collections"
  | "conversion";

type SectionInsertPosition = "end" | "above" | "below";

interface SectionLibraryItem {
  type: SectionType;
  title: string;
  description: string;
  category: Exclude<SectionLibraryCategory, "all">;
  variant: string;
  data?: Record<string, unknown>;
}

const sectionLibrary: SectionLibraryItem[] = [
  {
    type: "hero",
    title: "Hero Centered",
    description: "Centered headline, supporting copy and two calls to action.",
    category: "hero",
    variant: "centered",
    data: {
      align: "center",
    },
  },
  {
    type: "hero",
    title: "Hero Left Aligned",
    description: "A classic editorial hero with content aligned to the left.",
    category: "hero",
    variant: "left",
    data: {
      align: "left",
    },
  },
  {
    type: "hero",
    title: "Hero Image Split",
    description: "Hero content paired with a strong visual treatment.",
    category: "hero",
    variant: "split",
    data: {
      align: "left",
      image: "family-hero",
      imageAlt: "Hero image",
    },
  },
  {
    type: "text",
    title: "Editorial Text",
    description: "Long-form introductions, explanations and supporting copy.",
    category: "content",
    variant: "editorial",
  },
  {
    type: "imageText",
    title: "Image Right",
    description: "Content on the left with an image positioned on the right.",
    category: "content",
    variant: "image-right",
    data: {
      imagePosition: "right",
    },
  },
  {
    type: "imageText",
    title: "Image Left",
    description: "Image on the left with supporting content on the right.",
    category: "content",
    variant: "image-left",
    data: {
      imagePosition: "left",
    },
  },
  {
    type: "servicesGrid",
    title: "Services Grid",
    description: "Display services from the website service collection.",
    category: "collections",
    variant: "grid",
    data: {
      layout: "grid",
    },
  },
  {
    type: "portfolioGrid",
    title: "Portfolio Grid",
    description: "Show selected portfolio entries in a responsive grid.",
    category: "collections",
    variant: "grid",
    data: {
      layout: "grid",
    },
  },
  {
    type: "testimonials",
    title: "Testimonials",
    description: "Display featured client reviews and quotations.",
    category: "collections",
    variant: "quotes",
    data: {
      layout: "quotes",
    },
  },
  {
    type: "faq",
    title: "FAQ Cards",
    description: "Show common questions and answers in a card layout.",
    category: "collections",
    variant: "cards",
    data: {
      layout: "cards",
    },
  },
  {
    type: "cta",
    title: "Dark Call to Action",
    description: "A high-contrast conversion section for enquiries and bookings.",
    category: "conversion",
    variant: "dark",
    data: {
      tone: "dark",
      align: "center",
    },
  },
  {
    type: "cta",
    title: "Light Call to Action",
    description: "A softer conversion section for secondary actions.",
    category: "conversion",
    variant: "light",
    data: {
      tone: "light",
      align: "center",
    },
  },
];

const sectionLibraryCategories: Array<{
  id: SectionLibraryCategory;
  label: string;
}> = [
  { id: "all", label: "All" },
  { id: "hero", label: "Hero" },
  { id: "content", label: "Content" },
  { id: "collections", label: "Collections" },
  { id: "conversion", label: "Conversion" },
];

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
  const [draggedSectionId, setDraggedSectionId] = useState("");
  const [dragOverSectionId, setDragOverSectionId] = useState("");
  const [sectionLibraryOpen, setSectionLibraryOpen] = useState(false);
  const [sectionLibrarySearch, setSectionLibrarySearch] = useState("");
  const [sectionLibraryCategory, setSectionLibraryCategory] =
    useState<SectionLibraryCategory>("all");
  const [sectionInsertPosition, setSectionInsertPosition] =
    useState<SectionInsertPosition>("end");

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

  const orderedSections = useMemo(
    () =>
      [...(selectedPage?.sections || [])].sort(
        (a, b) => a.sortOrder - b.sortOrder,
      ),
    [selectedPage],
  );

  const filteredSectionLibrary = useMemo(() => {
    const query = sectionLibrarySearch.trim().toLowerCase();

    return sectionLibrary.filter(item => {
      const categoryMatches =
        sectionLibraryCategory === "all" ||
        item.category === sectionLibraryCategory;

      const searchMatches =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.type.toLowerCase().includes(query) ||
        item.variant.toLowerCase().includes(query);

      return categoryMatches && searchMatches;
    });
  }, [sectionLibraryCategory, sectionLibrarySearch]);

  function selectSection(section: PageSection) {
    setSelectedSectionId(section.id);
  }

  function updateSectionData(field: string, value: unknown) {
    if (!selectedPage || !selectedSection) return;

    updateSectionDataById(selectedSection.id, field, value);
  }

  function updateSectionDataById(
    sectionId: string,
    field: string,
    value: unknown,
  ) {
    if (!selectedPage) return;

    setWebsite(current => ({
      ...current,
      pages: current.pages.map(page =>
        page.id !== selectedPage.id
          ? page
          : {
              ...page,
              sections: page.sections.map(section =>
                section.id !== sectionId
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

  function updateCollectionItem(
    collection: "services" | "portfolio" | "testimonials" | "faqs",
    itemId: string,
    path: string,
    value: unknown,
  ) {
    setWebsite(current => {
      const nextCollections = structuredClone(
        current.collections,
      );

      const collectionMap =
        nextCollections as unknown as Record<
          string,
          Array<Record<string, unknown>>
        >;

      const items = collectionMap[collection] || [];

      collectionMap[collection] = items.map(item =>
        item.id === itemId
          ? setValueAtPath(item, path, value)
          : item,
      );

      return {
        ...current,
        collections: nextCollections,
        publishing: {
          ...current.publishing,
          updatedAt: new Date().toISOString(),
        },
      };
    });
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

  function addSectionFromLibrary(
    item: SectionLibraryItem,
  ) {
    if (!selectedPage) return;

    const nextId = `section-${item.type}-${Date.now()}`;

    const nextSection: PageSection = {
      id: nextId,
      type: item.type,
      variant: item.variant,
      visible: true,
      sortOrder: 1,
      data: {
        ...getDefaultSectionData(item.type),
        ...(item.data || {}),
      },
    };

    const currentSections = [...selectedPage.sections].sort(
      (a, b) => a.sortOrder - b.sortOrder,
    );

    let insertIndex = currentSections.length;

    if (
      selectedSection &&
      sectionInsertPosition !== "end"
    ) {
      const selectedIndex = currentSections.findIndex(
        section => section.id === selectedSection.id,
      );

      if (selectedIndex >= 0) {
        insertIndex =
          sectionInsertPosition === "above"
            ? selectedIndex
            : selectedIndex + 1;
      }
    }

    const nextSections = [...currentSections];
    nextSections.splice(insertIndex, 0, nextSection);

    const normalizedSections = nextSections.map(
      (section, index) => ({
        ...section,
        sortOrder: index + 1,
      }),
    );

    setWebsite(current => ({
      ...current,
      pages: current.pages.map(page =>
        page.id === selectedPage.id
          ? {
              ...page,
              sections: normalizedSections,
            }
          : page,
      ),
      publishing: {
        ...current.publishing,
        updatedAt: new Date().toISOString(),
      },
    }));

    setSelectedSectionId(nextId);
    setSectionLibraryOpen(false);
    setSectionLibrarySearch("");
    setSectionLibraryCategory("all");
  }

  function reorderSections(
    draggedId: string,
    targetId: string,
  ) {
    if (
      !selectedPage ||
      !draggedId ||
      !targetId ||
      draggedId === targetId
    ) {
      return;
    }

    const currentSections = [...selectedPage.sections].sort(
      (a, b) => a.sortOrder - b.sortOrder,
    );

    const draggedIndex = currentSections.findIndex(
      section => section.id === draggedId,
    );

    const targetIndex = currentSections.findIndex(
      section => section.id === targetId,
    );

    if (draggedIndex < 0 || targetIndex < 0) return;

    const nextSections = [...currentSections];
    const [draggedSection] = nextSections.splice(draggedIndex, 1);

    nextSections.splice(targetIndex, 0, draggedSection);

    const reorderedSections = nextSections.map((section, index) => ({
      ...section,
      sortOrder: index + 1,
    }));

    setWebsite(current => ({
      ...current,
      pages: current.pages.map(page =>
        page.id === selectedPage.id
          ? {
              ...page,
              sections: reorderedSections,
            }
          : page,
      ),
      publishing: {
        ...current.publishing,
        updatedAt: new Date().toISOString(),
      },
    }));

    setSelectedSectionId(draggedId);
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

      <div className="grid min-h-0 flex-1 grid-cols-1 xl:grid-cols-[250px_minmax(0,1fr)_360px]">
        <aside className="overflow-y-auto border-r border-border bg-background">
          <div className="border-b border-border p-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] opacity-50">
              Navigator
            </p>

            <h3 className="mt-2 text-sm font-semibold">
              Pages
            </h3>

            <div className="mt-3 space-y-1">
              {website.pages.map(page => {
                const isActive = page.id === selectedPage.id;

                return (
                  <button
                    key={page.id}
                    type="button"
                    onClick={() => {
                      setSelectedPageId(page.id);
                      setSelectedSectionId("");
                    }}
                    className={`w-full rounded-lg px-3 py-2 text-left transition ${
                      isActive
                        ? "bg-foreground text-background"
                        : "hover:bg-muted"
                    }`}
                  >
                    <span className="block text-sm font-medium">
                      {page.title}
                    </span>

                    <span
                      className={`mt-1 block text-[11px] ${
                        isActive ? "opacity-70" : "opacity-50"
                      }`}
                    >
                      {page.slug}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-4">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-sm font-semibold">
                Sections
              </h3>

              <span className="rounded-full border border-border px-2 py-0.5 text-[10px] opacity-60">
                {orderedSections.length}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setSectionLibraryOpen(true)}
              className="mt-3 w-full rounded-lg bg-foreground px-3 py-2 text-xs font-medium text-background"
            >
              Add Section
            </button>

            {!orderedSections.length ? (
              <p className="mt-4 rounded-lg border border-dashed border-border p-3 text-xs leading-5 opacity-60">
                This page has no sections yet.
              </p>
            ) : (
              <div className="mt-3 space-y-1">
                {orderedSections.map((section, index) => {
                  const isActive = section.id === selectedSectionId;
                  const isHidden = section.visible === false;

                  return (
                    <button
                      key={section.id}
                      type="button"
                      draggable
                      onClick={() => setSelectedSectionId(section.id)}
                      onDragStart={event => {
                        setDraggedSectionId(section.id);
                        setSelectedSectionId(section.id);
                        event.dataTransfer.effectAllowed = "move";
                        event.dataTransfer.setData(
                          "text/plain",
                          section.id,
                        );
                      }}
                      onDragEnter={() => {
                        if (draggedSectionId !== section.id) {
                          setDragOverSectionId(section.id);
                        }
                      }}
                      onDragOver={event => {
                        event.preventDefault();
                        event.dataTransfer.dropEffect = "move";
                      }}
                      onDrop={event => {
                        event.preventDefault();

                        const sourceId =
                          event.dataTransfer.getData("text/plain") ||
                          draggedSectionId;

                        reorderSections(sourceId, section.id);
                        setDraggedSectionId("");
                        setDragOverSectionId("");
                      }}
                      onDragEnd={() => {
                        setDraggedSectionId("");
                        setDragOverSectionId("");
                      }}
                      className={`flex w-full cursor-grab items-center gap-3 rounded-lg border px-3 py-2 text-left transition active:cursor-grabbing ${
                        isActive
                          ? "border-foreground bg-muted"
                          : "border-transparent hover:border-border hover:bg-muted/60"
                      } ${
                        draggedSectionId === section.id
                          ? "opacity-40"
                          : ""
                      } ${
                        dragOverSectionId === section.id &&
                        draggedSectionId !== section.id
                          ? "border-blue-500 bg-blue-50"
                          : ""
                      }`}
                    >
                      <span
                        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-border text-[10px] font-semibold"
                        title="Drag to reorder"
                      >
                        {index + 1}
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-xs font-medium capitalize">
                          {section.type}
                        </span>

                        <span className="mt-0.5 block truncate text-[10px] opacity-50">
                          {section.id}
                        </span>
                      </span>

                      <span
                        className={`h-2 w-2 shrink-0 rounded-full ${
                          isHidden
                            ? "bg-neutral-300"
                            : "bg-green-500"
                        }`}
                        title={isHidden ? "Hidden" : "Visible"}
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </aside>

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
              onUpdateSectionData={updateSectionDataById}
              onUpdateCollectionItem={updateCollectionItem}
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
      {sectionLibraryOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-5"
          onClick={() => setSectionLibraryOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="section-library-title"
            className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-2xl bg-background p-6 shadow-2xl"
            onClick={event => event.stopPropagation()}
          >
            <div className="flex flex-col gap-5 border-b border-border pb-5 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] opacity-50">
                  Section Library
                </p>

                <h2
                  id="section-library-title"
                  className="mt-2 text-2xl font-semibold"
                >
                  Add a section
                </h2>

                <p className="mt-2 text-sm opacity-65">
                  Choose a section for {selectedPage.title}.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSectionLibraryOpen(false)}
                className="self-start rounded-lg border border-border px-3 py-2 text-sm"
              >
                Close
              </button>
            </div>

            <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px]">
              <label className="block">
                <span className="mb-2 block text-xs font-medium uppercase tracking-[0.14em] opacity-60">
                  Search
                </span>

                <input
                  id="section-library-search"
                  name="sectionLibrarySearch"
                  type="search"
                  value={sectionLibrarySearch}
                  onChange={event =>
                    setSectionLibrarySearch(event.target.value)
                  }
                  placeholder="Search sections and variants"
                  className={fieldClass()}
                  autoFocus
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-medium uppercase tracking-[0.14em] opacity-60">
                  Insert position
                </span>

                <select
                  id="section-insert-position"
                  name="sectionInsertPosition"
                  value={sectionInsertPosition}
                  onChange={event =>
                    setSectionInsertPosition(
                      event.target.value as SectionInsertPosition,
                    )
                  }
                  className={fieldClass()}
                >
                  <option value="end">End of page</option>
                  <option
                    value="above"
                    disabled={!selectedSection}
                  >
                    Above selected section
                  </option>
                  <option
                    value="below"
                    disabled={!selectedSection}
                  >
                    Below selected section
                  </option>
                </select>
              </label>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {sectionLibraryCategories.map(category => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() =>
                    setSectionLibraryCategory(category.id)
                  }
                  className={`rounded-full px-4 py-2 text-xs font-medium transition ${
                    sectionLibraryCategory === category.id
                      ? "bg-foreground text-background"
                      : "border border-border hover:bg-muted"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>

            {filteredSectionLibrary.length === 0 ? (
              <div className="mt-8 rounded-xl border border-dashed border-border p-10 text-center">
                <h3 className="text-base font-semibold">
                  No sections found
                </h3>

                <p className="mt-2 text-sm opacity-60">
                  Try a different search term or category.
                </p>
              </div>
            ) : (
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredSectionLibrary.map(item => (
                  <button
                    key={`${item.type}-${item.variant}`}
                    type="button"
                    onClick={() => addSectionFromLibrary(item)}
                    className="group rounded-xl border border-border p-5 text-left transition hover:border-foreground hover:bg-muted"
                  >
                    <div className="mb-5 flex aspect-[16/8] items-center justify-center rounded-lg border border-dashed border-border bg-muted/40">
                      <span className="text-xs font-semibold uppercase tracking-[0.18em] opacity-40">
                        {item.variant}
                      </span>
                    </div>

                    <span className="block text-base font-semibold">
                      {item.title}
                    </span>

                    <span className="mt-2 block text-sm leading-6 opacity-65">
                      {item.description}
                    </span>

                    <div className="mt-5 flex items-center justify-between gap-3">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.18em] opacity-45">
                        {item.category}
                      </span>

                      <span className="text-[10px] font-semibold uppercase tracking-[0.18em] opacity-45 group-hover:opacity-80">
                        Add section
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
