import { motion } from "framer-motion";
import { useRef, useCallback, useState, useEffect } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { SiYelp } from "react-icons/si";
import { Card } from "@/components/ui/card";

const testimonials = [
  {
    name: "Jill K.",
    location: "Los Altos, CA",
    rating: 5,
    text: "Andrew and Sabrina are total PROS at carpet cleaning. I was referred to Mr Peabody's by a friend who owns a carpet retailer and they always refer their customers here. My dog had GI issues that made a mess on our wool carpet + urine accidents on our Persian rug. Andrew and Sabrina to the rescue! I previously had Stanley Steemer come and they were much less expensive and much worse in quality! I learned that you get what you pay for!",
    service: "Pet Treatment",
    url: "https://www.yelp.com/biz/mr-peabodys-san-jose-4?osq=peabody",
  },
  {
    name: "Paula T.",
    location: "San Jose, CA",
    rating: 5,
    text: "My daughter just moved out with her cats and I needed to get her room cleaned and cat dander free. The staff was super helpful on getting all spots out and any smells that may have been left by the cats. They are more expensive than the other carpet companies, but I felt that they did a more intense deep dive.",
    service: "Pet Treatment",
    url: "https://www.yelp.com/biz/mr-peabodys-san-jose-4?osq=peabody",
  },
  {
    name: "Judy M.",
    location: "San Jose, CA",
    rating: 5,
    text: "We have used Mr. Peabody's services for many years, and they have always been excellent. Andrew and Sabrina worked together to give our carpet a thorough cleaning. We couldn't be happier with our experience. BTW, we have also used Mr. Peabody's for their expertise in natural stone rejuvenation and it too was an excellent outcome. You won't be disappointed in using this company!",
    service: "Steam Cleaning",
    url: "https://www.yelp.com/biz/mr-peabodys-san-jose-4?osq=peabody",
  },
  {
    name: "Denise B.",
    location: "San Jose, CA",
    rating: 5,
    text: "We always choose Mr. Peabody's for our carpet cleaning, ever since we had our carpets installed 19 years ago. They were recommended by the company we purchased the carpet from. Our carpets are getting older now and it had been a while since we'd cleaned them, but Andrew and Mike came and got right to work. They efficiently worked simultaneously on both levels of the house, and were friendly, courteous, and thorough--giving us detailed instructions on what to do and what to avoid while the carpets were drying. It's nice to have clean carpets again and we will continue using Mr. Peabody's!",
    service: "Steam Cleaning",
    url: "https://www.yelp.com/biz/mr-peabodys-san-jose-4?osq=peabody",
  },
];

function TestimonialCard({ testimonial, index, showTooltip, hideTooltip }: {
  testimonial: typeof testimonials[0];
  index: number;
  showTooltip: (e: React.MouseEvent) => void;
  hideTooltip: () => void;
}) {
  return (
    <Card className={`bg-white/5 border border-white/10 p-6 h-full ${testimonial.url ? 'cursor-pointer' : ''}`}
      onClick={() => testimonial.url && window.open(testimonial.url, '_blank')}
      onMouseMove={(e) => testimonial.url && showTooltip(e)}
      onMouseLeave={hideTooltip}
    >
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-1">
          <span className="text-white font-semibold text-sm">
            {testimonial.name.split(' ').map(n => n[0]).join('')}
          </span>
        </div>
        <div>
          <div className="text-white/80 text-sm leading-relaxed mb-4 italic">
            {testimonial.text.split('\n\n').map((para, i) => (
              <p key={i} className={i > 0 ? 'mt-3' : ''}>
                {i === 0 ? `"${para}` : para}
                {i === testimonial.text.split('\n\n').length - 1 ? '"' : ''}
              </p>
            ))}
          </div>
          <div className="flex items-center gap-1 mb-2">
            {Array.from({ length: testimonial.rating }).map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <p className="text-white font-semibold text-sm" data-testid={`text-testimonial-name-${index}`}>
                {testimonial.name}
              </p>
              <p className="text-white/50 text-xs">{testimonial.location}</p>
            </div>
            <span className="text-white/80 text-xs tracking-wider uppercase font-medium bg-white/10 px-2 py-1 rounded-md">
              {testimonial.service}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}

function MobileTestimonialCard({ testimonial, index }: {
  testimonial: typeof testimonials[0];
  index: number;
}) {
  const displayText = testimonial.text.split('\n\n')[0];
  const maxLen = 320;
  let truncated = displayText;
  if (displayText.length > maxLen) {
    const cut = displayText.slice(0, maxLen);
    const lastPeriod = cut.lastIndexOf('.');
    const lastExcl = cut.lastIndexOf('!');
    const lastQ = cut.lastIndexOf('?');
    const lastSentenceEnd = Math.max(lastPeriod, lastExcl, lastQ);
    truncated = lastSentenceEnd > maxLen * 0.4 ? displayText.slice(0, lastSentenceEnd + 1) : cut.trimEnd() + "\u2026";
  }

  return (
    <Card className={`bg-white/5 border border-white/10 p-5 h-full ${testimonial.url ? 'cursor-pointer' : ''}`}
      onClick={() => testimonial.url && window.open(testimonial.url, '_blank')}
    >
      <div className="flex flex-col items-center text-center">
        <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mb-3">
          <span className="text-white font-semibold text-lg">
            {testimonial.name.split(' ').map(n => n[0]).join('')}
          </span>
        </div>
        <p className="text-white font-semibold text-sm" data-testid={`text-testimonial-name-mobile-${index}`}>
          {testimonial.name}
        </p>
        <p className="text-white/50 text-xs mb-2">{testimonial.location}</p>
        <div className="flex items-center gap-1 mb-3">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
        <p className="text-white/80 text-xs leading-relaxed italic mb-3">"{truncated}"</p>
        <span className="text-white/80 text-[10px] tracking-wider uppercase font-medium bg-white/10 px-2 py-0.5 rounded-md">
          {testimonial.service}
        </span>
      </div>
    </Card>
  );
}

export default function TestimonialsSection() {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const showTooltip = useCallback((e: React.MouseEvent) => {
    const el = tooltipRef.current;
    if (!el) return;
    el.style.transform = `translate(${e.clientX + 24}px, ${e.clientY - 10}px)`;
    el.style.opacity = "1";
  }, []);

  const hideTooltip = useCallback(() => {
    const el = tooltipRef.current;
    if (el) el.style.opacity = "0";
  }, []);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const handleScroll = () => {
      const scrollLeft = carousel.scrollLeft;
      const cardWidth = carousel.offsetWidth * 0.85 + 16;
      const newIndex = Math.round(scrollLeft / cardWidth);
      setActiveIndex(Math.min(newIndex, testimonials.length - 1));
    };
    carousel.addEventListener("scroll", handleScroll, { passive: true });
    return () => carousel.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = useCallback((direction: "prev" | "next") => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const cardWidth = carousel.offsetWidth * 0.85 + 16;
    const newIndex = direction === "next"
      ? Math.min(activeIndex + 1, testimonials.length - 1)
      : Math.max(activeIndex - 1, 0);
    carousel.scrollTo({ left: newIndex * cardWidth, behavior: "smooth" });
    setActiveIndex(newIndex);
  }, [activeIndex]);

  return (
    <section data-testid="testimonials-section" className="py-14 md:py-24 px-4 bg-dark-section relative overflow-hidden">
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 md:mb-16"
        >
          <span className="text-white text-sm tracking-[0.3em] uppercase font-medium">
            Testimonials
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-normal text-white mt-4 mb-6">
            What Our Clients Say
          </h2>
          <div className="h-px w-24 bg-white/30 mx-auto mb-6" />
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Don't just take our word for it. Here's what Bay Area homeowners say about our carpet care services.
          </p>
        </motion.div>

        <div className="hidden md:block">
          <div className="columns-1 md:columns-2 gap-8 space-y-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                className="break-inside-avoid"
              >
                <TestimonialCard testimonial={testimonial} index={index} showTooltip={showTooltip} hideTooltip={hideTooltip} />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="md:hidden">
          <div className="relative">
            <div
              ref={carouselRef}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 -mx-4 px-4"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
            >
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex-shrink-0 snap-center"
                  style={{ width: "85%" }}
                >
                  <MobileTestimonialCard testimonial={testimonial} index={index} />
                </motion.div>
              ))}
            </div>

            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={() => scrollTo("prev")}
                className={`p-2 rounded-full border border-white/20 transition-opacity ${activeIndex === 0 ? 'opacity-30' : 'opacity-70 hover:opacity-100'}`}
                aria-label="Previous testimonial"
                data-testid="button-testimonial-prev"
              >
                <ChevronLeft className="w-4 h-4 text-white" />
              </button>

              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-6 bg-white/80' : 'w-1.5 bg-white/30'}`}
                  />
                ))}
              </div>

              <button
                onClick={() => scrollTo("next")}
                className={`p-2 rounded-full border border-white/20 transition-opacity ${activeIndex === testimonials.length - 1 ? 'opacity-30' : 'opacity-70 hover:opacity-100'}`}
                aria-label="Next testimonial"
                data-testid="button-testimonial-next"
              >
                <ChevronRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        ref={tooltipRef}
        className="fixed z-50 pointer-events-none bg-white text-foreground text-xs font-semibold px-3 py-1.5 rounded-md shadow-lg"
        style={{ left: 0, top: 0, opacity: 0, willChange: "transform, opacity" }}
      >
        <span className="flex items-center gap-1.5"><SiYelp className="w-3.5 h-3.5 text-red-500" /> Yelp</span>
      </div>
    </section>
  );
}
