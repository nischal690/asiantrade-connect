import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Pioneers from "@/components/Pioneers";
import About from "@/components/About";
import Services from "@/components/Services";
import NewsSection from "@/components/NewsSection";
import Network from "@/components/Network";
import Careers from "@/components/Careers";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

const Index = () => {
  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-background to-muted"
    >
      <Navbar />
      <Hero />
      
      {/* Video Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative py-24 px-6 sm:px-8 lg:px-12"
      >
        <div className="max-w-6xl mx-auto">
          <div className="relative group cursor-pointer overflow-hidden rounded-2xl">
            {/* Placeholder Image */}
            <div className="aspect-video bg-gradient-to-br from-primary/30 via-secondary/30 to-accent/30 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  className="w-20 h-20 rounded-full bg-accent flex items-center justify-center shadow-lg group-hover:bg-accent/90 transition-colors"
                >
                  <Play className="w-8 h-8 text-white fill-white" />
                </motion.div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 backdrop-blur-sm" />
                <div className="absolute -top-1/2 -left-1/2 w-full h-full rotate-45 bg-gradient-to-br from-white/5 to-transparent animate-float" />
              </div>
            </div>
            
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          
          <div className="mt-8 text-center">
            <h2 className="text-2xl md:text-3xl font-heading font-bold bg-gradient-to-r from-primary-dark via-secondary-dark to-accent bg-clip-text text-transparent">
              Discover Our Story
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Experience how we're revolutionizing Asian trade connections through innovative solutions and strategic partnerships.
            </p>
          </div>
        </div>
      </motion.section>

      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-secondary/5 pointer-events-none" />
        <Pioneers />
        <About />
        <Services />
        <NewsSection />
        <Network />
        <Careers />
      </div>
      <Footer />
    </motion.main>
  );
};

export default Index;