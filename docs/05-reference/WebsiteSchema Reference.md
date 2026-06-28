# WebsiteSchema Reference

See src/cms-core/platform/schema.ts for the current implementation.

Primary objects:
- WebsiteSchema
- SiteSettings
- ThemeSettings
- NavigationSettings
- FooterSettings
- PageDefinition
- PageSection
- WebsiteCollections
- AssetLibrary
- PublishingMeta


## PageDefinition

A page contains:

- id
- slug
- type
- title
- status
- seo
- sections

The Platform Pages Manager currently edits the core PageDefinition fields and SEO metadata.


## PageSection

A section contains:

- id
- type
- variant
- visible
- sortOrder
- data

The Platform Sections Manager edits these fields directly.


## Section Templates

Default section data is provided by:

src/cms-core/platform/section-templates.ts

The helper is:

getDefaultSectionData(type)
