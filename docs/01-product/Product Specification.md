# Product Specification

This document will become the master feature specification for Eight Nine Web Studio.

## Current Product Areas

- Website creation
- Site settings
- Theme settings
- Navigation
- Footer
- Pages
- Collections
- Media
- Publishing
- Version history
- User permissions
- Multi-site management


## Platform Pages Manager

Status: Started

Capabilities:
- View WebsiteSchema pages
- Edit title
- Edit slug
- Edit page type
- Edit page status
- Edit SEO title
- Edit SEO description
- Edit SEO keywords
- Edit canonical URL
- Duplicate page
- Delete page
- Add new custom page

Current limitation:
Sections are displayed as a count only. Section editing will be added later.


## Platform Sections Manager

Status: Started

Capabilities:
- Select a WebsiteSchema page
- Add a section
- Delete a section
- Duplicate a section
- Move a section up or down
- Change section type
- Change variant
- Change sort order
- Toggle visibility
- Edit raw section data JSON

Current limitation:
Section-specific visual editors and universal rendering are future builds.


## Universal Hero Section Renderer

Status: Started

Capabilities:
- Eyebrow
- Title
- Subtitle
- Primary CTA
- Secondary CTA
- Optional background image
- Left or center alignment

Current limitation:
Hero section data is edited as raw JSON in the Sections tab until a visual Hero editor is added.


## Generic Page Renderer

Status: Started

Capabilities:
- Accepts a PageDefinition
- Reads page SEO metadata
- Sorts page sections by sortOrder
- Renders visible sections through SectionRenderer
- Shows an empty-page placeholder when no sections exist

Current limitation:
No public route has been switched fully to GenericPageRenderer yet.


## Schema Preview Route

Status: Started

Capabilities:
- Preview a WebsiteSchema page by page id
- Preview a WebsiteSchema page by slug without leading slash
- Render through GenericPageRenderer
- Show a safe not-found state

Current route:
- /schema-preview/:pageId

Purpose:
Allows testing WebsiteSchema-rendered pages before switching public routes.


## Universal Text Section Renderer

Status: Started

Capabilities:
- Eyebrow
- Heading
- Rich paragraphs
- Alignment
- Configurable content width


## Universal CTA Section Renderer

Status: Started

Capabilities:
- Eyebrow
- Heading
- Subtitle
- Primary CTA
- Secondary CTA
- Light or dark tone
- Left or center alignment


## Universal Image/Text Section Renderer

Status: Started

Capabilities:
- Eyebrow
- Heading
- Paragraph content
- Image
- Image alt text
- Left or right image position
- Optional CTA


## Universal Collection Section Renderer

Status: Started

Capabilities:
- Render services
- Render portfolio items
- Render testimonials
- Render FAQs
- Featured-only filtering
- Category filtering
- Maximum item count
- Empty state
- Optional CTA


## Section Starter Templates

Status: Started

Capabilities:
- New sections are created with useful starter data.
- Changing section type resets the section data to a matching starter template.
- Supported starter templates include hero, text, imageText, CTA, servicesGrid, portfolioGrid, testimonials and FAQ.
