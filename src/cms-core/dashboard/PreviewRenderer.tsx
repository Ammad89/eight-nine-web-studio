import type { CmsBlock, CmsPage, CmsSiteSettings, CmsTheme } from "../types";
import { defaultSiteSettings, defaultTheme } from "../../site-config/theme";

interface PreviewRendererProps {
  page?: CmsPage;
  theme?: CmsTheme;
  siteSettings?: CmsSiteSettings;
}

function text(value: unknown, fallback = "") {
  return typeof value === "string" && value.trim() ? value : fallback;
}

function number(value: unknown, fallback: number) {
  return typeof value === "number" ? value : fallback;
}

function HeroBlock({ block }: { block: CmsBlock }) {
  const overlayOpacity = number(block.fields.overlayOpacity, 0.45);

  return (
    <section className="relative min-h-[420px] overflow-hidden rounded-2xl bg-slate-900 text-white">
      {text(block.fields.backgroundImage) && (
        <img
          src={text(block.fields.backgroundImage)}
          alt={text(block.fields.imageAlt, "Hero image")}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      <div className="absolute inset-0 bg-black" style={{ opacity: overlayOpacity }} />

      <div className="relative z-10 flex min-h-[420px] items-end p-10">
        <div className="max-w-2xl">
          {text(block.fields.eyebrow) && (
            <p className="mb-4 text-xs uppercase tracking-[0.24em] opacity-70">
              {text(block.fields.eyebrow)}
            </p>
          )}

          <h1 className="mb-5 text-4xl font-semibold leading-tight">
            {text(block.fields.headline, "Hero headline")}
          </h1>

          {text(block.fields.subheadline) && (
            <p className="mb-8 text-lg opacity-80">
              {text(block.fields.subheadline)}
            </p>
          )}

          {text(block.fields.buttonText) && (
            <a
              href={text(block.fields.buttonLink, "#")}
              className="inline-flex rounded-full bg-white px-6 py-3 text-sm font-medium text-black"
            >
              {text(block.fields.buttonText)}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

function TextBlock({ block }: { block: CmsBlock }) {
  return (
    <section
      className="rounded-2xl p-10"
      style={{ backgroundColor: text(block.fields.backgroundColor, "transparent") }}
    >
      {text(block.fields.eyebrow) && (
        <p className="mb-3 text-xs uppercase tracking-[0.24em] opacity-60">
          {text(block.fields.eyebrow)}
        </p>
      )}

      <h2 className="mb-4 text-3xl font-semibold">
        {text(block.fields.heading, "Section heading")}
      </h2>

      <p className="max-w-3xl leading-relaxed opacity-75 whitespace-pre-line">
        {text(block.fields.body, "Section body text")}
      </p>
    </section>
  );
}

function ImageTextBlock({ block }: { block: CmsBlock }) {
  const imagePosition = text(block.fields.imagePosition, "right");

  const image = (
    <div className="overflow-hidden rounded-2xl bg-slate-100">
      {text(block.fields.image) ? (
        <img
          src={text(block.fields.image)}
          alt={text(block.fields.imageAlt, "Section image")}
          className="h-full min-h-[280px] w-full object-cover"
        />
      ) : (
        <div className="grid min-h-[280px] place-items-center text-sm opacity-50">
          Image preview
        </div>
      )}
    </div>
  );

  const copy = (
    <div>
      {text(block.fields.eyebrow) && (
        <p className="mb-3 text-xs uppercase tracking-[0.24em] opacity-60">
          {text(block.fields.eyebrow)}
        </p>
      )}

      <h2 className="mb-4 text-3xl font-semibold">
        {text(block.fields.heading, "Image text heading")}
      </h2>

      <p className="leading-relaxed opacity-75 whitespace-pre-line">
        {text(block.fields.body, "Image text body")}
      </p>
    </div>
  );

  return (
    <section className="grid gap-8 rounded-2xl p-10 md:grid-cols-2">
      {imagePosition === "left" ? (
        <>
          {image}
          {copy}
        </>
      ) : (
        <>
          {copy}
          {image}
        </>
      )}
    </section>
  );
}

function PlaceholderBlock({ block }: { block: CmsBlock }) {
  return (
    <section className="rounded-2xl border border-dashed border-slate-300 p-8">
      <p className="text-xs uppercase tracking-[0.24em] opacity-50">
        {block.type}
      </p>

      <h2 className="mt-2 text-2xl font-semibold">
        {block.label}
      </h2>

      <p className="mt-3 text-sm opacity-60">
        Visual renderer for this block type will be added next.
      </p>
    </section>
  );
}

function renderBlock(block: CmsBlock) {
  if (!block.isVisible) return null;

  if (block.type === "hero") return <HeroBlock key={block.id} block={block} />;
  if (block.type === "text") return <TextBlock key={block.id} block={block} />;
  if (block.type === "imageText") return <ImageTextBlock key={block.id} block={block} />;

  return <PlaceholderBlock key={block.id} block={block} />;
}

export default function PreviewRenderer({
  page,
  theme = defaultTheme,
  siteSettings = defaultSiteSettings,
}: PreviewRendererProps) {
  if (!page) {
    return (
      <div className="p-8 text-sm opacity-70">
        Select a page to preview.
      </div>
    );
  }

  return (
    <div
      className="min-h-full"
      style={{
        backgroundColor: theme.colors.background,
        color: theme.colors.foreground,
        fontFamily: theme.typography.bodyFont,
      }}
    >
      <header className="border-b border-slate-200 bg-white px-6 py-4 text-slate-900">
        <div className="flex items-center justify-between gap-6">
          <div className="font-semibold">
            {siteSettings.logoUrl ? (
              <img
                src={siteSettings.logoUrl}
                alt={siteSettings.logoAlt || "Site logo"}
                className="h-10 w-auto"
              />
            ) : (
              siteSettings.logoAlt || "Site Logo"
            )}
          </div>

          <nav className="flex flex-wrap gap-4 text-sm">
            {siteSettings.navigation
              .filter((item) => item.isVisible)
              .sort((a, b) => a.sortOrder - b.sortOrder)
              .map((item) => (
                <a key={item.id} href={item.href}>
                  {item.label}
                </a>
              ))}
          </nav>
        </div>
      </header>

      <div className="p-6">
        <div className="mb-6 rounded-xl border border-slate-200 bg-white p-4 text-slate-900">
          <p className="text-xs uppercase tracking-[0.2em] opacity-60">
            Preview
          </p>

          <h1 className="mt-1 text-xl font-semibold">
            {page.title}
          </h1>

          <p className="text-sm opacity-60">
            /{page.slug}
          </p>
        </div>

        <div className="space-y-6">
          {page.blocks.map(renderBlock)}
        </div>
      </div>

      <footer className="mt-8 border-t border-slate-200 bg-white px-6 py-6 text-slate-900">
        <p className="text-sm opacity-70">
          {siteSettings.footer.text}
        </p>

        <p className="mt-4 text-xs opacity-50">
          {siteSettings.footer.copyrightText}
        </p>
      </footer>
    </div>
  );
}
