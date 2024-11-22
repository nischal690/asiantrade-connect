import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <section className="bg-muted py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-up">
          <h2 className="text-4xl font-heading font-bold text-center">
            About Asian Trade Connect
          </h2>
          
          <div className="prose prose-lg mx-auto text-center text-muted-foreground">
            <p>
              For over six decades, Asian Trade Connect has been at the forefront of luxury retail in Asia. 
              We specialize in bridging prestigious global brands with discerning Asian markets, 
              creating meaningful connections that transcend cultural boundaries.
            </p>
          </div>
          
          <div className="flex justify-center">
            <Link 
              to="/about"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-primary-foreground rounded-full transition-all duration-300 hover:shadow-lg"
            >
              Learn More About Us
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;