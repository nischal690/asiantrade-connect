import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const Pioneers = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section ref={sectionRef} className="section-padding bg-gradient-to-b from-muted to-white overflow-hidden">
      <div className="container mx-auto relative">
        {/* Decorative elements */}
        <motion.div 
          initial={{ opacity: 0, rotate: -12 }}
          animate={{ opacity: 0.05, rotate: -12 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 grid grid-cols-2 md:grid-cols-3 gap-8"
        >
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="h-32 bg-accent rounded-lg transform rotate-45"
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>

        <div className="relative max-w-4xl mx-auto space-y-12">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: isInView ? 1 : 0.8, opacity: isInView ? 1 : 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-32 h-32 mx-auto mb-8 relative"
          >
            <div className="absolute inset-0 bg-accent/10 rounded-full animate-pulse" />
            <div className="absolute inset-2 bg-accent/20 rounded-full animate-pulse [animation-delay:200ms]" />
            <div className="absolute inset-4 bg-accent/30 rounded-full animate-pulse [animation-delay:400ms]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl font-bold text-accent">1954</span>
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-8 relative z-10"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-center leading-tight"
            >
              Pioneers of luxury in Asia since{" "}
              <span className="text-accent">1954</span>
            </motion.h2>
            
            <motion.div 
              variants={itemVariants}
              className="space-y-6"
            >
              <p className="text-lg md:text-xl text-muted-foreground text-center leading-relaxed">
                We partner with global luxury, premium and lifestyle brands to make them thrive across Asia. Our global and local teams carefully curate brands, products and experiences to share with the Asian consumer our passion for all things luxurious and beautiful.
              </p>
              
              <p className="text-lg md:text-xl text-muted-foreground text-center leading-relaxed">
                Our story is one of entrepreneurship, partnership and agility to connect global brands with the ever-changing desires of the Asian consumer.
              </p>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isInView ? 1 : 0 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            className="w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent"
          />
        </div>
      </div>
    </section>
  );
};

export default Pioneers;