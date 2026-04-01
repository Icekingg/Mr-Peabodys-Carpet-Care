import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BookEstimate() {
  return (
    <div>
      <section className="relative pt-44 pb-24 px-4 overflow-hidden bg-dark-section">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-white text-sm tracking-[0.3em] uppercase font-medium">
              Get Started
            </span>
            <h1 className="font-serif text-3xl md:text-7xl font-normal text-white tracking-wide mt-4 mb-4">
              Book Estimate
            </h1>
            <p className="text-white/50 text-base max-w-2xl mx-auto">
              Schedule your free, no-obligation consultation with one of our carpet care experts.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-accent text-sm tracking-[0.3em] uppercase font-medium">
                Contact Us
              </span>
              <h2 className="font-serif text-3xl font-normal text-foreground mt-3 mb-6">
                We'd Love to Hear From You
              </h2>
              <div className="h-px w-16 bg-accent mb-6" />
              <p className="text-muted-foreground leading-relaxed mb-8">
                Our calendar booking system is coming soon. In the meantime, reach out to us directly and we'll schedule your free estimate at a time that works best for you.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-sm">Call Us</h4>
                    <a href="tel:4082541949" className="text-primary text-sm hover:underline" data-testid="link-phone">
                      (408) 254-1949
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-sm">Email Us</h4>
                    <a href="mailto:contact@mrpeabodyscarpetcare.com" className="text-primary text-sm hover:underline" data-testid="link-email">
                      contact@mrpeabodyscarpetcare.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-sm">Service Area</h4>
                    <p className="text-muted-foreground text-sm">
                      San Francisco Bay Area, California
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-sm">Hours</h4>
                    <p className="text-muted-foreground text-sm">
                      Monday - Friday: 8:30 AM - 4:30 PM
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="p-8 bg-background rounded-md border border-border">
                <h3 className="font-serif text-xl font-normal text-foreground mb-4">
                  What to Expect
                </h3>
                <div className="space-y-6">
                  {[
                    { step: "1", title: "Contact Us", desc: "Call or email us to discuss your carpet care needs." },
                    { step: "2", title: "Free Consultation", desc: "We'll discuss your needs over the phone and provide a transparent quote." },
                    { step: "3", title: "Schedule Service", desc: "Pick a date that works for you. We work around your schedule." },
                    { step: "4", title: "We Come to You", desc: "Our team arrives on time with truck-mounted equipment ready to go." },
                    { step: "5", title: "Satisfaction Guaranteed", desc: "We don't leave until you're happy with the results." },
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm font-bold">{item.step}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground text-sm">{item.title}</h4>
                        <p className="text-muted-foreground text-xs mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-border">
                  <a href="tel:4082541949">
                    <Button
                      data-testid="button-book-call"
                      className="w-full bg-accent text-accent-foreground font-semibold tracking-wider border border-accent"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Call Now for Free Estimate
                    </Button>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
