import type { CmsBlockDefinition } from "./types";

export const cmsBlockLibrary: CmsBlockDefinition[] = [
  {
    type: "hero",
    label: "Hero",
    description: "Top page section with headline, copy, image and button.",
    fields: [
      { id: "eyebrow", label: "Eyebrow", type: "text" },
      { id: "headline", label: "Headline", type: "textarea", required: true },
      { id: "subheadline", label: "Subheadline", type: "textarea" },
      { id: "backgroundImage", label: "Background Image", type: "image" },
      { id: "imageAlt", label: "Image Alt Text", type: "text" },
      { id: "buttonText", label: "Button Text", type: "text" },
      { id: "buttonLink", label: "Button Link", type: "link" },
      { id: "overlayOpacity", label: "Overlay Transparency", type: "number", defaultValue: 0.45 },
      { id: "textAlign", label: "Text Alignment", type: "select", options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
        { label: "Right", value: "right" },
      ] },
    ],
  },
  {
    type: "text",
    label: "Text Section",
    description: "Simple text section with heading and body copy.",
    fields: [
      { id: "eyebrow", label: "Eyebrow", type: "text" },
      { id: "heading", label: "Heading", type: "textarea", required: true },
      { id: "body", label: "Body", type: "richText" },
      { id: "backgroundColor", label: "Background Color", type: "color" },
    ],
  },
  {
    type: "imageText",
    label: "Image + Text",
    description: "Two-column image and text section.",
    fields: [
      { id: "eyebrow", label: "Eyebrow", type: "text" },
      { id: "heading", label: "Heading", type: "textarea", required: true },
      { id: "body", label: "Body", type: "richText" },
      { id: "image", label: "Image", type: "image" },
      { id: "imageAlt", label: "Image Alt Text", type: "text" },
      { id: "imagePosition", label: "Image Position", type: "select", options: [
        { label: "Left", value: "left" },
        { label: "Right", value: "right" },
      ] },
    ],
  },
  {
    type: "gallery",
    label: "Gallery",
    description: "A grid of images.",
    fields: [
      { id: "eyebrow", label: "Eyebrow", type: "text" },
      { id: "heading", label: "Heading", type: "textarea" },
      { id: "images", label: "Images", type: "repeater" },
      { id: "columns", label: "Columns", type: "select", options: [
        { label: "2 Columns", value: "2" },
        { label: "3 Columns", value: "3" },
        { label: "4 Columns", value: "4" },
      ] },
    ],
  },
  {
    type: "cards",
    label: "Cards / Services Grid",
    description: "Reusable card grid for services, features or links.",
    fields: [
      { id: "eyebrow", label: "Eyebrow", type: "text" },
      { id: "heading", label: "Heading", type: "textarea" },
      { id: "intro", label: "Intro", type: "textarea" },
      { id: "cards", label: "Cards", type: "repeater" },
    ],
  },
  {
    type: "testimonials",
    label: "Testimonials",
    description: "Client quotes and reviews.",
    fields: [
      { id: "eyebrow", label: "Eyebrow", type: "text" },
      { id: "heading", label: "Heading", type: "textarea" },
      { id: "intro", label: "Intro", type: "textarea" },
      { id: "testimonials", label: "Testimonials", type: "repeater" },
    ],
  },
  {
    type: "pricing",
    label: "Pricing",
    description: "Pricing packages or service plans.",
    fields: [
      { id: "eyebrow", label: "Eyebrow", type: "text" },
      { id: "heading", label: "Heading", type: "textarea" },
      { id: "intro", label: "Intro", type: "textarea" },
      { id: "packages", label: "Packages", type: "repeater" },
    ],
  },
  {
    type: "faq",
    label: "FAQ",
    description: "Frequently asked questions.",
    fields: [
      { id: "eyebrow", label: "Eyebrow", type: "text" },
      { id: "heading", label: "Heading", type: "textarea" },
      { id: "faqs", label: "Questions", type: "repeater" },
    ],
  },
  {
    type: "stats",
    label: "Stats",
    description: "Numbers and credibility metrics.",
    fields: [
      { id: "eyebrow", label: "Eyebrow", type: "text" },
      { id: "heading", label: "Heading", type: "textarea" },
      { id: "stats", label: "Stats", type: "repeater" },
    ],
  },
  {
    type: "cta",
    label: "Call To Action",
    description: "Conversion section with headline, text and button.",
    fields: [
      { id: "headline", label: "Headline", type: "textarea", required: true },
      { id: "subtext", label: "Subtext", type: "textarea" },
      { id: "buttonText", label: "Button Text", type: "text" },
      { id: "buttonLink", label: "Button Link", type: "link" },
      { id: "backgroundColor", label: "Background Color", type: "color" },
    ],
  },
  {
    type: "custom",
    label: "Contact",
    description: "Contact details and enquiry CTA.",
    fields: [
      { id: "headline", label: "Headline", type: "textarea" },
      { id: "subtext", label: "Subtext", type: "textarea" },
      { id: "email", label: "Email", type: "text" },
      { id: "phone", label: "Phone", type: "text" },
      { id: "whatsapp", label: "WhatsApp", type: "text" },
    ],
  },
];
