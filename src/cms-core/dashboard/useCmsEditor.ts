import { useEffect, useMemo, useState } from "react";
import type { CmsBlock, CmsBlockType, CmsPage, CmsSiteSettings, CmsTheme } from "../types";
import { cmsBlockLibrary } from "../block-library";
import { siteDefinition } from "../../site-config/site-definition";
import { defaultSiteSettings, defaultTheme } from "../../site-config/theme";

const CMS_EDITOR_STATE_KEY = "cms-v2-editor-state";
function createBlock(type: CmsBlockType): CmsBlock {
  const definition = cmsBlockLibrary.find((block) => block.type === type);

  return {
    id: `${type}-${Date.now()}`,
    type,
    label: definition?.label || "New Block",
    isVisible: true,
    fields: Object.fromEntries(
      (definition?.fields || []).map((field) => [
        field.id,
        field.defaultValue ?? "",
      ]),
    ),
    style: {},
  };
}

function createInitialPages(): CmsPage[] {
  return siteDefinition.pages.map((page) => ({
    id: page.slug,
    slug: page.slug,
    title: page.title,
    navLabel: page.navLabel,
    isVisibleInNav: true,
    blocks: page.allowedBlocks.slice(0, 3).map(createBlock),
  }));
}

export function useCmsEditor() {
  function loadSavedEditorState() {
  try {
    const stored = localStorage.getItem(CMS_EDITOR_STATE_KEY);
    if (!stored) return null;
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

const savedEditorState = loadSavedEditorState();

const [pages, setPages] = useState<CmsPage[]>(() =>
  savedEditorState?.pages || createInitialPages()
);

const [theme, setTheme] = useState<CmsTheme>(() =>
  savedEditorState?.theme || defaultTheme
);

const [siteSettings, setSiteSettings] = useState<CmsSiteSettings>(() =>
  savedEditorState?.siteSettings || defaultSiteSettings
);
  const [selectedPageSlug, setSelectedPageSlug] = useState(() => siteDefinition.pages[0]?.slug || "home");
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
useEffect(() => {
  localStorage.setItem(
    CMS_EDITOR_STATE_KEY,
    JSON.stringify({
      pages,
      theme,
      siteSettings,
    })
  );
}, [pages, theme, siteSettings]);
  const selectedPage = useMemo(
    () => pages.find((page) => page.slug === selectedPageSlug) || pages[0],
    [pages, selectedPageSlug],
  );

  const selectedBlock = useMemo(
    () => selectedPage?.blocks.find((block) => block.id === selectedBlockId) || selectedPage?.blocks[0],
    [selectedBlockId, selectedPage],
  );

  const allowedBlocks = useMemo(() => {
    const definition = siteDefinition.pages.find((page) => page.slug === selectedPage?.slug);
    return definition?.allowedBlocks || [];
  }, [selectedPage?.slug]);

  function selectPage(slug: string) {
    setSelectedPageSlug(slug);

    const nextPage = pages.find((page) => page.slug === slug);
    setSelectedBlockId(nextPage?.blocks[0]?.id || null);
  }

  function selectBlock(blockId: string) {
    setSelectedBlockId(blockId);
  }

  function addBlock(type: CmsBlockType) {
    const block = createBlock(type);

    setPages((currentPages) =>
      currentPages.map((page) =>
        page.slug === selectedPage?.slug
          ? {
              ...page,
              blocks: [...page.blocks, block],
            }
          : page,
      ),
    );

    setSelectedBlockId(block.id);
  }

  function updateBlockField(fieldId: string, value: unknown) {
    if (!selectedPage || !selectedBlock) return;

    setPages((currentPages) =>
      currentPages.map((page) =>
        page.slug === selectedPage.slug
          ? {
              ...page,
              blocks: page.blocks.map((block) =>
                block.id === selectedBlock.id
                  ? {
                      ...block,
                      fields: {
                        ...block.fields,
                        [fieldId]: value,
                      },
                    }
                  : block,
              ),
            }
          : page,
      ),
    );
  }

  function removeBlock(blockId: string) {
    if (!selectedPage) return;

    setPages((currentPages) =>
      currentPages.map((page) =>
        page.slug === selectedPage.slug
          ? {
              ...page,
              blocks: page.blocks.filter((block) => block.id !== blockId),
            }
          : page,
      ),
    );

    setSelectedBlockId(null);
  }

function restoreSnapshot(snapshot: {
  pages: CmsPage[];
  theme: CmsTheme;
  siteSettings: CmsSiteSettings;
}) {
  localStorage.setItem(
    CMS_EDITOR_STATE_KEY,
    JSON.stringify({
      pages: snapshot.pages,
      theme: snapshot.theme,
      siteSettings: snapshot.siteSettings,
    })
  );

  setPages(snapshot.pages);
  setTheme(snapshot.theme);
  setSiteSettings(snapshot.siteSettings);

  const firstPage = snapshot.pages[0];
  setSelectedPageSlug(firstPage?.slug || "home");
  setSelectedBlockId(firstPage?.blocks[0]?.id || null);
}

  return {
    pages,
    theme,
    siteSettings,
    selectedPage,
    selectedBlock,
    selectedPageSlug,
    selectedBlockId,
    allowedBlocks,
    setTheme,
    setSiteSettings,
    selectPage,
    selectBlock,
    addBlock,
    updateBlockField,
    removeBlock,
    restoreSnapshot,
  };
}
