import BookingCTA from "../../app/components/BookingCTA";
import FAQAccordion from "../../app/components/FAQAccordion";
import SEO from "../../app/components/SEO";
import { getActiveSite } from "../";
import type { contactPage } from "../../themes/eight-nine-luxury/pages";

type ContactPageData = typeof contactPage;

function renderLines(value: string) {
  return value.split("\n").map((line, index, lines) => (
    <span key={line}>
      {line}
      {index < lines.length - 1 && <br />}
    </span>
  ));
}

export default function ContactRenderer({ page }: { page: ContactPageData }) {
  const site = getActiveSite();

  const getValue = (key: string) => {
    if (key === "email") return site.contact.email;
    if (key === "whatsapp") return site.contact.phoneDisplay || site.contact.whatsapp;
    return "Book a discovery call";
  };

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
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-5">
          {page.contactOptions.map(option => (
            <div key={option.title} className="bg-background rounded-3xl p-8">
              <p className="text-muted-foreground text-[10px] tracking-[0.25em] uppercase mb-4 font-medium">{option.title}</p>
              <p className="text-foreground text-xl font-medium mb-4" style={{ fontFamily: "'Lora', Georgia, serif" }}>{getValue(option.valueKey)}</p>
              <p className="text-muted-foreground text-[14px] leading-relaxed">{option.body}</p>
            </div>
          ))}
        </div>
      </section>

      <div id="contact">
        <BookingCTA headline={page.booking.headline} subtext={page.booking.subtext} />
      </div>

      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-muted-foreground text-[10px] tracking-[0.35em] uppercase mb-4 font-medium text-center">{page.coverage.eyebrow}</p>
          <h2 className="text-3xl sm:text-4xl font-medium text-foreground mb-14 text-center" style={{ fontFamily: "'Lora', Georgia, serif" }}>{page.coverage.heading}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-3xl mx-auto">
            {page.coverage.areas.map(area => (
              <div key={area} className="bg-secondary rounded-full px-5 py-3 text-sm font-medium text-foreground text-center border border-border">
                {area}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-secondary">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-muted-foreground text-[10px] tracking-[0.35em] uppercase mb-4 font-medium">FAQs</p>
          <h2 className="text-3xl sm:text-4xl font-medium text-foreground mb-14" style={{ fontFamily: "'Lora', Georgia, serif" }}>Before you enquire.</h2>
          <FAQAccordion faqs={page.faqs} />
        </div>
      </section>
    </>
  );
}
