import { Link } from "react-router";
import { getActiveSite } from "../../theme-engine";
import { useWebsite } from "../../cms-core/platform";

export default function Footer() {
  const site = getActiveSite();
  const { website } = useWebsite();

  const serviceLinks = (website.navigation.services || site.navigation.services)
    .filter(link => link.isVisible !== false)
    .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));

  const primaryLinks = (website.navigation.primary || site.navigation.primary)
    .filter(link => link.isVisible !== false)
    .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));

  const footer = website.footer;
  const contact = website.site.contact;
  const whatsappUrl = contact.whatsapp ? `https://wa.me/${contact.whatsapp}` : "#";

  return (
    <footer className="bg-foreground py-16">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-1">
          <img
            src={site.brand.logo}
            alt={`${site.brand.name} logo`}
            className="h-14 w-auto object-contain mb-4"
            style={{ filter: "brightness(0) invert(1)" }}
          />
          <p className="text-background/40 text-sm leading-relaxed">
            {footer.description}
          </p>
        </div>

        <div>
          <p className="text-background/35 text-[10px] tracking-[0.25em] uppercase mb-5">Navigate</p>
          <ul className="flex flex-col gap-3">
            {primaryLinks.map(link => (
              <li key={link.href}>
                <a href={link.href} className="text-background/55 text-sm hover:text-background transition-colors duration-500">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-background/35 text-[10px] tracking-[0.25em] uppercase mb-5">Services</p>
          <ul className="flex flex-col gap-3">
            {serviceLinks.map(link => (
              <li key={link.href}>
                <Link to={link.href} className="text-background/55 text-sm hover:text-background transition-colors duration-500">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-background/35 text-[10px] tracking-[0.25em] uppercase mb-5">Contact</p>
          <ul className="flex flex-col gap-3 text-sm">
            <li className="text-background/55">{contact.address}</li>
            <li>
              <a href={`tel:${contact.phone}`} className="text-background/55 hover:text-background transition-colors duration-500">
                {contact.phoneDisplay || contact.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className="text-background/55 hover:text-background transition-colors duration-500">
                {contact.email}
              </a>
            </li>
            <li>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-background/55 hover:text-background transition-colors duration-500">
                WhatsApp Enquiries
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-background/10 flex flex-col sm:flex-row justify-between gap-3">
        <p className="text-background/25 text-xs">{footer.copyright}</p>
        <p className="text-background/20 text-xs">
          {footer.seoLine}
        </p>
      </div>
    </footer>
  );
}
