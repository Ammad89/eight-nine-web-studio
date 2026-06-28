# Eight Nine Web Studio Platform Blueprint

## Purpose

Eight Nine Web Studio is being built as a reusable website platform, not a single client website.

The platform should allow Eight Nine Global to launch high-quality client websites faster by reusing:

- Theme engine
- Site configuration
- Page renderers
- Section renderers
- CMS editing tools
- Publishing workflow
- Deployment workflow

The current Eight Nine Photography website is the first implementation of the platform.

## Product Goal

The long-term goal is to let Eight Nine Global create a new website by configuring:

- Business name
- Owner or team
- Industry
- Brand colors
- Typography
- Logo
- Navigation
- Pages
- Services
- Portfolio
- Testimonials
- FAQs
- Contact details
- SEO metadata
- Theme selection

The platform should reduce future website builds from repeated manual development into a structured setup and content editing process.

## Core Principle

The design system should remain reusable.

The website identity should remain configurable.

The CMS should edit content and settings.

The live website should render from published data.

## Current Architecture

The current reusable branch is:

reusable-theme-v1

Current layers:

- app
- theme-engine
- themes
- sites
- cms-core
- docs

## Layer 1: App Layer

Location:

src/app

Purpose:

The app layer contains route definitions, page wrappers and shared application shell components.

Long-term role:

The app layer should become thinner over time.

Pages should not contain business-specific copy, images, SEO or content collections. They should mostly import renderers and data.

Current examples:

- Home.tsx
- Portfolio.tsx
- FamilyPhotography.tsx
- PetPhotography.tsx
- PersonalBranding.tsx
- EventPhotography.tsx
- WeddingPhotography.tsx
- About.tsx
- Contact.tsx

Current direction:

Most service pages have already been reduced to thin wrappers around ServicePageRenderer.

## Layer 2: Theme Engine

Location:

src/theme-engine

Purpose:

The theme engine is the bridge between application pages and theme/site data.

Current responsibilities:

- Provide the active theme
- Provide the active site
- Resolve theme assets
- Render reusable page types

Current files:

- active-theme.ts
- active-site.ts
- index.ts
- renderers/ServicePageRenderer.tsx
- renderers/PortfolioRenderer.tsx
- renderers/AboutRenderer.tsx
- renderers/ContactRenderer.tsx

Long-term responsibilities:

- Domain-based site selection
- Environment-based site selection
- CMS-published theme loading
- Theme switching
- Preview mode
- Draft vs published rendering
- Section renderer registry
- Theme variant selection

## Layer 3: Themes

Location:

src/themes

Current theme:

src/themes/eight-nine-luxury

Purpose:

A theme defines how a website looks and what content structures it supports.

A theme may include:

- Typography defaults
- Layout conventions
- Page data
- Section data
- Asset mappings
- Renderer-compatible page schemas
- Default content

Current Eight Nine Luxury files:

- theme.ts
- types.ts
- assets.ts
- index.ts
- pages/home data is currently still partly inside theme.ts
- pages/family.ts
- pages/pet.ts
- pages/personal-branding.ts
- pages/event.ts
- pages/wedding.ts
- pages/portfolio.ts
- pages/about.ts
- pages/contact.ts

Important rule:

Themes should not contain site-specific infrastructure details such as domain routing, deployment paths or database credentials.

## Layer 4: Sites

Location:

src/sites

Current site:

src/sites/eight-nine-photography

Purpose:

A site defines whose website this is.

The site configuration owns:

- Brand name
- Owner name
- Logo
- Favicon
- Domain
- Canonical URL
- Contact details
- Social links
- Business metadata
- Navigation
- Footer

Current files:

- site.ts
- navigation.ts
- footer.ts
- index.ts

Important distinction:

Theme answers:

How should this website look?

Site config answers:

Whose website is this?

## Layer 5: CMS Core

Location:

src/cms-core

Purpose:

The CMS core contains reusable editing tools that should eventually work across many client websites.

Current capabilities:

- Dashboard shell
- Pages panel
- Blocks panel
- Fields panel
- Theme panel
- Site settings panel
- Media library
- Version history
- Local restore
- Supabase publishing helpers

Current status:

CMS V2 is functional, authenticated and admin protected, but it is not yet fully connected to the new theme/site data model.

Next major CMS goal:

Make Dashboard V2 edit the new platform schema instead of the older block-based editor state.

## Layer 6: Publishing

Current publishing table:

public.cms_site_snapshots

Current snapshot IDs:

- draft
- published

Current behavior:

Dashboard V2 can publish the current CMS state to Supabase.

Next publishing goal:

The public website should load the published snapshot and merge it with the active theme and active site.

Long-term publishing requirements:

- Draft state
- Published state
- Version history
- Rollback
- Preview drafts
- Per-site publishing
- Per-domain snapshot selection
- Scheduled publishing
- Audit trail

## Universal Website Schema

The platform should evolve toward a universal schema.

Suggested top-level structure:

Website
  SiteSettings
  ThemeSettings
  Navigation
  Footer
  Pages
  Collections
  Assets
  SEO
  Publishing

## Pages

Pages define layout and section order.

Examples:

- Home
- About
- Contact
- Portfolio
- Service page
- Team
- Blog index
- Blog post
- Location page
- Legal page
- Custom page

Long-term page structure:

page:
  id
  slug
  title
  seo
  sections

## Sections

A page should eventually be a sequence of sections.

Example:

Home:
  Hero
  Stats
  Services
  Portfolio
  Testimonials
  FAQ
  CTA

Each section should have:

- id
- type
- visible
- data
- style options
- variant

## Section Library

The reusable section library should eventually include:

- Hero
- Text block
- Image text
- Gallery
- Portfolio grid
- Services grid
- Testimonials
- FAQ
- Pricing
- Stats
- Timeline
- Team
- Contact
- CTA
- Logos
- Map
- Blog feed
- Feature grid
- Comparison table
- Video
- Download lead magnet
- Newsletter signup

## Collections

Collections define repeatable content used by pages.

Suggested collections:

- Services
- Portfolio items
- Testimonials
- FAQs
- Team members
- Locations
- Blog posts
- Pricing packages
- Case studies
- Partners
- Awards
- Galleries

A service page should eventually be generated from a service collection item plus a service page template.

## Renderer Strategy

Renderers convert data into UI.

Current renderers:

- ServicePageRenderer
- PortfolioRenderer
- AboutRenderer
- ContactRenderer

Future renderers:

- HomeRenderer
- BlogRenderer
- TeamRenderer
- LocationRenderer
- GenericPageRenderer
- SectionRenderer

Renderer rules:

- Renderers should not contain client-specific copy.
- Renderers should not import client-specific images directly.
- Renderers should receive data and resolve assets through the theme engine.
- Renderers should use site config for brand, contact and domain values.
- Renderers should preserve visual consistency across websites using the same theme.

## Asset Strategy

Current strategy:

Theme data stores asset keys.

Theme asset resolver maps keys to imported optimized assets.

Current resolver:

src/themes/eight-nine-luxury/assets.ts

Future strategy:

Support both:

- Local optimized assets
- Supabase media URLs

Resolver should accept:

- asset key
- local import mapping
- remote URL
- fallback

## Site Creation Workflow

Future "Create Website" flow:

1. Enter business name
2. Choose industry
3. Choose theme
4. Upload logo
5. Add contact details
6. Select pages
7. Generate starter content
8. Edit in CMS
9. Publish
10. Point domain

The long-term target is to make a new site launchable without editing React code.

## Multi-Site Roadmap

Current state:

One active site is hardcoded through getActiveSite().

Future state:

getActiveSite() should select by:

- current domain
- environment variable
- route prefix
- Supabase site record
- preview parameter

Future database tables may include:

- sites
- site_domains
- site_users
- site_snapshots
- site_assets
- site_versions
- site_theme_settings

## Security Requirements

CMS access should require:

- Supabase login
- Admin authorization
- Per-site permissions
- Audit trail for publishing
- Role-based access later

Roles could include:

- owner
- admin
- editor
- viewer

## Deployment Strategy

Current live client site must not be disrupted.

Development should happen on:

reusable-theme-v1

Recommended staging webroot:

/var/www/eight-nine-theme

Recommended staging subdomain:

theme.eightnineglobal.com

Current live EHRAY site should remain untouched unless explicitly deploying approved changes.

## Documentation Strategy

The build log records what changed.

This blueprint records why the platform exists and where it is going.

Future recommended docs:

- CMS schema specification
- Theme authoring guide
- Renderer authoring guide
- Section library guide
- Database schema guide
- Deployment guide
- New client onboarding guide

## Current Milestone

Reusable theme architecture version 1 is mostly complete for the photography theme.

Completed:

- Theme engine
- Site config engine
- Asset resolver
- Home page theme migration
- Service page renderer
- Portfolio renderer
- About renderer
- Contact renderer
- Dedicated About route
- Dedicated Contact route
- Shared navigation from site config
- Shared footer from site config

Next recommended milestone:

Connect Dashboard V2 to edit the new theme/site schema rather than the older block-based CMS structure.
