import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const Pioneers = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const scale = useTransform(scrollYProgress, [0, 0.4], [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0.3, 1]);
  
  // Text animation variants
  const titleWords = "Pioneers of luxury in South East Asia".split(" ");
  
  return (
    <section 
      ref={sectionRef} 
      className="py-24 md:py-32 relative overflow-hidden bg-gradient-to-b from-background to-muted/30"
    >
      {/* Background animated shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated circles */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full bg-gradient-to-br ${
              i % 2 === 0 
                ? "from-primary/5 to-accent/10" 
                : "from-secondary/5 to-primary/10"
            }`}
            style={{
              width: `${(i + 2) * 10}rem`,
              height: `${(i + 2) * 10}rem`,
              left: `${(i * 15) - 10}%`,
              top: `${(i * 12) - 5}%`,
              filter: "blur(60px)",
            }}
            animate={{
              x: [0, i % 2 === 0 ? 50 : -50, 0],
              y: [0, i % 2 === 0 ? -30 : 30, 0],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          style={{ scale, opacity }}
          className="max-w-4xl mx-auto space-y-16"
        >
          {/* Animated logo emblem */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: isInView ? 1 : 0.8, opacity: isInView ? 1 : 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-40 h-40 mx-auto mb-10 relative"
          >
            {/* Animated rings */}
            <motion.div 
              className="absolute inset-0 rounded-full bg-gradient-to-br from-accent/30 to-primary/20"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute inset-3 rounded-full bg-gradient-to-tr from-secondary/20 to-primary/10"
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            />
            <motion.div 
              className="absolute inset-6 rounded-full bg-gradient-to-r from-accent/20 to-secondary/10"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
            />
            
            {/* Logo center */}
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-full">
              <motion.div
                animate={{ 
                  rotateY: [0, 360],
                  rotateZ: [0, 10, 0, -10, 0]
                }}
                transition={{ 
                  rotateY: { duration: 10, repeat: Infinity, ease: "linear" },
                  rotateZ: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                <span className="text-5xl font-bold bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text text-transparent">SE Asia</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Text content */}
          <div ref={textRef} className="space-y-10">
            {/* Title with word-by-word animation */}
            <div className="overflow-hidden">
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-center leading-tight">
                {titleWords.map((word, index) => (
                  <motion.span 
                    key={index} 
                    className="inline-block mr-4"
                    initial={{ y: 60, opacity: 0 }}
                    animate={isInView ? { y: 0, opacity: 1 } : { y: 60, opacity: 0 }}
                    transition={{ 
                      duration: 0.7, 
                      delay: 0.2 + index * 0.1,
                      ease: "easeOut"
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </h2>
            </div>
            
            {/* Description with text fade-in */}
            <motion.div 
              className="space-y-6 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.7, delay: 0.7 }}
            >
              <p className="text-lg md:text-xl text-muted-foreground text-center leading-relaxed">
                We collaborate with global luxury, premium, and lifestyle brands to help them flourish across Asia. Our dedicated global and local teams expertly curate brands, products, and experiences, sharing with Asian consumers our passion for all things refined and beautiful.
              </p>
              
              <p className="text-lg md:text-xl text-muted-foreground text-center leading-relaxed">
                Driven by entrepreneurship, partnership, and agility, our mission is to seamlessly connect global brands with the ever-evolving aspirations of the Asian market. Together, we turn visions into success stories.
              </p>
            </motion.div>
          </div>

          {/* Animated divider line */}
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1.5, delay: 1 }}
            className="w-full h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent"
          />
          
          {/* Stats counter section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.7, delay: 1.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10"
          >
            {[
              { value: '10+', label: 'Years Experience' },
              { value: '50+', label: 'Luxury Brands' },
              { value: '10', label: 'SE Asian Markets' },
              { value: '25+', label: 'Team Members' }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center space-y-2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
      
      {/* Bottom decorative element */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-muted/20 to-transparent pointer-events-none" />
    </section>
  );
};

export default Pioneers;