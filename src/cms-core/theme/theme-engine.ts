import type { CmsTheme } from "../types";
import { defaultTheme } from "../../site-config/theme";

export const THEME_STORAGE_KEY = "cms-theme";

export function getDefaultTheme(): CmsTheme {
  return structuredClone(defaultTheme);
}

export function mergeTheme(
  base: CmsTheme,
  override?: Partial<CmsTheme>,
): CmsTheme {
  if (!override) return structuredClone(base);

  return {
    ...base,

    colors: {
      ...base.colors,
      ...(override.colors || {}),
    },

    typography: {
      ...base.typography,
      ...(override.typography || {}),
    },

    layout: {
      ...base.layout,
      ...(override.layout || {}),
    },

    buttons: {
      ...base.buttons,
      ...(override.buttons || {}),
    },

    images: {
      ...base.images,
      ...(override.images || {}),
    },
  };
}

export function themeToCssVariables(theme: CmsTheme): Record<string, string> {
  return {
    "--cms-background": theme.colors.background,
    "--cms-foreground": theme.colors.foreground,
    "--cms-primary": theme.colors.primary,
    "--cms-secondary": theme.colors.secondary,
    "--cms-muted": theme.colors.muted,
    "--cms-border": theme.colors.border,

    "--cms-heading-font": theme.typography.headingFont,
    "--cms-body-font": theme.typography.bodyFont,
    "--cms-base-font-size": `${theme.typography.baseFontSize}px`,
    "--cms-heading-scale": `${theme.typography.headingScale}`,
    "--cms-line-height": `${theme.typography.lineHeight}`,

    "--cms-container-width": `${theme.layout.containerWidth}px`,
    "--cms-section-padding": `${theme.layout.sectionPadding}px`,
    "--cms-border-radius": `${theme.layout.borderRadius}px`,

    "--cms-button-radius": `${theme.buttons.radius}px`,

    "--cms-image-radius": `${theme.images.defaultRadius}px`,
    "--cms-image-overlay-opacity": `${theme.images.defaultOverlayOpacity}`,
  };
}

export function applyTheme(theme: CmsTheme): void {
  if (typeof document === "undefined") return;

  const root = document.documentElement;
  const variables = themeToCssVariables(theme);

  Object.entries(variables).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
}

export function saveThemeLocally(theme: CmsTheme): void {
  if (typeof localStorage === "undefined") return;

  localStorage.setItem(
    THEME_STORAGE_KEY,
    JSON.stringify(theme),
  );
}

export function loadThemeLocally(): CmsTheme {
  if (typeof localStorage === "undefined") {
    return getDefaultTheme();
  }

  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);

    if (!stored) {
      return getDefaultTheme();
    }

    const parsed = JSON.parse(stored);

    return mergeTheme(
      getDefaultTheme(),
      parsed,
    );
  } catch {
    return getDefaultTheme();
  }
}
