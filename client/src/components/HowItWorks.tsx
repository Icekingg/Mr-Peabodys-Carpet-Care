import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Book Your Cleaning",
    description: "Call or click to receive a free over-the-phone consultation. You tell us your carpet care needs, and we give you a transparent quote.",
  },
  {
    number: "02",
    title: "We Come to You",
    description: "Our fully-equipped team arrives on time with truck-mounted equipment, no setup hassle for you.",
  },
  {
    number: "03",
    title: "Walkthrough & Treatment",
    description: "An in-person assessment is done to address specific issues and needs. Our crew then does the job quickly and efficiently.",
  },
  {
    number: "04",
    title: "Satisfaction Guaranteed",
    description: "Your satisfaction is our priority, and we do not consider the job finished until you are happy with the results.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-background">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-muted-foreground text-sm tracking-[0.3em] uppercase font-medium">
            Simple Process
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-normal text-foreground mt-4">
            How It Works
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="text-center"
            >
              <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-accent font-semibold text-lg">{step.number}</span>
              </div>
              <h3 className="font-serif text-lg font-normal text-foreground mb-3">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
