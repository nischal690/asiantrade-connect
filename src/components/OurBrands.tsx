import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useAnimation, AnimatePresence } from 'framer-motion';
import BrandLogo from './BrandLogo';
import { getBrands } from "@/lib/data/store";
import type { Brand } from "@/lib/data/store";

// Animated Brand Logo component
const AnimatedBrandLogo = ({ name, delay = 0 }: { name: string; delay?: number }) => {
  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delay,
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };
  
  return (
    <motion.div
      variants={logoVariants}
      initial="hidden"
      animate="visible"
      className="overflow-hidden h-16 md:h-20 lg:h-24 flex items-center"
    >
      <BrandLogo name={name} className="max-h-full max-w-full" />
    </motion.div>
  );
};

const BrandSection = ({ brand, index, isActive, onClick }: { 
  brand: Brand; 
  index: number; 
  isActive: boolean;
  onClick: () => void;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const imageContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
        when: "beforeChildren",
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const descriptionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.3,
        ease: [0.22, 1, 0.36, 1],
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 25px rgba(109, 40, 217, 0.2)",
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className={`relative mb-32 ${isActive ? 'z-10' : 'z-0'}`}
    >
      <motion.div 
        className={`cursor-pointer overflow-hidden relative ${
          isActive ? 'bg-gradient-to-r from-purple-50 to-blue-50 backdrop-blur-sm rounded-3xl shadow-xl' : 
          'hover:bg-gradient-to-r hover:from-purple-50/30 hover:to-blue-50/30 hover:backdrop-blur-sm hover:rounded-3xl transition-all duration-500'
        }`}
        onClick={onClick}
        whileHover={{ scale: isActive ? 1 : 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <div className="px-8 py-6 md:px-12 md:py-8">
          <div className="overflow-hidden">
            <AnimatedBrandLogo name={brand.name} delay={index * 0.2} />
          </div>
          
          <AnimatePresence>
            {isActive && (
              <>
                <motion.p 
                  className="text-lg md:text-xl text-gray-700 leading-relaxed mt-6 max-w-3xl"
                  variants={descriptionVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, y: -10, transition: { duration: 0.3 } }}
                >
                  {brand.description}
                </motion.p>
                
                {brand.website && (
                  <motion.a
                    href={brand.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-6 px-6 py-3 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white font-medium rounded-full shadow-lg"
                    variants={buttonVariants}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, y: -10, transition: { duration: 0.3 } }}
                    whileHover="hover"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center space-x-2">
                      <span>Visit Website</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </motion.a>
                )}
                
                <motion.div 
                  className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-6"
                  variants={imageContainerVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, transition: { duration: 0.3 } }}
                >
                  {brand.images.map((image, imgIndex) => {
                    const isFirstImage = imgIndex === 0;
                    const colSpan = isFirstImage ? "md:col-span-8" : "md:col-span-4";
                    
                    return (
                      <motion.div
                        key={imgIndex}
                        className={`overflow-hidden rounded-xl shadow-lg ${colSpan}`}
                        variants={imageVariants}
                        whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
                      >
                        <img
                          src={image}
                          alt={`${brand.name} - Image ${imgIndex + 1}`}
                          className={`w-full ${isFirstImage ? 'h-[500px]' : 'h-[350px]'} object-cover object-center`}
                        />
                      </motion.div>
                    );
                  })}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
      
      {/* Decorative Italian-inspired elements */}
      <motion.div 
        className="absolute -right-4 -top-4 w-16 h-16 md:w-24 md:h-24 opacity-20 z-0"
        initial={{ opacity: 0, rotate: -20 }}
        animate={{ opacity: isActive ? 0.2 : 0.1, rotate: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 0C77.6142 0 100 22.3858 100 50C100 77.6142 77.6142 100 50 100C22.3858 100 0 77.6142 0 50C0 22.3858 22.3858 0 50 0Z" fill="url(#paint0_linear)"/>
          <defs>
            <linearGradient id="paint0_linear" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
              <stop stopColor="#6D28D9"/>
              <stop offset="1" stopColor="#2563EB"/>
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
      
      {isActive && (
        <motion.div 
          className="absolute -left-2 -bottom-2 w-12 h-12 md:w-16 md:h-16 opacity-20 z-0"
          initial={{ opacity: 0, rotate: 20 }}
          animate={{ opacity: 0.2, rotate: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 20C0 8.95431 8.95431 0 20 0H80C91.0457 0 100 8.95431 100 20V80C100 91.0457 91.0457 100 80 100H20C8.95431 100 0 91.0457 0 80V20Z" fill="url(#paint1_linear)"/>
            <defs>
              <linearGradient id="paint1_linear" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                <stop stopColor="#6D28D9"/>
                <stop offset="1" stopColor="#2563EB"/>
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      )}
    </motion.div>
  );
};

const OurBrands = () => {
  const [activeBrandIndex, setActiveBrandIndex] = useState<number | null>(null);
  const [brands, setBrands] = useState<Brand[]>([]);
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });
  
  useEffect(() => {
    // Load brands from the store
    setBrands(getBrands());
  }, []);
  
  const headerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };
  
  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };
  
  const subtitleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };
  
  const decorVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 0.15,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-1/4 -right-20 w-80 h-80 rounded-full bg-gradient-to-b from-purple-200/20 to-blue-200/20 blur-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 2, delay: 0.5 }}
        />
        <motion.div 
          className="absolute bottom-1/3 -left-20 w-80 h-80 rounded-full bg-gradient-to-t from-purple-200/20 to-blue-200/20 blur-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 2, delay: 0.8 }}
        />
      </div>
      
      <div className="container mx-auto px-6 pt-32 pb-16 relative z-10">
        <motion.div
          ref={headerRef}
          initial="hidden"
          variants={headerVariants}
          animate={isHeaderInView ? "visible" : "hidden"}
          className="text-center mb-24 relative"
        >
          {/* Decorative Italian-inspired elements */}
          <motion.div 
            className="absolute left-1/2 transform -translate-x-1/2 -top-16 w-40 h-40 opacity-15 z-0"
            variants={decorVariants}
          >
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 0L61.7557 38.2443L100 50L61.7557 61.7557L50 100L38.2443 61.7557L0 50L38.2443 38.2443L50 0Z" fill="url(#paint2_linear)"/>
              <defs>
                <linearGradient id="paint2_linear" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#6D28D9"/>
                  <stop offset="1" stopColor="#2563EB"/>
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
          
          <motion.h1 
            variants={titleVariants}
            className="text-6xl md:text-7xl lg:text-8xl font-bold italic bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-600 bg-clip-text text-transparent mb-6"
          >
            Our Brands
          </motion.h1>
          
          <motion.p 
            variants={subtitleVariants}
            className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto font-light"
          >
            Discover our curated collection of luxury brands, each with a story of excellence and Italian craftsmanship
          </motion.p>
        </motion.div>

        <div className="space-y-6">
          {brands.map((brand, index) => (
            <BrandSection 
              key={brand.name} 
              brand={brand} 
              index={index} 
              isActive={activeBrandIndex === index}
              onClick={() => setActiveBrandIndex(activeBrandIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurBrands;
