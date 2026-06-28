import type { CmsPage, CmsSiteSettings, CmsTheme } from "../types";
import type { WebsiteSchema } from "../platform";

export interface CmsPublishedSnapshot {
  pages: CmsPage[];
  theme: CmsTheme;
  siteSettings: CmsSiteSettings;
  publishedAt: string;
}

const PUBLISHED_STORAGE_KEY = "cms-v2-published-state";

export function loadPublishedSnapshot(): CmsPublishedSnapshot | null {
  if (typeof localStorage === "undefined") return null;

  try {
    const stored = localStorage.getItem(PUBLISHED_STORAGE_KEY);
    if (!stored) return null;
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

export function publishSnapshot(snapshot: {
  pages: CmsPage[];
  theme: CmsTheme;
  siteSettings: CmsSiteSettings;
}): CmsPublishedSnapshot {
  const published: CmsPublishedSnapshot = {
    ...snapshot,
    publishedAt: new Date().toISOString(),
  };

  localStorage.setItem(PUBLISHED_STORAGE_KEY, JSON.stringify(published));

  return published;
}

export function clearPublishedSnapshot() {
  if (typeof localStorage === "undefined") return;
  localStorage.removeItem(PUBLISHED_STORAGE_KEY);
}


export interface PlatformPublishedSnapshot {
  website: WebsiteSchema;
  publishedAt: string;
}

const PLATFORM_PUBLISHED_STORAGE_KEY = "cms-v2-platform-published-state";

export function loadPlatformPublishedSnapshot(): PlatformPublishedSnapshot | null {
  if (typeof localStorage === "undefined") return null;

  try {
    const stored = localStorage.getItem(PLATFORM_PUBLISHED_STORAGE_KEY);
    if (!stored) return null;
    return JSON.parse(stored) as PlatformPublishedSnapshot;
  } catch {
    return null;
  }
}

export function publishPlatformSnapshot(website: WebsiteSchema): PlatformPublishedSnapshot {
  const published: PlatformPublishedSnapshot = {
    website: {
      ...website,
      publishing: {
        ...website.publishing,
        status: "published",
        version: website.publishing.version + 1,
        publishedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    },
    publishedAt: new Date().toISOString(),
  };

  localStorage.setItem(PLATFORM_PUBLISHED_STORAGE_KEY, JSON.stringify(published));

  return published;
}

export function clearPlatformPublishedSnapshot() {
  if (typeof localStorage === "undefined") return;
  localStorage.removeItem(PLATFORM_PUBLISHED_STORAGE_KEY);
}
