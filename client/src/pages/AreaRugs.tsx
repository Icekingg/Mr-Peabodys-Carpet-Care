import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Layers, Check, ArrowRight, Phone } from "lucide-react";
import { useBookingModal } from "@/hooks/use-booking-modal";

const benefits = [
  "On-site and pickup service available",
  "Safe for all rug types and materials",
  "Hand-woven and machine-made rug expertise",
  "Color-safe cleaning solutions",
  "Fringe cleaning and repair",
  "Moth and pest treatment available",
];

const rugTypes = [
  "Persian Rugs",
  "Oriental Rugs",
  "Wool Rugs",
  "Silk Rugs",
  "Synthetic Rugs",
  "Antique Rugs",
  "Shag Rugs",
  "Braided Rugs",
];

export default function AreaRugs() {
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
              <Layers className="w-4 h-4" />
              Specialty Rug Care
            </span>
            <h1 className="font-serif text-3xl md:text-7xl font-normal text-white tracking-wide mb-4">
              Area Rugs
            </h1>
            <p className="font-serif text-xl text-white/70 italic mb-3">Specialty Rug Care</p>
            <p className="text-white/60 max-w-2xl mx-auto mb-8">
              On-site cleaning and rug pick ups offered for all rug types. From machined synthetics to hand-woven fabric, we can cater to your exact needs.
            </p>
            <Button
              data-testid="button-rugs-book"
              onClick={() => setOpen(true)}
              className="bg-accent text-accent-foreground font-semibold tracking-wider px-10 py-6 border border-accent"
            >
              Book Rug Cleaning
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
                Expert Rug Care
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-normal text-foreground mt-3 mb-6">Every Rug Deserves Expert Care</h2>
              <div className="h-px w-16 bg-accent mb-6" />
              <p className="text-muted-foreground leading-relaxed mb-6">Area rugs are more than just floor coverings - they're often valuable investments, family heirlooms, or statement pieces that tie a room together. Each type of rug requires a different cleaning approach based on its material, construction, and age.</p>
              <p className="text-muted-foreground leading-relaxed mb-8">Our team has extensive experience with all rug types, from delicate hand-woven Persian rugs to durable synthetic options. We assess each rug individually and select the appropriate cleaning method to ensure the best results without risking damage.</p>

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
                <h3 className="font-serif text-2xl text-foreground mb-6">Rug Types We Clean</h3>
                <div className="grid grid-cols-2 gap-3">
                  {rugTypes.map((type) => (
                    <div key={type} className="flex items-center gap-3 p-3 rounded-md bg-white border border-border">
                      <Check className="w-4 h-4 text-accent flex-shrink-0" />
                      <span className="text-sm text-foreground">{type}</span>
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
              Restore Your Rugs to Their Former Glory
            </h2>
            <div className="h-px w-24 bg-white/30 mx-auto mb-8" />
            <p className="text-white/70 text-lg max-w-2xl mx-auto mb-10">
              Whether it's a treasured Persian rug or a high-traffic runner, we have the expertise to clean it safely and thoroughly.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                data-testid="button-rugs-cta"
                onClick={() => setOpen(true)}
                className="bg-accent text-accent-foreground font-semibold tracking-wider px-10 py-6 border border-accent"
              >
                Book Rug Cleaning
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
