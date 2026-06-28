export type PortfolioCategory = "All" | "Families" | "Pets" | "Personal Branding" | "Events";

export interface PortfolioImageItem {
  assetKey: string;
  alt: string;
  category: Exclude<PortfolioCategory, "All">;
  path: string;
}

export interface PortfolioCategoryCard {
  category: Exclude<PortfolioCategory, "All">;
  path: string;
  label: string;
}

export const portfolioPage = {
  seo: {
    title: "Portfolio | Eight Nine Photography Dubai",
    description:
      "Browse the full portfolio of Eight Nine Photography. Natural light family, pet, personal branding and event photography across Dubai and the UAE.",
    keywords:
      "Photography Portfolio Dubai, Family Photography Portfolio, Pet Photography Dubai, Event Photography UAE, Personal Branding Photography",
    slug: "/portfolio",
  },

  header: {
    eyebrow: "Eight Nine Photography",
    title: "Portfolio",
    description:
      "A curated selection of work across families, pets, personal branding and events. Every image shot in natural light.",
  },

  categories: ["All", "Families", "Pets", "Personal Branding", "Events"] as PortfolioCategory[],

  gallery: [
    { assetKey: "portfolio-family-0", alt: "Couple with their dog on the beach", category: "Families", path: "/family-photography" },
    { assetKey: "portfolio-family-1", alt: "Family laughing together in the grass", category: "Families", path: "/family-photography" },
    { assetKey: "portfolio-family-2", alt: "Mixed-race family relaxing outdoors with two children", category: "Families", path: "/family-photography" },
    { assetKey: "portfolio-family-3", alt: "Family together in a sunny outdoor field", category: "Families", path: "/family-photography" },
    { assetKey: "portfolio-family-4", alt: "Family sitting in autumn grass", category: "Families", path: "/family-photography" },

    { assetKey: "portfolio-pet-0", alt: "Dog in autumn foliage wearing a red collar", category: "Pets", path: "/pet-photography" },
    { assetKey: "portfolio-pet-1", alt: "Woman with her Australian Shepherd on the grass", category: "Pets", path: "/pet-photography" },
    { assetKey: "portfolio-pet-2", alt: "Wheaten Terrier running through a bluebell field", category: "Pets", path: "/pet-photography" },
    { assetKey: "portfolio-pet-3", alt: "Dog standing on a rock with mountain backdrop", category: "Pets", path: "/pet-photography" },
    { assetKey: "portfolio-pet-4", alt: "German Shepherd puppy sitting alert in green grass", category: "Pets", path: "/pet-photography" },

    { assetKey: "portfolio-branding-0", alt: "Professional woman portrait in an office corridor", category: "Personal Branding", path: "/personal-branding" },
    { assetKey: "portfolio-branding-1", alt: "Woman in activewear crouching on a bridge", category: "Personal Branding", path: "/personal-branding" },
    { assetKey: "portfolio-branding-2", alt: "Aerial view of athlete jumping a hurdle", category: "Personal Branding", path: "/personal-branding" },
    { assetKey: "portfolio-branding-3", alt: "Top-down view of gymnast on a dark floor", category: "Personal Branding", path: "/personal-branding" },
    { assetKey: "portfolio-branding-4", alt: "Woman emerging from a lake in mountain light", category: "Personal Branding", path: "/personal-branding" },

    { assetKey: "portfolio-event-0", alt: "Office celebration party together", category: "Events", path: "/event-photography" },
    { assetKey: "portfolio-event-1", alt: "Group celebrating New Year with sparklers", category: "Events", path: "/event-photography" },
    { assetKey: "portfolio-event-2", alt: "Friends raising sparklers at a New Year event", category: "Events", path: "/event-photography" },
    { assetKey: "portfolio-event-3", alt: "Couple toasting champagne at an evening celebration", category: "Events", path: "/event-photography" },
    { assetKey: "portfolio-event-4", alt: "Friends celebrating with champagne and confetti", category: "Events", path: "/event-photography" },
  ] as PortfolioImageItem[],

  categoryCards: [
    { category: "Families", path: "/family-photography", label: "Family Photography" },
    { category: "Pets", path: "/pet-photography", label: "Pet Photography" },
    { category: "Personal Branding", path: "/personal-branding", label: "Personal Branding" },
    { category: "Events", path: "/event-photography", label: "Event Photography" },
  ] as PortfolioCategoryCard[],

  serviceLinks: {
    eyebrow: "Explore by Service",
    heading: "Find the right session for you.",
  },

  booking: {
    headline: "Seen something you like?",
    subtext:
      "Get in touch to discuss your session. We'll find a time and place that works for you.",
  },
};
