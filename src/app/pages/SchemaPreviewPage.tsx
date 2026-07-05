import { useParams } from "react-router";
import { useWebsite } from "../../cms-core/platform";
import PageRenderer from "../../theme-engine/PageRenderer";

export default function SchemaPreviewPage() {
  const { pageId } = useParams();
  const { website } = useWebsite();

  const normalizedPageId = pageId || "home";

  const page = website.pages.find(item =>
    item.id === normalizedPageId ||
    item.slug === normalizedPageId ||
    item.slug === `/${normalizedPageId}`
  );

  if (!page) {
    return (
      <main className="min-h-screen bg-background pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Page Not Found
          </p>
          <h1 className="text-4xl font-semibold text-foreground">
            No schema page found for {normalizedPageId}
          </h1>
        </div>
      </main>
    );
  }

  return <PageRenderer page={page} />;
}
