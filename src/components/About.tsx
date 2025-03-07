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
              AsianTrade Connect is at the forefront of luxury retail in Asia.
              We specialize in making prestigious global brands accessible to Asian consumers, crafting meaningful partnerships that transcend cultural boundaries.
              Discover how we bring visions to life and redefine luxury in dynamic markets.
            </p>
          </motion.div>

          {/* Team Section */}
          <div className="mt-16">
            <h3 className="text-3xl font-heading font-bold text-center mb-12">Our Leadership</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Giovanni Feo */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="relative h-auto">
                  <img
                    src="/giovanni.png"
                    alt="Giovanni Feo"
                    className="w-full object-contain"
                  />
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold">GIOVANNI FEO</h4>
                  <p className="text-primary font-medium">CEO & Co-Founder</p>
                  <p className="text-sm text-muted-foreground mt-1">Based in Bangkok</p>
                  <p className="mt-4 text-muted-foreground">
                    With over 6 years of experience in finance and retail, Giovanni is a dynamic leader in financial analysis, 
                    operational excellence, and driving brand expansions overseas. Based in Bangkok, he thrives on crafting 
                    innovative strategies and forging strong connections across the South East Asian market.
                  </p>
                </div>
              </motion.div>

              {/* Lorenzo Marini */}
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="relative h-auto">
                  <img
                    src="/cof.jpg"
                    alt="Lorenzo Marini"
                    className="w-full object-contain"
                  />
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold">LORENZO MARINI</h4>
                  <p className="text-primary font-medium">COO & Co-Founder</p>
                  <p className="text-sm text-muted-foreground mt-1">Based in Paris</p>
                  <p className="mt-4 text-muted-foreground">
                    Based in Paris, Lorenzo brings a wealth of expertise in strategy consulting and commercial development, 
                    specializing in the European luxury market. He has cultivated strong relationships with independent 
                    European luxury brands and iconic haute-couture groups, driving growth and innovation in the industry.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

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