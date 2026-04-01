import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ArrowRight, Calendar } from "lucide-react";

const posts = [
  {
    title: "How Often Should You Have Your Carpets Professionally Cleaned?",
    excerpt: "Learn the recommended carpet cleaning frequency based on your household type, from pet owners to allergy sufferers, and why regular professional cleaning extends carpet life.",
    date: "January 15, 2026",
    category: "Maintenance Tips",
  },
  {
    title: "DIY vs Professional Carpet Cleaning: What's the Real Difference?",
    excerpt: "Understand why rental machines and store-bought cleaners can't match the deep clean of professional truck-mounted equipment, and when DIY is good enough.",
    date: "December 28, 2025",
    category: "Expert Advice",
  },
  {
    title: "Pet Owners Guide: Keeping Carpets Fresh Between Cleanings",
    excerpt: "Practical tips for pet owners to maintain cleaner carpets between professional visits, including spot cleaning techniques and preventive measures.",
    date: "November 10, 2025",
    category: "Pet Care",
  },
];

export default function Blog() {
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
              Knowledge Base
            </span>
            <h1 className="font-serif text-3xl md:text-7xl font-normal text-white tracking-wide mt-4 mb-4">
              Blog
            </h1>
            <p className="text-white/50 text-base max-w-2xl mx-auto">
              Expert tips, industry insights, and carpet care guides from the Peabody family.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <motion.div
                key={post.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <Card className="border-0 shadow-lg overflow-visible bg-white group">
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-primary text-white text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-md">
                        {post.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground text-xs mb-3">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </div>
                    <h3 className="font-serif text-lg font-normal text-foreground mb-3 leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {post.excerpt}
                    </p>
                    <span className="text-primary text-sm font-semibold inline-flex items-center gap-1 cursor-pointer group-hover:gap-2 transition-all">
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/90 to-transparent z-10 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center"
          >
            <h2 className="font-serif text-3xl md:text-5xl font-normal text-foreground mb-4">
              Work in Progress
            </h2>
            <p className="text-muted-foreground text-lg tracking-wide">
              Come Back Later
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
