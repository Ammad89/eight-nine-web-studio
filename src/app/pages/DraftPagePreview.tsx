import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { ArrowLeft } from "lucide-react";
import {
  getBackendSetupMessage,
  getDashboardUser,
  isSupabaseConfigured,
  loadDraftCmsContent,
} from "../cms/remoteStorage";
import type { CmsPage } from "../cms/types";
import CmsPageRenderer from "../components/CmsPageRenderer";
import SEO from "../components/SEO";

function PreviewMessage({ title, body }: { title: string; body: string }) {
  return (
    <main className="min-h-screen pt-[72px] bg-background">
      <SEO title={`${title} | EHRay Dashboard`} description={body} />
      <div className="max-w-3xl mx-auto px-6 py-24">
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft size={16} />
          Back to dashboard
        </Link>
        <h1 className="text-4xl font-medium text-foreground mb-4" style={{ fontFamily: "'Lora', Georgia, serif" }}>
          {title}
        </h1>
        <p className="text-muted-foreground">{body}</p>
      </div>
    </main>
  );
}

export default function DraftPagePreview() {
  const { slug } = useParams();
  const [page, setPage] = useState<CmsPage | null>(null);
  const [message, setMessage] = useState("Loading draft preview");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadPreview() {
      if (!isSupabaseConfigured()) {
        setMessage(getBackendSetupMessage());
        setLoaded(true);
        return;
      }

      const user = await getDashboardUser();
      if (!user) {
        setMessage("Sign in to the dashboard before previewing draft pages.");
        setLoaded(true);
        return;
      }

      try {
        const content = await loadDraftCmsContent();
        if (!active) return;
        setPage(content.pages.find(item => item.slug === slug) || null);
        setLoaded(true);
      } catch (error) {
        if (!active) return;
        setMessage(error instanceof Error ? error.message : "Unable to load the draft preview.");
        setLoaded(true);
      }
    }

    void loadPreview();

    return () => {
      active = false;
    };
  }, [slug]);

  if (!loaded) {
    return <PreviewMessage title="Loading draft preview" body="Connecting to the dashboard backend." />;
  }

  if (!page) {
    return <PreviewMessage title="Draft page not found" body={message} />;
  }

  return (
    <>
      <div className="fixed left-4 bottom-4 z-[60]">
        <Link to="/dashboard" className="inline-flex items-center gap-2 rounded-full bg-background/95 border border-border px-4 py-2 text-sm text-foreground shadow-lg backdrop-blur-md">
          <ArrowLeft size={16} />
          Dashboard
        </Link>
      </div>
      <CmsPageRenderer page={page} />
    </>
  );
}
