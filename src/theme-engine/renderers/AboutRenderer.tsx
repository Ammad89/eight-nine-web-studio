import { ArrowRight } from "lucide-react";
import BookingCTA from "../../app/components/BookingCTA";
import SEO from "../../app/components/SEO";
import { getActiveSite, resolveThemeAsset } from "../";
import type { aboutPage } from "../../themes/eight-nine-luxury/pages";

type AboutPageData = typeof aboutPage;

function renderLines(value: string) {
  return value.split("\n").map((line, index, lines) => (
    <span key={line}>
      {line}
      {index < lines.length - 1 && <br />}
    </span>
  ));
}

export default function AboutRenderer({ page }: { page: AboutPageData }) {
  const site = getActiveSite();
  const portrait = resolveThemeAsset(page.photographer.image);

  return (
    <>
      <SEO
        title={page.seo.title}
        description={page.seo.description}
        keywords={page.seo.keywords}
        canonical={`${site.domain.canonicalUrl}${page.seo.slug}`}
      />

      <section className="pt-[72px] bg-background">
        <div className="max-w-7xl mx-auto px-6 pt-20 pb-20 text-center">
          <p className="text-muted-foreground text-[10px] tracking-[0.35em] uppercase mb-5 font-medium">{page.hero.eyebrow}</p>
          <h1 className="text-4xl sm:text-6xl font-medium text-foreground mb-6 leading-tight" style={{ fontFamily: "'Lora', Georgia, serif" }}>
            {renderLines(page.hero.title)}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">{page.hero.subtitle}</p>
        </div>
      </section>

      <section className="py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-14 lg:gap-24 items-center">
          <div>
            <p className="text-muted-foreground text-[10px] tracking-[0.35em] uppercase mb-6 font-medium">{page.story.eyebrow}</p>
            <h2 className="text-3xl sm:text-4xl font-medium text-foreground mb-8 leading-tight" style={{ fontFamily: "'Lora', Georgia, serif" }}>
              {renderLines(page.story.heading)}
            </h2>
            {page.story.paragraphs.map(paragraph => (
              <p key={paragraph} className="text-muted-foreground leading-relaxed mb-5 text-[15px]">{paragraph}</p>
            ))}
          </div>
          <div className="bg-background rounded-3xl p-8">
            <p className="text-muted-foreground text-[10px] tracking-[0.35em] uppercase mb-4 font-medium">{page.photographer.eyebrow}</p>
            <h3 className="text-3xl font-medium text-foreground mb-6" style={{ fontFamily: "'Lora', Georgia, serif" }}>{page.photographer.heading}</h3>
            {page.photographer.paragraphs.map(paragraph => (
              <p key={paragraph} className="text-muted-foreground leading-relaxed mb-5 text-[15px]">{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-14 lg:gap-24 items-center">
          <div className="rounded-3xl overflow-hidden bg-muted" style={{ aspectRatio: "3/4" }}>
            <img src={portrait} alt={page.photographer.imageAlt} className="w-full h-full object-cover object-[center_20%]" />
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {page.values.map(value => (
              <div key={value.title} className="bg-card rounded-3xl p-7">
                <h3 className="text-lg font-medium text-foreground mb-3" style={{ fontFamily: "'Lora', Georgia, serif" }}>{value.title}</h3>
                <p className="text-muted-foreground text-[14px] leading-relaxed">{value.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-14 text-center">
            <p className="text-muted-foreground text-[10px] tracking-[0.35em] uppercase mb-3 font-medium">How I Work</p>
            <h2 className="text-3xl sm:text-4xl font-medium text-foreground" style={{ fontFamily: "'Lora', Georgia, serif" }}>Simple, calm and considered.</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {page.process.map(step => (
              <div key={step.number}>
                <p className="text-[3.5rem] font-medium text-muted/80 mb-4 leading-none" style={{ fontFamily: "'Lora', Georgia, serif" }}>{step.number}</p>
                <h3 className="text-base font-medium text-foreground mb-3" style={{ fontFamily: "'Lora', Georgia, serif" }}>{step.title}</h3>
                <p className="text-muted-foreground text-[13px] leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="bg-background">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <a href="/contact" className="group inline-flex items-center gap-2.5 text-foreground text-xs tracking-[0.12em] uppercase font-medium">
            <span className="group-hover:[order:1]">Start a conversation</span>
            <span className="group-hover:[order:0] flex items-center"><ArrowRight size={13} /></span>
          </a>
        </div>
      </div>

      <BookingCTA headline={page.booking.headline} subtext={page.booking.subtext} />
    </>
  );
}
