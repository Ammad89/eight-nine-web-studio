import { useState } from "react";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import BookingCTA from "../../app/components/BookingCTA";
import SEO from "../../app/components/SEO";
import { getActiveSite, resolveThemeAsset } from "../";
import type { PortfolioCategory, portfolioPage } from "../../themes/eight-nine-luxury/pages";

type PortfolioPageData = typeof portfolioPage;

interface PortfolioRendererProps {
  page: PortfolioPageData;
}

export default function PortfolioRenderer({ page }: PortfolioRendererProps) {
  const site = getActiveSite();
  const [active, setActive] = useState<PortfolioCategory>("All");

  const images = page.gallery.map(image => ({
    ...image,
    src: resolveThemeAsset(image.assetKey),
  }));

  const filtered = active === "All" ? images : images.filter(image => image.category === active);

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: `${site.brand.name} Portfolio`,
    description: page.seo.description,
    author: {
      "@type": "LocalBusiness",
      name: site.business.name,
      url: site.domain.siteUrl,
    },
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

      <section className="pt-[72px] bg-background">
        <div className="max-w-7xl mx-auto px-6 pt-20 pb-14 text-center">
          <p className="text-muted-foreground text-[10px] tracking-[0.35em] uppercase mb-4 font-medium">{page.header.eyebrow}</p>
          <h1
            className="text-4xl sm:text-5xl font-medium text-foreground mb-5"
            style={{ fontFamily: "'Lora', Georgia, serif" }}
          >
            {page.header.title}
          </h1>
          <p className="text-muted-foreground text-base max-w-md mx-auto leading-relaxed mb-12">
            {page.header.description}
          </p>

          <div className="flex flex-wrap justify-center gap-2">
            {page.categories.map(category => (
              <button
                key={category}
                type="button"
                onClick={() => setActive(category)}
                className={`px-5 py-2.5 rounded-full text-xs tracking-[0.1em] uppercase font-medium transition-colors duration-500 ${
                  active === category
                    ? "bg-foreground text-background"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {category}
                {category !== "All" && (
                  <span className="ml-2 opacity-50">
                    {images.filter(image => image.category === category).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-28 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
            {filtered.map((image, index) => (
              <Link
                key={`${image.assetKey}-${index}`}
                to={image.path}
                className="group block break-inside-avoid mb-4 rounded-3xl overflow-hidden bg-muted relative"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className="w-full object-cover transition-transform duration-1000 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-700" />
                <div className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <span className="inline-flex items-center self-start gap-1.5 px-3 py-1 bg-background text-foreground text-[10px] tracking-[0.15em] uppercase font-medium rounded-full mb-2">
                    {image.category}
                  </span>
                  <p className="text-white/80 text-xs">{image.alt}</p>
                  <span className="inline-flex items-center gap-1.5 mt-3 text-white text-[10px] tracking-wider uppercase font-medium">
                    View service <ArrowRight size={11} />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-24">
              <p className="text-muted-foreground text-sm">No images in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      <section className="pb-28 bg-secondary">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-muted-foreground text-[10px] tracking-[0.35em] uppercase mb-4 font-medium text-center">{page.serviceLinks.eyebrow}</p>
          <h2
            className="text-3xl sm:text-4xl font-medium text-foreground mb-14 text-center"
            style={{ fontFamily: "'Lora', Georgia, serif" }}
          >
            {page.serviceLinks.heading}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {page.categoryCards.map(card => {
              const cover = images.find(image => image.category === card.category);
              return (
                <Link
                  key={card.category}
                  to={card.path}
                  className="group relative rounded-3xl overflow-hidden bg-muted block"
                  style={{ aspectRatio: "3/4" }}
                >
                  {cover && (
                    <img
                      src={cover.src}
                      alt={`${card.category} photography by ${site.brand.name}`}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.05]"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p
                      className="text-white text-lg font-medium mb-1"
                      style={{ fontFamily: "'Lora', Georgia, serif" }}
                    >
                      {card.label}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-white/70 text-xs tracking-wider uppercase font-medium group-hover:gap-2.5 transition-all duration-500">
                      View page <ArrowRight size={11} />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <BookingCTA
        headline={page.booking.headline}
        subtext={page.booking.subtext}
      />
    </>
  );
}
