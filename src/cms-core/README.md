# CMS Core Vision

## Goal

Build a reusable website builder and CMS that can be dropped into future client projects with minimal customization.

The CMS must not be tied to EHRay Photography.

The CMS should support multiple websites, multiple users, version history, media management, rollback, previews and theme customization.

---

## Core Principles

### Reusable

The CMS engine should be reusable across client projects.

Only project-specific configuration should change.

### Safe

No edit should immediately affect the live site.

Every change must exist as a draft first.

Publishing should create a version that can be rolled back.

### Versioned

Everything should support version history:

* Pages
* Site settings
* Themes
* Navigation
* Media references

### Multi-site

One CMS architecture should support:

* EHRay Photography
* Future client websites
* Internal company projects

using site_id isolation.

---

## CMS Modules

### Dashboard

Provides:

* Login
* Page manager
* Theme manager
* Media library
* Version history
* Publishing
* Rollback
* Audit log

### Page Builder

Supports:

* Hero sections
* Content sections
* Galleries
* Testimonials
* Pricing tables
* FAQs
* CTA blocks
* Custom blocks

### Theme Builder

Controls:

* Fonts
* Font sizes
* Font weights
* Text colors
* Background colors
* Transparency
* Spacing
* Border radius
* Shadows
* Button styles

### Site Settings

Controls:

* Logo
* Navigation
* Footer
* Contact information
* Social links
* SEO defaults
* Analytics IDs

### Media Library

Supports:

* Upload
* Replace
* Delete
* Alt text
* Captions
* Folder organization
* Usage tracking

### Audit System

Tracks:

* Who changed what
* When changes occurred
* Publish history
* Rollback history

---

## Future Packaging Goal

Long-term objective:

cms-core should become installable into future projects with minimal setup.

Example:

src/cms-core
src/site-config

Only site-config should contain project-specific data.

Everything else should be reusable.
