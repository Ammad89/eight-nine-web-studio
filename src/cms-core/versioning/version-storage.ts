import type { CmsPage, CmsSiteSettings, CmsTheme } from "../types";

export interface CmsEditorSnapshot {
  pages: CmsPage[];
  theme: CmsTheme;
  siteSettings: CmsSiteSettings;
}

export interface CmsVersionRecord {
  id: string;
  label: string;
  snapshot: CmsEditorSnapshot;
  createdAt: string;
}

const VERSION_STORAGE_KEY = "cms-v2-versions";

export function createVersionId() {
  return `version-${Date.now()}`;
}

export function loadLocalVersions(): CmsVersionRecord[] {
  if (typeof localStorage === "undefined") return [];

  try {
    const stored = localStorage.getItem(VERSION_STORAGE_KEY);
    if (!stored) return [];

    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveLocalVersion(snapshot: CmsEditorSnapshot, label?: string) {
  const versions = loadLocalVersions();

  const nextVersion: CmsVersionRecord = {
    id: createVersionId(),
    label: label || `Version ${versions.length + 1}`,
    snapshot,
    createdAt: new Date().toISOString(),
  };

  const updated = [nextVersion, ...versions].slice(0, 50);

  localStorage.setItem(VERSION_STORAGE_KEY, JSON.stringify(updated));

  return nextVersion;
}

export function clearLocalVersions() {
  if (typeof localStorage === "undefined") return;
  localStorage.removeItem(VERSION_STORAGE_KEY);
}
