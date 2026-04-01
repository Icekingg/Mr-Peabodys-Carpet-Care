import { motion } from "framer-motion";
import { Shield, Check, Award, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useBookingModal } from "@/hooks/use-booking-modal";

export default function GuaranteeSection() {
  const { setOpen } = useBookingModal();
  return (
    <section data-testid="guarantee-section" className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-dark-section" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-white/60 text-sm tracking-[0.3em] uppercase font-medium">
              Our Promise
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-normal text-white mt-4 mb-6">
              If You're Not Happy,{"\n"}We Come Back Free
            </h2>
            <div className="h-px w-16 bg-white/30 mb-6" />
            <p className="text-white/60 text-base leading-relaxed mb-8">
              We stand behind every job with a 100% satisfaction guarantee. If any area doesn't meet your expectations within 7 days of service, we return and re-clean it at absolutely no charge. That's the Peabody Guarantee.
            </p>

            <ul className="space-y-4 mb-8">
              {[
                "Family owned and operated since 1993",
                "Truck-mounted equipment, not portable rentals",
                "Certified carpet cleaning technicians",
                "Eco-friendly, pet-safe cleaning solutions",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-white/80 text-sm">{item}</span>
                </li>
              ))}
            </ul>

            <Button
              data-testid="button-guarantee-book"
              onClick={() => setOpen(true)}
              className="bg-accent text-accent-foreground font-semibold tracking-wider text-base px-8 py-6 border border-accent"
            >
              Book Cleaning Now
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="hidden lg:block">
            <div className="bg-white/5 border border-white/10 rounded-md p-8">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: Check, title: "100% Satisfaction", description: "We don't consider a job complete until you're fully satisfied with the results." },
                  { icon: Shield, title: "7-Day Guarantee", description: "Not happy within 7 days? We come back and re-clean at no charge." },
                  { icon: Award, title: "30+ Years Experience", description: "Three decades of expertise means we've handled every carpet challenge." },
                  { icon: Heart, title: "Family Values", description: "As a family business, our reputation is everything. We treat your home like our own." },
                ].map((point) => (
                  <div key={point.title} className="text-center">
                    <div className="w-12 h-12 rounded-md bg-white/10 flex items-center justify-center mx-auto mb-3">
                      <point.icon className="w-6 h-6 text-white/80" />
                    </div>
                    <h4 className="text-white font-semibold text-sm mb-1">{point.title}</h4>
                    <p className="text-white/50 text-xs leading-relaxed">{point.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
