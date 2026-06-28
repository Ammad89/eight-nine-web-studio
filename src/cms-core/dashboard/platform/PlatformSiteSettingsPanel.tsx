import { useWebsite } from "../../platform";

function inputClass() {
  return "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm";
}

export default function PlatformSiteSettingsPanel() {
  const { website, setWebsite } = useWebsite();

  function updateSiteField(field: "name" | "businessName" | "ownerName" | "tagline", value: string) {
    setWebsite(current => ({
      ...current,
      site: {
        ...current.site,
        [field]: value,
      },
      publishing: {
        ...current.publishing,
        updatedAt: new Date().toISOString(),
      },
    }));
  }

  function updateDomainField(field: "primary" | "canonicalUrl", value: string) {
    setWebsite(current => ({
      ...current,
      site: {
        ...current.site,
        domain: {
          ...current.site.domain,
          [field]: value,
        },
      },
      publishing: {
        ...current.publishing,
        updatedAt: new Date().toISOString(),
      },
    }));
  }

  function updateContactField(
    field: "email" | "phone" | "phoneDisplay" | "whatsapp" | "address",
    value: string
  ) {
    setWebsite(current => ({
      ...current,
      site: {
        ...current.site,
        contact: {
          ...current.site.contact,
          [field]: value,
        },
      },
      publishing: {
        ...current.publishing,
        updatedAt: new Date().toISOString(),
      },
    }));
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <p className="mb-2 text-xs uppercase tracking-[0.2em] opacity-60">
          Platform Site Settings
        </p>
        <h2 className="text-2xl font-semibold">
          Site identity and contact details
        </h2>
        <p className="mt-2 max-w-2xl text-sm opacity-70">
          This panel edits the new universal WebsiteSchema through WebsiteProvider. These edits are local to the dashboard state for now and do not yet update the public website.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-border p-5">
          <h3 className="mb-5 text-lg font-semibold">Identity</h3>

          <div className="space-y-4">
            <label className="block">
              <span className="mb-2 block text-sm font-medium">Site name</span>
              <input
                className={inputClass()}
                value={website.site.name}
                onChange={event => updateSiteField("name", event.target.value)}
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium">Business name</span>
              <input
                className={inputClass()}
                value={website.site.businessName}
                onChange={event => updateSiteField("businessName", event.target.value)}
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium">Owner name</span>
              <input
                className={inputClass()}
                value={website.site.ownerName || ""}
                onChange={event => updateSiteField("ownerName", event.target.value)}
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium">Tagline</span>
              <input
                className={inputClass()}
                value={website.site.tagline || ""}
                onChange={event => updateSiteField("tagline", event.target.value)}
              />
            </label>
          </div>
        </section>

        <section className="rounded-2xl border border-border p-5">
          <h3 className="mb-5 text-lg font-semibold">Domain</h3>

          <div className="space-y-4">
            <label className="block">
              <span className="mb-2 block text-sm font-medium">Primary domain</span>
              <input
                className={inputClass()}
                value={website.site.domain.primary}
                onChange={event => updateDomainField("primary", event.target.value)}
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium">Canonical URL</span>
              <input
                className={inputClass()}
                value={website.site.domain.canonicalUrl}
                onChange={event => updateDomainField("canonicalUrl", event.target.value)}
              />
            </label>
          </div>
        </section>

        <section className="rounded-2xl border border-border p-5 lg:col-span-2">
          <h3 className="mb-5 text-lg font-semibold">Contact</h3>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-medium">Email</span>
              <input
                className={inputClass()}
                value={website.site.contact.email || ""}
                onChange={event => updateContactField("email", event.target.value)}
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium">Phone</span>
              <input
                className={inputClass()}
                value={website.site.contact.phone || ""}
                onChange={event => updateContactField("phone", event.target.value)}
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium">Phone display</span>
              <input
                className={inputClass()}
                value={website.site.contact.phoneDisplay || ""}
                onChange={event => updateContactField("phoneDisplay", event.target.value)}
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium">WhatsApp</span>
              <input
                className={inputClass()}
                value={website.site.contact.whatsapp || ""}
                onChange={event => updateContactField("whatsapp", event.target.value)}
              />
            </label>

            <label className="block md:col-span-2">
              <span className="mb-2 block text-sm font-medium">Address</span>
              <input
                className={inputClass()}
                value={website.site.contact.address || ""}
                onChange={event => updateContactField("address", event.target.value)}
              />
            </label>
          </div>
        </section>
      </div>
    </div>
  );
}
