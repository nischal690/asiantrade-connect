import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 1.15]);
  const yTransform = useTransform(scrollY, [0, 300], [0, 150]);

  // Split text for animation
  const headingWords = ["Connecting", "Asia's", "Trade", "Future"];
  const subheadingWords = "Building bridges between Asian markets and global opportunities through innovative solutions and strategic partnerships.".split(" ");

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.7;
      
      // Handle video loaded event
      videoRef.current.addEventListener('loadeddata', () => {
        setIsLoaded(true);
      });
    }
  }, []);

  return (
    <motion.div 
      className="relative h-screen w-full overflow-hidden"
      style={{ opacity }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Backdrop blur and overlay effect that appears as video loads */}
      <motion.div 
        className="absolute inset-0 backdrop-blur-sm bg-black/30 z-10"
        initial={{ opacity: 1 }}
        animate={{ opacity: isLoaded ? 0 : 1 }}
        transition={{ duration: 1 }}
      />

      {/* Video background with parallax effect */}
      <motion.div 
        ref={containerRef} 
        className="absolute inset-0 w-full h-full"
        style={{ scale, y: yTransform }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="https://bluebellgroup.com/wp-content/themes/bluebellrevamp/videos/bluebell_carousel_video_top_1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </motion.div>
      
      {/* Gradient overlay with glass morphism effect */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-gradient-to-br from-primary/80 via-transparent to-accent/70 backdrop-blur-[1px] z-20" 
      />
      
      {/* Animated geometric shapes */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        <motion.div 
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-gradient-to-br from-accent/30 to-primary/20 blur-3xl"
          animate={{ 
            x: [0, 50, 0], 
            y: [0, 30, 0],
            rotate: [0, 15, 0] 
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute bottom-20 -left-20 w-72 h-72 rounded-full bg-gradient-to-tr from-secondary/30 to-primary/20 blur-3xl"
          animate={{ 
            x: [0, -30, 0], 
            y: [0, 40, 0],
            rotate: [0, -10, 0] 
          }}
          transition={{ 
            duration: 18, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2 
          }}
        />
      </div>
      
      {/* Content container */}
      <div className="relative h-full flex items-center justify-start px-8 sm:px-12 lg:px-24 z-30">
        <motion.div 
          ref={textRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl space-y-8"
        >
          {/* Heading with word-by-word animation */}
          <div className="overflow-hidden">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-white">
              {headingWords.map((word, index) => (
                <motion.span 
                  key={index} 
                  className={`inline-block mr-4 ${index === 2 || index === 3 ? "bg-clip-text text-transparent bg-gradient-to-r from-accent via-secondary-dark to-primary-dark" : ""}`}
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.2 + index * 0.1,
                    ease: "easeOut"
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </h1>
          </div>
          
          {/* Subheading with word-by-word animation */}
          <div className="overflow-hidden">
            <p className="text-lg md:text-xl text-white/90 drop-shadow-md max-w-2xl">
              {subheadingWords.map((word, index) => (
                <motion.span 
                  key={index} 
                  className="inline-block mr-[0.3em]"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: 1.2 + index * 0.02,
                    ease: "easeOut"
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </p>
          </div>
          
          {/* Button with hover effect */}
          <AnimatePresence>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2 }}
              className="flex gap-6"
            >
              <motion.button 
                className="relative overflow-hidden group px-8 py-4 bg-accent text-accent-foreground rounded-full font-medium flex items-center gap-2 shadow-lg"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Button background animation */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-accent via-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '0%' }}
                  transition={{ duration: 0.6 }}
                />
                
                {/* Button text and icon */}
                <span className="relative z-10">Discover More</span>
                <motion.div
                  className="relative z-10"
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </motion.button>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
      >
        <motion.div 
          animate={{ 
            y: [0, 12, 0],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          className="flex flex-col items-center space-y-2"
        >
          <span className="text-white/80 text-sm font-light tracking-wider">SCROLL</span>
          <ChevronDown className="w-5 h-5 text-white/80" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Hero;