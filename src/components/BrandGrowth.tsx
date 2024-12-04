import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import { Check, ArrowRight, Building2, ShoppingCart, Network, BarChart3, Truck, LineChart } from "lucide-react";

const steps = [
  {
    title: "Brand Selection",
    description: "We select the right brands for Asia's customer",
    icon: Check,
  },
  {
    title: "Strategy Adaptation",
    description: "We adapt the optimal strategy for each brand in each Asian market",
    icon: BarChart3,
  },
  {
    title: "Network Connection",
    description: "We connect brands through our local networks into Asia's retail landscape",
    icon: Network,
  },
  {
    title: "Growth Acceleration",
    description: "We accelerate brand growth across Asia",
    icon: ArrowRight,
  },
];

const services = [
  { icon: Building2, title: "Retail" },
  { icon: ShoppingCart, title: "E-commerce" },
  { icon: Network, title: "Distribution" },
  { icon: BarChart3, title: "Marketing" },
  { icon: Truck, title: "Logistics" },
  { icon: LineChart, title: "Consumer Insights" },
];

const BrandGrowth = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted to-background opacity-50" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Services */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
              Our approach to brand growth in Asia
            </h2>
            
            <p className="text-lg text-muted-foreground">
              A bespoke step by step omni-channel, multi-disciplinary and multi-model path for brand acceleration.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-primary/10 hover:border-primary/20 transition-colors"
                  >
                    <Icon className="w-5 h-5 text-primary" />
                    <span className="font-medium">{service.title}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
          
          {/* Right Side - Carousel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <Carousel
              opts={{
                align: "start",
                loop: true,
                autoplay: {
                  delay: 3000, // Auto-scroll every 3 seconds
                  stopOnLastSlide: false,
                  disableOnInteraction: false
                }
              }}
              className="w-full"
            >
              <CarouselContent>
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <CarouselItem key={index} className="md:basis-1/1">
                      <Card className="p-6 bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-sm border-primary/10">
                        <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 p-0.5 mb-6">
                          <div className="h-full w-full bg-background rounded-2xl flex items-center justify-center">
                            <Icon className="h-6 w-6 text-primary" />
                          </div>
                        </div>
                        <h3 className="text-xl font-heading font-semibold mb-3">
                          {step.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {step.description}
                        </p>
                      </Card>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BrandGrowth;