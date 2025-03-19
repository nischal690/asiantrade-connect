import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { MapPin, Phone, Mail, ArrowRight, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useState } from "react";

const ContactPage = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: (
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-green-500" />
          <span>Message sent successfully!</span>
        </div>
      ),
      description: "Thank you for reaching out. We'll get back to you soon.",
      className: "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
    });
    
    setIsSubmitting(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary/5">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-6"
        >
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h1 className="text-5xl md:text-6xl font-heading font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Let's Connect
            </h1>
            <p className="text-xl text-muted-foreground">
              Ready to transform your luxury brand's presence in Asia? We're here to help.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative p-8 rounded-2xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 backdrop-blur-xl rounded-2xl border border-white/20" />
              <form onSubmit={handleSubmit} className="relative space-y-6">
                <div className="space-y-2">
                  <Input
                    placeholder="Your Name"
                    className="bg-white/50 border-white/20 backdrop-blur-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    type="email"
                    placeholder="Your Email"
                    className="bg-white/50 border-white/20 backdrop-blur-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Textarea
                    placeholder="Your Message"
                    className="min-h-[150px] bg-white/50 border-white/20 backdrop-blur-sm"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full group relative overflow-hidden"
                  disabled={isSubmitting}
                >
                  <motion.div
                    animate={isSubmitting ? { x: "100%" } : { x: "0%" }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent"
                  />
                  <span className="relative">
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </span>
                  {!isSubmitting && (
                    <ArrowRight className="relative ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  )}
                </Button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lg:pl-12 space-y-8"
            >
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
                  alt="Office"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>

              <div className="grid gap-8">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex items-start space-x-4 p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
                >
                  <MapPin className="h-6 w-6 text-primary" />
                  <div>
                    <h3 className="font-heading font-semibold">Visit Us</h3>
                    <div className="text-muted-foreground space-y-1">
                      <p>Milan, Italy</p>
                      <p>Paris, France</p>
                      <p>Bangkok, Thailand</p>
                      <p>Hong Kong</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex items-start space-x-4 p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
                >
                  <Phone className="h-6 w-6 text-secondary" />
                  <div>
                    <h3 className="font-heading font-semibold">Call Us</h3>
                    <p className="text-muted-foreground">+393513690022</p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex items-start space-x-4 p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
                >
                  <Mail className="h-6 w-6 text-accent" />
                  <div>
                    <h3 className="font-heading font-semibold">Email Us</h3>
                    <p className="text-muted-foreground">contact@asiantradeconnect.com</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;