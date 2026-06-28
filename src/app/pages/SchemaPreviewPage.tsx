import { Link, useParams } from "react-router";
import { GenericPageRenderer } from "../../theme-engine";
import { useWebsite } from "../../cms-core/platform";

export default function SchemaPreviewPage() {
  const { pageId } = useParams();
  const { website } = useWebsite();

  const page = website.pages.find(item => item.id === pageId || item.slug.replace(/^\//, "") === pageId);

  if (!page) {
    return (
      <section className="pt-[72px] py-28 bg-background">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-muted-foreground text-[10px] tracking-[0.35em] uppercase mb-4 font-medium">
            Schema Preview
          </p>
          <h1
            className="text-4xl sm:text-5xl font-medium text-foreground mb-5"
            style={{ fontFamily: "'Lora', Georgia, serif" }}
          >
            Page not found
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed mb-8">
            No WebsiteSchema page was found for this preview route.
          </p>
          <Link
            to="/dashboard-v2"
            className="inline-flex items-center rounded-full bg-foreground px-6 py-3 text-xs font-medium uppercase tracking-[0.12em] text-background"
          >
            Return to Dashboard
          </Link>
        </div>
      </section>
    );
  }

  return <GenericPageRenderer page={page} />;
}
