import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Globe2, BarChart3, Building2, Users2, ShieldCheck, HeartHandshake } from "lucide-react";

const services = [
  {
    icon: Globe2,
    title: "Market Entry Strategy",
    description: "We provide comprehensive market analysis, entry strategies, and execution plans tailored to each brand's unique positioning and goals in the Asian market."
  },
  {
    icon: Building2,
    title: "Retail Operations",
    description: "End-to-end management of retail operations, including store design, staff training, inventory management, and customer service excellence."
  },
  {
    icon: BarChart3,
    title: "Brand Development",
    description: "Strategic brand building and positioning services, helping luxury brands adapt their identity for Asian markets while maintaining their core values."
  },
  {
    icon: Users2,
    title: "Distribution Network",
    description: "Access to our extensive network of premium retail locations and trusted distribution partners across major Asian markets."
  },
  {
    icon: ShieldCheck,
    title: "Compliance & Regulations",
    description: "Expert guidance on local regulations, import procedures, and compliance requirements across different Asian jurisdictions."
  },
  {
    icon: HeartHandshake,
    title: "Partnership Management",
    description: "Long-term partnership development and management with key stakeholders in the luxury retail ecosystem."
  }
];

const ServicesPage = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl font-heading font-bold text-center mb-8 animate-fade-up">
            Our Services
          </h1>
          <div className="max-w-3xl mx-auto mb-16 animate-fade-up delay-100">
            <p className="text-lg text-center text-muted-foreground">
              We offer comprehensive solutions for luxury brands seeking to establish 
              and grow their presence in Asian markets. Our services are tailored to 
              meet the unique challenges and opportunities in this dynamic region.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-up delay-200">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card 
                  key={index}
                  className="hover:shadow-xl transition-all duration-300 border-primary/20 hover:border-primary"
                >
                  <CardContent className="p-8">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
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
        </div>
      </div>
    </main>
  );
};

export default ServicesPage;