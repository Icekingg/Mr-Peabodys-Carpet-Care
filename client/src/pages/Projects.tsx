import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useBookingModal } from "@/hooks/use-booking-modal";

const projects = [
  {
    title: "Los Altos Pet Stain Restoration",
    category: "Pet Treatment",
    description: "Complete pet urine treatment and carpet restoration for a family home with multiple pets.",
  },
  {
    title: "San Jose Whole-Home Deep Clean",
    category: "Steam Cleaning",
    description: "Full home carpet deep cleaning covering two floors and 8 rooms for a long-time client.",
  },
  {
    title: "Sunnyvale Upholstery Revival",
    category: "Upholstery",
    description: "Professional cleaning of a sectional sofa, loveseat, and dining chairs to remove years of buildup.",
    comingSoon: true,
  },
];

export default function Projects() {
  const { setOpen } = useBookingModal();
  return (
    <div>
      <section className="relative pt-44 pb-24 px-4 overflow-hidden bg-dark-section">
        <div className="absolute inset-0 bg-dark-section" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-white text-sm tracking-[0.3em] uppercase font-medium">
              Our Work
            </span>
            <h1 className="font-serif text-3xl md:text-7xl font-normal text-white tracking-wide mt-4 mb-4">
              Projects
            </h1>
            <p className="text-white/50 text-base max-w-2xl mx-auto">
              Explore our portfolio of completed carpet care projects across the Bay Area.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
                data-testid={`card-project-${index}`}
              >
                <div className="relative overflow-hidden rounded-md shadow-lg bg-dark-section p-8 h-full">
                  {project.comingSoon && (
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/80" />
                      <span className="relative z-10 text-foreground font-serif text-2xl tracking-widest uppercase font-normal">
                        Coming Soon
                      </span>
                    </div>
                  )}
                  <span className="bg-accent text-accent-foreground text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-md">
                    {project.category}
                  </span>
                  <h3 className="font-serif text-xl font-normal text-white mt-4 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mt-16"
          >
            <Button
              data-testid="button-projects-cta"
              onClick={() => setOpen(true)}
              className="bg-primary text-white font-semibold tracking-wider px-10 py-6"
            >
              Book Your Cleaning
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
