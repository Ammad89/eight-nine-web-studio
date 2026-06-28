import type { CmsBlockType } from "../cms-core/types";

export interface SitePageDefinition {
  slug: string;
  title: string;
  navLabel: string;
  allowedBlocks: CmsBlockType[];
}

export interface SiteDefinition {
  siteKey: string;
  siteName: string;
  pages: SitePageDefinition[];
}

export const siteDefinition: SiteDefinition = {
  siteKey: "ehray-photography",
  siteName: "EHRay Photography",

  pages: [
    {
      slug: "home",
      title: "Home",
      navLabel: "Home",
      allowedBlocks: [
        "hero",
        "stats",
        "cards",
        "gallery",
        "testimonials",
        "faq",
        "cta",
      ],
    },

    {
      slug: "family-photography",
      title: "Family Photography",
      navLabel: "Family",
      allowedBlocks: [
        "hero",
        "imageText",
        "gallery",
        "pricing",
        "testimonials",
        "faq",
        "cta",
      ],
    },

    {
      slug: "pet-photography",
      title: "Pet Photography",
      navLabel: "Pets",
      allowedBlocks: [
        "hero",
        "imageText",
        "gallery",
        "pricing",
        "testimonials",
        "faq",
        "cta",
      ],
    },

    {
      slug: "personal-branding",
      title: "Personal Branding",
      navLabel: "Branding",
      allowedBlocks: [
        "hero",
        "imageText",
        "gallery",
        "pricing",
        "testimonials",
        "faq",
        "cta",
      ],
    },

    {
      slug: "event-photography",
      title: "Event Photography",
      navLabel: "Events",
      allowedBlocks: [
        "hero",
        "gallery",
        "pricing",
        "testimonials",
        "faq",
        "cta",
      ],
    },

    {
      slug: "wedding-photography",
      title: "Wedding Photography",
      navLabel: "Weddings",
      allowedBlocks: [
        "hero",
        "gallery",
        "pricing",
        "testimonials",
        "faq",
        "cta",
      ],
    },

    {
      slug: "portfolio",
      title: "Portfolio",
      navLabel: "Portfolio",
      allowedBlocks: [
        "hero",
        "gallery",
        "cta",
      ],
    },
  ],
};
