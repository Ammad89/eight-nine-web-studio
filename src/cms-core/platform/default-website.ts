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
        sections: [
          {
            id: "home-hero",
            type: "hero",
            label: "Hero",
            sortOrder: 1,
            visible: true,
            data: {
              eyebrow: "Eight Nine Web Studio",
              title: "Build beautiful client websites from one reusable platform.",
              subtitle: "A modular website system for launching branded websites with editable pages, sections, navigation, collections and publishing.",
              primaryCtaLabel: "Open Dashboard",
              primaryCtaHref: "/dashboard-v2",
              secondaryCtaLabel: "View Schema Preview",
              secondaryCtaHref: "/schema-preview/home",
              image: "family-hero",
              imageAlt: "Website platform hero image",
              align: "left",
            },
          },
          {
            id: "home-about",
            type: "imageText",
            label: "Platform Introduction",
            sortOrder: 2,
            visible: true,
            data: {
              eyebrow: "Reusable Foundation",
              title: "One system. Many websites.",
              content: "Eight Nine Web Studio is being built as a reusable website platform for client projects. Instead of rebuilding every website from scratch, each site can be assembled from structured pages, reusable sections, editable collections and controlled brand settings.\n\nThis foundation allows future client websites to launch faster while keeping design quality, content structure and publishing workflows consistent.",
              image: "about-portrait",
              imageAlt: "Ammad portrait",
              imagePosition: "right",
              ctaLabel: "Manage Pages",
              ctaHref: "/dashboard-v2",
            },
          },
          {
            id: "home-services",
            type: "servicesGrid",
            label: "Services Collection",
            sortOrder: 3,
            visible: true,
            data: {
              eyebrow: "CMS Collections",
              title: "Reusable content blocks for every client site.",
              subtitle: "Services, portfolio items, testimonials and FAQs can be managed once and rendered across multiple pages.",
              collection: "services",
              maxItems: 6,
              featuredOnly: false,
              layout: "grid",
              ctaLabel: "Explore Portfolio",
              ctaHref: "/portfolio",
            },
          },
          {
            id: "home-cta",
            type: "cta",
            label: "Call to Action",
            sortOrder: 4,
            visible: true,
            data: {
              eyebrow: "Build 70",
              title: "The visual page builder foundation is now active.",
              subtitle: "This page is rendered from WebsiteSchema using the universal PageRenderer and SectionRenderer.",
              primaryCtaLabel: "Open Dashboard",
              primaryCtaHref: "/dashboard-v2",
              secondaryCtaLabel: "Preview Home",
              secondaryCtaHref: "/schema-preview/home",
              tone: "dark",
              align: "center",
            },
          },
        ],
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
        
        sections: [
          {
            id: "home-hero",
            type: "hero",
            label: "Hero",
            sortOrder: 1,
            visible: true,
            data: {
              eyebrow: "Eight Nine Web Studio",
              title: "Build premium websites without rebuilding every project.",
              subtitle: "A reusable website platform with editable pages, collections, themes and publishing.",
              primaryCtaLabel: "Open Dashboard",
              primaryCtaHref: "/dashboard-v2",
              secondaryCtaLabel: "View Preview",
              secondaryCtaHref: "/schema-preview/home",
              image: "family-hero",
              imageAlt: "Hero",
              align: "left"
            }
          },
          {
            id: "home-about",
            type: "imageText",
            label: "Introduction",
            sortOrder: 2,
            visible: true,
            data: {
              eyebrow: "Reusable Platform",
              title: "One platform powering unlimited client websites.",
              content: "Eight Nine Web Studio separates design from content so every website is assembled from reusable sections instead of bespoke code.\\n\\nEvery page can be edited visually while keeping branding, structure and publishing consistent.",
              image: "about-portrait",
              imageAlt: "Founder",
              imagePosition: "right",
              ctaLabel: "Manage Website",
              ctaHref: "/dashboard-v2"
            }
          },
          {
            id: "home-services",
            type: "servicesGrid",
            label: "Services",
            sortOrder: 3,
            visible: true,
            data: {
              eyebrow: "Collections",
              title: "Reusable CMS collections.",
              subtitle: "Services, portfolio, testimonials and FAQs are all driven from structured collections.",
              collection: "services",
              layout: "grid",
              maxItems: 6,
              ctaLabel: "Explore",
              ctaHref: "/portfolio"
            }
          },
          {
            id: "home-cta",
            type: "cta",
            label: "CTA",
            sortOrder: 4,
            visible: true,
            data: {
              eyebrow: "Website Platform",
              title: "Universal rendering is now active.",
              subtitle: "This page is being rendered from WebsiteSchema instead of handcrafted React pages.",
              primaryCtaLabel: "Dashboard",
              primaryCtaHref: "/dashboard-v2",
              secondaryCtaLabel: "Preview",
              secondaryCtaHref: "/schema-preview/home",
              tone: "dark",
              align: "center"
            }
          }
        ],

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
