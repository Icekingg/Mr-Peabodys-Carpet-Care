import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PawPrint, Check, ArrowRight, Phone } from "lucide-react";
import { useBookingModal } from "@/hooks/use-booking-modal";

const benefits = [
  "Enzyme-based urine breakdown",
  "Eliminates odor at the source, not just masking",
  "Kills bacteria and germs",
  "Safe for pets and children",
  "Treats carpet padding and subfloor if needed",
  "Works on old and new stains",
];

export default function PetTreatment() {
  const { setOpen } = useBookingModal();

  return (
    <div>
      <section className="relative pt-44 pb-24 px-4" style={{ clipPath: "inset(0)" }}>
        <div className="absolute inset-0 bg-gradient-to-b from-dark-section/90 via-dark-section/80 to-dark-section/95" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 bg-accent text-accent-foreground text-xs font-bold tracking-wider uppercase px-4 py-2 rounded-md mb-6 mt-6 sm:mt-4 md:mt-2 lg:mt-0">
              <PawPrint className="w-4 h-4" />
              Specialty Service
            </span>
            <h1 className="font-serif text-3xl md:text-7xl font-normal text-white tracking-wide mb-4">
              Pet Treatment
            </h1>
            <p className="font-serif text-xl text-white/70 italic mb-3">Odor & Stain Elimination</p>
            <p className="text-white/60 max-w-2xl mx-auto mb-8">
              Powerful enzyme treatment that breaks down pet urine to eliminate not just the odor, but the germs and residue as well.
            </p>
            <Button
              data-testid="button-pet-book"
              onClick={() => setOpen(true)}
              className="bg-accent text-accent-foreground font-semibold tracking-wider px-10 py-6 border border-accent"
            >
              Book Pet Treatment
            </Button>
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-accent text-sm tracking-[0.3em] uppercase font-medium">
                How It Works
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-normal text-foreground mt-3 mb-6">Beyond Surface-Level Cleaning</h2>
              <div className="h-px w-16 bg-accent mb-6" />
              <p className="text-muted-foreground leading-relaxed mb-6">Pet accidents don't just affect the surface of your carpet. Urine seeps through carpet fibers, into the padding, and sometimes even into the subfloor beneath. Store-bought cleaners only address the surface, leaving behind the bacteria and crystals that cause lingering odor.</p>
              <p className="text-muted-foreground leading-relaxed mb-8">Our professional enzyme treatment works at the molecular level, breaking down uric acid crystals and eliminating the source of the odor completely. Combined with our hot water extraction system, we ensure your carpet is truly clean from top to bottom.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-background border border-border rounded-md p-8">
                <h3 className="font-serif text-2xl text-foreground mb-6">Our Pet Treatment Process</h3>
                <div className="space-y-6">
                  {[
                    { title: "UV Light Inspection", desc: "We use UV light to locate all affected areas, even ones invisible to the naked eye." },
                    { title: "Enzyme Application", desc: "Professional-grade enzyme solution is applied to break down uric acid crystals at the molecular level." },
                    { title: "Dwell Time", desc: "The enzyme solution is given time to fully penetrate and neutralize contaminants deep in the carpet and padding." },
                    { title: "Hot Water Extraction", desc: "Our truck-mounted system extracts the dissolved contaminants, leaving your carpet fresh and sanitized." },
                  ].map((item, index) => (
                    <div key={item.title} className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-accent font-semibold text-xs">{index + 1}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground text-sm mb-1">{item.title}</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-dark-section">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-4xl md:text-5xl font-normal text-white mb-6">
              Love Your Pets, Love Your Carpets
            </h2>
            <div className="h-px w-24 bg-white/30 mx-auto mb-8" />
            <p className="text-white/70 text-lg max-w-2xl mx-auto mb-10">
              Don't let pet accidents force you into replacing your carpet. Our professional pet treatment can restore even heavily affected areas.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                data-testid="button-pet-cta"
                onClick={() => setOpen(true)}
                className="bg-accent text-accent-foreground font-semibold tracking-wider px-10 py-6 border border-accent"
              >
                Schedule Pet Treatment
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <a href="tel:4082541949">
                <Button
                  variant="outline"
                  className="text-white border-white/30 tracking-wider px-10 py-6 bg-white/10 backdrop-blur-sm hover:bg-white/20"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  (408) 254-1949
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
