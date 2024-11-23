import { ArrowRight, Globe2, BarChart3, Building2, Users2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

const services = [
  {
    icon: Globe2,
    title: "Market Entry Strategy",
    description: "Strategic guidance for luxury brands entering Asian markets with customized approach and local insights.",
    gradient: "from-[#FFE29F] to-[#FFA99F]"
  },
  {
    icon: Building2,
    title: "Retail Operations",
    description: "End-to-end retail management including store operations, inventory, and customer experience excellence.",
    gradient: "from-[#abecd6] to-[#fbed96]"
  },
  {
    icon: BarChart3,
    title: "Brand Development",
    description: "Comprehensive brand building and positioning services tailored for Asian consumer preferences.",
    gradient: "from-[#d299c2] to-[#fef9d7]"
  },
  {
    icon: Users2,
    title: "Distribution Network",
    description: "Access to our extensive network of premium retail locations and distribution channels across Asia.",
    gradient: "from-[#accbee] to-[#e7f0fd]"
  }
];

const Services = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted to-background opacity-50" />
      <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-5" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-20"
          >
            <h2 className="text-6xl font-heading font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
              Our Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Elevating luxury brands in Asia through strategic partnerships and innovative solutions
            </p>
          </motion.div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20"
          >
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover={{ scale: 1.03 }}
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
                        <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                          {service.description}
                        </p>
                        <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
                          <ArrowRight className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex justify-center"
          >
            <Link 
              to="/services"
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-primary hover:bg-primary-dark text-primary-foreground rounded-full transition-all duration-500 hover:shadow-xl text-lg font-medium overflow-hidden"
            >
              <span className="relative z-10">Explore All Services</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary-dark to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Services;