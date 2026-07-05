import navLogo from "../../imports/platform/Eight Nine Logo for Nav Bar.svg";
import footerLogo from "../../imports/platform/Eight Nine Logo for Footer.svg";
import ammadPortrait from "../../imports/platform/Ammad Portrait shot.jpg";
import platformLogo from "../../imports/platform/Eight Nine Logo.jpg";
import ammadPortrait from "../../imports/platform/Ammad Portrait shot.jpg";
import heroBeachDog from "../../imports/optimized/woman-playing-with-dog-on-sandy-beach-2026-01-08-06-39-41-utc.JPG";

import portfolioFamilies from "../../imports/optimized/outdoor-shot-of-pleased-man-and-woman-stand-closel-2026-05-28-23-39-35-utc.JPG";
import portfolioFamily1 from "../../imports/optimized/young-happy-mixed-race-family-relaxing-and-sitting-2026-03-25-08-29-12-utc.jpg";
import portfolioFamily2 from "../../imports/optimized/happy-family-sitting-in-the-autumn-grass-2026-03-26-09-13-29-utc.jpg";
import portfolioFamily3 from "../../imports/optimized/loving-family-together-in-sunny-field-outdoors-2026-01-05-05-42-43-utc.jpg";
import portfolioFamily4 from "../../imports/optimized/happy-family-laughing-while-lying-in-green-grass-2026-03-25-05-03-58-utc.jpg";

import portfolioPets from "../../imports/optimized/dog-in-autumn-foliage-wearing-a-red-collar-2026-03-25-00-44-16-utc.jpg";
import portfolioPet1 from "../../imports/optimized/happy-young-woman-spending-time-with-lovely-spotte-2026-01-05-04-49-04-utc.jpg";
import portfolioPet2 from "../../imports/optimized/happy-dog-standing-on-a-rock-in-nature-2026-03-24-11-37-42-utc.jpg";
import portfolioPet3 from "../../imports/optimized/a-soft-coated-wheaten-terrier-running-through-the-2026-03-13-01-52-31-utc.jpg";
import portfolioPet4 from "../../imports/optimized/cute-puppy-sitting-alert-in-green-grass-2026-03-19-08-12-02-utc.jpg";

import portfolioBranding from "../../imports/optimized/japanese-woman-in-office-portrait-2026-03-09-05-22-48-utc.jpg";
import portfolioBranding1 from "../../imports/optimized/athletic-woman-crouches-on-bridge-in-activewear-2026-03-25-07-26-56-utc.jpg";
import portfolioBranding2 from "../../imports/optimized/young-woman-doing-gymnastics-top-view-2026-03-09-06-04-47-utc.jpg";
import portfolioBranding3 from "../../imports/optimized/young-woman-in-a-lake-rubbing-her-eyes-2026-03-09-05-46-08-utc.jpg";


import portfolioEvents from "../../imports/optimized/celebrating-together-at-an-office-new-year-s-party-2026-01-09-09-10-33-utc.jpg";
import portfolioEvent1 from "../../imports/optimized/friends-celebrating-with-champagne-on-yellow-backg-2026-03-17-08-58-10-utc.jpg";
import portfolioEvent2 from "../../imports/optimized/celebratory-evening-couple-cheers-with-champagne-2026-03-24-05-10-35-utc.jpg";
import portfolioEvent3 from "../../imports/optimized/smiling-people-celebrating-new-year-s-eve-with-spa-2026-03-24-09-00-03-utc.jpg";
import portfolioEvent4 from "../../imports/optimized/friends-celebrate-new-year-s-eve-with-sparklers-2026-03-24-07-23-58-utc.jpg";

const portfolioWedding = portfolioEvent2;
const aboutPortrait = ammadPortrait;

export const eightNineLuxuryAssets: Record<string, string> = {
  "eight-nine-nav-logo": navLogo,
  "eight-nine-footer-logo": footerLogo,
  "about-portrait": ammadPortrait,
  "ammad-portrait": ammadPortrait,
  "eight-nine-logo": navLogo,
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
  "portfolio-branding-4": ammadPortrait,
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
  "Gemini_Generated_Image_lfgepqlfgepqlfge.jpg": ammadPortrait,
};

export function resolveEightNineLuxuryAsset(assetKey: string, fallback = "") {
  if (!assetKey) return fallback;
  return eightNineLuxuryAssets[assetKey] || assetKey || fallback;
}
