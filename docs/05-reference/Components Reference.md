# Components Reference

Current important components:
- Nav
- Footer
- BookingCTA
- SEO
- FAQAccordion

Current important renderers:
- ServicePageRenderer
- PortfolioRenderer
- AboutRenderer
- ContactRenderer


## Universal Section Components

### HeroSectionRenderer

Renders WebsiteSchema hero sections.

### SectionRenderer

Routes PageSection records to the matching section renderer.


## GenericPageRenderer

Renders a WebsiteSchema PageDefinition.

Inputs:
- page: PageDefinition

Responsibilities:
- SEO
- Section ordering
- Section rendering
- Empty page fallback


### TextSectionRenderer

Purpose:
Render reusable rich text sections from WebsiteSchema.


### CtaSectionRenderer

Purpose:
Render reusable call-to-action sections from WebsiteSchema.


### ImageTextSectionRenderer

Purpose:
Render reusable editorial image and text sections from WebsiteSchema.


### CollectionSectionRenderer

Purpose:
Render reusable collection-backed sections from WebsiteSchema.

Supported collection sources:
- services
- portfolio
- testimonials
- faqs
