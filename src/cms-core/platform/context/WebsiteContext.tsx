import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type {
  Dispatch,
  ReactNode,
  SetStateAction,
} from "react";
import type { WebsiteSchema } from "../schema";
import { createDefaultWebsiteSchema } from "../default-website";
import {
  loadPlatformPublishedSnapshot,
} from "../../versioning/publish-storage";
import {
  loadRemoteSnapshot,
} from "../../versioning/remote-publish-storage";

interface WebsiteContextValue {
  website: WebsiteSchema;
  setWebsite: Dispatch<SetStateAction<WebsiteSchema>>;
  resetWebsite: () => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  clearHistory: () => void;
}

const WebsiteContext =
  createContext<WebsiteContextValue | null>(null);

const WEBSITE_STORAGE_KEY =
  "eight-nine-web-studio.website-schema";

const HISTORY_LIMIT = 100;

function cloneWebsite(
  website: WebsiteSchema,
): WebsiteSchema {
  if (typeof structuredClone === "function") {
    return structuredClone(website);
  }

  return JSON.parse(
    JSON.stringify(website),
  ) as WebsiteSchema;
}

function normalizeWebsiteSchema(
  website: WebsiteSchema,
): WebsiteSchema {
  return {
    ...website,
    pages: (website.pages || []).map(page => ({
      ...page,
      sections: (page.sections || []).map(
        (section, index) => {
          const legacySection =
            section as typeof section & {
              order?: number;
              hidden?: boolean;
            };

          return {
            ...section,
            visible:
              typeof section.visible === "boolean"
                ? section.visible
                : legacySection.hidden !== true,
            sortOrder:
              typeof section.sortOrder === "number"
                ? section.sortOrder
                : typeof legacySection.order === "number"
                  ? legacySection.order
                  : index + 1,
          };
        },
      ),
    })),
  };
}

function loadStoredWebsite() {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(
      WEBSITE_STORAGE_KEY,
    );

    if (!raw) return null;

    return normalizeWebsiteSchema(
      JSON.parse(raw) as WebsiteSchema,
    );
  } catch (error) {
    console.warn(
      "Unable to load stored website schema.",
      error,
    );

    return null;
  }
}

function saveStoredWebsite(
  website: WebsiteSchema,
) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(
      WEBSITE_STORAGE_KEY,
      JSON.stringify(website),
    );
  } catch (error) {
    console.warn(
      "Unable to save website schema.",
      error,
    );
  }
}

function isPlatformSnapshot(
  value: unknown,
): value is { website: WebsiteSchema } {
  if (!value || typeof value !== "object") {
    return false;
  }

  return "website" in value;
}

async function loadRemotePublishedWebsite() {
  try {
    const remote = await loadRemoteSnapshot(
      "platform-published",
    );

    if (
      !remote ||
      !isPlatformSnapshot(remote.snapshot)
    ) {
      return null;
    }

    return normalizeWebsiteSchema(
      remote.snapshot.website,
    );
  } catch (error) {
    console.warn(
      "Unable to load remote platform website schema.",
      error,
    );

    return null;
  }
}

function loadLocalPublishedWebsite() {
  const published =
    loadPlatformPublishedSnapshot();

  return published?.website
    ? normalizeWebsiteSchema(published.website)
    : null;
}

export function WebsiteProvider({
  children,
}: {
  children: ReactNode;
}) {
  const defaultWebsite = useMemo(
    () =>
      normalizeWebsiteSchema(
        createDefaultWebsiteSchema(),
      ),
    [],
  );

  const [website, setWebsiteState] =
    useState<WebsiteSchema>(
      () =>
        loadLocalPublishedWebsite() ||
        loadStoredWebsite() ||
        defaultWebsite,
    );

  const pastRef = useRef<WebsiteSchema[]>([]);
  const futureRef = useRef<WebsiteSchema[]>([]);

  const [historyVersion, setHistoryVersion] =
    useState(0);

  const refreshHistoryState = useCallback(() => {
    setHistoryVersion(version => version + 1);
  }, []);

  const clearHistory = useCallback(() => {
    pastRef.current = [];
    futureRef.current = [];
    refreshHistoryState();
  }, [refreshHistoryState]);

  const setWebsite: Dispatch<
    SetStateAction<WebsiteSchema>
  > = useCallback(
    update => {
      setWebsiteState(current => {
        const nextWebsite =
          typeof update === "function"
            ? (
                update as (
                  current: WebsiteSchema,
                ) => WebsiteSchema
              )(current)
            : update;

        if (nextWebsite === current) {
          return current;
        }

        pastRef.current = [
          ...pastRef.current,
          cloneWebsite(current),
        ].slice(-HISTORY_LIMIT);

        futureRef.current = [];
        refreshHistoryState();

        return nextWebsite;
      });
    },
    [refreshHistoryState],
  );

  const undo = useCallback(() => {
    setWebsiteState(current => {
      const previous = pastRef.current.at(-1);

      if (!previous) return current;

      pastRef.current =
        pastRef.current.slice(0, -1);

      futureRef.current = [
        cloneWebsite(current),
        ...futureRef.current,
      ].slice(0, HISTORY_LIMIT);

      refreshHistoryState();

      return cloneWebsite(previous);
    });
  }, [refreshHistoryState]);

  const redo = useCallback(() => {
    setWebsiteState(current => {
      const next = futureRef.current[0];

      if (!next) return current;

      futureRef.current =
        futureRef.current.slice(1);

      pastRef.current = [
        ...pastRef.current,
        cloneWebsite(current),
      ].slice(-HISTORY_LIMIT);

      refreshHistoryState();

      return cloneWebsite(next);
    });
  }, [refreshHistoryState]);

  useEffect(() => {
    let active = true;

    loadRemotePublishedWebsite().then(
      remoteWebsite => {
        if (!active || !remoteWebsite) return;

        setWebsiteState(remoteWebsite);
        saveStoredWebsite(remoteWebsite);
        clearHistory();
      },
    );

    return () => {
      active = false;
    };
  }, [clearHistory]);

  useEffect(() => {
    saveStoredWebsite(website);
  }, [website]);

  const canUndo =
    useMemo(
      () => pastRef.current.length > 0,
      [historyVersion],
    );

  const canRedo =
    useMemo(
      () => futureRef.current.length > 0,
      [historyVersion],
    );

  const resetWebsite = useCallback(() => {
    const nextWebsite =
      normalizeWebsiteSchema(
        createDefaultWebsiteSchema(),
      );

    setWebsite(nextWebsite);
  }, [setWebsite]);

  const value = useMemo(
    () => ({
      website,
      setWebsite,
      resetWebsite,
      undo,
      redo,
      canUndo,
      canRedo,
      clearHistory,
    }),
    [
      website,
      setWebsite,
      resetWebsite,
      undo,
      redo,
      canUndo,
      canRedo,
      clearHistory,
    ],
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
    throw new Error(
      "useWebsite must be used inside WebsiteProvider",
    );
  }

  return context;
}
