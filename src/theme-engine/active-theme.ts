import {
  eightNineLuxuryTheme,
  resolveEightNineLuxuryAsset,
} from "../themes/eight-nine-luxury";
import type { ThemeContent } from "../themes/eight-nine-luxury";

export type ActiveTheme = ThemeContent;

export function getActiveTheme(): ActiveTheme {
  return eightNineLuxuryTheme;
}

export function resolveThemeAsset(assetKey: string, fallback = "") {
  return resolveEightNineLuxuryAsset(assetKey, fallback);
}
