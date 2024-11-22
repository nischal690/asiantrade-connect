import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const Pioneers = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="section-padding bg-gradient-to-b from-muted to-white overflow-hidden">
      <div className="container mx-auto relative">
        {/* Decorative elements */}
        <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-3 gap-8 -rotate-12 opacity-5">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-32 bg-accent rounded-lg transform rotate-45"
              style={{
                animation: `float ${3 + i * 0.5}s ease-in-out infinite alternate`,
              }}
            />
          ))}
        </div>

        <div className="relative max-w-4xl mx-auto space-y-12">
          {/* Year indicator */}
          <div
            className="w-32 h-32 mx-auto mb-8 relative"
            style={{
              opacity: isInView ? 1 : 0,
              transform: `scale(${isInView ? 1 : 0.8})`,
              transition: "all 0.8s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s",
            }}
          >
            <div className="absolute inset-0 bg-accent/10 rounded-full animate-pulse" />
            <div className="absolute inset-2 bg-accent/20 rounded-full animate-pulse [animation-delay:200ms]" />
            <div className="absolute inset-4 bg-accent/30 rounded-full animate-pulse [animation-delay:400ms]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl font-bold text-accent">1954</span>
            </div>
          </div>

          {/* Main content */}
          <div className="space-y-8 relative z-10">
            <h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-center leading-tight"
              style={{
                opacity: isInView ? 1 : 0,
                transform: `translateY(${isInView ? 0 : '20px'})`,
                transition: "all 0.8s cubic-bezier(0.17, 0.55, 0.55, 1) 0.4s",
              }}
            >
              Pioneers of luxury in Asia since{" "}
              <span className="text-accent">1954</span>
            </h2>
            
            <div 
              className="space-y-6"
              style={{
                opacity: isInView ? 1 : 0,
                transform: `translateY(${isInView ? 0 : '20px'})`,
                transition: "all 0.8s cubic-bezier(0.17, 0.55, 0.55, 1) 0.6s",
              }}
            >
              <p className="text-lg md:text-xl text-muted-foreground text-center leading-relaxed">
                We partner with global luxury, premium and lifestyle brands to make them thrive across Asia. Our global and local teams carefully curate brands, products and experiences to share with the Asian consumer our passion for all things luxurious and beautiful.
              </p>
              
              <p className="text-lg md:text-xl text-muted-foreground text-center leading-relaxed">
                Our story is one of entrepreneurship, partnership and agility to connect global brands with the ever-changing desires of the Asian consumer.
              </p>
            </div>
          </div>

          {/* Decorative line */}
          <div 
            className="w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent"
            style={{
              opacity: isInView ? 1 : 0,
              transform: `scaleX(${isInView ? 1 : 0})`,
              transition: "all 1.2s cubic-bezier(0.17, 0.55, 0.55, 1) 0.8s",
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Pioneers;