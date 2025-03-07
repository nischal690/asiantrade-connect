import { useState, useEffect, useRef } from 'react';
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Pioneers from "@/components/Pioneers";
import About from "@/components/About";
import Services from "@/components/Services";
import NewsSection from "@/components/NewsSection";
import Network from "@/components/Network";
import Careers from "@/components/Careers";
import Footer from "@/components/Footer";
import BrandGrowth from "@/components/BrandGrowth";
import { motion, useScroll, useTransform } from "framer-motion";
import { Play, ChevronDown } from "lucide-react";
import { getHomepageContent } from "@/lib/api/homepage";

const Index = () => {
  const [content, setContent] = useState({
    videoUrl: "",
    storyTitle: "Discover Our Story",
    storyDescription: "Experience how we're revolutionizing Asian trade connections through innovative solutions and strategic partnerships."
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Parallax and scroll animations
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 1.1]);

  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await getHomepageContent();
        if (result.success && result.data) {
          setContent({
            videoUrl: result.data.videoUrl || "",
            storyTitle: result.data.storyTitle || "Discover Our Story",
            storyDescription: result.data.storyDescription || "Experience how we're revolutionizing Asian trade connections through innovative solutions and strategic partnerships."
          });
        } else {
          throw new Error(result.error || 'Failed to load content');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load content');
        console.error('Error loading homepage content:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchContent();
  }, []);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    setError('Failed to load video');
    console.error('Video error:', e);
  };

  // Scroll to next section function
  const scrollToNextSection = () => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-background overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Animated background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-background via-background to-background z-[-1]">
        {/* Animated decorative elements */}
        <motion.div 
          className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-primary/5 to-accent/5 blur-[120px]"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 45, 0]
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-bl from-secondary/5 to-primary/5 blur-[100px]"
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, -30, 0]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5
          }}
        />
      </div>
      
      <Navbar />
      <Hero />
      
      {/* Story Video Section with modern design and animations */}
      <div ref={sectionRef} className="w-full relative py-32 overflow-hidden">
        <motion.div 
          className="max-w-6xl mx-auto px-6 relative z-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          {/* Animated section title */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-6">
              {content.storyTitle}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {content.storyDescription}
            </p>
          </motion.div>

          {/* Video container with glass effect */}
          <motion.div 
            className="glass-card group relative z-20"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.5 }}
          >
            {/* Loading overlay */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm rounded-2xl z-10">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 border-4 border-accent/30 border-t-accent rounded-full animate-spin mb-4"></div>
                  <p className="text-white/90 font-medium">Loading your experience...</p>
                </div>
              </div>
            )}
            
            {/* Error overlay */}
            {error && (
              <div className="absolute inset-0 flex items-center justify-center bg-destructive/10 backdrop-blur-sm rounded-2xl z-10">
                <div className="text-center p-8 max-w-md">
                  <div className="w-16 h-16 mx-auto mb-4 text-destructive">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <p className="text-destructive font-medium text-lg mb-2">Failed to load video</p>
                  <p className="text-muted-foreground mb-4">We're having trouble loading this content right now.</p>
                  <button 
                    onClick={() => window.location.reload()} 
                    className="gradient-btn primary px-6 py-3"
                  >
                    Try again
                  </button>
                </div>
              </div>
            )}
            
            {/* Video Player */}
            {content.videoUrl && !error && (
              <div className="aspect-video overflow-hidden rounded-2xl relative">
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  playsInline
                  loop
                  muted
                  onError={handleVideoError}
                >
                  <source src={content.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-70"></div>
                
                {/* Play button */}
                <button
                  onClick={handlePlayPause}
                  className="absolute inset-0 flex items-center justify-center group-hover:scale-105 transition-transform duration-300"
                >
                  <motion.div 
                    className="relative w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center shadow-xl border border-white/20"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-accent/70 to-primary/70 animate-pulse-slow"></div>
                    <Play className={`w-8 h-8 text-white relative z-10 ${isPlaying ? 'opacity-80' : 'opacity-100'}`} />
                  </motion.div>
                </button>
              </div>
            )}
          </motion.div>
          
          {/* Floating badges */}
          <div className="relative h-0 overflow-visible z-0">
            <motion.div
              className="absolute -top-16 -right-4 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/10 shadow-xl"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              animate={{ y: [0, -10, 0] }}
              transition={{
                y: { repeat: Infinity, duration: 3, ease: "easeInOut" }
              }}
            >
              <span className="text-sm font-medium text-white/90">Trusted by 500+ brands</span>
            </motion.div>
            
            <motion.div
              className="absolute -bottom-12 -left-4 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/10 shadow-xl"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7 }}
              animate={{ y: [0, 10, 0] }}
              transition={{
                y: { repeat: Infinity, duration: 4, ease: "easeInOut" }
              }}
            >
              <span className="text-sm font-medium text-white/90">Presence in 12 countries</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      {/* Rest of the sections with proper spacing and integrated animations */}
      <Pioneers />
      <About />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <BrandGrowth />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <Services />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <NewsSection />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <Network />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <Careers />
      </motion.div>
      <Footer />
      
      {/* Scroll to top button */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-primary/80 backdrop-blur-sm flex items-center justify-center shadow-lg border border-white/10 z-50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronDown className="w-5 h-5 text-white transform rotate-180" />
      </motion.button>
    </motion.div>
  );
};

export default Index;
