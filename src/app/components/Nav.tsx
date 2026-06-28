import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Menu, X, ArrowRight, ChevronDown } from "lucide-react";
import { getActiveSite } from "../../theme-engine";
import { useWebsite } from "../../cms-core/platform";

export default function Nav() {
  const site = getActiveSite();
  const { website } = useWebsite();

  const serviceLinks = (website.navigation.services || site.navigation.services)
    .filter(link => link.isVisible !== false)
    .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));

  const primaryLinks = (website.navigation.primary || site.navigation.primary)
    .filter(link => link.isVisible !== false)
    .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));

  const cta = website.navigation.cta || site.navigation.cta;

  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [navHidden, setNavHidden] = useState(false);

  useEffect(() => {
    let lastScrollTop = 0;

    const handleScroll = () => {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

      if (currentScroll > lastScrollTop && currentScroll > 100) {
        setNavHidden(true);
      } else {
        setNavHidden(false);
      }

      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent border-none shadow-none">
      <nav className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between gap-8">

        <Link to="/" aria-label={`${site.brand.name} - Home`} className="flex-none">
          <img
            src={site.brand.logo}
            alt={`${site.brand.name} logo`}
            className="h-11 w-auto object-contain"
          />
        </Link>

        {/* Desktop links */}
        <ul className={`hidden md:flex items-center bg-white/90 backdrop-blur-md rounded-full shadow-[0_12px_30px_rgba(0,0,0,0.14)] px-[22px] py-[6px] transition-all duration-500 ${navHidden ? "opacity-0 -translate-y-[120%] pointer-events-none" : "opacity-100 translate-y-0"}`}>
          {primaryLinks.filter(link => link.label === "Portfolio").map(link => (
            <li key={link.href}>
              <Link to={link.href} className="group relative inline-flex items-center px-[18px] py-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-500">
                {link.label}
                <span className="absolute bottom-0 left-[18px] right-[18px] h-px bg-foreground origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
              </Link>
            </li>
          ))}

          {/* Services dropdown */}
          <li className="relative group after:content-[''] after:absolute after:left-[-20px] after:right-[-20px] after:top-full after:h-[18px]">
            <button className="relative inline-flex items-center gap-1.5 px-[18px] py-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-500">
              Services
              <ChevronDown size={13} className="transition-transform duration-500 group-hover:rotate-180" />
              <span className="absolute bottom-0 left-[18px] right-[18px] h-px bg-foreground origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
            </button>
            <div className="absolute top-[calc(100%+6px)] left-1/2 -translate-x-1/2 bg-background border border-border rounded-2xl shadow-xl p-2 min-w-[220px] opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-500 delay-75 pointer-events-none group-hover:pointer-events-auto">
              {serviceLinks.map(link => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl transition-colors duration-500"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </li>

          {primaryLinks.filter(link => link.label !== "Portfolio").map(link => (
            <li key={link.href}>
              <a href={link.href} className="group relative inline-flex items-center px-[18px] py-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-500">
                {link.label}
                <span className="absolute bottom-0 left-[18px] right-[18px] h-px bg-foreground origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          {cta?.isVisible !== false && (
            <a
              href={cta.href}
              className="group hidden md:inline-flex items-center gap-[18px] h-10 pl-6 pr-3.5 bg-primary text-primary-foreground text-xs tracking-[0.12em] uppercase font-medium rounded-full hover:opacity-80 transition-opacity duration-500"
            >
              <span className="group-hover:[order:1]">{cta.label}</span>
              <span className="group-hover:[order:0] flex items-center justify-center w-5 h-5">
                <ArrowRight size={14} />
              </span>
            </a>
          )}
          <button
            className="md:hidden text-foreground p-2 rounded-full bg-white/90 shadow-[0_8px_24px_rgba(0,0,0,0.12)] backdrop-blur-md hover:bg-white transition-colors duration-500"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-transparent border-none px-6 py-6 flex flex-col gap-2">
          {primaryLinks.filter(link => link.label === "Portfolio").map(link => (
            <Link key={link.href} to={link.href} className="px-[18px] py-2 text-base text-foreground bg-white/90 shadow-sm hover:bg-white transition-colors rounded-full" onClick={() => setMenuOpen(false)}>
              {link.label}
            </Link>
          ))}

          <div>
            <button
              className="w-full text-left px-[18px] py-2 text-base text-foreground bg-white/90 shadow-sm rounded-full flex items-center justify-between transition-colors"
              onClick={() => setServicesOpen(!servicesOpen)}
            >
              Services
              <ChevronDown size={15} className={`transition-transform duration-500 ${servicesOpen ? "rotate-180" : ""}`} />
            </button>
            {servicesOpen && (
              <div className="pl-4 flex flex-col gap-0.5 mt-1">
                {serviceLinks.map(link => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="px-[18px] py-2 text-sm text-foreground bg-white/80 hover:bg-white transition-colors rounded-full"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {primaryLinks.filter(link => link.label !== "Portfolio").map(link => (
            <a key={link.href} href={link.href} className="px-[18px] py-2 text-base text-foreground bg-white/90 shadow-sm hover:bg-white transition-colors rounded-full" onClick={() => setMenuOpen(false)}>
              {link.label}
            </a>
          ))}
          {cta?.isVisible !== false && (
            <a
              href={cta.href}
              className="mt-4 inline-flex items-center justify-between gap-[18px] h-10 pl-6 pr-3.5 bg-primary text-primary-foreground text-xs tracking-[0.12em] uppercase font-medium rounded-full"
              onClick={() => setMenuOpen(false)}
            >
              <span>{cta.label}</span>
              <span className="flex items-center justify-center w-5 h-5"><ArrowRight size={14} /></span>
            </a>
          )}
        </div>
      )}
    </header>
  );
}
