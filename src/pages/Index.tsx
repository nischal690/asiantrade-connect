import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
// Lazy load non-critical components
const Pioneers = lazy(() => import("@/components/Pioneers"));
const About = lazy(() => import("@/components/About"));
const Services = lazy(() => import("@/components/Services"));
const NewsSection = lazy(() => import("@/components/NewsSection"));
const Network = lazy(() => import("@/components/Network"));
const Careers = lazy(() => import("@/components/Careers"));
const Footer = lazy(() => import("@/components/Footer"));
const BrandGrowth = lazy(() => import("@/components/BrandGrowth"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const LatestBlogPosts = lazy(() => import("@/components/LatestBlogPosts").then(module => ({ default: module.LatestBlogPosts })));
import { motion, useScroll, useTransform } from "framer-motion";
import { Play, ChevronDown } from "lucide-react";
import { getHomepageContent } from "@/lib/api/homepage";

// Loading component for suspense fallback
const LoadingSpinner = () => (
  <div className="flex items-center justify-center py-12">
    <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
  </div>
);

const Index = () => {
  const [content, setContent] = useState({
    videoUrl: "",
    storyTitle: "Discover Our Story",
    storyDescription: "Experience how we're revolutionizing Asian trade connections through innovative solutions and strategic partnerships."
  });
  const [isLoading, setIsLoading] = useState(true);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Parallax and scroll animations
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 1.1]);

  // Track page load status
  useEffect(() => {
    // Mark page as loaded after initial render
    const timer = setTimeout(() => {
      setPageLoaded(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

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

  // Auto-play video when it comes into view - with optimized observer
  useEffect(() => {
    if (!videoRef.current || !videoContainerRef.current || !pageLoaded) return;

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    let observer: IntersectionObserver;
    
    // Delay creating the observer until page has loaded
    const initObserver = () => {
      const handleIntersection = (entries: IntersectionObserverEntry[]) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (videoRef.current && !isPlaying) {
              videoRef.current.play()
                .then(() => setIsPlaying(true))
                .catch(error => console.error('Auto-play failed:', error));
            }
          } else {
            if (videoRef.current && isPlaying) {
              videoRef.current.pause();
              setIsPlaying(false);
            }
          }
        });
      };

      observer = new IntersectionObserver(handleIntersection, options);
      observer.observe(videoContainerRef.current!);
    };
    
    // Delay video observer initialization
    const timer = setTimeout(initObserver, 1000);

    return () => {
      clearTimeout(timer);
      if (observer) observer.disconnect();
    };
  }, [isPlaying, pageLoaded, videoRef.current, videoContainerRef.current]);

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
      transition={{ duration: 0.5 }}
    >
      {/* Optimized animated background gradient - reduced complexity */}
      <div className="fixed inset-0 bg-gradient-to-br from-background via-background to-background z-[-1]">
        {/* Simplified decorative elements with reduced motion */}
        {pageLoaded && (
          <>
            <motion.div 
              className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-primary/5 to-accent/5 blur-[120px]"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 15, 0]
              }}
              transition={{ 
                duration: 30, 
                repeat: Infinity,
                ease: "linear" 
              }}
            />
            <motion.div 
              className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-bl from-secondary/5 to-primary/5 blur-[100px]"
              animate={{ 
                scale: [1, 1.15, 1],
                rotate: [0, -10, 0]
              }}
              transition={{ 
                duration: 25, 
                repeat: Infinity,
                ease: "linear",
                delay: 5
              }}
            />
          </>
        )}
      </div>
      
      <Navbar />
      <Hero />
      
      {/* Story Video Section with optimized animations */}
      <div ref={sectionRef} className="w-full relative py-32 overflow-hidden">
        <motion.div 
          className="max-w-6xl mx-auto px-6 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          {/* Section title */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-6">
              {content.storyTitle}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {content.storyDescription}
            </p>
          </motion.div>

          {/* Video container with optimized glass effect */}
          <motion.div 
            className="glass-card group relative z-20"
            whileInView={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.95 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            ref={videoContainerRef}
          >
            {/* Loading overlay */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm rounded-2xl z-10">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 border-4 border-accent/30 border-t-accent rounded-full animate-spin mb-4"></div>
                  <p className="text-white text-shadow-sm">Loading video...</p>
                </div>
              </div>
            )}

            {/* Error message */}
            {error && !isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm rounded-2xl z-10">
                <div className="bg-red-500/90 text-white px-6 py-4 rounded-lg max-w-md text-center">
                  <p className="font-medium">Failed to load video</p>
                  <p className="text-sm mt-1 text-white/80">{error}</p>
                </div>
              </div>
            )}

            {/* Video player with preload="metadata" to optimize loading */}
            <video
              ref={videoRef}
              className="w-full h-auto rounded-2xl shadow-2xl transform transition-transform duration-500 group-hover:scale-[1.01]"
              poster="/video-placeholder.jpg"
              preload="metadata"
              muted
              playsInline
              loop
              onError={handleVideoError}
            >
              {content.videoUrl && <source src={content.videoUrl} type="video/mp4" />}
              Your browser does not support the video tag.
            </video>

            {/* Play/Pause overlay button */}
            <div 
              onClick={handlePlayPause}
              className="absolute inset-0 flex items-center justify-center cursor-pointer group/play"
            >
              <motion.div
                initial={{ opacity: 0.9, scale: 1 }}
                whileHover={{ opacity: 1, scale: 1.05 }}
                className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group-hover/play:bg-black/50"
              >
                <motion.div animate={{ scale: isPlaying ? 0.8 : 1 }}>
                  {isPlaying ? (
                    <div className="w-8 h-8 border-l-2 border-r-2 border-white"></div>
                  ) : (
                    <Play size={30} className="text-white ml-1" fill="white" />
                  )}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Scroll indicator with reduced animation complexity */}
          <motion.div 
            className="mt-12 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <motion.button
              onClick={scrollToNextSection}
              className="flex flex-col items-center text-muted-foreground hover:text-foreground transition-colors"
              whileHover={{ y: 3 }}
            >
              <span className="text-sm mb-2">Scroll for more</span>
              <ChevronDown className="animate-bounce" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Wrap remaining components in Suspense for lazy loading */}
      <Suspense fallback={<LoadingSpinner />}>
        <Pioneers />
      </Suspense>
      
      <Suspense fallback={<LoadingSpinner />}>
        <About />
      </Suspense>
      
      <Suspense fallback={<LoadingSpinner />}>
        <BrandGrowth />
      </Suspense>
      
      <Suspense fallback={<LoadingSpinner />}>
        <Services />
      </Suspense>
      
      <Suspense fallback={<LoadingSpinner />}>
        <Testimonials />
      </Suspense>
      
      <Suspense fallback={<LoadingSpinner />}>
        <LatestBlogPosts />
      </Suspense>
      
      <Suspense fallback={<LoadingSpinner />}>
        <NewsSection />
      </Suspense>
      
      <Suspense fallback={<LoadingSpinner />}>
        <Network />
      </Suspense>
      
      <Suspense fallback={<LoadingSpinner />}>
        <Careers />
      </Suspense>
      
      <Suspense fallback={<LoadingSpinner />}>
        <Footer />
      </Suspense>
    </motion.div>
  );
};

export default Index;
