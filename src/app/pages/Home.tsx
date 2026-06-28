import { Link } from "react-router";
import { ArrowRight, Star } from "lucide-react";
import BookingCTA from "../components/BookingCTA";
import {
  getActiveSite,
  getActiveTheme,
  resolveThemeAsset,
} from "../../theme-engine";
import SEO from "../components/SEO";
import emilyImage from "../../imports/optimized/Gemini_Generated_Image_lfgepqlfgepqlfge.jpg";
import portfolioFamilies from "../../imports/optimized/outdoor-shot-of-pleased-man-and-woman-stand-closel-2026-05-28-23-39-35-utc.JPG";
import portfolioPets from "../../imports/optimized/dog-in-autumn-foliage-wearing-a-red-collar-2026-03-25-00-44-16-utc.jpg";
import portfolioBranding from "../../imports/optimized/japanese-woman-in-office-portrait-2026-03-09-05-22-48-utc.jpg";
import portfolioEvents from "../../imports/optimized/celebrating-together-at-an-office-new-year-s-party-2026-01-09-09-10-33-utc.jpg";

const theme = getActiveTheme();
const site = getActiveSite();
const hero = theme.hero;
const heroImage = resolveThemeAsset(hero.backgroundImage);

const homeSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": site.domain.schemaId,
  "name": site.brand.name,
  "description": theme.seo.description,
  "url": site.domain.siteUrl,
  "telephone": site.contact.phone,
  "image": "https://static.wixstatic.com/media/7cfb53_8c7fcb8badd6496dbd89b9ca004f575d~mv2.png",
  "address": { "@type": "PostalAddress", "addressLocality": site.contact.address, "addressCountry": "AE" },
  "geo": { "@type": "GeoCoordinates", "latitude": 25.2048, "longitude": 55.2708 },
  "priceRange": site.business.priceRange,
  "areaServed": [{ "@type": "City", "name": "Dubai" }, { "@type": "Country", "name": "United Arab Emirates" }],
};

export default function Home() {
  return (
    <>
      <SEO
        title={theme.seo.title}
        description={theme.seo.description}
        keywords={theme.seo.keywords.join(", ")}
        canonical={site.domain.canonicalUrl}
        schema={homeSchema}
      />
      {/* ── Sticky backdrop: Hero + Philosophy + Stats ── */}
      <div className="relative">
        <div className="sticky top-0 h-screen overflow-hidden bg-muted" style={{ marginBottom: "-100vh", zIndex: 0 }}>
          <img src={heroImage} alt={`${site.brand.name} hero image`} className="w-full h-full object-cover object-[72%_center] md:object-center" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
        </div>

        {/* Hero */}
        <section className="relative h-screen min-h-[640px] flex items-end pb-20" style={{ zIndex: 1 }}>
          <div className="max-w-7xl mx-auto px-6 w-full">
            <p className="text-white/60 text-[10px] tracking-[0.35em] uppercase mb-5 font-medium">{hero.eyebrow}</p>
            <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl xl:text-[4.5rem] font-medium leading-[1.08] max-w-3xl mb-7" style={{ fontFamily: "'Lora', Georgia, serif" }}>
              {hero.heading.split("\n").map((line, index) => (
                <span key={line}>
                  {line}
                  {index < hero.heading.split("\n").length - 1 && <br />}
                </span>
              ))}
            </h1>
            <p className="text-white/65 text-base sm:text-lg max-w-lg mb-10 leading-relaxed">
              {hero.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <a href={hero.primaryButtonLink} className="group inline-flex items-center gap-[18px] pl-8 pr-3.5 py-3.5 bg-white text-black text-xs tracking-[0.12em] uppercase font-medium rounded-full hover:bg-white/90 transition-colors duration-500">
                <span className="group-hover:[order:1]">{hero.primaryButtonText}</span>
                <span className="group-hover:[order:0] flex items-center justify-center w-5 h-5"><ArrowRight size={14} /></span>
              </a>
              <a href={hero.secondaryButtonLink} className="group inline-flex items-center gap-[18px] pl-8 pr-3.5 py-3.5 border border-white/50 text-white text-xs tracking-[0.12em] uppercase font-medium rounded-full hover:border-white/90 transition-colors duration-500">
                <span className="group-hover:[order:1]">{hero.secondaryButtonText}</span>
                <span className="group-hover:[order:0] flex items-center justify-center w-5 h-5"><ArrowRight size={14} /></span>
              </a>
            </div>
          </div>
        </section>

        {/* Philosophy */}
        <section className="relative py-28" style={{ zIndex: 1, background: "rgba(0,0,0,0.82)" }}>
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <p className="text-white/50 text-[10px] tracking-[0.35em] uppercase mb-6 font-medium">{theme.philosophy.eyebrow}</p>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-medium leading-tight mb-8 text-white" style={{ fontFamily: "'Lora', Georgia, serif" }}>
                {theme.philosophy.heading.split("\n").map((line, index) => (
                  <span key={line}>
                    {line}
                    {index < theme.philosophy.heading.split("\n").length - 1 && <br />}
                  </span>
                ))}
              </h2>
              {theme.philosophy.paragraphs.map((paragraph, index) => (
                <p key={paragraph} className={`text-white/65 leading-relaxed text-[15px] ${index === theme.philosophy.paragraphs.length - 1 ? "mb-8" : "mb-5"}`}>{paragraph}</p>
              ))}
              <a href={theme.philosophy.buttonLink} className="group inline-flex items-center gap-2.5 text-white text-xs tracking-[0.12em] uppercase font-medium">
                <span className="group-hover:[order:1]">{theme.philosophy.buttonText}</span>
                <span className="group-hover:[order:0] flex items-center"><ArrowRight size={13} /></span>
              </a>
            </div>
            <div className="pl-0 md:pl-6">
              <div className="border-l-[3px] border-white/30 pl-8 py-2">
                <blockquote className="italic text-2xl sm:text-3xl text-white leading-[1.4]" style={{ fontFamily: "'Lora', Georgia, serif" }}>
                  {theme.philosophy.quote.split("\n").map((line, index) => (
                    <span key={line}>
                      {line}
                      {index < theme.philosophy.quote.split("\n").length - 1 && <br />}
                    </span>
                  ))}
                </blockquote>
                <p className="mt-6 text-white/40 text-xs tracking-wider uppercase">- {theme.philosophy.quoteAuthor}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="relative py-14" style={{ zIndex: 1, background: "rgba(0,0,0,0.68)", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            {theme.stats.map(stat => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl font-medium text-white mb-2" style={{ fontFamily: "'Lora', Georgia, serif" }}>{stat.value}</p>
                <p className="text-white/50 text-xs tracking-wide">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Portfolio */}
      <section id="portfolio" className="py-28 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-4">
            <div>
              <p className="text-muted-foreground text-[10px] tracking-[0.35em] uppercase mb-3 font-medium">Portfolio</p>
              <h2 className="text-3xl sm:text-4xl font-medium text-foreground" style={{ fontFamily: "'Lora', Georgia, serif" }}>Selected Work</h2>
            </div>
            <p className="text-muted-foreground max-w-xs text-sm leading-relaxed">A small selection. Every image chosen deliberately.</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {theme.portfolio.map(item => (
              <Link key={item.title} to={item.href} className="group relative overflow-hidden bg-muted rounded-3xl block" style={{ aspectRatio: "3/4" }}>
                <img src={resolveThemeAsset(item.image)} alt={`${item.title} photography by ${site.brand.name}`} loading="lazy" className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.06]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 transition-all duration-700 group-hover:translate-y-1 group-hover:opacity-0">
                  <p className="text-white text-base font-medium drop-shadow" style={{ fontFamily: "'Lora', Georgia, serif" }}>{item.title}</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-700">
                  <p className="text-white text-base font-medium mb-1.5" style={{ fontFamily: "'Lora', Georgia, serif" }}>{item.title}</p>
                  <p className="text-white/70 text-xs leading-relaxed">{item.description}</p>
                  <span className="inline-flex items-center gap-1.5 mt-3 text-white/80 text-xs tracking-wider uppercase font-medium">View work <ArrowRight size={12} /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-28 bg-secondary">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-14">
            <p className="text-muted-foreground text-[10px] tracking-[0.35em] uppercase mb-3 font-medium">Sample Client Proof</p>
            <h2 className="text-3xl sm:text-4xl font-medium text-foreground max-w-xl leading-tight" style={{ fontFamily: "'Lora', Georgia, serif" }}>What clients could say</h2>
            <p className="text-muted-foreground text-sm mt-4 max-w-xl leading-relaxed">Draft examples for client review. Final testimonials and figures should be replaced with verified Eight Nine Photography client proof before launch.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {theme.testimonials.map(t => (
              <div key={t.author} className="bg-background p-8 rounded-3xl flex flex-col">
                <div className="flex gap-0.5 mb-5">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={13} className="fill-foreground text-foreground" />)}</div>
                <p className="italic text-foreground leading-relaxed mb-6 text-[17px] flex-1" style={{ fontFamily: "'Lora', Georgia, serif" }}>&ldquo;{t.quote}&rdquo;</p>
                <div>
                  <p className="text-foreground font-medium text-sm">{t.author}</p>
                  <p className="text-muted-foreground text-xs mt-0.5 tracking-wide">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-28 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-14">
            <p className="text-muted-foreground text-[10px] tracking-[0.35em] uppercase mb-3 font-medium">Services</p>
            <h2 className="text-3xl sm:text-4xl font-medium text-foreground" style={{ fontFamily: "'Lora', Georgia, serif" }}>Choose your session</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {theme.services.map(service => (
              <div key={service.title} className="bg-card rounded-3xl p-8 flex flex-col hover:bg-muted transition-colors duration-500">
                <div className="mb-5 h-5 flex items-center">
                  {service.tag && <span className="inline-block px-3 py-0.5 bg-foreground text-background text-[10px] tracking-[0.15em] uppercase rounded-full">{service.tag}</span>}
                </div>
                <h3 className="text-xl font-medium text-foreground mb-3" style={{ fontFamily: "'Lora', Georgia, serif" }}>{service.title}</h3>
                <p className="text-muted-foreground text-[13px] leading-relaxed mb-7 flex-1">{service.description}</p>
                <Link to={service.href} className="group inline-flex items-center gap-2.5 text-foreground text-[11px] tracking-[0.12em] uppercase font-medium">
                  <span className="group-hover:[order:1]">Learn more</span>
                  <span className="group-hover:[order:0] flex items-center"><ArrowRight size={11} /></span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-28 bg-secondary overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-14 lg:gap-24 items-center">
          <div className="relative order-2 md:order-1">
            <div className="aspect-[3/4] bg-muted overflow-hidden rounded-3xl max-w-md">
              <img src={resolveThemeAsset(theme.about.image)} alt={theme.about.imageAlt} className="w-full h-full object-cover object-[center_20%]" />
            </div>
          </div>
          <div className="order-1 md:order-2">
            <p className="text-muted-foreground text-[10px] tracking-[0.35em] uppercase mb-6 font-medium">{theme.about.eyebrow}</p>
            <h2 className="text-3xl sm:text-4xl font-medium text-foreground mb-7 leading-tight" style={{ fontFamily: "'Lora', Georgia, serif" }}>
              {theme.about.heading.split("\n").map((line, index) => (
                <span key={line}>
                  {line}
                  {index < theme.about.heading.split("\n").length - 1 && <br />}
                </span>
              ))}
            </h2>
            {theme.about.paragraphs.map((paragraph, index) => (
              <p key={paragraph} className={`text-muted-foreground leading-relaxed text-[15px] ${index === theme.about.paragraphs.length - 1 ? "mb-9" : "mb-5"}`}>{paragraph}</p>
            ))}
            <a href={theme.about.buttonLink} className="group inline-flex items-center gap-2.5 text-foreground text-xs tracking-[0.12em] uppercase font-medium">
              <span className="group-hover:[order:1]">{theme.about.buttonText}</span>
              <span className="group-hover:[order:0] flex items-center"><ArrowRight size={13} /></span>
            </a>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-28 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 text-center max-w-lg mx-auto">
            <p className="text-muted-foreground text-[10px] tracking-[0.35em] uppercase mb-3 font-medium">How It Works</p>
            <h2 className="text-3xl sm:text-4xl font-medium text-foreground" style={{ fontFamily: "'Lora', Georgia, serif" }}>Four steps.<br />Zero stress.</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative">
            {theme.process.map((step, i) => (
              <div key={step.number} className="relative">
                {i < steps.length - 1 && <div className="hidden lg:block absolute top-9 left-full w-full h-px bg-border -translate-x-3 z-0 pointer-events-none" />}
                <p className="text-[3.5rem] font-medium text-muted/80 mb-4 leading-none" style={{ fontFamily: "'Lora', Georgia, serif" }}>{step.number}</p>
                <h3 className="text-base font-medium text-foreground mb-3" style={{ fontFamily: "'Lora', Georgia, serif" }}>{step.title}</h3>
                <p className="text-muted-foreground text-[13px] leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div id="contact">
        <BookingCTA headline={theme.bookingCta.headline} subtext={theme.bookingCta.subtext} />
      </div>
    </>
  );
}
