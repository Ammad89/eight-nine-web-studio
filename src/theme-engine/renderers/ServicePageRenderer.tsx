import { ArrowRight, Check, Star } from "lucide-react";
import BookingCTA from "../../app/components/BookingCTA";
import FAQAccordion from "../../app/components/FAQAccordion";
import SEO from "../../app/components/SEO";
import { getActiveSite, resolveThemeAsset } from "../";
import type { ServicePage } from "../../themes/eight-nine-luxury/pages";

interface ServicePortfolioImage {
  src: string;
  alt: string;
}

interface ServicePageRendererProps {
  page: ServicePage;
  portfolioImages?: ServicePortfolioImage[];
  showPackages?: boolean;
  portfolioAspect?: "square" | "portrait";
  heroObjectPosition?: string;
  introLabel?: string;
  portfolioLabel?: string;
  portfolioHeading?: string;
  statsLabel?: string;
  statsHeading?: string;
  categoriesLabel?: string;
  categoriesHeading?: string;
  processLabel?: string;
  processHeading?: string;
  industriesLabel?: string;
  industriesHeading?: string;
  includedLabel?: string;
  includedHeading?: string;
  includedSubtext?: string;
  testimonialsLabel?: string;
  testimonialsHeading?: string;
  testimonialsSubtext?: string;
  faqsLabel?: string;
  faqsHeading?: string;
  bookingHeadline?: string;
  bookingSubtext?: string;
  bookingSessionType?: string;
}

function renderLines(value: string) {
  return value.split("\n").map((line, index, lines) => (
    <span key={line}>
      {line}
      {index < lines.length - 1 && <br />}
    </span>
  ));
}

export default function ServicePageRenderer({
  page,
  portfolioImages = [],
  showPackages = true,
  portfolioAspect = "portrait",
  heroObjectPosition = "object-[center_55%]",
  portfolioLabel = "Portfolio",
  portfolioHeading = "Selected sessions.",
  statsLabel = "Why It Matters",
  statsHeading = "What makes this valuable.",
  categoriesLabel = "What We Cover",
  categoriesHeading = "Every kind of brief. The same standard of care.",
  processLabel = "What to Expect",
  processHeading = "A simple, relaxed process.",
  industriesLabel = "Industries Served",
  industriesHeading = "We work across sectors.",
  includedLabel = "Sample Package Includes",
  includedHeading = "No surprises. No extras.",
  includedSubtext = "Draft deliverables for client review. Final usage rights and turnaround should be confirmed before launch.",
  testimonialsLabel = "Sample Kind Words",
  testimonialsHeading = "What clients could say.",
  testimonialsSubtext = "Draft testimonial examples for client review. Replace with verified client quotes before launch.",
  faqsLabel = "Frequently Asked",
  faqsHeading = "Your questions, answered.",
  bookingHeadline,
  bookingSubtext,
  bookingSessionType,
}: ServicePageRendererProps) {
  const site = getActiveSite();
  const heroImage = resolveThemeAsset(page.hero.backgroundImage);

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.seo.title,
    serviceType: "Photography",
    description: page.seo.description,
    provider: {
      "@type": "LocalBusiness",
      name: site.business.name,
      url: site.domain.siteUrl,
    },
    areaServed: { "@type": "City", name: "Dubai" },
    url: `${site.domain.siteUrl}${page.seo.slug}`,
  };

  return (
    <>
      <SEO
        title={page.seo.title}
        description={page.seo.description}
        keywords={page.seo.keywords}
        canonical={`${site.domain.canonicalUrl}${page.seo.slug}`}
        schema={pageSchema}
      />

      <section className="relative h-[85vh] min-h-[580px] overflow-hidden bg-muted pt-[72px]">
        <img
          src={heroImage}
          alt={`${site.brand.name} ${page.hero.eyebrow}`}
          className={`absolute inset-0 w-full h-full object-cover ${heroObjectPosition}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="relative z-10 h-full flex items-end pb-16 max-w-7xl mx-auto px-6 w-full">
          <div>
            <p className="text-white/50 text-[10px] tracking-[0.35em] uppercase mb-5 font-medium">{page.hero.eyebrow}</p>
            <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.08] max-w-2xl mb-6" style={{ fontFamily: "'Lora', Georgia, serif" }}>
              {renderLines(page.hero.title)}
            </h1>
            <p className="text-white/65 text-lg max-w-md mb-10 leading-relaxed">{page.hero.subtitle}</p>
            <a href="#contact" className="group inline-flex items-center gap-[18px] pl-8 pr-3.5 py-3.5 bg-white text-black text-xs tracking-[0.12em] uppercase font-medium rounded-full hover:bg-white/90 transition-colors duration-500">
              <span className="group-hover:[order:1]">{page.hero.cta}</span>
              <span className="group-hover:[order:0] flex items-center justify-center w-5 h-5"><ArrowRight size={14} /></span>
            </a>
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div>
            <p className="text-muted-foreground text-[10px] tracking-[0.35em] uppercase mb-6 font-medium">{page.introduction.eyebrow}</p>
            <h2 className="text-3xl sm:text-4xl font-medium text-foreground mb-8 leading-tight" style={{ fontFamily: "'Lora', Georgia, serif" }}>
              {renderLines(page.introduction.title)}
            </h2>
            {page.introduction.paragraphs.map((paragraph, index) => (
              <p key={paragraph} className={`text-muted-foreground leading-relaxed text-[15px] ${index === page.introduction.paragraphs.length - 1 ? "mb-0" : "mb-5"}`}>
                {paragraph}
              </p>
            ))}
          </div>
          <div className="pl-0 md:pl-6">
            <div className="border-l-[3px] border-foreground pl-8 py-4">
              <blockquote className="italic text-2xl sm:text-3xl text-foreground leading-[1.4]" style={{ fontFamily: "'Lora', Georgia, serif" }}>
                &quot;{page.introduction.quote}&quot;
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {page.categories && page.categories.length > 0 && (
        <section className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-muted-foreground text-[10px] tracking-[0.35em] uppercase mb-6 font-medium">{categoriesLabel}</p>
            <h2 className="text-3xl sm:text-4xl font-medium text-foreground mb-14 max-w-2xl leading-tight" style={{ fontFamily: "'Lora', Georgia, serif" }}>
              {renderLines(categoriesHeading)}
            </h2>
            <div className="grid md:grid-cols-3 gap-5">
              {page.categories.map(category => (
                <div key={category.title} className="bg-card rounded-3xl p-8">
                  <h3 className="text-xl font-medium text-foreground mb-3" style={{ fontFamily: "'Lora', Georgia, serif" }}>{category.title}</h3>
                  {category.examples && <p className="text-muted-foreground text-xs tracking-wide mb-4 leading-relaxed">{category.examples}</p>}
                  <p className="text-muted-foreground text-[14px] leading-relaxed">{category.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {page.stages.length > 0 && (
        <section className="py-24 bg-secondary">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-muted-foreground text-[10px] tracking-[0.35em] uppercase mb-4 font-medium">{processLabel}</p>
            <h2 className="text-3xl sm:text-4xl font-medium text-foreground mb-14" style={{ fontFamily: "'Lora', Georgia, serif" }}>{processHeading}</h2>
            <div className="grid md:grid-cols-3 gap-5">
              {page.stages.map(stage => (
                <div key={stage.title} className="bg-background rounded-3xl p-8">
                  <p className="text-muted-foreground text-[10px] tracking-[0.25em] uppercase mb-4 font-medium">{stage.title}</p>
                  <p className="text-foreground text-[15px] leading-relaxed">{stage.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {page.stats && page.stats.length > 0 && (
        <section className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-muted-foreground text-[10px] tracking-[0.35em] uppercase mb-6 font-medium">{statsLabel}</p>
            <h2 className="text-3xl sm:text-4xl font-medium text-foreground mb-6 max-w-2xl leading-tight" style={{ fontFamily: "'Lora', Georgia, serif" }}>
              {statsHeading}
            </h2>
            <div className="grid md:grid-cols-3 gap-5">
              {page.stats.map(stat => (
                <div key={stat.value} className="bg-card rounded-3xl p-8 text-center">
                  <p className="text-3xl font-medium text-foreground mb-4" style={{ fontFamily: "'Lora', Georgia, serif" }}>{stat.value}</p>
                  <p className="text-muted-foreground text-[14px] leading-relaxed">{stat.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {portfolioImages.length > 0 && (
        <section className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-muted-foreground text-[10px] tracking-[0.35em] uppercase mb-4 font-medium">{portfolioLabel}</p>
            <h2 className="text-3xl sm:text-4xl font-medium text-foreground mb-14" style={{ fontFamily: "'Lora', Georgia, serif" }}>{portfolioHeading}</h2>
            <div className="grid grid-cols-2 gap-4">
              {portfolioImages.map(img => (
                <div key={img.alt} className={`rounded-3xl overflow-hidden bg-muted group relative ${portfolioAspect === "square" ? "aspect-square" : ""}`} style={portfolioAspect === "portrait" ? { aspectRatio: "4/5" } : undefined}>
                  <img src={img.src} alt={img.alt} loading="lazy" className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-1000" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {page.included && page.included.length > 0 && (
        <section className="py-24 bg-secondary">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-muted-foreground text-[10px] tracking-[0.35em] uppercase mb-4 font-medium">{includedLabel}</p>
            <h2 className="text-3xl sm:text-4xl font-medium text-foreground mb-14" style={{ fontFamily: "'Lora', Georgia, serif" }}>{includedHeading}</h2>
            <p className="text-muted-foreground text-sm mb-8 max-w-xl leading-relaxed">{includedSubtext}</p>
            <div className="bg-background rounded-3xl p-10 max-w-2xl">
              <div className="grid sm:grid-cols-2 gap-4">
                {page.included.map(item => (
                  <div key={item.label} className="flex items-center gap-3">
                    <Check size={16} className="text-foreground flex-none" />
                    <span className="text-foreground text-[14px]">{item.label}</span>
                  </div>
                ))}
              </div>

              {page.investment && (
                <div className="border-t border-border pt-8 mt-10">
                  <p className="text-muted-foreground text-[10px] tracking-[0.25em] uppercase mb-2 font-medium">{page.investment.label}</p>
                  <p className="text-4xl font-medium text-foreground" style={{ fontFamily: "'Lora', Georgia, serif" }}>{page.investment.price}</p>
                  <p className="text-muted-foreground text-sm mt-3 italic">{page.investment.note}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {showPackages && page.packages.length > 0 && (
        <section className="py-24 bg-secondary">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-muted-foreground text-[10px] tracking-[0.35em] uppercase mb-4 font-medium">Packages</p>
            <h2 className="text-3xl sm:text-4xl font-medium text-foreground mb-4" style={{ fontFamily: "'Lora', Georgia, serif" }}>Choose what&apos;s right for you.</h2>
            <p className="text-muted-foreground text-[15px] mb-14 max-w-xl">Indicative package structure for client review. Final pricing, deliverables and turnaround should be confirmed by {site.brand.name} before launch.</p>
            <div className="grid md:grid-cols-3 gap-5">
              {page.packages.map(pkg => (
                <div key={pkg.name} className={`bg-background rounded-3xl p-8 flex flex-col ${pkg.featured ? "ring-2 ring-foreground" : ""}`}>
                  {pkg.featured && <span className="inline-block mb-4 px-3 py-0.5 bg-foreground text-background text-[10px] tracking-[0.15em] uppercase rounded-full self-start">Most popular</span>}
                  <h3 className="text-2xl font-medium text-foreground mb-1" style={{ fontFamily: "'Lora', Georgia, serif" }}>{pkg.name}</h3>
                  <p className="text-3xl font-medium text-foreground mb-6" style={{ fontFamily: "'Lora', Georgia, serif" }}>{pkg.price}</p>
                  <p className="text-muted-foreground text-sm mb-1">{pkg.duration}</p>
                  <p className="text-muted-foreground text-sm mb-1">{pkg.images}</p>
                  <p className="text-muted-foreground text-sm mb-6">{pkg.locations}</p>
                  <ul className="flex flex-col gap-2 mb-8 flex-1">
                    {pkg.features.map(feature => (
                      <li key={feature} className="flex items-center gap-2.5 text-sm text-foreground">
                        <Check size={14} className="text-foreground flex-none" />{feature}
                      </li>
                    ))}
                  </ul>
                  <p className="text-muted-foreground text-xs mb-6 italic">{pkg.note}</p>
                  <a href="#contact" className="group inline-flex items-center justify-center gap-[18px] pl-8 pr-3.5 py-3 bg-foreground text-background text-xs tracking-[0.12em] uppercase font-medium rounded-full hover:opacity-80 transition-opacity duration-500">
                    <span className="group-hover:[order:1]">Book This Package</span>
                    <span className="group-hover:[order:0] flex items-center justify-center w-5 h-5"><ArrowRight size={13} /></span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {page.industries && page.industries.length > 0 && (
        <section className="py-24 bg-secondary">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-muted-foreground text-[10px] tracking-[0.35em] uppercase mb-4 font-medium">{industriesLabel}</p>
            <h2 className="text-3xl sm:text-4xl font-medium text-foreground mb-14" style={{ fontFamily: "'Lora', Georgia, serif" }}>{industriesHeading}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {page.industries.map(industry => (
                <div key={industry.label} className="bg-background rounded-full px-5 py-3 text-sm font-medium text-foreground text-center border border-border hover:bg-muted transition-colors duration-500">
                  {industry.label}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {page.testimonials.length > 0 && (
        <section className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-muted-foreground text-[10px] tracking-[0.35em] uppercase mb-4 font-medium">{testimonialsLabel}</p>
            <h2 className="text-3xl sm:text-4xl font-medium text-foreground mb-4" style={{ fontFamily: "'Lora', Georgia, serif" }}>{testimonialsHeading}</h2>
            <p className="text-muted-foreground text-sm mb-14 max-w-xl leading-relaxed">{testimonialsSubtext}</p>
            <div className="grid md:grid-cols-3 gap-5">
              {page.testimonials.map((testimonial, index) => (
                <div key={`${testimonial.role}-${index}`} className="bg-card rounded-3xl p-8 flex flex-col">
                  <div className="flex gap-0.5 mb-5">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={13} className="fill-foreground text-foreground" />)}</div>
                  <p className="italic text-foreground leading-relaxed mb-6 text-[17px] flex-1" style={{ fontFamily: "'Lora', Georgia, serif" }}>&ldquo;{testimonial.text}&rdquo;</p>
                  <div>
                    <p className="text-foreground font-medium text-sm">{testimonial.name}</p>
                    <p className="text-muted-foreground text-xs mt-0.5">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {page.faqs.length > 0 && (
        <section className="py-24 bg-secondary">
          <div className="max-w-3xl mx-auto px-6">
            <p className="text-muted-foreground text-[10px] tracking-[0.35em] uppercase mb-4 font-medium">{faqsLabel}</p>
            <h2 className="text-3xl sm:text-4xl font-medium text-foreground mb-14" style={{ fontFamily: "'Lora', Georgia, serif" }}>{faqsHeading}</h2>
            <FAQAccordion faqs={page.faqs} />
          </div>
        </section>
      )}

      <div id="contact">
        <BookingCTA
          headline={bookingHeadline}
          subtext={bookingSubtext}
          sessionType={bookingSessionType}
        />
      </div>
    </>
  );
}
