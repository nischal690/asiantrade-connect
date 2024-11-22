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
        className="absolute inset-0 w-full h-full object-cover scale-105 transform"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>
      
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent backdrop-blur-[2px]" />
      
      <div className="relative h-full flex items-center justify-start px-8 sm:px-12 lg:px-24">
        <div className="max-w-3xl space-y-8 animate-fade-up">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-white drop-shadow-lg">
            Connecting Asia's
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              {" "}Trade Future
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 drop-shadow-md max-w-2xl">
            Building bridges between Asian markets and global opportunities through innovative solutions and strategic partnerships.
          </p>
          <div className="flex gap-6">
            <button className="group px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full font-medium flex items-center gap-2 hover:bg-white hover:text-primary transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Discover More
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;