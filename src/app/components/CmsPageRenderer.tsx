import type { CmsElement, CmsPage, CmsSection } from "../cms/types";
import SEO from "./SEO";

function lines(text: string) {
  return text.split("\n").map(line => line.trim()).filter(Boolean);
}

function firstElement(section: CmsSection, type: CmsElement["type"]) {
  return section.elements.find(element => element.type === type);
}

function SectionHeading({ section }: { section: CmsSection }) {
  return (
    <div className="mb-12">
      <p className="text-muted-foreground text-[10px] tracking-[0.35em] uppercase mb-3 font-medium">{section.title}</p>
      {section.subtitle && <p className="text-muted-foreground max-w-xl text-sm leading-relaxed">{section.subtitle}</p>}
    </div>
  );
}

function renderTextElement(element: CmsElement) {
  const content = lines(element.text);

  if (element.type === "heading") {
    return (
      <h2 key={element.id} className="text-3xl sm:text-4xl font-medium text-foreground mb-5 leading-tight" style={{ fontFamily: "'Lora', Georgia, serif" }}>
        {element.text}
      </h2>
    );
  }

  if (element.type === "button") {
    return (
      <a key={element.id} href={element.href || "#"} className="inline-flex items-center justify-center rounded-full bg-foreground text-background px-6 py-3 text-xs uppercase tracking-[0.12em] font-medium">
        {element.text || "Learn more"}
      </a>
    );
  }

  if (element.type === "image" && element.imageUrl) {
    return (
      <img key={element.id} src={element.imageUrl} alt={element.alt || element.label} className="w-full rounded-3xl object-cover bg-muted" />
    );
  }

  return (
    <p key={element.id} className="text-muted-foreground leading-relaxed mb-4 text-[15px]">
      {content.join(" ")}
    </p>
  );
}

function renderCardElement(element: CmsElement) {
  const [title, body] = lines(element.text);

  return (
    <a key={element.id} href={element.href || "#"} className="group block bg-card rounded-3xl overflow-hidden hover:bg-muted transition-colors duration-500">
      {element.imageUrl && (
        <div className="aspect-[4/3] bg-muted overflow-hidden">
          <img src={element.imageUrl} alt={element.alt || title || element.label} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.04]" />
        </div>
      )}
      <div className="p-7">
        <h3 className="text-xl font-medium text-foreground mb-3" style={{ fontFamily: "'Lora', Georgia, serif" }}>{title || element.label}</h3>
        {body && <p className="text-muted-foreground text-sm leading-relaxed">{body}</p>}
      </div>
    </a>
  );
}

function renderStatElement(element: CmsElement) {
  const [value, label] = lines(element.text);

  return (
    <div key={element.id} className="text-center bg-card rounded-3xl p-7">
      <p className="text-4xl font-medium text-foreground mb-2" style={{ fontFamily: "'Lora', Georgia, serif" }}>{value || "0"}</p>
      <p className="text-muted-foreground text-xs tracking-wide">{label || element.label}</p>
    </div>
  );
}

function renderTestimonialElement(element: CmsElement) {
  const [quote, name, role] = lines(element.text);

  return (
    <div key={element.id} className="bg-card rounded-3xl p-8 flex flex-col">
      <p className="italic text-foreground leading-relaxed mb-6 text-[17px] flex-1" style={{ fontFamily: "'Lora', Georgia, serif" }}>
        &ldquo;{quote || element.label}&rdquo;
      </p>
      <div>
        <p className="text-foreground font-medium text-sm">{name || "Sample client"}</p>
        <p className="text-muted-foreground text-xs mt-0.5">{role || "Draft testimonial"}</p>
      </div>
    </div>
  );
}

function renderPackageElement(element: CmsElement) {
  const [name, price, ...features] = lines(element.text);

  return (
    <div key={element.id} className="bg-card rounded-3xl p-8 flex flex-col">
      <h3 className="text-2xl font-medium text-foreground mb-1" style={{ fontFamily: "'Lora', Georgia, serif" }}>{name || element.label}</h3>
      <p className="text-3xl font-medium text-foreground mb-6" style={{ fontFamily: "'Lora', Georgia, serif" }}>{price || "Indicative pricing"}</p>
      <ul className="flex flex-col gap-2 flex-1">
        {features.map(feature => (
          <li key={feature} className="text-sm text-muted-foreground leading-relaxed">{feature}</li>
        ))}
      </ul>
    </div>
  );
}

function HeroSection({ section }: { section: CmsSection }) {
  const eyebrow = firstElement(section, "eyebrow");
  const heading = firstElement(section, "heading");
  const text = firstElement(section, "text");
  const image = firstElement(section, "image");
  const button = firstElement(section, "button");

  return (
    <section className="relative min-h-[620px] overflow-hidden bg-muted pt-[72px] flex items-end">
      {image?.imageUrl && <img src={image.imageUrl} alt={image.alt || image.label} className="absolute inset-0 w-full h-full object-cover" />}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pb-20">
        {eyebrow && <p className="text-white/60 text-[10px] tracking-[0.35em] uppercase mb-5 font-medium">{eyebrow.text}</p>}
        <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.08] max-w-3xl mb-7" style={{ fontFamily: "'Lora', Georgia, serif" }}>
          {heading?.text || section.title}
        </h1>
        {text && <p className="text-white/65 text-base sm:text-lg max-w-lg mb-10 leading-relaxed">{text.text}</p>}
        {button && (
          <a href={button.href || "#"} className="inline-flex items-center justify-center rounded-full bg-white text-black px-7 py-3.5 text-xs uppercase tracking-[0.12em] font-medium">
            {button.text}
          </a>
        )}
      </div>
    </section>
  );
}

function CmsSectionRenderer({ section }: { section: CmsSection }) {
  if (section.type === "hero") return <HeroSection section={section} />;

  if (section.type === "stats") {
    return (
      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading section={section} />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {section.elements.map(renderStatElement)}
          </div>
        </div>
      </section>
    );
  }

  if (section.type === "gallery") {
    return (
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading section={section} />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {section.elements.map(element => (
              <div key={element.id} className="aspect-square bg-muted rounded-3xl overflow-hidden">
                {element.imageUrl && <img src={element.imageUrl} alt={element.alt || element.label} className="w-full h-full object-cover" />}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (section.type === "testimonials") {
    return (
      <section className="py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading section={section} />
          <div className="grid md:grid-cols-3 gap-5">
            {section.elements.map(renderTestimonialElement)}
          </div>
        </div>
      </section>
    );
  }

  if (section.type === "pricing") {
    return (
      <section className="py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading section={section} />
          <div className="grid md:grid-cols-3 gap-5">
            {section.elements.map(renderPackageElement)}
          </div>
        </div>
      </section>
    );
  }

  if (section.type === "cards") {
    return (
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading section={section} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {section.elements.map(renderCardElement)}
          </div>
        </div>
      </section>
    );
  }

  if (section.type === "cta") {
    return (
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <SectionHeading section={section} />
          <div className="space-y-4">{section.elements.map(renderTextElement)}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-background">
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeading section={section} />
        <div>{section.elements.map(renderTextElement)}</div>
      </div>
    </section>
  );
}

export default function CmsPageRenderer({ page }: { page: CmsPage }) {
  return (
    <>
      <SEO title={page.seoTitle || page.title} description={page.seoDescription || page.title} />
      {page.sections.map(section => <CmsSectionRenderer key={section.id} section={section} />)}
    </>
  );
}
