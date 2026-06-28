import heroBeachDog from "../../imports/optimized/woman-playing-with-dog-on-sandy-beach-2026-01-08-06-39-41-utc.JPG";
import portfolioFamilies from "../../imports/optimized/outdoor-shot-of-pleased-man-and-woman-stand-closel-2026-05-28-23-39-35-utc.JPG";
import portfolioPets from "../../imports/optimized/dog-in-autumn-foliage-wearing-a-red-collar-2026-03-25-00-44-16-utc.jpg";
import portfolioBranding from "../../imports/optimized/japanese-woman-in-office-portrait-2026-03-09-05-22-48-utc.jpg";
import portfolioEvents from "../../imports/optimized/celebrating-together-at-an-office-new-year-s-party-2026-01-09-09-10-33-utc.jpg";
import aboutPortrait from "../../imports/optimized/Gemini_Generated_Image_lfgepqlfgepqlfge.jpg";

export const eightNineLuxuryAssets: Record<string, string> = {
  "about-portrait": portfolioBranding,
  "portfolio-family-0": portfolioFamilies,
  "portfolio-family-1": portfolioFamily1,
  "portfolio-family-2": portfolioFamily2,
  "portfolio-family-3": portfolioFamily3,
  "portfolio-family-4": portfolioFamily4,
  "portfolio-pet-0": portfolioPets,
  "portfolio-pet-1": portfolioPet1,
  "portfolio-pet-2": portfolioPet2,
  "portfolio-pet-3": portfolioPet3,
  "portfolio-pet-4": portfolioPet4,
  "portfolio-branding-0": portfolioBranding,
  "portfolio-branding-1": portfolioBranding1,
  "portfolio-branding-2": portfolioBranding2,
  "portfolio-branding-3": portfolioBranding3,
  "portfolio-branding-4": portfolioBranding4,
  "portfolio-event-0": portfolioEvents,
  "portfolio-event-1": portfolioEvent1,
  "portfolio-event-2": portfolioEvent2,
  "portfolio-event-3": portfolioEvent3,
  "portfolio-event-4": portfolioEvent4,
  "wedding-hero": portfolioWedding,
  "event-hero": portfolioEvents,
  "branding-hero": portfolioBranding,
  "pet-hero": portfolioPets,
  "family-hero": portfolioFamilies,
  "woman-playing-with-dog-on-sandy-beach-2026-01-08-06-39-41-utc.JPG": heroBeachDog,
  "outdoor-shot-of-pleased-man-and-woman-stand-closel-2026-05-28-23-39-35-utc.JPG": portfolioFamilies,
  "dog-in-autumn-foliage-wearing-a-red-collar-2026-03-25-00-44-16-utc.jpg": portfolioPets,
  "japanese-woman-in-office-portrait-2026-03-09-05-22-48-utc.jpg": portfolioBranding,
  "celebrating-together-at-an-office-new-year-s-party-2026-01-09-09-10-33-utc.jpg": portfolioEvents,
  "Gemini_Generated_Image_lfgepqlfgepqlfge.jpg": aboutPortrait,
};

export function resolveEightNineLuxuryAsset(assetKey: string, fallback = "") {
  if (!assetKey) return fallback;
  return eightNineLuxuryAssets[assetKey] || assetKey || fallback;
}
