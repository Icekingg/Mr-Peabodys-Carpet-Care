import { motion } from "framer-motion";

interface AlternatingFeatureProps {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  imageAlt: string;
  reversed?: boolean;
  children?: React.ReactNode;
}

export default function AlternatingFeature({
  title,
  subtitle,
  description,
  image,
  imageAlt,
  reversed = false,
  children,
}: AlternatingFeatureProps) {
  return (
    <div className={`flex flex-col ${reversed ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-8 lg:gap-16`}>
      <motion.div
        initial={{ opacity: 0, x: reversed ? 60 : -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="w-full lg:w-1/2"
      >
        <div className="relative overflow-hidden rounded-md shadow-xl">
          <img
            src={image}
            alt={imageAlt}
            className="w-full h-80 lg:h-[450px] object-cover"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-section/30 to-transparent" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: reversed ? -60 : 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full lg:w-1/2"
      >
        <span className="text-accent text-sm tracking-[0.3em] uppercase font-medium">
          {subtitle}
        </span>
        <h3 className="font-serif text-3xl md:text-4xl font-normal text-foreground mt-3 mb-6">
          {title}
        </h3>
        <div className="h-px w-16 bg-accent mb-6" />
        <p className="text-muted-foreground text-base leading-relaxed mb-6">
          {description}
        </p>
        {children}
      </motion.div>
    </div>
  );
}
