export interface ServiceSeo {
  title: string;
  description: string;
  keywords: string;
  slug: string;
}

export interface ServiceHero {
  eyebrow: string;
  title: string;
  subtitle: string;
  cta: string;
  backgroundImage: string;
}

export interface ServiceStage {
  title: string;
  body: string;
}

export interface ServiceStat {
  value: string;
  body: string;
}

export interface ServiceIndustry {
  label: string;
}

export interface ServiceCategory {
  title: string;
  examples?: string;
  body: string;
}

export interface ServiceIncludedItem {
  label: string;
}

export interface ServiceInvestment {
  label: string;
  price: string;
  note: string;
}

export interface ServicePackage {
  name: string;
  price: string;
  duration: string;
  images: string;
  locations: string;
  features: string[];
  note: string;
  featured?: boolean;
}

export interface ServiceFaq {
  q: string;
  a: string;
}

export interface ServiceTestimonial {
  name: string;
  role: string;
  text: string;
}

export interface ServicePage {
  seo: ServiceSeo;
  hero: ServiceHero;

  introduction: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    quote: string;
  };

  stats?: ServiceStat[];

  categories?: ServiceCategory[];

  stages: ServiceStage[];

  industries?: ServiceIndustry[];

  included?: ServiceIncludedItem[];

  investment?: ServiceInvestment;

  packages: ServicePackage[];

  faqs: ServiceFaq[];

  testimonials: ServiceTestimonial[];
}
