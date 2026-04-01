import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Flame, Check, ArrowRight, Phone } from "lucide-react";
import { useBookingModal } from "@/hooks/use-booking-modal";

const benefits = [
  "Truck-mounted hot water extraction system",
  "Removes deep-set dirt, stains & allergens",
  "Safe for all carpet types",
  "Fast drying times",
  "Eco-friendly, pet-safe solutions",
  "Extends carpet lifespan",
];

const process = [
  { step: "Pre-Inspection", desc: "We walk through your home to identify high-traffic areas, stains, and any special concerns." },
  { step: "Pre-Treatment", desc: "A specialized cleaning solution is applied to break down dirt and oils embedded in the carpet fibers." },
  { step: "Hot Water Extraction", desc: "Using our powerful truck-mounted system, we inject hot water deep into the carpet and immediately extract it along with all dissolved contaminants." },
  { step: "Post-Cleaning Inspection", desc: "We walk through with you to ensure every area meets your expectations before we consider the job complete." },
];

export default function SteamCleaning() {
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
              <Flame className="w-4 h-4" />
              Most Popular
            </span>
            <h1 className="font-serif text-3xl md:text-7xl font-normal text-white tracking-wide mb-4">
              Steam Cleaning
            </h1>
            <p className="font-serif text-xl text-white/70 italic mb-3">Hot Water Extraction</p>
            <p className="text-white/60 max-w-2xl mx-auto mb-8">
              Utilizing the most powerful truck mounted steam cleaning system ever created, we extract the years of dirt, stains, pet accidents, and allergens that seep into the carpet.
            </p>
            <Button
              data-testid="button-steam-book"
              onClick={() => setOpen(true)}
              className="bg-accent text-accent-foreground font-semibold tracking-wider px-10 py-6 border border-accent"
            >
              Book Your Cleaning
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
                Our Process
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-normal text-foreground mt-3 mb-6">The Deep Clean Your Carpet Deserves</h2>
              <div className="h-px w-16 bg-accent mb-6" />
              <p className="text-muted-foreground leading-relaxed mb-6">Our truck-mounted hot water extraction system is the gold standard in carpet cleaning. Unlike portable machines or DIY rentals, our equipment generates significantly higher water temperatures and suction power, allowing us to extract dirt and contaminants that other methods simply can't reach.</p>
              <p className="text-muted-foreground leading-relaxed mb-8">The result? Carpets that aren't just surface-clean, but deeply refreshed from the padding up. Your home will look, feel, and smell like new.</p>

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
              className="space-y-4"
            >
              {process.map((item, index) => (
                <div key={item.step} className="flex gap-4 p-4 rounded-md bg-background border border-border">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-accent font-semibold text-sm">{index + 1}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-sm mb-1">{item.step}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
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
              Ready for Fresh, Clean Carpets?
            </h2>
            <div className="h-px w-24 bg-white/30 mx-auto mb-8" />
            <p className="text-white/70 text-lg max-w-2xl mx-auto mb-10">
              Schedule your cleaning today and experience the difference that professional truck-mounted steam cleaning makes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                data-testid="button-steam-cta"
                onClick={() => setOpen(true)}
                className="bg-accent text-accent-foreground font-semibold tracking-wider px-10 py-6 border border-accent"
              >
                Book Your Cleaning
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
