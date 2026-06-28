export type CmsElementType =
  | "eyebrow"
  | "heading"
  | "text"
  | "image"
  | "button"
  | "stat"
  | "testimonial"
  | "package"
  | "listItem";

export type CmsSectionType =
  | "hero"
  | "content"
  | "gallery"
  | "cards"
  | "stats"
  | "testimonials"
  | "pricing"
  | "cta";

export interface CmsElement {
  id: string;
  type: CmsElementType;
  label: string;
  text: string;
  imageUrl?: string;
  alt?: string;
  href?: string;
}

export interface CmsSection {
  id: string;
  type: CmsSectionType;
  title: string;
  subtitle?: string;
  elements: CmsElement[];
}

export interface CmsPage {
  id: string;
  slug: string;
  title: string;
  navLabel: string;
  status: "draft" | "published";
  seoTitle: string;
  seoDescription: string;
  sections: CmsSection[];
}

export interface CmsContent {
  version: number;
  updatedAt: string;
  pages: CmsPage[];
}
