import type { WebsiteSchema } from "./schema";
import { getActiveSite } from "../../theme-engine";
import { getActiveTheme } from "../../theme-engine";

export function createDefaultWebsiteSchema(): WebsiteSchema {
  const site = getActiveSite();
  const theme = getActiveTheme();

  return {
    site: {
      id: site.id,
      name: site.brand.name,
      businessName: site.business.name,
      ownerName: site.business.ownerName,
      tagline: site.brand.tagline,
      domain: {
        primary: site.domain.primary,
        canonicalUrl: site.domain.canonicalUrl,
      },
      contact: {
        email: site.contact.email,
        phone: site.contact.phone,
        phoneDisplay: site.contact.phoneDisplay,
        whatsapp: site.contact.whatsapp,
        address: site.contact.address,
      },
      social: {
        instagram: site.social.instagram,
        facebook: site.social.facebook,
        linkedin: site.social.linkedin,
        youtube: site.social.youtube,
        tiktok: site.social.tiktok,
      },
      business: {
        type: site.business.type,
        areaServed: site.business.areaServed,
        currency: site.business.currency,
      },
    },

    theme: {
      id: theme.id,
      name: theme.name,
      industry: "photography",
      variant: "luxury",
    },

    navigation: {
      primary: site.navigation.primary,
      services: site.navigation.services,
      cta: site.navigation.cta,
    },

    footer: {
      description: site.footer.description,
      columns: site.footer.columns,
      copyright: site.footer.copyright,
      seoLine: site.footer.seoLine,
    },

    pages: [
      {
        id: "home",
        slug: "/",
        type: "home",
        title: "Home",
        status: "published",
        seo: {
          title: theme.seo.title,
          description: theme.seo.description,
          keywords: theme.seo.keywords,
          canonical: site.domain.canonicalUrl,
        },
        sections: [],
      },
      {
        id: "portfolio",
        slug: "/portfolio",
        type: "portfolio",
        title: "Portfolio",
        status: "published",
        seo: {
          title: "Portfolio",
          description: "Photography portfolio.",
        },
        sections: [],
      },
      {
        id: "about",
        slug: "/about",
        type: "about",
        title: "About",
        status: "published",
        seo: {
          title: "About",
          description: "About the photographer and studio.",
        },
        sections: [],
      },
      {
        id: "contact",
        slug: "/contact",
        type: "contact",
        title: "Contact",
        status: "published",
        seo: {
          title: "Contact",
          description: "Contact the studio.",
        },
        sections: [],
      },
    ],

    collections: {
      services: theme.services.map((service, index) => ({
        id: `service-${index + 1}`,
        slug: service.href,
        title: service.title,
        navLabel: service.title,
        shortDescription: service.description,
        seo: {
          title: service.title,
          description: service.description,
        },
        isVisible: true,
        sortOrder: index + 1,
      })),
      portfolio: theme.portfolio.map((item, index) => ({
        id: `portfolio-${index + 1}`,
        title: item.title,
        category: item.title,
        image: { key: item.image, alt: item.title },
        alt: item.title,
        isFeatured: true,
        sortOrder: index + 1,
      })),
      testimonials: theme.testimonials.map((testimonial, index) => ({
        id: `testimonial-${index + 1}`,
        quote: testimonial.quote,
        author: testimonial.author,
        role: testimonial.role,
        rating: 5,
        isFeatured: true,
      })),
      faqs: [],
    },

    assets: {
      items: [],
    },

    publishing: {
      status: "draft",
      version: 1,
      updatedAt: new Date().toISOString(),
    },
  };
}
