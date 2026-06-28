import { useWebsite } from "../../platform";
import type { NavigationItem } from "../../platform";

function inputClass() {
  return "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm";
}

function checkboxClass() {
  return "h-4 w-4 rounded border-border";
}

export default function PlatformNavigationPanel() {
  const { website, setWebsite } = useWebsite();

  function updatePrimaryItem(id: string, patch: Partial<NavigationItem>) {
    setWebsite(current => ({
      ...current,
      navigation: {
        ...current.navigation,
        primary: current.navigation.primary.map(item =>
          item.id === id ? { ...item, ...patch } : item
        ),
      },
      publishing: {
        ...current.publishing,
        updatedAt: new Date().toISOString(),
      },
    }));
  }

  function updateCta(patch: Partial<NavigationItem>) {
    setWebsite(current => ({
      ...current,
      navigation: {
        ...current.navigation,
        cta: {
          id: current.navigation.cta?.id || "nav-cta",
          label: current.navigation.cta?.label || "",
          href: current.navigation.cta?.href || "",
          isVisible: current.navigation.cta?.isVisible ?? true,
          sortOrder: current.navigation.cta?.sortOrder ?? 999,
          ...patch,
        },
      },
      publishing: {
        ...current.publishing,
        updatedAt: new Date().toISOString(),
      },
    }));
  }

  function addPrimaryItem() {
    const nextOrder = website.navigation.primary.length + 1;

    setWebsite(current => ({
      ...current,
      navigation: {
        ...current.navigation,
        primary: [
          ...current.navigation.primary,
          {
            id: `nav-${Date.now()}`,
            label: "New Link",
            href: "/",
            isVisible: true,
            sortOrder: nextOrder,
          },
        ],
      },
      publishing: {
        ...current.publishing,
        updatedAt: new Date().toISOString(),
      },
    }));
  }

  function removePrimaryItem(id: string) {
    setWebsite(current => ({
      ...current,
      navigation: {
        ...current.navigation,
        primary: current.navigation.primary.filter(item => item.id !== id),
      },
      publishing: {
        ...current.publishing,
        updatedAt: new Date().toISOString(),
      },
    }));
  }

  const sortedPrimary = [...website.navigation.primary].sort(
    (a, b) => a.sortOrder - b.sortOrder
  );

  return (
    <div className="p-6">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="mb-2 text-xs uppercase tracking-[0.2em] opacity-60">
            Platform Navigation
          </p>
          <h2 className="text-2xl font-semibold">
            Navigation editor
          </h2>
          <p className="mt-2 max-w-2xl text-sm opacity-70">
            Edit the new WebsiteSchema navigation model. These edits are currently dashboard-state only and do not yet update the public navigation.
          </p>
        </div>

        <button
          type="button"
          onClick={addPrimaryItem}
          className="rounded-lg bg-foreground px-4 py-2 text-sm text-background"
        >
          Add Link
        </button>
      </div>

      <section className="rounded-2xl border border-border p-5">
        <h3 className="mb-5 text-lg font-semibold">Primary Navigation</h3>

        <div className="space-y-4">
          {sortedPrimary.map(item => (
            <div key={item.id} className="rounded-xl border border-border p-4">
              <div className="grid gap-4 md:grid-cols-[1.2fr_1.5fr_0.7fr_0.6fr_auto] md:items-end">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium">Label</span>
                  <input
                    className={inputClass()}
                    value={item.label}
                    onChange={event => updatePrimaryItem(item.id, { label: event.target.value })}
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium">Href</span>
                  <input
                    className={inputClass()}
                    value={item.href}
                    onChange={event => updatePrimaryItem(item.id, { href: event.target.value })}
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium">Sort order</span>
                  <input
                    type="number"
                    className={inputClass()}
                    value={item.sortOrder}
                    onChange={event => updatePrimaryItem(item.id, { sortOrder: Number(event.target.value) })}
                  />
                </label>

                <label className="flex items-center gap-2 pb-2 text-sm">
                  <input
                    type="checkbox"
                    className={checkboxClass()}
                    checked={item.isVisible}
                    onChange={event => updatePrimaryItem(item.id, { isVisible: event.target.checked })}
                  />
                  Visible
                </label>

                <button
                  type="button"
                  onClick={() => removePrimaryItem(item.id)}
                  className="rounded-lg border border-border px-4 py-2 text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-6 rounded-2xl border border-border p-5">
        <h3 className="mb-5 text-lg font-semibold">Header CTA</h3>

        <div className="grid gap-4 md:grid-cols-[1.2fr_1.5fr_0.6fr] md:items-end">
          <label className="block">
            <span className="mb-2 block text-sm font-medium">CTA Label</span>
            <input
              className={inputClass()}
              value={website.navigation.cta?.label || ""}
              onChange={event => updateCta({ label: event.target.value })}
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium">CTA Href</span>
            <input
              className={inputClass()}
              value={website.navigation.cta?.href || ""}
              onChange={event => updateCta({ href: event.target.value })}
            />
          </label>

          <label className="flex items-center gap-2 pb-2 text-sm">
            <input
              type="checkbox"
              className={checkboxClass()}
              checked={website.navigation.cta?.isVisible ?? true}
              onChange={event => updateCta({ isVisible: event.target.checked })}
            />
            Visible
          </label>
        </div>
      </section>
    </div>
  );
}
