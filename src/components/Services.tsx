import { ArrowRight, Globe2, BarChart3, Building2, Users2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const services = [
  {
    icon: Globe2,
    title: "Market Entry Strategy",
    description: "Strategic guidance for luxury brands entering Asian markets with customized approach and local insights.",
    gradient: "from-purple-400 to-pink-600"
  },
  {
    icon: Building2,
    title: "Retail Operations",
    description: "End-to-end retail management including store operations, inventory, and customer experience excellence.",
    gradient: "from-blue-400 to-teal-600"
  },
  {
    icon: BarChart3,
    title: "Brand Development",
    description: "Comprehensive brand building and positioning services tailored for Asian consumer preferences.",
    gradient: "from-amber-400 to-orange-600"
  },
  {
    icon: Users2,
    title: "Distribution Network",
    description: "Access to our extensive network of premium retail locations and distribution channels across Asia.",
    gradient: "from-green-400 to-emerald-600"
  }
];

const Services = () => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-heading font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Our Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Elevating luxury brands in Asia through strategic partnerships and innovative solutions
            </p>
          </motion.div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
          >
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover={{ scale: 1.02 }}
                  className="h-full"
                >
                  <Card className="h-full group hover:shadow-2xl transition-all duration-300 border-primary/20 hover:border-primary overflow-hidden">
                    <CardContent className="p-8 relative">
                      <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
                      <div className="relative z-10">
                        <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${service.gradient} p-0.5 mb-6 transform group-hover:rotate-6 transition-transform duration-300`}>
                          <div className="h-full w-full bg-background rounded-2xl flex items-center justify-center">
                            <Icon className="h-8 w-8 text-primary" />
                          </div>
                        </div>
                        <h3 className="text-2xl font-heading font-semibold mb-4 group-hover:text-primary transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                          {service.description}
                        </p>
                        <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <ArrowRight className="h-6 w-6 text-primary animate-bounce" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex justify-center"
          >
            <Link 
              to="/services"
              className="group relative inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary-dark text-primary-foreground rounded-full transition-all duration-300 hover:shadow-lg text-lg overflow-hidden"
            >
              <span className="relative z-10">Explore Our Services</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary-dark to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Services;