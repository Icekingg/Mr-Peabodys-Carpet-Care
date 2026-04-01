import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ChevronDown, Phone } from "lucide-react";
import { useBookingModal } from "@/hooks/use-booking-modal";
import logoImage from "@assets/MR.PEABODYS_Logos-08_1771448900234.png";

export default function HeroSection() {
  const { setOpen } = useBookingModal();
  return (
    <section data-testid="hero-section" className="relative min-h-screen flex items-center justify-center" style={{ clipPath: "inset(0)" }}>
      <div className="fixed inset-0 -z-10">
        <div className="w-full h-full bg-dark-section" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-dark-section/80 via-dark-section/60 to-dark-section/90" />

      <div className="absolute inset-y-0 left-0 w-16 md:w-24 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 40px,
            rgba(212,175,55,0.15) 40px,
            rgba(212,175,55,0.15) 42px
          ),
          linear-gradient(90deg, rgba(212,175,55,0.08) 1px, transparent 1px)`,
          backgroundSize: '20px 42px, 20px 42px',
        }}
      />
      <div className="absolute inset-y-0 right-0 w-16 md:w-24 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 40px,
            rgba(212,175,55,0.15) 40px,
            rgba(212,175,55,0.15) 42px
          ),
          linear-gradient(90deg, rgba(212,175,55,0.08) 1px, transparent 1px)`,
          backgroundSize: '20px 42px, 20px 42px',
        }}
      />

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-24 pb-8">
        <motion.img
          src={logoImage}
          alt=""
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0 m-auto w-[80%] h-auto pointer-events-none z-0"
          aria-hidden="true"
        />

        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="mb-6">
            <div className="inline-block">
              <div className="h-px w-24 bg-white/30 mx-auto mb-6" />
              <span className="text-white text-sm tracking-[0.4em] uppercase font-medium">
                Est. 1993 &mdash; Bay Area, California
              </span>
              <div className="h-px w-24 bg-white/30 mx-auto mt-6" />
            </div>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative z-10 hero-title font-serif font-normal text-white tracking-wider mb-4"
          style={{ textShadow: "0 4px 20px rgba(0,0,0,0.3)", willChange: "transform, opacity", fontSize: "clamp(2.5rem, 10vw, 8rem)" }}
        >
          MR. PEABODY'S
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative z-10 font-serif text-white/80 italic tracking-wide mb-4 capitalize"
          style={{ fontSize: "clamp(1.1rem, 3vw, 2rem)" }}
        >
          the carpet care experts
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative z-10 text-white/60 tracking-widest uppercase mb-12"
          style={{ fontSize: "clamp(0.7rem, 1.2vw, 0.9rem)" }}
        >
          30+ Years of Excellence &bull; Family Owned & Operated
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            data-testid="button-hero-book"
            onClick={() => setOpen(true)}
            className="bg-accent text-accent-foreground font-semibold tracking-wider text-base px-10 py-6 border border-accent"
          >
            Book Cleaning Now
          </Button>
          <a href="tel:4082541949">
            <Button
              data-testid="button-hero-call"
              variant="outline"
              className="text-white border-white/30 tracking-wider text-base px-10 py-6 bg-white/10 backdrop-blur-sm hover:bg-white/20"
            >
              <Phone className="w-4 h-4 mr-2" />
              (408) 254-1949
            </Button>
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ willChange: "transform" }}
        >
          <ChevronDown className="w-8 h-8 text-white/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
