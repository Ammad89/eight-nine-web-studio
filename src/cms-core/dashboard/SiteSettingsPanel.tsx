import type { CmsNavigationItem, CmsSiteSettings } from "../types";

interface SiteSettingsPanelProps {
  settings: CmsSiteSettings;
  onChange: (settings: CmsSiteSettings) => void;
}

function createNavItem(): CmsNavigationItem {
  return {
    id: `nav-${Date.now()}`,
    label: "New Link",
    href: "/",
    isVisible: true,
    sortOrder: Date.now(),
  };
}

export default function SiteSettingsPanel({
  settings,
  onChange,
}: SiteSettingsPanelProps) {
  function updateNavigationItem(
    id: string,
    updates: Partial<CmsNavigationItem>,
  ) {
    onChange({
      ...settings,
      navigation: settings.navigation.map((item) =>
        item.id === id ? { ...item, ...updates } : item,
      ),
    });
  }

  function addNavigationItem() {
    onChange({
      ...settings,
      navigation: [...settings.navigation, createNavItem()],
    });
  }

  function removeNavigationItem(id: string) {
    onChange({
      ...settings,
      navigation: settings.navigation.filter((item) => item.id !== id),
    });
  }

  return (
    <div className="p-6 space-y-8">
      <div>
        <p className="text-xs uppercase tracking-[0.18em] opacity-60 mb-2">
          Site Settings
        </p>

        <h2 className="text-2xl font-semibold">
          Global Website Settings
        </h2>

        <p className="text-sm opacity-70 mt-2">
          Control logo, navigation, footer, contact details and SEO defaults.
        </p>
      </div>

      <section className="space-y-4">
        <h3 className="font-semibold">
          Branding
        </h3>

        <label className="block">
          <span className="block text-sm mb-2">Logo URL</span>
          <input
            value={settings.logoUrl || ""}
            onChange={(e) =>
              onChange({
                ...settings,
                logoUrl: e.target.value,
              })
            }
            className="w-full rounded-lg border border-border px-3 py-2"
          />
        </label>

        <label className="block">
          <span className="block text-sm mb-2">Logo Alt Text</span>
          <input
            value={settings.logoAlt || ""}
            onChange={(e) =>
              onChange({
                ...settings,
                logoAlt: e.target.value,
              })
            }
            className="w-full rounded-lg border border-border px-3 py-2"
          />
        </label>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">
            Navigation
          </h3>

          <button
            type="button"
            onClick={addNavigationItem}
            className="rounded-lg bg-foreground px-3 py-2 text-sm text-background"
          >
            Add Link
          </button>
        </div>

        <div className="space-y-3">
          {settings.navigation
            .slice()
            .sort((a, b) => a.sortOrder - b.sortOrder)
            .map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-border p-4 space-y-3"
              >
                <div className="grid grid-cols-2 gap-3">
                  <label className="block">
                    <span className="block text-sm mb-2">Label</span>
                    <input
                      value={item.label}
                      onChange={(e) =>
                        updateNavigationItem(item.id, {
                          label: e.target.value,
                        })
                      }
                      className="w-full rounded-lg border border-border px-3 py-2"
                    />
                  </label>

                  <label className="block">
                    <span className="block text-sm mb-2">Link</span>
                    <input
                      value={item.href}
                      onChange={(e) =>
                        updateNavigationItem(item.id, {
                          href: e.target.value,
                        })
                      }
                      className="w-full rounded-lg border border-border px-3 py-2"
                    />
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={item.isVisible}
                      onChange={(e) =>
                        updateNavigationItem(item.id, {
                          isVisible: e.target.checked,
                        })
                      }
                    />
                    Visible
                  </label>

                  <button
                    type="button"
                    onClick={() => removeNavigationItem(item.id)}
                    className="rounded border border-red-300 px-3 py-1 text-sm text-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="font-semibold">
          Contact Information
        </h3>

        <label className="block">
          <span className="block text-sm mb-2">Email</span>
          <input
            value={settings.contact.email || ""}
            onChange={(e) =>
              onChange({
                ...settings,
                contact: {
                  ...settings.contact,
                  email: e.target.value,
                },
              })
            }
            className="w-full rounded-lg border border-border px-3 py-2"
          />
        </label>

        <label className="block">
          <span className="block text-sm mb-2">Phone</span>
          <input
            value={settings.contact.phone || ""}
            onChange={(e) =>
              onChange({
                ...settings,
                contact: {
                  ...settings.contact,
                  phone: e.target.value,
                },
              })
            }
            className="w-full rounded-lg border border-border px-3 py-2"
          />
        </label>

        <label className="block">
          <span className="block text-sm mb-2">WhatsApp</span>
          <input
            value={settings.contact.whatsapp || ""}
            onChange={(e) =>
              onChange({
                ...settings,
                contact: {
                  ...settings.contact,
                  whatsapp: e.target.value,
                },
              })
            }
            className="w-full rounded-lg border border-border px-3 py-2"
          />
        </label>

        <label className="block">
          <span className="block text-sm mb-2">Address</span>
          <textarea
            value={settings.contact.address || ""}
            onChange={(e) =>
              onChange({
                ...settings,
                contact: {
                  ...settings.contact,
                  address: e.target.value,
                },
              })
            }
            className="w-full min-h-24 rounded-lg border border-border px-3 py-2"
          />
        </label>
      </section>

      <section className="space-y-4">
        <h3 className="font-semibold">
          SEO Defaults
        </h3>

        <label className="block">
          <span className="block text-sm mb-2">Default SEO Title</span>
          <input
            value={settings.seo.defaultTitle}
            onChange={(e) =>
              onChange({
                ...settings,
                seo: {
                  ...settings.seo,
                  defaultTitle: e.target.value,
                },
              })
            }
            className="w-full rounded-lg border border-border px-3 py-2"
          />
        </label>

        <label className="block">
          <span className="block text-sm mb-2">Default SEO Description</span>
          <textarea
            value={settings.seo.defaultDescription}
            onChange={(e) =>
              onChange({
                ...settings,
                seo: {
                  ...settings.seo,
                  defaultDescription: e.target.value,
                },
              })
            }
            className="w-full min-h-24 rounded-lg border border-border px-3 py-2"
          />
        </label>
      </section>

      <section className="space-y-4">
        <h3 className="font-semibold">
          Footer
        </h3>

        <label className="block">
          <span className="block text-sm mb-2">Footer Text</span>
          <textarea
            value={settings.footer.text || ""}
            onChange={(e) =>
              onChange({
                ...settings,
                footer: {
                  ...settings.footer,
                  text: e.target.value,
                },
              })
            }
            className="w-full min-h-24 rounded-lg border border-border px-3 py-2"
          />
        </label>

        <label className="block">
          <span className="block text-sm mb-2">Copyright Text</span>
          <input
            value={settings.footer.copyrightText || ""}
            onChange={(e) =>
              onChange({
                ...settings,
                footer: {
                  ...settings.footer,
                  copyrightText: e.target.value,
                },
              })
            }
            className="w-full rounded-lg border border-border px-3 py-2"
          />
        </label>
      </section>
    </div>
  );
}
