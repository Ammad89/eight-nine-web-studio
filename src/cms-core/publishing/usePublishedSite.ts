import { useEffect, useState } from "react";
import { getBackendSetupMessage, getSupabaseClient } from "../../app/cms/remoteStorage";
import type { CmsPage, CmsSiteSettings, CmsTheme } from "../types";

export interface PublishedSiteSnapshot {
  pages: CmsPage[];
  theme: CmsTheme;
  siteSettings: CmsSiteSettings;
}

export function usePublishedSite() {
  const [snapshot, setSnapshot] = useState<PublishedSiteSnapshot | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadPublishedSite() {
      setLoading(true);
      setError("");

      try {
        const supabase = getSupabaseClient();

        if (!supabase) {
          throw new Error(getBackendSetupMessage());
        }

        const { data, error: queryError } = await supabase
          .from("cms_site_snapshots")
          .select("snapshot")
          .eq("id", "published")
          .maybeSingle();

        if (queryError) throw queryError;

        if (!active) return;

        setSnapshot((data?.snapshot as PublishedSiteSnapshot | null) || null);
      } catch (loadError) {
        if (!active) return;

        setError(
          loadError instanceof Error
            ? loadError.message
            : "Unable to load published CMS snapshot."
        );
      } finally {
        if (active) setLoading(false);
      }
    }

    void loadPublishedSite();

    return () => {
      active = false;
    };
  }, []);

  return {
    snapshot,
    loading,
    error,
  };
}
