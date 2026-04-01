import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBookingModal } from "@/hooks/use-booking-modal";
import logoImage from "@assets/MR.PEABODYS_Logos-08_1771448900234.png";

const serviceLinks = [
  { label: "Pet Treatment", href: "/pet-treatment" },
  { label: "Upholstery", href: "/upholstery" },
  { label: "Area Rugs", href: "/area-rugs" },
];

const navLinks = [
  { label: "Steam Cleaning", href: "/steam-cleaning" },
  { label: "Other Services", href: "#", children: serviceLinks },
  { label: "Meet the Team", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Projects", href: "/projects" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [location] = useLocation();
  const { setOpen } = useBookingModal();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav
      data-testid="navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 shadow-lg border-b border-accent/20"
          : "bg-transparent"
      }`}
      style={{ WebkitBackfaceVisibility: "hidden", backfaceVisibility: "hidden" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-20">
          <Link href="/" data-testid="link-home">
            <div className="flex items-center gap-3 cursor-pointer">
              <img
                src={logoImage}
                alt="Mr. Peabody's Carpet Care"
                className={`h-[4.5rem] w-auto transition-all duration-500 ${
                  scrolled ? "" : "brightness-0 invert"
                }`}
              />
              <div className="flex flex-col">
                <span
                  className={`font-serif text-lg font-normal tracking-wide leading-tight transition-colors duration-500 ${
                    scrolled ? "text-dark-section" : "text-white"
                  }`}
                >
                  MR. PEABODY'S
                </span>
                <span
                  className={`text-[10px] tracking-[0.25em] uppercase transition-colors duration-500 ${
                    scrolled ? "text-muted-foreground" : "text-white/60"
                  }`}
                >
                  Carpet Care
                </span>
              </div>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.label} className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className={`flex items-center gap-1 px-4 py-2 text-sm font-medium tracking-wide uppercase cursor-pointer transition-all duration-300 rounded-md whitespace-nowrap ${
                      scrolled
                        ? "text-dark-section/70 hover:text-primary"
                        : "text-white/80 hover:text-white"
                    }`}
                  >
                    {link.label}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {dropdownOpen && (
                    <div className="absolute top-full left-0 mt-1 bg-white rounded-md shadow-lg border border-gray-100 py-2 min-w-[180px] animate-in fade-in slide-in-from-top-2 duration-200">
                      {link.children.map((child) => (
                        <Link key={child.href} href={child.href}>
                          <span className="block px-4 py-2.5 text-sm font-medium text-dark-section/70 hover:text-primary hover:bg-gray-50 cursor-pointer transition-colors">
                            {child.label}
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link key={link.href} href={link.href}>
                  <span
                    data-testid={`link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                    className={`px-4 py-2 text-sm font-medium tracking-wide uppercase cursor-pointer transition-all duration-300 rounded-md whitespace-nowrap ${
                      location === link.href
                        ? scrolled
                          ? "text-primary bg-primary/5"
                          : "text-accent"
                        : scrolled
                          ? "text-dark-section/70 hover:text-primary"
                          : "text-white/80 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </span>
                </Link>
              )
            )}
          </div>

          <div className="flex items-center gap-3">
            <Button
              data-testid="button-book-cleaning"
              className="hidden sm:flex bg-accent text-accent-foreground font-semibold tracking-wide text-sm border border-accent"
              onClick={() => setOpen(true)}
            >
              Book Cleaning
            </Button>

            <button
              data-testid="button-mobile-menu"
              className="lg:hidden p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <X className={`w-6 h-6 ${scrolled ? "text-dark-section" : "text-white"}`} />
              ) : (
                <Menu className={`w-6 h-6 ${scrolled ? "text-dark-section" : "text-white"}`} />
              )}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-white backdrop-blur-md border-t border-accent/20 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="px-4 py-6 space-y-1">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.label}>
                  <button
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium tracking-wide uppercase text-dark-section/70 hover:text-primary rounded-md transition-colors"
                  >
                    {link.label}
                    <ChevronDown className={`w-4 h-4 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileServicesOpen && (
                    <div className="pl-6 space-y-1">
                      {link.children.map((child) => (
                        <Link key={child.href} href={child.href}>
                          <span className="block px-4 py-2.5 text-sm font-medium text-dark-section/60 hover:text-primary cursor-pointer transition-colors">
                            {child.label}
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link key={link.href} href={link.href}>
                  <span
                    className={`block px-4 py-3 text-sm font-medium tracking-wide uppercase cursor-pointer rounded-md transition-colors ${
                      location === link.href
                        ? "text-primary bg-primary/5"
                        : "text-dark-section/70 hover:text-primary hover:bg-gray-50"
                    }`}
                  >
                    {link.label}
                  </span>
                </Link>
              )
            )}
            <div className="pt-4">
              <Button
                className="w-full bg-accent text-accent-foreground font-semibold tracking-wide border border-accent"
                onClick={() => { setOpen(true); setMobileOpen(false); }}
              >
                Book Cleaning
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
