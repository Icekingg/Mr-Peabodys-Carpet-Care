import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Clock, MapPin, Award } from "lucide-react";
import { useBookingModal } from "@/hooks/use-booking-modal";
import GuaranteeSection from "@/components/GuaranteeSection";

const stats = [
  { icon: Clock, value: "30+", label: "Years Experience" },
  { icon: Users, value: "10,000+", label: "Homes Served" },
  { icon: MapPin, value: "Bay Area", label: "Proudly Serving" },
  { icon: Award, value: "5-Star", label: "Rated on Yelp" },
];

export default function About() {
  const { setOpen } = useBookingModal();
  return (
    <div>
      <section className="relative pt-44 pb-24 px-4" style={{ clipPath: "inset(0)" }}>
        <div className="absolute inset-0 bg-dark-section" />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-section/85 via-dark-section/75 to-dark-section/90" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-serif text-3xl md:text-7xl font-normal text-white tracking-wide mb-4">Meet the Team</h1>
            <p className="font-serif text-xl text-white/70 italic mb-3">
              Family-Owned Since 1993
            </p>
            <p className="text-white/50 text-base max-w-2xl mx-auto">Meet the Carpet Care Experts</p>
          </motion.div>
        </div>
      </section>
      <section className="bg-primary">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center pt-0 pb-2"
              >
                <p className="font-serif text-2xl font-normal text-white" data-testid={`text-stat-${index}`}>
                  {stat.value}
                </p>
                <p className="text-white/70 text-xs tracking-wider uppercase mt-0.5">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="pt-24 pb-10 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-accent text-sm tracking-[0.3em] uppercase font-medium">
                Our Heritage
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-normal text-foreground mt-3 mb-6">
                A Family Tradition of Excellence
              </h2>
              <div className="h-px w-16 bg-accent mb-6" />
              <p className="text-muted-foreground leading-relaxed mb-6">Mr. Peabody's was founded in 1993 with a simple mission: to provide the Bay Area with the highest quality carpet care services. What started as a one-person operation has grown into a trusted family business, with skills and knowledge passed down to the next generation.</p>
              <p className="text-muted-foreground leading-relaxed mb-6">Over 30 years, we've cleaned thousands of carpets, treated countless pet stains, restored upholstery, and cared for area rugs of every type. Our commitment to excellence has earned us a reputation as the go-to carpet care experts in the San Francisco Bay Area.</p>
              <p className="text-muted-foreground leading-relaxed">
                Every member of our team shares the same passion for quality and the same dedication to customer satisfaction. When you choose Mr. Peabody's, you're not just hiring a service &mdash; you're welcoming a family that will treat your home with the same care and attention we give our own.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative w-full rounded-md shadow-xl overflow-hidden">
                <div className="absolute inset-0 bg-white flex items-center justify-center" style={{ position: "relative", height: "400px" }}>
                  <span className="text-3xl md:text-5xl font-bold text-muted-foreground/40 tracking-widest uppercase">
                    PLACEHOLDER
                  </span>
                </div>
              </div>
              <p className="text-center text-muted-foreground text-sm mt-4 italic">
                It's hard to get a good picture of so many beautiful people, give us some time :)
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      <GuaranteeSection />

      <section className="pb-24 pt-4 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Button
              data-testid="button-about-cta"
              onClick={() => setOpen(true)}
              className="bg-primary text-white font-semibold tracking-wider px-10 py-6"
            >
              Let's Work Together
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
