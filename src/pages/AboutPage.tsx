import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const founders = [
  {
    name: "Sarah Chen",
    role: "CEO & Co-founder",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    description: "With over 20 years of experience in luxury retail, Sarah has been instrumental in establishing strategic partnerships across Asia.",
  },
  {
    name: "Michael Zhang",
    role: "COO & Co-founder",
    image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
    description: "Michael brings 15 years of operational excellence and deep understanding of Asian markets to Asian Trade Connect.",
  },
];

const AboutPage = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-muted to-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center space-y-6"
          >
            <h1 className="text-5xl md:text-6xl font-heading font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Bridging Luxury Across Asia
            </h1>
            <p className="text-xl text-muted-foreground">
              Since 1954, we've been crafting connections between prestigious global brands and discerning Asian markets.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-24 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto space-y-12"
          >
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-heading font-bold">Our Vision</h2>
              <p className="text-lg text-muted-foreground">
                To be the premier bridge between global luxury brands and Asian markets, 
                creating meaningful connections that transcend cultural boundaries.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto space-y-12"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-center">Meet Our Founders</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {founders.map((founder, index) => (
                <motion.div
                  key={founder.name}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="group relative overflow-hidden rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img 
                      src={founder.image} 
                      alt={founder.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 space-y-4">
                    <h3 className="text-2xl font-heading font-bold">{founder.name}</h3>
                    <p className="text-accent font-medium">{founder.role}</p>
                    <p className="text-muted-foreground">{founder.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-gradient-to-b from-secondary/10 to-transparent">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto space-y-12"
          >
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-heading font-bold">Our Values</h2>
              <div className="grid md:grid-cols-3 gap-8 mt-12">
                {[
                  { title: "Excellence", desc: "Unwavering commitment to quality in everything we do" },
                  { title: "Innovation", desc: "Pioneering new ways to connect brands with consumers" },
                  { title: "Trust", desc: "Building lasting relationships through transparency and reliability" }
                ].map((value, index) => (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    className="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <h3 className="text-xl font-heading font-bold mb-3">{value.title}</h3>
                    <p className="text-muted-foreground">{value.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;