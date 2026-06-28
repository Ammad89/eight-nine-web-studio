import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Link, useParams } from "react-router";
import { loadPublishedCmsContent, isSupabaseConfigured } from "../cms/remoteStorage";
import type { CmsPage } from "../cms/types";
import CmsPageRenderer from "./CmsPageRenderer";
import SEO from "./SEO";
import { getActiveSite } from "../../theme-engine";

function NotFoundPage() {
  return (
    <main className="min-h-screen pt-[72px] bg-background">
      <SEO title={`Page not found | ${site.brand.name}`} description="This page is not available." />
      <div className="max-w-3xl mx-auto px-6 py-24">
        <h1 className="text-4xl font-medium text-foreground mb-4" style={{ fontFamily: "'Lora', Georgia, serif" }}>
          Page not found
        </h1>
        <p className="text-muted-foreground mb-8">This page has not been published yet.</p>
        <Link to="/" className="inline-flex items-center justify-center rounded-full bg-foreground text-background px-6 py-3 text-xs uppercase tracking-[0.12em] font-medium">
          Back home
        </Link>
      </div>
    </main>
  );
}

export function CmsPublicPage({ slug, fallback }: { slug: string; fallback?: ReactNode }) {
  const [page, setPage] = useState<CmsPage | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let active = true;

    if (!isSupabaseConfigured()) {
      setLoaded(true);
      return;
    }

    loadPublishedCmsContent()
      .then(content => {
        if (!active) return;
        setPage(content.pages.find(item => item.slug === slug && item.status === "published") || null);
        setLoaded(true);
      })
      .catch(() => {
        if (!active) return;
        setPage(null);
        setLoaded(true);
      });

    return () => {
      active = false;
    };
  }, [slug]);

  if (page) return <CmsPageRenderer page={page} />;
  if (fallback) return <>{fallback}</>;
  if (!loaded) return <main className="min-h-screen bg-background pt-[72px]" />;

  return <NotFoundPage />;
}

export function CmsDynamicPage() {
  const { slug } = useParams();
  return <CmsPublicPage slug={slug || ""} />;
}
