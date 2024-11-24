import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.7;
    }

    const handleScroll = () => {
      if (containerRef.current) {
        const scrolled = window.scrollY;
        const scale = 1 + scrolled * 0.0005;
        const translateY = scrolled * 0.5;
        containerRef.current.style.transform = `scale(${Math.min(scale, 1.15)}) translateY(${translateY}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div ref={containerRef} className="absolute inset-0 w-full h-full transform transition-transform duration-300">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover scale-105"
        >
          <source src="https://bluebellgroup.com/wp-content/themes/bluebellrevamp/videos/bluebell_carousel_video_top_1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/60 backdrop-blur-[2px]" 
      />
      
      <div className="relative h-full flex items-center justify-start px-8 sm:px-12 lg:px-24">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-3xl space-y-8"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-primary-foreground drop-shadow-lg">
            Connecting Asia's
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-secondary-dark">
              {" "}Trade Future
            </span>
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/90 drop-shadow-md max-w-2xl">
            Building bridges between Asian markets and global opportunities through innovative solutions and strategic partnerships.
          </p>
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex gap-6"
          >
            <button className="group px-8 py-4 bg-secondary hover:bg-secondary-light text-primary-foreground rounded-full font-medium flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Discover More
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;