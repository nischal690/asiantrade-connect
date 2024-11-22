import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.7;
    }
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>
      
      <div className="hero-overlay" />
      
      <div className="relative h-full flex items-center justify-center text-white">
        <div className="text-center space-y-8 animate-fade-up">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold max-w-4xl mx-auto leading-tight">
            Connecting Asia's Trade Future
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-200">
            Building bridges between Asian markets and global opportunities
          </p>
          <div className="flex justify-center gap-6">
            <button className="group px-6 py-3 bg-white text-primary rounded-full font-medium flex items-center gap-2 hover:bg-primary hover:text-white transition-all duration-300">
              Discover More
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;