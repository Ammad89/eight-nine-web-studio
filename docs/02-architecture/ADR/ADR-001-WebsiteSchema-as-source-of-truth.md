# ADR-001: WebsiteSchema as the Source of Truth

## Status

Accepted

## Context

The original CMS was based around page-specific blocks and legacy editor state. As the platform evolved, public pages were migrated to reusable renderers and theme/site data.

A single universal data model became necessary.

## Decision

WebsiteSchema will become the source of truth for website content, settings, navigation, footer, pages, collections, assets and publishing metadata.

## Consequences

Dashboard V2 should edit WebsiteSchema.

Public renderers should consume WebsiteSchema.

Publishing should save WebsiteSchema snapshots.

Legacy CMS state should be gradually retired.
