import type { SectionType } from "./schema";

export function getDefaultSectionData(type: SectionType): Record<string, unknown> {
  switch (type) {
    case "hero":
      return {
        eyebrow: "New Section",
        title: "A clear headline goes here.",
        subtitle: "Use this space to explain the main message of the page.",
        primaryCtaLabel: "Get Started",
        primaryCtaHref: "/contact",
        secondaryCtaLabel: "Learn More",
        secondaryCtaHref: "/about",
        align: "center",
      };

    case "text":
      return {
        eyebrow: "Text Section",
        title: "Tell the story clearly.",
        content:
          "Use this section for introductions, explanations, editorial copy or supporting content.\n\nAdd another paragraph by separating text with a blank line.",
        align: "left",
        maxWidth: "md",
      };

    case "imageText":
      return {
        eyebrow: "Image and Text",
        title: "Pair a strong message with a visual.",
        content:
          "Use this section for about blocks, service introductions, case study summaries or feature explanations.",
        image: "about-portrait",
        imageAlt: "Editorial image",
        imagePosition: "right",
        ctaLabel: "Read More",
        ctaHref: "/about",
      };

    case "cta":
      return {
        eyebrow: "Call to Action",
        title: "Ready to take the next step?",
        subtitle: "Invite visitors to enquire, book a call or explore the next important page.",
        primaryCtaLabel: "Contact Us",
        primaryCtaHref: "/contact",
        secondaryCtaLabel: "View Portfolio",
        secondaryCtaHref: "/portfolio",
        tone: "dark",
        align: "center",
      };

    case "servicesGrid":
      return {
        eyebrow: "Services",
        title: "Explore our services.",
        subtitle: "A selection of services available through this website.",
        collection: "services",
        maxItems: 6,
        featuredOnly: false,
        layout: "grid",
        ctaLabel: "View all services",
        ctaHref: "/portfolio",
      };

    case "portfolioGrid":
      return {
        eyebrow: "Portfolio",
        title: "Selected work.",
        subtitle: "A curated selection from the portfolio.",
        collection: "portfolio",
        maxItems: 6,
        featuredOnly: true,
        layout: "grid",
        ctaLabel: "View portfolio",
        ctaHref: "/portfolio",
      };

    case "testimonials":
      return {
        eyebrow: "Testimonials",
        title: "What clients say.",
        subtitle: "A few words from people who have experienced the work.",
        collection: "testimonials",
        maxItems: 3,
        featuredOnly: true,
        layout: "quotes",
      };

    case "faq":
      return {
        eyebrow: "FAQs",
        title: "Common questions.",
        subtitle: "Helpful answers before visitors get in touch.",
        collection: "faqs",
        maxItems: 6,
        layout: "cards",
      };

    default:
      return {};
  }
}
