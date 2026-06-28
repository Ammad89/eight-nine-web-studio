import type { CmsTheme, CmsSiteSettings } from "../cms-core/types";

export const defaultTheme: CmsTheme = {
  colors: {
    background: "#f7f3ee",
    foreground: "#1f1a17",
    primary: "#1f1a17",
    secondary: "#ede5db",
    muted: "#8a7f75",
    border: "#d8cec3",
  },

  typography: {
    headingFont: "Lora, Georgia, serif",
    bodyFont: "Inter, Arial, sans-serif",
    baseFontSize: 16,
    headingScale: 1.25,
    lineHeight: 1.6,
  },

  layout: {
    containerWidth: 1280,
    sectionPadding: 96,
    borderRadius: 24,
  },

  buttons: {
    radius: 999,
    uppercase: true,
  },

  images: {
    defaultRadius: 24,
    defaultOverlayOpacity: 0.45,
  },
};

export const defaultSiteSettings: CmsSiteSettings = {
  logoUrl: "",
  logoAlt: "EHRay Photography",

  navigation: [
    { id: "nav-home", label: "Home", href: "/", isVisible: true, sortOrder: 1 },
    { id: "nav-portfolio", label: "Portfolio", href: "/portfolio", isVisible: true, sortOrder: 2 },
    { id: "nav-family", label: "Family", href: "/family-photography", isVisible: true, sortOrder: 3 },
    { id: "nav-pets", label: "Pets", href: "/pet-photography", isVisible: true, sortOrder: 4 },
    { id: "nav-branding", label: "Branding", href: "/personal-branding", isVisible: true, sortOrder: 5 },
    { id: "nav-events", label: "Events", href: "/event-photography", isVisible: true, sortOrder: 6 },
    { id: "nav-weddings", label: "Weddings", href: "/wedding-photography", isVisible: true, sortOrder: 7 },
  ],

  footer: {
    logoUrl: "",
    text: "Natural light lifestyle photography across the UAE.",
    navigation: [
      { id: "footer-home", label: "Home", href: "/", isVisible: true, sortOrder: 1 },
      { id: "footer-portfolio", label: "Portfolio", href: "/portfolio", isVisible: true, sortOrder: 2 },
      { id: "footer-contact", label: "Contact", href: "/#contact", isVisible: true, sortOrder: 3 },
    ],
    socialLinks: [],
    copyrightText: "© EHRay Photography. All rights reserved.",
  },

  contact: {
    email: "",
    phone: "",
    whatsapp: "",
    address: "United Arab Emirates",
  },

  seo: {
    defaultTitle: "EHRay Photography Dubai | Natural Light Lifestyle Photography UAE",
    defaultDescription: "Natural light lifestyle photographer in Dubai, UAE. Authentic family, pet, personal branding and event photography.",
    ogImageUrl: "",
  },
};
