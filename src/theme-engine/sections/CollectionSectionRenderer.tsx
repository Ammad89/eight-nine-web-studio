import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { useWebsite } from "../../cms-core/platform";
import { resolveThemeAsset } from "../";
import EditableText from "./EditableText";

type CollectionName =
  | "services"
  | "portfolio"
  | "testimonials"
  | "faqs";

export interface CollectionSectionData {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  collection?: CollectionName;
  maxItems?: number;
  featuredOnly?: boolean;
  category?: string;
  layout?: "grid" | "cards" | "quotes";
  ctaLabel?: string;
  ctaHref?: string;
}

interface CollectionSectionRendererProps {
  data: unknown;
  editable?: boolean;
  onEditStart?: () => void;
  onUpdateField?: (path: string, value: unknown) => void;
  onUpdateCollectionItem?: (
    collection: CollectionName,
    itemId: string,
    path: string,
    value: unknown,
  ) => void;
}

function isCollectionSectionData(
  value: unknown,
): value is CollectionSectionData {
  return Boolean(value && typeof value === "object");
}

export default function CollectionSectionRenderer({
  data,
  editable = false,
  onEditStart,
  onUpdateField,
  onUpdateCollectionItem,
}: CollectionSectionRendererProps) {
  const { website } = useWebsite();

  if (!isCollectionSectionData(data)) return null;

  const collection = data.collection || "services";
  const maxItems = data.maxItems || 6;
  const layout = data.layout || "grid";

  const rawItems = website.collections[collection] || [];

  const items = rawItems
    .filter(item => {
      if (
        data.featuredOnly &&
        "isFeatured" in item &&
        !item.isFeatured
      ) {
        return false;
      }

      if (
        data.category &&
        "category" in item &&
        item.category !== data.category
      ) {
        return false;
      }

      if ("isVisible" in item && item.isVisible === false) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      const aOrder =
        "sortOrder" in a ? Number(a.sortOrder || 0) : 0;

      const bOrder =
        "sortOrder" in b ? Number(b.sortOrder || 0) : 0;

      return aOrder - bOrder;
    })
    .slice(0, maxItems);

  return (
    <section className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 text-center">
          {(data.eyebrow || editable) && (
            <EditableText
              as="p"
              value={data.eyebrow || "Collection eyebrow"}
              editable={editable}
              onEditStart={onEditStart}
              onCommit={value =>
                onUpdateField?.("eyebrow", value)
              }
              className="mb-4 text-[10px] font-medium uppercase tracking-[0.35em] text-muted-foreground"
            />
          )}

          {(data.title || editable) && (
            <EditableText
              as="h2"
              value={data.title || "Collection title"}
              editable={editable}
              multiline
              onEditStart={onEditStart}
              onCommit={value =>
                onUpdateField?.("title", value)
              }
              className="mb-5 text-3xl font-medium text-foreground sm:text-5xl"
              style={{ fontFamily: "'Lora', Georgia, serif" }}
            />
          )}

          {(data.subtitle || editable) && (
            <EditableText
              as="p"
              value={
                data.subtitle ||
                "Add supporting collection text."
              }
              editable={editable}
              multiline
              onEditStart={onEditStart}
              onCommit={value =>
                onUpdateField?.("subtitle", value)
              }
              className="mx-auto max-w-2xl text-sm leading-7 text-muted-foreground"
            />
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
                  to={
                    editable
                      ? "#"
                      : "slug" in item
                        ? item.slug
                        : "#"
                  }
                  onClickCapture={event => {
                    if (editable) {
                      event.preventDefault();
                    }
                  }}
                  onClick={event => {
                    if (editable) {
                      event.preventDefault();
                      event.stopPropagation();
                      onEditStart?.();
                    }
                  }}
                  className="group rounded-3xl border border-border bg-card p-7 transition-colors duration-500 hover:bg-secondary"
                >
                  <EditableText
                    as="h3"
                    value={String(item.title || "")}
                    editable={editable}
                    multiline
                    onEditStart={onEditStart}
                    onCommit={value =>
                      onUpdateCollectionItem?.(
                        collection,
                        item.id,
                        "title",
                        value,
                      )
                    }
                    className="mb-3 text-xl font-medium text-foreground"
                    style={{
                      fontFamily: "'Lora', Georgia, serif",
                    }}
                  />

                  {"shortDescription" in item && (
                    <EditableText
                      as="p"
                      value={String(item.shortDescription || "")}
                      editable={editable}
                      multiline
                      onEditStart={onEditStart}
                      onCommit={value =>
                        onUpdateCollectionItem?.(
                          collection,
                          item.id,
                          "shortDescription",
                          value,
                        )
                      }
                      className="mb-6 text-sm leading-7 text-muted-foreground"
                    />
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

              const imageSrc = item.image.key
                ? resolveThemeAsset(item.image.key)
                : item.image.url || "";

              return (
                <div
                  key={item.id}
                  className="group overflow-hidden rounded-3xl bg-muted"
                >
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
                    {"category" in item && (
                      <EditableText
                        as="p"
                        value={String(
                          item.category || "Portfolio",
                        )}
                        editable={editable}
                        onEditStart={onEditStart}
                        onCommit={value =>
                          onUpdateCollectionItem?.(
                            collection,
                            item.id,
                            "category",
                            value,
                          )
                        }
                        className="mb-1 text-[10px] uppercase tracking-[0.25em] text-muted-foreground"
                      />
                    )}

                    <EditableText
                      as="h3"
                      value={String(item.title || "")}
                      editable={editable}
                      multiline
                      onEditStart={onEditStart}
                      onCommit={value =>
                        onUpdateCollectionItem?.(
                          collection,
                          item.id,
                          "title",
                          value,
                        )
                      }
                      className="text-lg font-medium text-foreground"
                      style={{
                        fontFamily: "'Lora', Georgia, serif",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {items.length > 0 &&
          collection === "testimonials" && (
            <div
              className={`grid gap-5 ${
                layout === "quotes"
                  ? "md:grid-cols-2"
                  : "md:grid-cols-3"
              }`}
            >
              {items.map(item => {
                if (!("quote" in item)) return null;

                return (
                  <blockquote
                    key={item.id}
                    className="rounded-3xl border border-border bg-card p-7"
                  >
                    <EditableText
                      as="p"
                      value={String(item.quote || "")}
                      editable={editable}
                      multiline
                      onEditStart={onEditStart}
                      onCommit={value =>
                        onUpdateCollectionItem?.(
                          collection,
                          item.id,
                          "quote",
                          value,
                        )
                      }
                      className="mb-6 text-sm leading-7 text-muted-foreground"
                    />

                    <footer>
                      <EditableText
                        as="p"
                        value={String(item.author || "")}
                        editable={editable}
                        onEditStart={onEditStart}
                        onCommit={value =>
                          onUpdateCollectionItem?.(
                            collection,
                            item.id,
                            "author",
                            value,
                          )
                        }
                        className="font-medium text-foreground"
                      />

                      {item.role && (
                        <EditableText
                          as="p"
                          value={String(item.role)}
                          editable={editable}
                          onEditStart={onEditStart}
                          onCommit={value =>
                            onUpdateCollectionItem?.(
                              collection,
                              item.id,
                              "role",
                              value,
                            )
                          }
                          className="mt-1 text-xs text-muted-foreground"
                        />
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
                  <EditableText
                    as="h3"
                    value={String(item.question || "")}
                    editable={editable}
                    multiline
                    onEditStart={onEditStart}
                    onCommit={value =>
                      onUpdateCollectionItem?.(
                        collection,
                        item.id,
                        "question",
                        value,
                      )
                    }
                    className="mb-2 font-medium text-foreground"
                  />

                  <EditableText
                    as="p"
                    value={String(item.answer || "")}
                    editable={editable}
                    multiline
                    onEditStart={onEditStart}
                    onCommit={value =>
                      onUpdateCollectionItem?.(
                        collection,
                        item.id,
                        "answer",
                        value,
                      )
                    }
                    className="text-sm leading-7 text-muted-foreground"
                  />
                </div>
              );
            })}
          </div>
        )}

        {data.ctaLabel && data.ctaHref && (
          <div className="mt-12 text-center">
            <Link
              to={editable ? "#" : data.ctaHref}
              onClick={event => {
                if (editable) event.preventDefault();
              }}
              className="group inline-flex items-center gap-[18px] text-xs font-medium uppercase tracking-[0.12em] text-foreground"
            >
              <EditableText
                as="span"
                value={data.ctaLabel}
                editable={editable}
                onEditStart={onEditStart}
                onCommit={value =>
                  onUpdateField?.("ctaLabel", value)
                }
                className="group-hover:[order:1]"
              />

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
