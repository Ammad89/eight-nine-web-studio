import { siteDefinition } from "../../site-config/site-definition";

interface PagesPanelProps {
  selectedSlug?: string;
  onSelect?: (slug: string) => void;
}

export default function PagesPanel({
  selectedSlug,
  onSelect,
}: PagesPanelProps) {
  return (
    <div className="p-4">
      <div className="mb-6">
        <h2 className="font-semibold text-lg">Pages</h2>
        <p className="text-sm opacity-70">
          Structured website editor
        </p>
      </div>

      <div className="space-y-2">
        {siteDefinition.pages.map((page) => (
          <button
            key={page.slug}
            type="button"
            onClick={() => onSelect?.(page.slug)}
            className={`w-full text-left rounded-lg px-3 py-2 border ${
              selectedSlug === page.slug
                ? "border-foreground"
                : "border-border"
            }`}
          >
            <div className="font-medium">
              {page.title}
            </div>

            <div className="text-xs opacity-70">
              /{page.slug}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
