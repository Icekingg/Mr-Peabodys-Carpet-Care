import { useState } from "react";
import { Link } from "wouter";
import { Phone, Mail, MapPin, Clock, Check } from "lucide-react";
import { useBookingModal } from "@/hooks/use-booking-modal";
import logoImage from "@assets/MR.PEABODYS_Logos-08_1771448900234.png";

export default function Footer() {
  const { setOpen } = useBookingModal();
  const [emailCopied, setEmailCopied] = useState(false);
  return (
    <footer data-testid="footer" className="bg-dark-section text-white/80 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src={logoImage}
                alt="Mr. Peabody's Logo"
                className="h-14 w-auto brightness-0 invert"
              />
              <div>
                <h3 className="font-serif text-2xl font-normal text-white tracking-wide">
                  MR. PEABODY'S
                </h3>
                <p className="text-white text-xs tracking-[0.3em] uppercase">Carpet Care</p>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              Bay Area's premier family-owned carpet care company. Deep cleaning, pet treatment, upholstery, and area rug care since 1993.
            </p>
          </div>

          <div>
            <h4 className="font-serif text-lg font-normal text-white mb-4">Services</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/steam-cleaning">
                  <span className="text-sm text-white/50 hover:text-white transition-colors cursor-pointer" data-testid="link-footer-steam-cleaning">
                    Steam Cleaning
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/pet-treatment">
                  <span className="text-sm text-white/50 hover:text-white transition-colors cursor-pointer" data-testid="link-footer-pet-treatment">
                    Pet Treatment
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/upholstery">
                  <span className="text-sm text-white/50 hover:text-white transition-colors cursor-pointer" data-testid="link-footer-upholstery">
                    Upholstery
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/area-rugs">
                  <span className="text-sm text-white/50 hover:text-white transition-colors cursor-pointer" data-testid="link-footer-area-rugs">
                    Area Rugs
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg font-normal text-white mb-4">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about">
                  <span className="text-sm text-white/50 hover:text-white transition-colors cursor-pointer" data-testid="link-footer-about">
                    Meet the Team
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/projects">
                  <span
                    className="text-sm text-white/50 hover:text-white transition-colors cursor-pointer"
                    data-testid="link-footer-projects"
                  >
                    Our Projects
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/blog">
                  <span className="text-sm text-white/50 hover:text-white transition-colors cursor-pointer" data-testid="link-footer-blog">
                    Blog
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg font-normal text-white mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-white/70 flex-shrink-0" />
                <a href="tel:+14082541949" className="text-sm text-white/50 hover:text-white transition-colors" data-testid="text-phone">(408) 254-1949</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-white/70 flex-shrink-0" />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    navigator.clipboard.writeText("contact@mrpeabodyscarpetcare.com");
                    setEmailCopied(true);
                    setTimeout(() => setEmailCopied(false), 2000);
                  }}
                  className="text-sm text-white/50 hover:text-white transition-colors relative"
                  data-testid="text-email"
                >
                  contact@mrpeabodyscarpetcare.com
                  {emailCopied && (
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-[#111118] text-xs font-medium px-3 py-1 rounded-md shadow-lg whitespace-nowrap flex items-center gap-1 animate-in fade-in slide-in-from-bottom-2 duration-200">
                      <Check className="w-3 h-3" /> Copied!
                    </span>
                  )}
                </button>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-white/70 flex-shrink-0 mt-0.5" />
                <a
                  href="https://maps.app.goo.gl/j9kZXo6qabV9zXFbA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/50 hover:text-white transition-colors cursor-pointer"
                  data-testid="text-address"
                >
                  6288 San Ignacio Ave Ste. C
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-white/70 flex-shrink-0" />
                <span className="text-sm text-white/50">Mon-Fri: 8:30AM - 4:30PM</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">
            &copy; {new Date().getFullYear()} Mr. Peabody's Carpet Care. All rights reserved.
          </p>
          <p className="text-white/30 text-xs">
            Serving the San Francisco Bay Area for 30+ Years
          </p>
        </div>
      </div>
    </footer>
  );
}
