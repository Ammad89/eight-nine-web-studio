import type { CmsSiteSettings } from "../types";
import { defaultSiteSettings } from "../../site-config/theme";

export const SITE_SETTINGS_STORAGE_KEY = "cms-site-settings";

export function getDefaultSiteSettings(): CmsSiteSettings {
  return structuredClone(defaultSiteSettings);
}

export function mergeSiteSettings(
  base: CmsSiteSettings,
  override?: Partial<CmsSiteSettings>,
): CmsSiteSettings {
  if (!override) return structuredClone(base);

  return {
    ...base,
    ...override,

    contact: {
      ...base.contact,
      ...(override.contact || {}),
    },

    seo: {
      ...base.seo,
      ...(override.seo || {}),
    },

    footer: {
      ...base.footer,
      ...(override.footer || {}),
    },

    navigation:
      override.navigation || base.navigation,
  };
}

export function saveSiteSettingsLocally(
  settings: CmsSiteSettings,
): void {
  if (typeof localStorage === "undefined") return;

  localStorage.setItem(
    SITE_SETTINGS_STORAGE_KEY,
    JSON.stringify(settings),
  );
}

export function loadSiteSettingsLocally(): CmsSiteSettings {
  if (typeof localStorage === "undefined") {
    return getDefaultSiteSettings();
  }

  try {
    const stored = localStorage.getItem(
      SITE_SETTINGS_STORAGE_KEY,
    );

    if (!stored) {
      return getDefaultSiteSettings();
    }

    return mergeSiteSettings(
      getDefaultSiteSettings(),
      JSON.parse(stored),
    );
  } catch {
    return getDefaultSiteSettings();
  }
}
