# Architecture Overview

Eight Nine Web Studio is structured around a universal WebsiteSchema.

The platform flow is:

Dashboard V2 edits WebsiteSchema.

WebsiteProvider stores WebsiteSchema.

Publishing saves WebsiteSchema.

Public renderers consume WebsiteSchema.

Themes define visual systems.

Sites define business identity.

The long-term goal is for every website to be generated from schema, theme and assets rather than custom page code.
