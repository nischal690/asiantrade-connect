import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const About = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-secondary/5 to-accent/5" />
      <div className="container mx-auto px-6 relative">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto space-y-8"
        >
          <h2 className="text-4xl font-heading font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
            About Asian Trade Connect
          </h2>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="prose prose-lg mx-auto text-center text-muted-foreground"
          >
            <p className="text-lg leading-relaxed">
              For over six decades, Asian Trade Connect has been at the forefront of luxury retail in Asia. 
              We specialize in bridging prestigious global brands with discerning Asian markets, 
              creating meaningful connections that transcend cultural boundaries.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex justify-center"
          >
            <Link 
              to="/about"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 text-accent-foreground rounded-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              Learn More About Us
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>

        <div className="absolute -left-24 top-1/2 transform -translate-y-1/2 w-48 h-48 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute -right-24 top-1/2 transform -translate-y-1/2 w-48 h-48 bg-accent/20 rounded-full blur-3xl" />
      </div>
    </section>
  );
};

export default About;