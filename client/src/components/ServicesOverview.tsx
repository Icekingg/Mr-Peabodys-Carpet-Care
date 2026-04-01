import { motion } from "framer-motion";
import { Link } from "wouter";
import { Flame, PawPrint, Sofa, Layers, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Flame,
    title: "Steam Cleaning",
    subtitle: "Hot Water Extraction",
    description:
      "Utilizing the most powerful truck mounted steam cleaning system ever created, we extract the years of dirt, stains, pet accidents, and allergens that seep into the carpet.",
    href: "/steam-cleaning",
    badge: "Most Popular",
  },
  {
    icon: PawPrint,
    title: "Pet Treatment",
    subtitle: "Odor & Stain Elimination",
    description:
      "Powerful Enzyme treatment that breaks down pet urine to eliminate not just the odor, but the germs and residue as well.",
    href: "/pet-treatment",
    badge: "Specialty",
  },
  {
    icon: Sofa,
    title: "Upholstery",
    subtitle: "Furniture Deep Cleaning",
    description:
      "Professional upholstery cleaning that restores the look and freshness of your sofas, chairs, and other upholstered furniture.",
    href: "/upholstery",
    badge: "Furniture",
  },
  {
    icon: Layers,
    title: "Area Rugs",
    subtitle: "Specialty Rug Care",
    description:
      "On-site cleaning and rug pick ups offered for all rug types. From machined synthetics to hand-woven fabric, we can cater to your exact needs.",
    href: "/area-rugs",
    badge: "Restoration",
  },
];

export default function ServicesOverview() {
  return (
    <section data-testid="services-overview" className="py-14 px-4 bg-gradient-to-b from-background to-white relative">
      <div className="absolute inset-y-0 left-0 w-8 md:w-16 opacity-10 pointer-events-none"
        style={{
          background: `repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(212,175,55,0.2) 60px, rgba(212,175,55,0.2) 62px)`,
        }}
      />
      <div className="absolute inset-y-0 right-0 w-8 md:w-16 opacity-10 pointer-events-none"
        style={{
          background: `repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(212,175,55,0.2) 60px, rgba(212,175,55,0.2) 62px)`,
        }}
      />
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm tracking-[0.3em] uppercase font-medium">
            What We Do
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-normal text-foreground mt-4 mb-6">
            Our Services
          </h2>
          <div className="h-px w-24 bg-accent mx-auto mb-6" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Three decades of expertise in carpet and upholstery care, from deep cleaning to specialty treatments.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <Card className="group relative border-0 shadow-lg overflow-visible bg-white h-full">
                <div className="p-6 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center">
                      <service.icon className="w-6 h-6 text-primary" />
                    </div>
                    <span className="bg-accent text-accent-foreground text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-md">
                      {service.badge}
                    </span>
                  </div>

                  <div className="mb-3">
                    <h3 className="font-serif text-xl font-normal text-foreground">
                      {service.title}
                    </h3>
                    <p className="text-accent text-xs tracking-wider uppercase font-medium">
                      {service.subtitle}
                    </p>
                  </div>

                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                    {service.description}
                  </p>

                  <Link href={service.href}>
                    <Button
                      data-testid={`button-service-${service.title.toLowerCase().replace(/\s+/g, "-")}`}
                      variant="outline"
                      className="w-full group/btn border-primary/20 text-primary transition-all duration-300"
                    >
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
