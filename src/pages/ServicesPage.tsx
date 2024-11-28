import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Globe2, BarChart3, Building2, Users2, ShieldCheck, HeartHandshake } from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    icon: Globe2,
    title: "Market Entry Strategy",
    description: "We provide comprehensive market analysis, entry strategies, and execution plans tailored to each brand's unique positioning and goals in the Asian market.",
    gradient: "from-[#FFE29F] to-[#FFA99F]"
  },
  {
    icon: Building2,
    title: "Retail Operations",
    description: "End-to-end management of retail operations, including store design, staff training, inventory management, and customer service excellence.",
    gradient: "from-[#abecd6] to-[#fbed96]"
  },
  {
    icon: BarChart3,
    title: "Brand Development",
    description: "Strategic brand building and positioning services, helping luxury brands adapt their identity for Asian markets while maintaining their core values.",
    gradient: "from-[#d299c2] to-[#fef9d7]"
  },
  {
    icon: Users2,
    title: "Distribution Network",
    description: "Access to our extensive network of premium retail locations and trusted distribution partners across major Asian markets.",
    gradient: "from-[#accbee] to-[#e7f0fd]"
  },
  {
    icon: ShieldCheck,
    title: "Compliance & Regulations",
    description: "Expert guidance on local regulations, import procedures, and compliance requirements across different Asian jurisdictions.",
    gradient: "from-[#FFE29F] to-[#FFA99F]"
  },
  {
    icon: HeartHandshake,
    title: "Partnership Management",
    description: "Long-term partnership development and management with key stakeholders in the luxury retail ecosystem.",
    gradient: "from-[#abecd6] to-[#fbed96]"
  }
];

const ServicesPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-muted to-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-5" />
        <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-6xl md:text-7xl font-heading font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
              Our Services
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We offer comprehensive solutions for luxury brands seeking to establish 
              and grow their presence in Asian markets. Our services are tailored to 
              meet the unique challenges and opportunities in this dynamic region.
            </p>
          </motion.div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />
      </section>
      
      {/* Services Grid */}
      <section className="py-20 px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="container mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  className="h-full"
                >
                  <Card className="h-full group hover:shadow-2xl transition-all duration-500 border-primary/10 hover:border-primary/30 overflow-hidden bg-gradient-to-br from-white/50 to-white/30 backdrop-blur-sm">
                    <div className="p-8 relative">
                      <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                      <div className="relative z-10">
                        <div className={`h-20 w-20 rounded-2xl bg-gradient-to-br ${service.gradient} p-0.5 mb-8 transform rotate-3 group-hover:rotate-6 transition-transform duration-500`}>
                          <div className="h-full w-full bg-background rounded-2xl flex items-center justify-center">
                            <Icon className="h-10 w-10 text-primary transform -rotate-3 group-hover:-rotate-6 transition-transform duration-500" />
                          </div>
                        </div>
                        <h3 className="text-2xl font-heading font-bold mb-4 group-hover:text-primary transition-colors duration-300">
                          {service.title}
                        </h3>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto text-center relative z-10"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Ready to Expand Your Brand in Asia?
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Let's discuss how we can help you achieve your goals in the Asian market.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-primary hover:bg-primary-dark text-primary-foreground rounded-full text-lg font-medium transition-all duration-300 hover:shadow-xl"
          >
            Contact Us Today
          </motion.button>
        </motion.div>
      </section>
    </main>
  );
};

export default ServicesPage;