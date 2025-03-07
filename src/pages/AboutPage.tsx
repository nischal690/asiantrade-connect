import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useCallback, useEffect } from 'react';

const founders = [
  {
    name: "GIOVANNI FEO",
    role: "CEO & Co-Founder",
    image: "/giovanni.png",
    location: "Based in Bangkok",
    description: "With over 6 years of experience in finance and retail, Giovanni is a dynamic leader in financial analysis, operational excellence, and driving brand expansions overseas. Based in Bangkok, he thrives on crafting innovative strategies and forging strong connections across the South East Asian market.",
  },
  {
    name: "LORENZO MARINI",
    role: "COO & Co-Founder",
    image: "/cof.jpg",
    location: "Based in Paris",
    description: "Based in Paris, Lorenzo brings a wealth of expertise in strategy consulting and commercial development, specializing in the European luxury market. He has cultivated strong relationships with independent European luxury brands and iconic haute-couture groups, driving growth and innovation in the industry.",
  },
];

const AboutPage = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    skipSnaps: false,
    duration: 50,
    align: 'center',
    containScroll: 'trimSnaps',
    dragFree: true,
  });

  const [autoplayInterval, setAutoplayInterval] = useState<NodeJS.Timeout | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  // Update progress
  const updateProgress = useCallback(() => {
    if (!emblaApi) return;
    const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()));
    setProgress(progress);
    setActiveIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('scroll', updateProgress);
    emblaApi.on('reInit', updateProgress);
    updateProgress();
    return () => {
      emblaApi.off('scroll', updateProgress);
      emblaApi.off('reInit', updateProgress);
    };
  }, [emblaApi, updateProgress]);

  // Start autoplay
  const startAutoplay = useCallback(() => {
    if (autoplayInterval) return;

    const interval = setInterval(() => {
      if (emblaApi && !isHovered) {
        emblaApi.scrollNext({ duration: 50 });
        updateProgress();
      }
    }, 8000);

    setAutoplayInterval(interval);
  }, [emblaApi, isHovered, updateProgress]);

  // Stop autoplay
  const stopAutoplay = useCallback(() => {
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
      setAutoplayInterval(null);
    }
  }, [autoplayInterval]);

  // Handle mouse events
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  // Initialize autoplay
  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, [startAutoplay, stopAutoplay]);

  const scrollNext = () => {
    if (emblaApi) {
      stopAutoplay();
      emblaApi.scrollNext();
      startAutoplay();
    }
  };

  const scrollPrev = () => {
    if (emblaApi) {
      stopAutoplay();
      emblaApi.scrollPrev();
      startAutoplay();
    }
  };

  const scrollTo = (index) => {
    if (emblaApi) {
      stopAutoplay();
      emblaApi.scrollTo(index);
      startAutoplay();
    }
  };

  const canScrollNext = () => {
    if (emblaApi) {
      return emblaApi.canScrollNext();
    }
    return false;
  };

  const canScrollPrev = () => {
    if (emblaApi) {
      return emblaApi.canScrollPrev();
    }
    return false;
  };

  const currentSlide = () => {
    if (emblaApi) {
      return emblaApi.selectedScrollSnap();
    }
    return 0;
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-muted to-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center space-y-6"
          >
            <h1 className="text-5xl md:text-6xl font-heading font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Bridging Luxury Across Asia
            </h1>
            <p className="text-xl text-muted-foreground">
              We've been crafting connections between prestigious global brands and discerning Asian markets.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-24 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto space-y-12"
          >
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-heading font-bold">Our Vision</h2>
              <p className="text-lg text-muted-foreground">
                To be the leading bridge connecting global luxury brands with the South East Asian market, 
                fostering meaningful relationships that transcend cultural boundaries and drive mutual growth.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto space-y-12"
          >
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-heading font-bold">Our Value Proposition</h2>
              <p className="text-lg text-muted-foreground">
                Our business model focuses on introducing and supporting the operations of luxury and lifestyle brands in Asian markets.
              </p>
            </div>

            <div className="relative px-4 -mx-4">
              {/* Progress Bar */}
              <div className="absolute top-0 left-4 right-4 h-1 bg-muted rounded-full overflow-hidden z-10">
                <div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary via-secondary to-accent transition-all duration-300 ease-out"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>

              <div 
                className="overflow-visible pt-6" 
                ref={emblaRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div className="flex -ml-4">
                  {/* Step 1 */}
                  <div className="flex-[0_0_90%] min-w-0 relative pl-4 md:flex-[0_0_85%]">
                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                      <div className="relative bg-card rounded-xl p-8 h-full border shadow-sm backdrop-blur-sm transition-all duration-300 group-hover:shadow-xl">
                        <div className="flex items-center gap-6 mb-6">
                          <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 text-primary font-bold text-xl transform -rotate-3 transition-transform group-hover:rotate-0 duration-300">
                            01
                          </div>
                          <h4 className="text-2xl font-semibold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">Understanding the Need</h4>
                        </div>
                        <div className="space-y-3 text-muted-foreground">
                          <p className="text-lg">We establish contact with the brand and work together to:</p>
                          <ul className="space-y-2 pl-4">
                            <li className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary/50"></div>
                              <span>Understand its values, its offering, and client base.</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-secondary/50"></div>
                              <span>Define the success criteria for entering the Thai market.</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-accent/50"></div>
                              <span>Collect the key requirements for possible locations.</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex-[0_0_90%] min-w-0 relative pl-4 md:flex-[0_0_85%]">
                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                      <div className="relative bg-card rounded-xl p-8 h-full border shadow-sm backdrop-blur-sm transition-all duration-300 group-hover:shadow-xl">
                        <div className="flex items-center gap-6 mb-6">
                          <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 text-primary font-bold text-xl transform -rotate-3 transition-transform group-hover:rotate-0 duration-300">
                            02
                          </div>
                          <h4 className="text-2xl font-semibold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">Market Appeal Assessment</h4>
                        </div>
                        <div className="space-y-3 text-muted-foreground">
                          <p className="text-lg">We assess the maturity of the Thai consumer base and run surveys, if needed, to evaluate awareness, receptiveness, and demand.</p>
                          <p className="text-lg">We then examine the target persona introduced by the brand and define the best strategy for engagement.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex-[0_0_90%] min-w-0 relative pl-4 md:flex-[0_0_85%]">
                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                      <div className="relative bg-card rounded-xl p-8 h-full border shadow-sm backdrop-blur-sm transition-all duration-300 group-hover:shadow-xl">
                        <div className="flex items-center gap-6 mb-6">
                          <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 text-primary font-bold text-xl transform -rotate-3 transition-transform group-hover:rotate-0 duration-300">
                            03
                          </div>
                          <h4 className="text-2xl font-semibold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">Location and Partner Selection</h4>
                        </div>
                        <div className="space-y-3 text-muted-foreground">
                          <p className="text-lg">First, we scout the market to find the best location that aligns with the brand's values and criteria.</p>
                          <p className="text-lg">Second, we select the best local partner to support the brand in opening a new point of sale, based on relevant experience, reliability, and market solidity.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="flex-[0_0_90%] min-w-0 relative pl-4 md:flex-[0_0_85%]">
                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                      <div className="relative bg-card rounded-xl p-8 h-full border shadow-sm backdrop-blur-sm transition-all duration-300 group-hover:shadow-xl">
                        <div className="flex items-center gap-6 mb-6">
                          <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 text-primary font-bold text-xl transform -rotate-3 transition-transform group-hover:rotate-0 duration-300">
                            04
                          </div>
                          <h4 className="text-2xl font-semibold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">Definition of the Partnership Agreement</h4>
                        </div>
                        <div className="text-lg text-muted-foreground">
                          <p>We work closely with the brand and the local partner to define the agreements, providing legal support to ensure the foundation of a long-lasting partnership with minimal friction.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 5 */}
                  <div className="flex-[0_0_90%] min-w-0 relative pl-4 md:flex-[0_0_85%]">
                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                      <div className="relative bg-card rounded-xl p-8 h-full border shadow-sm backdrop-blur-sm transition-all duration-300 group-hover:shadow-xl">
                        <div className="flex items-center gap-6 mb-6">
                          <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 text-primary font-bold text-xl transform -rotate-3 transition-transform group-hover:rotate-0 duration-300">
                            05
                          </div>
                          <h4 className="text-2xl font-semibold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">Signature</h4>
                        </div>
                        <div className="text-lg text-muted-foreground">
                          <p>We preside over and co-sign the agreements as witnesses to ensure compliance and the protection of both parties.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 6 */}
                  <div className="flex-[0_0_90%] min-w-0 relative pl-4 md:flex-[0_0_85%]">
                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                      <div className="relative bg-card rounded-xl p-8 h-full border shadow-sm backdrop-blur-sm transition-all duration-300 group-hover:shadow-xl">
                        <div className="flex items-center gap-6 mb-6">
                          <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 text-primary font-bold text-xl transform -rotate-3 transition-transform group-hover:rotate-0 duration-300">
                            06
                          </div>
                          <h4 className="text-2xl font-semibold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">Post-Deal Monitoring & Support</h4>
                        </div>
                        <div className="text-lg text-muted-foreground">
                          <p>Once the deal is signed, we remain available to address any issues that may arise, ensuring smooth and seamless operations.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Buttons */}
              <button
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-14 h-14 flex items-center justify-center rounded-full bg-background/80 backdrop-blur border shadow-lg hover:bg-background transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
                onClick={scrollPrev}
                disabled={!canScrollPrev()}
              >
                <ChevronLeft className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
              </button>
              <button
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-14 h-14 flex items-center justify-center rounded-full bg-background/80 backdrop-blur border shadow-lg hover:bg-background transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
                onClick={scrollNext}
                disabled={!canScrollNext()}
              >
                <ChevronRight className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
              </button>

              {/* Dots */}
              <div className="flex justify-center gap-3 mt-8">
                {Array.from(Array(6).keys()).map((index) => (
                  <button
                    key={index}
                    className={`group relative h-3 transition-all duration-300 ${
                      activeIndex === index ? 'w-8' : 'w-3'
                    }`}
                    onClick={() => scrollTo(index)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent rounded-full opacity-20"></div>
                    <div 
                      className={`absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent rounded-full transition-opacity duration-300 ${
                        activeIndex === index ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
                      }`}
                    ></div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto space-y-12"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-center">Our Leadership</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {founders.map((founder, index) => (
                <motion.div
                  key={founder.name}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="group relative overflow-hidden rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <div className="w-full">
                    <img 
                      src={founder.image} 
                      alt={founder.name}
                      className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 space-y-4">
                    <h3 className="text-2xl font-heading font-bold">{founder.name}</h3>
                    <p className="text-accent font-medium">{founder.role}</p>
                    <p className="text-sm text-muted-foreground">{founder.location}</p>
                    <p className="text-muted-foreground">{founder.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-gradient-to-b from-secondary/10 to-transparent">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto space-y-12"
          >
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-heading font-bold">Our Values</h2>
              <div className="grid md:grid-cols-3 gap-8 mt-12">
                {[
                  { title: "Excellence", desc: "Unwavering commitment to quality in everything we do" },
                  { title: "Innovation", desc: "Pioneering new ways to connect brands with consumers" },
                  { title: "Trust", desc: "Building lasting relationships through transparency and reliability" }
                ].map((value, index) => (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    className="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <h3 className="text-xl font-heading font-bold mb-3">{value.title}</h3>
                    <p className="text-muted-foreground">{value.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;