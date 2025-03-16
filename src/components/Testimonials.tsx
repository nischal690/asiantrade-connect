import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { getTestimonials } from "@/lib/api/testimonials";

interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  content: string;
  image: string;
  rating: number;
}

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await getTestimonials();
        if (result.success && result.data) {
          setTestimonials(result.data);
        } else {
          throw new Error(result.error || 'Failed to load testimonials');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load testimonials');
        console.error('Error loading testimonials:', err);
        // Set fallback testimonials if API fails
        setTestimonials(defaultTestimonials);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (testimonials.length > 1) {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [testimonials]);

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
  };

  // Staggered animation for testimonial cards
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
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 15 
      }
    }
  };

  // Render loading state
  if (isLoading) {
    return (
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <div className="w-16 h-16 border-4 border-accent/30 border-t-accent rounded-full animate-spin mb-4"></div>
            <p className="text-muted-foreground">Loading testimonials...</p>
          </div>
        </div>
      </section>
    );
  }

  // Render error state with fallback
  if (error && testimonials.length === 0) {
    return (
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
            <p className="text-destructive mb-4">Could not load testimonials</p>
            <button 
              onClick={() => window.location.reload()} 
              className="gradient-btn primary px-6 py-3"
            >
              Try again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-primary/5 to-secondary/5" />
      <motion.div 
        className="absolute top-20 left-10 w-64 h-64 rounded-full bg-gradient-to-br from-purple-500/10 to-blue-500/10 blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
          y: [0, -30, 0]
        }}
        transition={{ 
          duration: 15, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-gradient-to-tl from-blue-500/10 to-purple-500/10 blur-3xl"
        animate={{ 
          scale: [1, 1.3, 1],
          x: [0, -40, 0],
          y: [0, 40, 0]
        }}
        transition={{ 
          duration: 18, 
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          {/* Section header with gradient text */}
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl md:text-5xl font-heading font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-primary to-blue-500 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              What Our Partners Say
            </motion.h2>
            <motion.p 
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Discover why leading brands trust AsianTrade Connect to expand their presence across Asian markets
            </motion.p>
          </div>

          {/* Testimonial carousel */}
          <div className="relative">
            <motion.div 
              className="overflow-hidden"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {testimonials.length > 0 && (
                <div className="relative">
                  {testimonials.map((testimonial, index) => (
                    <motion.div
                      key={testimonial.id}
                      className={`glass-card p-8 md:p-10 ${index === activeIndex ? 'block' : 'hidden'}`}
                      variants={itemVariants}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ 
                        opacity: index === activeIndex ? 1 : 0,
                        scale: index === activeIndex ? 1 : 0.95,
                        x: index === activeIndex ? 0 : (index < activeIndex ? -100 : 100)
                      }}
                      transition={{ 
                        duration: 0.5,
                        ease: "easeInOut"
                      }}
                    >
                      <div className="flex flex-col md:flex-row gap-8 items-center">
                        {/* Testimonial image */}
                        <div className="w-full md:w-1/3 flex-shrink-0">
                          <motion.div 
                            className="relative rounded-2xl overflow-hidden aspect-square shadow-xl animated-border"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                          >
                            <img 
                              src={testimonial.image} 
                              alt={testimonial.name}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60"></div>
                          </motion.div>
                        </div>

                        {/* Testimonial content */}
                        <div className="w-full md:w-2/3">
                          <div className="mb-6">
                            <Quote className="w-12 h-12 text-accent/30 mb-4" />
                            <p className="text-lg md:text-xl italic text-foreground/90 leading-relaxed">
                              "{testimonial.content}"
                            </p>
                          </div>
                          
                          {/* Rating stars */}
                          <div className="flex mb-4">
                            {[...Array(5)].map((_, i) => (
                              <svg 
                                key={i} 
                                className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                fill="currentColor" 
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          
                          <div>
                            <h4 className="text-xl font-bold text-foreground">{testimonial.name}</h4>
                            <p className="text-primary font-medium">{testimonial.position}</p>
                            <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Navigation dots */}
            {testimonials.length > 1 && (
              <div className="flex justify-center mt-8 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleDotClick(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === activeIndex 
                        ? 'bg-gradient-to-r from-purple-500 to-blue-500 w-8' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Fallback testimonials in case API fails
const defaultTestimonials: Testimonial[] = [
  {
    id: "1",
    name: "Paola Faccioli",
    position: "CEO",
    company: "Cova",
    content: "AsianTrade Connect has been instrumental in our successful expansion into the Southeast Asian market. Their deep understanding of local consumer preferences and regulatory landscapes saved us countless hours and resources. Within just six months of partnership, our brand awareness increased by 45% in Thailand and Singapore.",
    image: "/testimonals/Cova Ceo - Paola Faccioli.png",
    rating: 5
  },
  {
    id: "2",
    name: "Philipp Plein",
    position: "CEO",
    company: "Philipp Plein",
    content: "The team at AsianTrade Connect brings unparalleled expertise in navigating the complex Asian luxury market. Their strategic guidance helped us establish premium positioning in emerging markets while maintaining our brand integrity. Their attention to detail and commitment to excellence mirrors our own company values.",
    image: "/testimonals/Philipp Plein CEO.png",
    rating: 5
  },
  {
    id: "3",
    name: "Benedetta Bruzziches",
    position: "CEO & Designer",
    company: "Benedetta Bruzziches",
    content: "We've worked with several trade consultants before, but AsianTrade Connect truly stands out. Their tailored approach to each market entry strategy and their extensive network of retail partners gave us immediate credibility in the region. They don't just connect businesses; they build lasting relationships that drive sustainable growth.",
    image: "/testimonals/Benedetta Bruzziches - Ceo & Designer of Benedetta Bruzziches.png",
    rating: 4
  },
  {
    id: "4",
    name: "Arianna Casadei",
    position: "CEO",
    company: "Casadei",
    content: "Partnering with AsianTrade Connect transformed our approach to the Asian market. Their team's cultural insights and strategic vision helped us adapt our luxury footwear to local preferences while preserving our Italian heritage. The seamless market entry and consistent growth we've experienced are a testament to their expertise.",
    image: "/testimonals/Casadei - Arianna Casadei Ceo of Casadei.png",
    rating: 5
  }
];

export default Testimonials;
