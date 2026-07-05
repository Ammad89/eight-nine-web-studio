import navLogo from "../../imports/platform/Eight Nine Logo for Nav Bar.svg";
import footerLogo from "../../imports/platform/Eight Nine Logo for Footer.svg";
import platformLogo from "../../imports/platform/Eight Nine Logo.jpg";
import { eightNinePhotographyFooter } from "./footer";
import { eightNinePhotographyNavigation } from "./navigation";

export const eightNinePhotographySite = {
  id: "eight-nine-photography",

  brand: {
    name: "Eight Nine Photography",
    owner: "Ammad Shafique",
    tagline: "Natural light and authentic lifestyle photography",
    logo: navLogo,
    favicon: "",
  },

  domain: {
    siteUrl: "https://platform.eightnineglobal.com",
    canonicalUrl: "https://platform.eightnineglobal.com",
    schemaId: "https://platform.eightnineglobal.com",
  },

  contact: {
    email: "hello@eightnineglobal.com",
    phone: "+971568308833",
    phoneDisplay: "+971 56 830 8833",
    whatsapp: "971568308833",
    address: "Dubai, United Arab Emirates",
  },

  social: {
    instagram: "",
    facebook: "",
    linkedin: "",
    youtube: "",
  },

  navigation: eightNinePhotographyNavigation,

  footer: eightNinePhotographyFooter,

  business: {
    type: "LocalBusiness",
    name: "Eight Nine Photography",
    description:
      "Natural light lifestyle photographer in Dubai, UAE. Authentic family, pet, personal branding and event photography.",
    priceRange: "Indicative AED 1,200+",
    areaServed: ["Dubai", "United Arab Emirates"],
    latitude: 25.2048,
    longitude: 55.2708,
  },
};
