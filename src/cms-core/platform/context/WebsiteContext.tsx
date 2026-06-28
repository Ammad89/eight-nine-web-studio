import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { WebsiteSchema } from "../schema";
import { createDefaultWebsiteSchema } from "../default-website";
import { loadPlatformPublishedSnapshot } from "../../versioning/publish-storage";
import { loadRemoteSnapshot } from "../../versioning/remote-publish-storage";

interface WebsiteContextValue {
  website: WebsiteSchema;
  setWebsite: React.Dispatch<React.SetStateAction<WebsiteSchema>>;
  resetWebsite: () => void;
}

const WebsiteContext = createContext<WebsiteContextValue | null>(null);

const WEBSITE_STORAGE_KEY = "eight-nine-web-studio.website-schema";

function loadStoredWebsite() {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(WEBSITE_STORAGE_KEY);
    if (!raw) return null;

    return JSON.parse(raw) as WebsiteSchema;
  } catch (error) {
    console.warn("Unable to load stored website schema.", error);
    return null;
  }
}

function saveStoredWebsite(website: WebsiteSchema) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(WEBSITE_STORAGE_KEY, JSON.stringify(website));
  } catch (error) {
    console.warn("Unable to save website schema.", error);
  }
}

function isPlatformSnapshot(value: unknown): value is { website: WebsiteSchema } {
  if (!value || typeof value !== "object") return false;
  return "website" in value;
}

async function loadRemotePublishedWebsite() {
  try {
    const remote = await loadRemoteSnapshot("platform-published");
    if (!remote || !isPlatformSnapshot(remote.snapshot)) return null;
    return remote.snapshot.website;
  } catch (error) {
    console.warn("Unable to load remote platform website schema.", error);
    return null;
  }
}

function loadLocalPublishedWebsite() {
  const published = loadPlatformPublishedSnapshot();
  return published?.website || null;
}

export function WebsiteProvider({ children }: { children: ReactNode }) {
  const defaultWebsite = useMemo(() => createDefaultWebsiteSchema(), []);
  const [website, setWebsite] = useState<WebsiteSchema>(() => loadLocalPublishedWebsite() || loadStoredWebsite() || defaultWebsite);

  useEffect(() => {
    let active = true;

    loadRemotePublishedWebsite().then(remoteWebsite => {
      if (!active || !remoteWebsite) return;
      setWebsite(remoteWebsite);
      saveStoredWebsite(remoteWebsite);
    });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    saveStoredWebsite(website);
  }, [website]);

  const value = useMemo(
    () => ({
      website,
      setWebsite,
      resetWebsite: () => {
        const nextWebsite = createDefaultWebsiteSchema();
        setWebsite(nextWebsite);
        saveStoredWebsite(nextWebsite);
      },
    }),
    [website],
  );

  return (
    <WebsiteContext.Provider value={value}>
      {children}
    </WebsiteContext.Provider>
  );
}

export function useWebsite() {
  const context = useContext(WebsiteContext);

  if (!context) {
    throw new Error("useWebsite must be used inside WebsiteProvider");
  }

  return context;
}
