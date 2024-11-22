import { ArrowRight, Globe2, BarChart3, Building2, Users2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    icon: Globe2,
    title: "Market Entry Strategy",
    description: "Strategic guidance for luxury brands entering Asian markets with customized approach and local insights."
  },
  {
    icon: Building2,
    title: "Retail Operations",
    description: "End-to-end retail management including store operations, inventory, and customer experience excellence."
  },
  {
    icon: BarChart3,
    title: "Brand Development",
    description: "Comprehensive brand building and positioning services tailored for Asian consumer preferences."
  },
  {
    icon: Users2,
    title: "Distribution Network",
    description: "Access to our extensive network of premium retail locations and distribution channels across Asia."
  }
];

const Services = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-heading font-bold text-center mb-16 animate-fade-up">
            Our Services
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card 
                  key={index}
                  className="group hover:shadow-xl transition-all duration-300 border-primary/20 hover:border-primary animate-fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-8">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-heading font-semibold mb-4">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          <div className="flex justify-center animate-fade-up" style={{ animationDelay: "400ms" }}>
            <Link 
              to="/services"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary-dark text-primary-foreground rounded-full transition-all duration-300 hover:shadow-lg text-lg"
            >
              Explore Our Services
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;