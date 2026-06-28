# Website Builder

The Website Builder will allow users to create pages from reusable sections.

Future sections:
- Hero
- Text
- Gallery
- Services
- Portfolio
- Testimonials
- FAQ
- CTA
- Contact


## Hero Section

The Hero section is the first universal WebsiteSchema-rendered section.

Supported fields:
- eyebrow
- title
- subtitle
- primaryCtaLabel
- primaryCtaHref
- secondaryCtaLabel
- secondaryCtaHref
- image
- imageAlt
- align


## Generic Pages

A page can now be rendered from WebsiteSchema using GenericPageRenderer.

A page requires:
- SEO data
- A slug
- A title
- One or more sections

If no sections exist, an empty page placeholder is shown.


## Preview schema pages

A user or developer can preview WebsiteSchema pages using:

/schema-preview/page-id

Example:

/schema-preview/about

This allows testing sections before making a schema page live.


## Text Sections

Supported WebsiteSchema fields:

- eyebrow
- title
- content
- align
- maxWidth


## CTA Sections

Supported WebsiteSchema fields:

- eyebrow
- title
- subtitle
- primaryCtaLabel
- primaryCtaHref
- secondaryCtaLabel
- secondaryCtaHref
- tone
- align


## Image/Text Sections

Supported WebsiteSchema fields:

- eyebrow
- title
- content
- image
- imageAlt
- imagePosition
- ctaLabel
- ctaHref


## Collection Sections

Collection sections can display reusable content from WebsiteSchema collections.

Supported collections:
- services
- portfolio
- testimonials
- faqs

Supported fields:
- eyebrow
- title
- subtitle
- collection
- maxItems
- featuredOnly
- category
- layout
- ctaLabel
- ctaHref


## Section starter templates

When a user adds a section, the platform now fills in starter content automatically.

This makes schema sections easier to preview and reduces the need to write JSON from scratch.
