import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import NewsSection from "@/components/NewsSection";
import { ArrowRight } from "lucide-react";

const NewsPage = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px]"
        />
        
        <div className="container mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
              Latest News & Updates
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Stay informed about our latest developments, industry insights, and company announcements.
            </p>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-primary/30 rounded-full filter blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute top-0 right-0 w-72 h-72 bg-secondary/30 rounded-full filter blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2" />
      </section>

      {/* Featured News */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-16"
          >
            <div className="relative aspect-video rounded-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81"
                alt="Featured news"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <div className="space-y-6">
              <span className="inline-block px-4 py-2 rounded-full text-sm font-medium bg-primary/10 text-primary">
                Featured Story
              </span>
              <h2 className="text-3xl font-heading font-bold">
                Revolutionizing Luxury Retail: Our Vision for 2024
              </h2>
              <p className="text-muted-foreground">
                Discover how we're transforming the luxury retail landscape with innovative technologies
                and sustainable practices. Our commitment to excellence continues to shape the future of retail.
              </p>
              <button className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
                Read More <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* News Grid */}
      <NewsSection />

      {/* Newsletter Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-3xl font-heading font-bold mb-6">
              Stay Updated
            </h2>
            <p className="text-muted-foreground mb-8">
              Subscribe to our newsletter to receive the latest updates and insights directly in your inbox.
            </p>
            <form className="flex gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
        
        {/* Decorative gradient orb */}
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-full filter blur-3xl opacity-50 translate-x-1/2 translate-y-1/2" />
      </section>
    </main>
  );
};

export default NewsPage;