import { useWebsite } from "../../platform";
import type { PageDefinition, PageStatus, PageType } from "../../platform";

const pageTypes: PageType[] = [
  "home",
  "about",
  "contact",
  "portfolio",
  "service",
  "blogIndex",
  "blogPost",
  "team",
  "location",
  "legal",
  "custom",
];

const pageStatuses: PageStatus[] = ["draft", "published", "archived"];

function inputClass() {
  return "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm";
}

function selectClass() {
  return "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm";
}

function createPage(): PageDefinition {
  const timestamp = Date.now();

  return {
    id: `page-${timestamp}`,
    slug: `/new-page-${timestamp}`,
    type: "custom",
    title: "New Page",
    status: "draft",
    seo: {
      title: "New Page",
      description: "Describe this page.",
      keywords: "",
    },
    sections: [],
  };
}

export default function PlatformPagesPanel() {
  const { website, setWebsite } = useWebsite();

  function updatePage(id: string, patch: Partial<PageDefinition>) {
    setWebsite(current => ({
      ...current,
      pages: current.pages.map(page =>
        page.id === id ? { ...page, ...patch } : page
      ),
      publishing: {
        ...current.publishing,
        updatedAt: new Date().toISOString(),
      },
    }));
  }

  function updatePageSeo(
    id: string,
    field: "title" | "description" | "keywords" | "canonical",
    value: string
  ) {
    setWebsite(current => ({
      ...current,
      pages: current.pages.map(page =>
        page.id === id
          ? {
              ...page,
              seo: {
                ...page.seo,
                [field]: value,
              },
            }
          : page
      ),
      publishing: {
        ...current.publishing,
        updatedAt: new Date().toISOString(),
      },
    }));
  }

  function addPage() {
    setWebsite(current => ({
      ...current,
      pages: [...current.pages, createPage()],
      publishing: {
        ...current.publishing,
        updatedAt: new Date().toISOString(),
      },
    }));
  }

  function duplicatePage(page: PageDefinition) {
    const timestamp = Date.now();

    setWebsite(current => ({
      ...current,
      pages: [
        ...current.pages,
        {
          ...page,
          id: `page-${timestamp}`,
          slug: `${page.slug}-copy-${timestamp}`,
          title: `${page.title} Copy`,
          status: "draft",
        },
      ],
      publishing: {
        ...current.publishing,
        updatedAt: new Date().toISOString(),
      },
    }));
  }

  function removePage(id: string) {
    setWebsite(current => ({
      ...current,
      pages: current.pages.filter(page => page.id !== id),
      publishing: {
        ...current.publishing,
        updatedAt: new Date().toISOString(),
      },
    }));
  }

  return (
    <div className="p-6">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="mb-2 text-xs uppercase tracking-[0.2em] opacity-60">
            Platform Pages
          </p>
          <h2 className="text-2xl font-semibold">
            Website pages
          </h2>
          <p className="mt-2 max-w-2xl text-sm opacity-70">
            Manage pages inside the new WebsiteSchema. These pages are not yet rendered by a universal page renderer, but they are persisted and publishable.
          </p>
        </div>

        <button
          type="button"
          onClick={addPage}
          className="rounded-lg bg-foreground px-4 py-2 text-sm text-background"
        >
          Add Page
        </button>
      </div>

      <div className="space-y-5">
        {website.pages.map(page => (
          <section key={page.id} className="rounded-2xl border border-border p-5">
            <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-lg font-semibold">{page.title}</h3>
                <p className="text-xs opacity-60">{page.id}</p>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => duplicatePage(page)}
                  className="rounded-lg border border-border px-3 py-2 text-sm"
                >
                  Duplicate
                </button>

                <button
                  type="button"
                  onClick={() => removePage(page.id)}
                  className="rounded-lg border border-border px-3 py-2 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
              <label className="block">
                <span className="mb-2 block text-sm font-medium">Title</span>
                <input
                  className={inputClass()}
                  value={page.title}
                  onChange={event => updatePage(page.id, { title: event.target.value })}
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium">Slug</span>
                <input
                  className={inputClass()}
                  value={page.slug}
                  onChange={event => updatePage(page.id, { slug: event.target.value })}
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium">Type</span>
                <select
                  className={selectClass()}
                  value={page.type}
                  onChange={event => updatePage(page.id, { type: event.target.value as PageType })}
                >
                  {pageTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium">Status</span>
                <select
                  className={selectClass()}
                  value={page.status}
                  onChange={event => updatePage(page.id, { status: event.target.value as PageStatus })}
                >
                  {pageStatuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </label>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-medium">SEO title</span>
                <input
                  className={inputClass()}
                  value={page.seo.title}
                  onChange={event => updatePageSeo(page.id, "title", event.target.value)}
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium">SEO keywords</span>
                <input
                  className={inputClass()}
                  value={page.seo.keywords || ""}
                  onChange={event => updatePageSeo(page.id, "keywords", event.target.value)}
                />
              </label>

              <label className="block md:col-span-2">
                <span className="mb-2 block text-sm font-medium">SEO description</span>
                <textarea
                  className={`${inputClass()} min-h-[90px]`}
                  value={page.seo.description}
                  onChange={event => updatePageSeo(page.id, "description", event.target.value)}
                />
              </label>

              <label className="block md:col-span-2">
                <span className="mb-2 block text-sm font-medium">Canonical URL</span>
                <input
                  className={inputClass()}
                  value={page.seo.canonical || ""}
                  onChange={event => updatePageSeo(page.id, "canonical", event.target.value)}
                />
              </label>
            </div>

            <div className="mt-5 rounded-xl bg-muted/30 p-4 text-sm opacity-70">
              Sections: {page.sections.length}. Section editing will be added in a later build.
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
