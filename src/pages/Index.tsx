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