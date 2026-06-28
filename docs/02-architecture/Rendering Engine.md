# Rendering Engine

Renderers convert structured data into user-facing UI.

Current renderers:
- ServicePageRenderer
- PortfolioRenderer
- AboutRenderer
- ContactRenderer

Future renderers:
- HomeRenderer
- GenericPageRenderer
- SectionRenderer


## Universal Section Rendering

Build 62 introduced the first universal section renderer.

Current section renderers:
- HeroSectionRenderer

SectionRenderer now routes section.type values to the correct renderer.

Unsupported section types render a safe placeholder.


## GenericPageRenderer

Build 63 introduced GenericPageRenderer.

GenericPageRenderer converts a WebsiteSchema PageDefinition into a rendered page by:
1. Reading SEO metadata
2. Sorting visible sections
3. Passing each section to SectionRenderer
4. Rendering an empty-page placeholder when no sections exist

This is the foundation for CMS-created pages.


## Schema Preview Route

Build 64 introduced a safe route for testing GenericPageRenderer.

This route does not replace public pages. It exists so schema-driven rendering can be tested before migration.


## TextSectionRenderer

The second universal renderer.

WebsiteSchema text sections now render through SectionRenderer.


## CtaSectionRenderer

The third universal renderer.

WebsiteSchema CTA sections now render through SectionRenderer.


## ImageTextSectionRenderer

Build 67 introduced the universal Image/Text renderer.

WebsiteSchema imageText sections now render through SectionRenderer.


## CollectionSectionRenderer

Build 68 introduced the first universal collection renderer.

Collection-driven section types now route through CollectionSectionRenderer:
- servicesGrid
- portfolioGrid
- testimonials
- faq
