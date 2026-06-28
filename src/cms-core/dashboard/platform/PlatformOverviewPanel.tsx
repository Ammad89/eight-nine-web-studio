import { useWebsite } from "../../platform";

export default function PlatformOverviewPanel() {
  const { website } = useWebsite();

  const publishedPages = website.pages.filter(page => page.status === "published").length;
  const visibleServices = website.collections.services.filter(service => service.isVisible).length;
  const featuredPortfolio = website.collections.portfolio.filter(item => item.isFeatured).length;
  const featuredTestimonials = website.collections.testimonials.filter(item => item.isFeatured).length;

  return (
    <div className="p-6">
      <div className="mb-8">
        <p className="mb-2 text-xs uppercase tracking-[0.2em] opacity-60">
          Platform Overview
        </p>
        <h2 className="text-2xl font-semibold">
          {website.site.businessName}
        </h2>
        <p className="mt-2 max-w-2xl text-sm opacity-70">
          This panel reads from the new universal WebsiteSchema through WebsiteProvider. It is read-only for now and does not replace the existing CMS editor yet.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-border p-5">
          <p className="text-xs uppercase tracking-[0.18em] opacity-60">Pages</p>
          <p className="mt-3 text-3xl font-semibold">{website.pages.length}</p>
          <p className="mt-1 text-xs opacity-60">{publishedPages} published</p>
        </div>

        <div className="rounded-2xl border border-border p-5">
          <p className="text-xs uppercase tracking-[0.18em] opacity-60">Services</p>
          <p className="mt-3 text-3xl font-semibold">{website.collections.services.length}</p>
          <p className="mt-1 text-xs opacity-60">{visibleServices} visible</p>
        </div>

        <div className="rounded-2xl border border-border p-5">
          <p className="text-xs uppercase tracking-[0.18em] opacity-60">Portfolio</p>
          <p className="mt-3 text-3xl font-semibold">{website.collections.portfolio.length}</p>
          <p className="mt-1 text-xs opacity-60">{featuredPortfolio} featured</p>
        </div>

        <div className="rounded-2xl border border-border p-5">
          <p className="text-xs uppercase tracking-[0.18em] opacity-60">Testimonials</p>
          <p className="mt-3 text-3xl font-semibold">{website.collections.testimonials.length}</p>
          <p className="mt-1 text-xs opacity-60">{featuredTestimonials} featured</p>
        </div>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-border p-5">
          <h3 className="mb-4 text-lg font-semibold">Site Settings</h3>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="opacity-60">Site name</dt>
              <dd className="text-right">{website.site.name}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="opacity-60">Owner</dt>
              <dd className="text-right">{website.site.ownerName || "Not set"}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="opacity-60">Domain</dt>
              <dd className="text-right">{website.site.domain.primary}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="opacity-60">Email</dt>
              <dd className="text-right">{website.site.contact.email || "Not set"}</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-2xl border border-border p-5">
          <h3 className="mb-4 text-lg font-semibold">Theme</h3>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="opacity-60">Theme</dt>
              <dd className="text-right">{website.theme.name}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="opacity-60">Industry</dt>
              <dd className="text-right">{website.theme.industry || "Not set"}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="opacity-60">Variant</dt>
              <dd className="text-right">{website.theme.variant || "Not set"}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="opacity-60">Schema version</dt>
              <dd className="text-right">v{website.publishing.version}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-border p-5">
        <h3 className="mb-4 text-lg font-semibold">Published Pages</h3>
        <div className="overflow-hidden rounded-xl border border-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/40">
              <tr>
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Slug</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {website.pages.map(page => (
                <tr key={page.id} className="border-t border-border">
                  <td className="px-4 py-3">{page.title}</td>
                  <td className="px-4 py-3">{page.type}</td>
                  <td className="px-4 py-3">{page.slug}</td>
                  <td className="px-4 py-3">{page.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
