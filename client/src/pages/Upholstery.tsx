import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sofa, Check, ArrowRight, Phone } from "lucide-react";
import { useBookingModal } from "@/hooks/use-booking-modal";

const benefits = [
  "Safe for all fabric types",
  "Removes embedded dirt and allergens",
  "Restores color and texture",
  "Extends furniture lifespan",
  "Pet hair and dander removal",
  "Eco-friendly cleaning solutions",
];

const furnitureTypes = [
  "Sofas & Sectionals",
  "Loveseats & Chairs",
  "Dining Chairs",
  "Ottomans & Benches",
  "Mattresses",
  "Auto Interiors",
];

export default function Upholstery() {
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
              <Sofa className="w-4 h-4" />
              Furniture Care
            </span>
            <h1 className="font-serif text-3xl md:text-7xl font-normal text-white tracking-wide mb-4">
              Upholstery Cleaning
            </h1>
            <p className="font-serif text-xl text-white/70 italic mb-3">Furniture Deep Cleaning</p>
            <p className="text-white/60 max-w-2xl mx-auto mb-8">
              Professional upholstery cleaning that restores the look and freshness of your sofas, chairs, and other upholstered furniture.
            </p>
            <Button
              data-testid="button-upholstery-book"
              onClick={() => setOpen(true)}
              className="bg-accent text-accent-foreground font-semibold tracking-wider px-10 py-6 border border-accent"
            >
              Book Upholstery Cleaning
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
                Expert Care
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-normal text-foreground mt-3 mb-6">Breathe New Life Into Your Furniture</h2>
              <div className="h-px w-16 bg-accent mb-6" />
              <p className="text-muted-foreground leading-relaxed mb-6">Your upholstered furniture collects more than just dust. Body oils, pet dander, food particles, and allergens accumulate over time, making your furniture look dull and contributing to poor indoor air quality.</p>
              <p className="text-muted-foreground leading-relaxed mb-8">Our professional upholstery cleaning uses methods tailored to each fabric type, safely removing contaminants while preserving the color, texture, and integrity of your furniture. The result is furniture that looks, feels, and smells refreshed.</p>

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
                <h3 className="font-serif text-2xl text-foreground mb-6">What We Clean</h3>
                <div className="grid grid-cols-2 gap-4">
                  {furnitureTypes.map((type) => (
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
              Refresh Your Furniture Today
            </h2>
            <div className="h-px w-24 bg-white/30 mx-auto mb-8" />
            <p className="text-white/70 text-lg max-w-2xl mx-auto mb-10">
              Don't replace your furniture when a professional deep clean can make it look brand new again.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                data-testid="button-upholstery-cta"
                onClick={() => setOpen(true)}
                className="bg-accent text-accent-foreground font-semibold tracking-wider px-10 py-6 border border-accent"
              >
                Book Upholstery Cleaning
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
