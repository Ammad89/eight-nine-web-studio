import type { ServicePage } from "./types";

export const familyServicePage: ServicePage = {
  seo: {
    title: "Family Photographer Dubai",
    description:
      "Natural light family photography across Dubai and the UAE.",
    keywords:
      "Family Photographer Dubai, Family Photography Dubai",
    slug: "/family-photography",
  },

  hero: {
    eyebrow: "Eight Nine Photography · Family Photography",
    title: "Photographs of your family\nas they actually are.",
    subtitle:
      "Not the version where everyone's looking at the camera. The real one.",
    cta: "Book a Family Session",
    backgroundImage:
      "family-hero",
  },

  introduction: {
    eyebrow: "Family Photography",
    title:
      "Because the messy moments\nare the meaningful ones.",

    paragraphs: [
      "Families are chaotic, loving, funny and complicated. The best photographs don't pretend otherwise.",
      "Our approach is observational rather than heavily posed, allowing genuine moments to unfold naturally.",
      "Sessions take place outdoors or in meaningful locations using natural light."
    ],

    quote:
      "We don't tell your family how to look. We let them show us."
  },

  stages: [
    {
      title: "Before",
      body:
        "A short consultation call to understand your family, your children's personalities, and what you'd love to capture. We agree on location, timing and a rough plan.",
    },
    {
      title: "During",
      body:
        "One to two hours in a location that feels natural to you. Ammad works quietly, never over-directing, always watching. Kids are encouraged to play, not pose.",
    },
    {
      title: "After",
      body:
        "A curated online gallery delivered within 14 days. High-resolution downloads, print release included. No upsell, no extra fees.",
    },
  ],

  packages: [
    {
      name: "Essentials",
      price: "Indicative AED 1,200",
      duration: "1 hour",
      images: "30+ edited images",
      locations: "1 location",
      features: ["Full print release", "Online gallery", "Standard turnaround (14 days)"],
      note: "Best for: Small families, intimate sessions",
      featured: false,
    },
    {
      name: "Classic",
      price: "Indicative AED 1,800",
      duration: "2 hours",
      images: "60+ edited images",
      locations: "1 location",
      features: ["Full print release", "Online gallery", "Priority booking", "Standard turnaround (14 days)"],
      note: "Best for: Families with young children",
      featured: true,
    },
    {
      name: "Premium",
      price: "Indicative AED 2,800",
      duration: "3 hours",
      images: "100+ edited images",
      locations: "2 locations",
      features: ["Full print release", "Online gallery", "Priority booking", "Same-week turnaround available"],
      note: "Best for: Extended families, special occasions",
      featured: false,
    },
  ],

  faqs: [
    {
      q: "What should we wear?",
      a:
        "Choose outfits that feel like you - comfortable, coordinated but not matching. Earthy tones and soft colours photograph beautifully. Avoid large logos or very busy patterns. Ammad can advise further on your pre-session call.",
    },
    {
      q: "How do we keep kids calm and cooperative?",
      a:
        "You don't need to. Ammad works with children's natural energy, not against it. Running, hiding, ignoring the camera - it all makes for better photographs than a forced smile ever could.",
    },
    {
      q: "Where do sessions take place?",
      a:
        "Anywhere that feels meaningful to your family - a favourite park, your neighbourhood, the beach, or your own home. Ammad will suggest locations based on the time of day and what you're hoping to capture.",
    },
    {
      q: "When do we receive our photographs?",
      a:
        "Online galleries are typically delivered within 14 days, with rush options confirmed before booking.",
    },
    {
      q: "Do you travel outside Dubai?",
      a:
        "Yes. Ammad covers the whole UAE and is available for travel internationally. Travel costs are discussed at enquiry stage.",
    },
    {
      q: "What if the weather is bad on the day?",
      a:
        "We'll reschedule at no cost. Overcast days can actually produce the most beautiful, even light - so don't always assume that clouds are a problem.",
    },
  ],

  testimonials: [
    {
      name: "Sample family client",
      role: "Draft testimonial - Dubai",
      text:
        "I cried when I saw the photos. Not because they were nice - because they were exactly us. Ammad captured something I'd never seen in a photograph before.",
    },
    {
      name: "Sample family client",
      role: "Draft testimonial - Abu Dhabi",
      text:
        "Three kids under six. We thought it would be chaos. It was - and the photos are all the better for it. Ammad works like a ghost. You forget he's there.",
    },
    {
      name: "Sample family client",
      role: "Draft testimonial - Sharjah",
      text:
        "Our session was the most relaxed hour we've had as a family in months. The photographs feel like a love letter to the four of us.",
    },
  ],
};
