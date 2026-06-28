import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { useWebsite } from "../../cms-core/platform";
import { resolveThemeAsset } from "../";

export interface CollectionSectionData {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  collection?: "services" | "portfolio" | "testimonials" | "faqs";
  maxItems?: number;
  featuredOnly?: boolean;
  category?: string;
  layout?: "grid" | "cards" | "quotes";
  ctaLabel?: string;
  ctaHref?: string;
}

function isCollectionSectionData(value: unknown): value is CollectionSectionData {
  return Boolean(value && typeof value === "object");
}

export default function CollectionSectionRenderer({ data }: { data: unknown }) {
  const { website } = useWebsite();

  if (!isCollectionSectionData(data)) return null;

  const collection = data.collection || "services";
  const maxItems = data.maxItems || 6;
  const layout = data.layout || "grid";

  const rawItems = website.collections[collection] || [];

  const items = rawItems
    .filter(item => {
      if (data.featuredOnly && "isFeatured" in item && !item.isFeatured) return false;
      if (data.category && "category" in item && item.category !== data.category) return false;
      if ("isVisible" in item && item.isVisible === false) return false;
      return true;
    })
    .sort((a, b) => {
      const aOrder = "sortOrder" in a ? a.sortOrder || 0 : 0;
      const bOrder = "sortOrder" in b ? b.sortOrder || 0 : 0;
      return aOrder - bOrder;
    })
    .slice(0, maxItems);

  return (
    <section className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 text-center">
          {data.eyebrow && (
            <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.35em] text-muted-foreground">
              {data.eyebrow}
            </p>
          )}

          {data.title && (
            <h2
              className="mb-5 text-3xl font-medium text-foreground sm:text-5xl"
              style={{ fontFamily: "'Lora', Georgia, serif" }}
            >
              {data.title}
            </h2>
          )}

          {data.subtitle && (
            <p className="mx-auto max-w-2xl text-sm leading-7 text-muted-foreground">
              {data.subtitle}
            </p>
          )}
        </div>

        {items.length === 0 && (
          <div className="rounded-2xl border border-border p-8 text-center text-sm text-muted-foreground">
            No items found in this collection.
          </div>
        )}

        {items.length > 0 && collection === "services" && (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {items.map(item => {
              if (!("title" in item)) return null;

              return (
                <Link
                  key={item.id}
                  to={"slug" in item ? item.slug : "#"}
                  className="group rounded-3xl border border-border bg-card p-7 transition-colors duration-500 hover:bg-secondary"
                >
                  <h3
                    className="mb-3 text-xl font-medium text-foreground"
                    style={{ fontFamily: "'Lora', Georgia, serif" }}
                  >
                    {item.title}
                  </h3>
                  {"shortDescription" in item && (
                    <p className="mb-6 text-sm leading-7 text-muted-foreground">
                      {item.shortDescription}
                    </p>
                  )}
                  <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-foreground">
                    View service <ArrowRight size={13} />
                  </span>
                </Link>
              );
            })}
          </div>
        )}

        {items.length > 0 && collection === "portfolio" && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map(item => {
              if (!("image" in item)) return null;

              const imageSrc = item.image.key ? resolveThemeAsset(item.image.key) : item.image.url || "";

              return (
                <div key={item.id} className="group overflow-hidden rounded-3xl bg-muted">
                  <div className="aspect-[4/5] overflow-hidden">
                    {imageSrc && (
                      <img
                        src={imageSrc}
                        alt={item.alt || item.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-[1.05]"
                      />
                    )}
                  </div>
                  <div className="bg-card p-5">
                    <p className="mb-1 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                      {"category" in item ? item.category : "Portfolio"}
                    </p>
                    <h3
                      className="text-lg font-medium text-foreground"
                      style={{ fontFamily: "'Lora', Georgia, serif" }}
                    >
                      {item.title}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {items.length > 0 && collection === "testimonials" && (
          <div className={`grid gap-5 ${layout === "quotes" ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
            {items.map(item => {
              if (!("quote" in item)) return null;

              return (
                <blockquote key={item.id} className="rounded-3xl border border-border bg-card p-7">
                  <p className="mb-6 text-sm leading-7 text-muted-foreground">
                    “{item.quote}”
                  </p>
                  <footer>
                    <p className="font-medium text-foreground">{item.author}</p>
                    {item.role && (
                      <p className="mt-1 text-xs text-muted-foreground">{item.role}</p>
                    )}
                  </footer>
                </blockquote>
              );
            })}
          </div>
        )}

        {items.length > 0 && collection === "faqs" && (
          <div className="mx-auto max-w-3xl divide-y divide-border rounded-3xl border border-border bg-card">
            {items.map(item => {
              if (!("question" in item)) return null;

              return (
                <div key={item.id} className="p-6">
                  <h3 className="mb-2 font-medium text-foreground">{item.question}</h3>
                  <p className="text-sm leading-7 text-muted-foreground">{item.answer}</p>
                </div>
              );
            })}
          </div>
        )}

        {data.ctaLabel && data.ctaHref && (
          <div className="mt-12 text-center">
            <Link
              to={data.ctaHref}
              className="group inline-flex items-center gap-[18px] text-xs font-medium uppercase tracking-[0.12em] text-foreground"
            >
              <span className="group-hover:[order:1]">{data.ctaLabel}</span>
              <span className="group-hover:[order:0] flex items-center">
                <ArrowRight size={14} />
              </span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
