export type CmsRole = "owner" | "admin" | "editor" | "viewer";

export type CmsVersionStatus = "draft" | "published" | "archived";

export type CmsFieldType =
  | "text"
  | "textarea"
  | "richText"
  | "image"
  | "video"
  | "link"
  | "color"
  | "font"
  | "number"
  | "boolean"
  | "select"
  | "repeater";

export type CmsBlockType =
  | "hero"
  | "text"
  | "imageText"
  | "gallery"
  | "cards"
  | "testimonials"
  | "pricing"
  | "faq"
  | "stats"
  | "cta"
  | "custom";

export interface CmsSite {
  id: string;
  siteKey: string;
  name: string;
  domain?: string;
  defaultLocale: string;
}

export interface CmsTheme {
  colors: {
    background: string;
    foreground: string;
    primary: string;
    secondary: string;
    muted: string;
    border: string;
  };
  typography: {
    headingFont: string;
    bodyFont: string;
    baseFontSize: number;
    headingScale: number;
    lineHeight: number;
  };
  layout: {
    containerWidth: number;
    sectionPadding: number;
    borderRadius: number;
  };
  buttons: {
    radius: number;
    uppercase: boolean;
  };
  images: {
    defaultRadius: number;
    defaultOverlayOpacity: number;
  };
}

export interface CmsNavigationItem {
  id: string;
  label: string;
  href: string;
  isVisible: boolean;
  sortOrder: number;
}

export interface CmsFooter {
  logoUrl?: string;
  text?: string;
  navigation: CmsNavigationItem[];
  socialLinks: CmsNavigationItem[];
  copyrightText?: string;
}

export interface CmsSiteSettings {
  logoUrl?: string;
  logoAlt?: string;
  navigation: CmsNavigationItem[];
  footer: CmsFooter;
  contact: {
    email?: string;
    phone?: string;
    whatsapp?: string;
    address?: string;
  };
  seo: {
    defaultTitle: string;
    defaultDescription: string;
    ogImageUrl?: string;
  };
}

export interface CmsMediaAsset {
  id: string;
  publicUrl: string;
  alt?: string;
  caption?: string;
  folder?: string;
  mimeType?: string;
  sizeBytes?: number;
  width?: number;
  height?: number;
}

export interface CmsFieldOption {
  label: string;
  value: string;
}

export interface CmsFieldDefinition {
  id: string;
  label: string;
  type: CmsFieldType;
  required?: boolean;
  helpText?: string;
  options?: CmsFieldOption[];
  defaultValue?: unknown;
}

export interface CmsBlockDefinition {
  type: CmsBlockType;
  label: string;
  description?: string;
  fields: CmsFieldDefinition[];
}

export interface CmsBlock {
  id: string;
  type: CmsBlockType;
  label: string;
  isVisible: boolean;
  fields: Record<string, unknown>;
  style?: Record<string, unknown>;
}

export interface CmsPage {
  id: string;
  slug: string;
  title: string;
  navLabel: string;
  seoTitle?: string;
  seoDescription?: string;
  isVisibleInNav: boolean;
  blocks: CmsBlock[];
}

export interface CmsVersion<T> {
  id: string;
  versionNumber: number;
  status: CmsVersionStatus;
  data: T;
  createdBy?: string;
  createdAt: string;
  publishedAt?: string;
  publishNote?: string;
}

export interface CmsAuditEntry {
  id: string;
  action: string;
  entityType: string;
  entityId?: string;
  details: Record<string, unknown>;
  createdAt: string;
  actorId?: string;
}
