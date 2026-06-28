import type { CmsContent } from "./types";
import heroImage from "../../imports/optimized/woman-playing-with-dog-on-sandy-beach-2026-01-08-06-39-41-utc.JPG";
import familyImage from "../../imports/optimized/outdoor-shot-of-pleased-man-and-woman-stand-closel-2026-05-28-23-39-35-utc.JPG";
import petImage from "../../imports/optimized/dog-in-autumn-foliage-wearing-a-red-collar-2026-03-25-00-44-16-utc.jpg";
import brandImage from "../../imports/optimized/japanese-woman-in-office-portrait-2026-03-09-05-22-48-utc.jpg";
import eventImage from "../../imports/optimized/celebrating-together-at-an-office-new-year-s-party-2026-01-09-09-10-33-utc.jpg";

export const defaultCmsContent: CmsContent = {
  version: 1,
  updatedAt: new Date().toISOString(),
  pages: [
    {
      id: "home",
      slug: "home",
      title: "Homepage",
      navLabel: "Home",
      status: "draft",
      seoTitle: "EHRay Photography Dubai | Natural Light Lifestyle Photography UAE",
      seoDescription:
        "Natural light lifestyle photographer in Dubai, UAE. Authentic family, pet, personal branding and event photography.",
      sections: [
        {
          id: "home-hero",
          type: "hero",
          title: "Hero",
          subtitle: "First impression",
          elements: [
            { id: "home-hero-kicker", type: "eyebrow", label: "Eyebrow", text: "EHRay Photography - United Arab Emirates" },
            {
              id: "home-hero-title",
              type: "heading",
              label: "Headline",
              text: "Natural Light & Authentic Lifestyle Photography Across the UAE",
            },
            {
              id: "home-hero-copy",
              type: "text",
              label: "Intro copy",
              text: "Families. Pets. Personal brands. Photographed in natural light, across the UAE - without staging, without posing, without compromise.",
            },
            { id: "home-hero-image", type: "image", label: "Hero image", text: "", imageUrl: heroImage, alt: "Woman and dog on a sandy beach" },
            { id: "home-hero-button", type: "button", label: "Primary button", text: "Book a Consultation", href: "/#contact" },
          ],
        },
        {
          id: "home-stats",
          type: "stats",
          title: "Credibility Stats",
          subtitle: "Draft numbers for client review",
          elements: [
            { id: "stat-years", type: "stat", label: "Experience", text: "8+\nYears of Experience (draft)" },
            { id: "stat-sessions", type: "stat", label: "Sessions", text: "1,400+\nSessions Completed (draft)" },
            { id: "stat-rating", type: "stat", label: "Rating", text: "4.9/5\nGoogle Rating (draft)" },
            { id: "stat-location", type: "stat", label: "Location", text: "UAE\nBased - Global Availability" },
          ],
        },
        {
          id: "home-services",
          type: "cards",
          title: "Services",
          subtitle: "Main service paths",
          elements: [
            { id: "service-family", type: "listItem", label: "Family Photography", text: "Family Photography\nReal moments. Natural light. No posing.", imageUrl: familyImage, href: "/family-photography" },
            { id: "service-pets", type: "listItem", label: "Pet Photography", text: "Pet Photography\nThe bond between you and your animal, captured honestly.", imageUrl: petImage, href: "/pet-photography" },
            { id: "service-brand", type: "listItem", label: "Personal Branding", text: "Personal Branding\nImages that build trust before you say a word.", imageUrl: brandImage, href: "/personal-branding" },
            { id: "service-events", type: "listItem", label: "Event Photography", text: "Event Photography\nEvery detail, every moment - documented.", imageUrl: eventImage, href: "/event-photography" },
          ],
        },
        {
          id: "home-proof",
          type: "testimonials",
          title: "Sample Client Proof",
          subtitle: "Replace with verified quotes before launch",
          elements: [
            {
              id: "proof-family",
              type: "testimonial",
              label: "Family quote",
              text: "Emily sees the moments you miss when you're living them.\nSample family client\nDraft testimonial - Dubai",
            },
            {
              id: "proof-pet",
              type: "testimonial",
              label: "Pet quote",
              text: "Nothing was forced, and the final images captured the bond we wanted to remember.\nSample pet client\nDraft testimonial - UAE",
            },
            {
              id: "proof-brand",
              type: "testimonial",
              label: "Brand quote",
              text: "Clients understood the tone of my work before we even spoke.\nSample brand client\nDraft testimonial - Dubai",
            },
          ],
        },
      ],
    },
    {
      id: "family-page",
      slug: "family-photography-draft",
      title: "Family Photography Draft",
      navLabel: "Family Draft",
      status: "draft",
      seoTitle: "Family Photographer Dubai | Natural Light Family Photography UAE | EHRay",
      seoDescription: "Draft family photography page managed through the dashboard.",
      sections: [
        {
          id: "family-hero",
          type: "hero",
          title: "Hero",
          elements: [
            { id: "family-eyebrow", type: "eyebrow", label: "Eyebrow", text: "EHRay Photography - Family Photography" },
            { id: "family-title", type: "heading", label: "Headline", text: "Photographs of your family as they actually are." },
            { id: "family-copy", type: "text", label: "Copy", text: "Not the version where everyone's looking at the camera. The real one." },
            { id: "family-image", type: "image", label: "Hero image", text: "", imageUrl: familyImage, alt: "Family photography session" },
          ],
        },
        {
          id: "family-pricing",
          type: "pricing",
          title: "Sample Packages",
          subtitle: "Indicative pricing for client review",
          elements: [
            { id: "pkg-essential", type: "package", label: "Essentials", text: "Essentials\nIndicative AED 1,200\n1 hour\n30+ edited images\nOnline gallery" },
            { id: "pkg-classic", type: "package", label: "Classic", text: "Classic\nIndicative AED 1,800\n2 hours\n60+ edited images\nPriority booking" },
            { id: "pkg-premium", type: "package", label: "Premium", text: "Premium\nIndicative AED 2,800\n3 hours\n100+ edited images\nSame-week option" },
          ],
        },
      ],
    },
  ],
};
