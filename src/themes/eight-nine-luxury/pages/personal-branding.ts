import type { ServicePage } from "./types";

export const personalBrandingServicePage: ServicePage = {
  seo: {
    title: "Personal Branding Photographer Dubai | Professional Headshots UAE",
    description:
      "Personal branding photographer in Dubai for entrepreneurs, coaches and business owners. Professional imagery that builds trust. Indicative packages from AED 1,500.",
    keywords:
      "Personal Branding Photographer Dubai, Professional Headshots Dubai, Personal Branding Photography UAE, Professional Photographer UAE",
    slug: "/personal-branding",
  },

  hero: {
    eyebrow: "Eight Nine Photography · Personal Branding",
    title: "Be seen the way\nyou deserve to be seen.",
    subtitle:
      "Personal branding photography for entrepreneurs, consultants and business owners across the UAE.",
    cta: "Book a Consultation",
    backgroundImage: "branding-hero",
  },

  introduction: {
    eyebrow: "Why It Matters",
    title: "Your image is working\nbefore you say a word.",
    paragraphs: [
      "Before a potential client reads your bio, watches your video or checks your credentials, they have already formed an opinion based on your photograph.",
    ],
    quote:
      "Your image should build trust before the first conversation starts.",
  },

  stats: [
    {
      value: "0.1 seconds",
      body:
        "Draft proof point: the time it takes someone to form a first impression. Your photograph is often the first impression.",
    },
    {
      value: "14x more views",
      body:
        "Draft proof point: LinkedIn profiles with professional photographs receive significantly more profile views than those without.",
    },
    {
      value: "Trust",
      body:
        "Clients choose people, not just services. Authentic images make that choice easier.",
    },
  ],

  stages: [],

  industries: [
    { label: "Consulting" },
    { label: "Real Estate" },
    { label: "Legal" },
    { label: "Finance" },
    { label: "Healthcare & Wellness" },
    { label: "Coaching" },
    { label: "Technology" },
    { label: "Hospitality" },
  ],

  packages: [
    {
      name: "Starter",
      price: "Indicative AED 1,500",
      duration: "1 hour",
      images: "20+ edited images",
      locations: "1 location",
      features: [
        "1 outfit",
        "Full commercial licence",
        "Online gallery",
      ],
      note: "For: Freelancers and early-stage professionals",
      featured: false,
    },
    {
      name: "Professional",
      price: "Indicative AED 2,200",
      duration: "2 hours",
      images: "40+ edited images",
      locations: "1 location",
      features: [
        "2 outfits",
        "Styling guidance included",
        "Full commercial licence",
        "Online gallery",
      ],
      note: "For: Coaches, consultants, business owners",
      featured: true,
    },
    {
      name: "Executive",
      price: "Indicative AED 3,800",
      duration: "Half day",
      images: "80+ edited images",
      locations: "2 locations",
      features: [
        "4 outfits",
        "Priority turnaround (5-7 days)",
        "Social media crop set included",
        "Full commercial licence",
      ],
      note: "For: Senior professionals, speakers, C-suite",
      featured: false,
    },
  ],

  faqs: [
    {
      q: "Do I need to know how to pose?",
      a:
        "No. Ammad will guide you through natural movements and expressions that do not look posed. Most clients are surprised at how relaxed the process feels.",
    },
    {
      q: "What should I wear?",
      a:
        "Clothing that reflects how you want to be perceived professionally, but that you also feel completely comfortable in. Ammad will discuss wardrobe options on your pre-session call.",
    },
    {
      q: "Can we shoot in my office or workplace?",
      a:
        "Yes. Familiar environments often produce the most authentic results. Ammad will assess the space and lighting in advance to ensure the best outcome.",
    },
    {
      q: "How many images will I receive?",
      a:
        "Packages are clearly outlined above. All images are individually edited and delivered at full resolution with full commercial usage rights.",
    },
    {
      q: "How quickly will I receive my images?",
      a:
        "Standard turnaround is 10-14 days. Executive packages include priority turnaround of 5-7 days. Rush delivery can be arranged for an additional fee.",
    },
  ],

  testimonials: [
    {
      name: "Sample brand client",
      role: "Draft testimonial - Dubai",
      text:
        "My brand presence changed overnight. Clients now comment on my photos before anything else. The enquiry rate from LinkedIn doubled within a month.",
    },
    {
      name: "Sample brand client",
      role: "Draft testimonial - Abu Dhabi",
      text:
        "I'd been putting it off for two years. Thirty minutes into the session I understood why I should have done it years ago. Ammad made it effortless.",
    },
    {
      name: "Sample brand client",
      role: "Draft testimonial - Dubai",
      text:
        "The investment paid for itself quickly. Two clients mentioned my photograph as the reason they reached out. That does not happen with a selfie.",
    },
  ],
};
