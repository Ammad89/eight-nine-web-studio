# CMS Platform Schema

## Purpose

This document defines the target CMS data model for Eight Nine Web Studio.

The CMS should edit structured website data, not React components.

## Top-Level Website Schema

Website
- Site Settings
- Theme Settings
- Navigation
- Footer
- Pages
- Collections
- Assets
- Publishing

## Pages

Pages define routes, SEO and section order.

Each page should eventually contain:
- id
- slug
- type
- title
- status
- seo
- sections

## Sections

A page is made of reusable sections.

Examples:
- hero
- text
- imageText
- gallery
- portfolioGrid
- servicesGrid
- stats
- testimonials
- faq
- pricing
- timeline
- team
- contact
- cta
- logos
- map
- blogFeed
- featureGrid
- comparison
- video

## Collections

Collections hold reusable content.

Examples:
- services
- portfolio
- testimonials
- faqs
- team
- locations
- blogPosts

## Publishing

The CMS should keep at least two snapshots per site:
- draft
- published

Draft is editable.

Published powers the live website.

## Migration Rule

Do not break current public rendering while migrating the CMS.

The public site can continue using static theme files while Dashboard V2 learns to edit this schema.

Once stable, renderers can load the published schema from Supabase first and fallback to static theme files.
