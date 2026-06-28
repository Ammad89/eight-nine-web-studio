# Product Decisions

## WebsiteSchema

Decision:
Use WebsiteSchema as the central data model.

Reason:
A universal schema allows one CMS to power many websites and themes.

## Snapshot publishing

Decision:
Use snapshot-based publishing.

Reason:
Snapshots are simple, reversible and compatible with draft/published workflows.

## Renderer-based themes

Decision:
Use reusable renderers instead of duplicating page components.

Reason:
This reduces repeated code and makes future client websites faster to build.


## WebsiteSchema-native pages

Decision:
Build a new Pages Manager that edits WebsiteSchema pages directly instead of extending the legacy block editor.

Reason:
The platform needs a universal page model that can support many themes and industries.


## Section manager first, visual editors later

Decision:
Build a raw section manager before section-specific visual editors.

Reason:
The platform needs reliable section creation, ordering, duplication and persistence before investing in polished editors.


## Universal section rendering

Decision:
Start universal section rendering with the Hero section.

Reason:
Hero sections appear on nearly every website and prove the pattern before expanding into text, CTA, gallery and collection-driven sections.


## Generic page rendering

Decision:
Create GenericPageRenderer to render WebsiteSchema pages by looping through sections.

Reason:
New website pages should become CMS data, not custom React components.


## Preview before migration

Decision:
Add a schema preview route before replacing public routes.

Reason:
Schema rendering can be tested safely without disrupting the existing public website.


## Universal text renderer

The text renderer is intentionally generic so it can power About pages, service introductions, legal pages and landing page copy without custom React code.


## Universal CTA renderer

The CTA renderer gives every future site a reusable conversion block for enquiries, bookings, lead magnets and contact prompts.


## Universal image/text renderer

Decision:
Add a reusable Image/Text renderer after Hero, Text and CTA.

Reason:
Most client websites need editorial sections for About, services, case studies and landing pages.


## Universal collection renderer

Decision:
Create one collection renderer before building separate services, portfolio, testimonials and FAQ renderers.

Reason:
Most section types share the same collection lookup, filtering and empty-state logic. A shared renderer reduces duplication and accelerates future section development.


## Section starter templates

Decision:
Add starter data for every common section type.

Reason:
A CMS user should not need to write raw JSON to understand how a section works.
