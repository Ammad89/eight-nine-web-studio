export type PageStatus = "draft" | "published" | "archived";

export type PageType =
  | "home"
  | "about"
  | "contact"
  | "portfolio"
  | "service"
  | "blogIndex"
  | "blogPost"
  | "team"
  | "location"
  | "legal"
  | "custom";

export type SectionType =
  | "hero"
  | "text"
  | "imageText"
  | "gallery"
  | "portfolioGrid"
  | "servicesGrid"
  | "stats"
  | "testimonials"
  | "faq"
  | "pricing"
  | "timeline"
  | "team"
  | "contact"
  | "cta"
  | "logos"
  | "map"
  | "blogFeed"
  | "featureGrid"
  | "comparison"
  | "video";

export interface AssetRef {
  id?: string;
  key?: string;
  url?: string;
  alt?: string;
}

export interface SiteSettings {
  id: string;
  name: string;
  businessName: string;
  ownerName?: string;
  tagline?: string;
  logo?: AssetRef;
  favicon?: AssetRef;
  domain: {
    primary: string;
    canonicalUrl: string;
  };
  contact: {
    email?: string;
    phone?: string;
    phoneDisplay?: string;
    whatsapp?: string;
    address?: string;
  };
  social: {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
    youtube?: string;
    tiktok?: string;
  };
  business: {
    type?: string;
    areaServed?: string[];
    currency?: string;
  };
}

export interface ThemeSettings {
  id: string;
  name: string;
  industry?: string;
  variant?: string;
  colors?: Record<string, string>;
  typography?: {
    headingFont?: string;
    bodyFont?: string;
  };
  layout?: {
    borderRadius?: "none" | "soft" | "rounded" | "pill";
    spacing?: "compact" | "standard" | "spacious";
    animation?: "none" | "subtle" | "editorial";
  };
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  isVisible: boolean;
  sortOrder: number;
  children?: NavigationItem[];
}

export interface NavigationSettings {
  primary: NavigationItem[];
  services?: NavigationItem[];
  cta?: NavigationItem;
}

export interface FooterColumn {
  title: string;
  links: NavigationItem[];
}

export interface FooterSettings {
  description?: string;
  columns?: FooterColumn[];
  copyright?: string;
  seoLine?: string;
}

export interface SeoSettings {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  noIndex?: boolean;
  schemaType?: string;
}

export interface PageSection {
  id: string;
  type: SectionType;
  variant?: string;
  visible: boolean;
  sortOrder: number;
  data: Record<string, unknown>;
}

export interface PageDefinition {
  id: string;
  slug: string;
  type: PageType;
  title: string;
  status: PageStatus;
  seo: SeoSettings;
  sections: PageSection[];
}

export interface ServiceCollectionItem {
  id: string;
  slug: string;
  title: string;
  navLabel?: string;
  shortDescription: string;
  longDescription?: string;
  image?: AssetRef;
  gallery?: AssetRef[];
  seo: SeoSettings;
  isVisible: boolean;
  sortOrder: number;
}

export interface PortfolioCollectionItem {
  id: string;
  title: string;
  category: string;
  image: AssetRef;
  alt: string;
  linkedServiceId?: string;
  isFeatured?: boolean;
  sortOrder: number;
}

export interface TestimonialCollectionItem {
  id: string;
  quote: string;
  author: string;
  role?: string;
  rating?: number;
  linkedServiceIds?: string[];
  isFeatured?: boolean;
}

export interface FaqCollectionItem {
  id: string;
  question: string;
  answer: string;
  linkedServiceIds?: string[];
  category?: string;
  sortOrder: number;
}

export interface WebsiteCollections {
  services: ServiceCollectionItem[];
  portfolio: PortfolioCollectionItem[];
  testimonials: TestimonialCollectionItem[];
  faqs: FaqCollectionItem[];
}

export interface AssetItem {
  id: string;
  type: "image" | "video" | "document" | "icon";
  source: "local" | "remote" | "supabase";
  url?: string;
  localKey?: string;
  alt?: string;
  title?: string;
  tags?: string[];
}

export interface AssetLibrary {
  items: AssetItem[];
}

export interface PublishingMeta {
  status: "draft" | "published";
  version: number;
  updatedAt: string;
  updatedBy?: string;
  publishedAt?: string;
  publishedBy?: string;
}

export interface WebsiteSchema {
  site: SiteSettings;
  theme: ThemeSettings;
  navigation: NavigationSettings;
  footer: FooterSettings;
  pages: PageDefinition[];
  collections: WebsiteCollections;
  assets: AssetLibrary;
  publishing: PublishingMeta;
}
