import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

const featuredJobs = [
  {
    title: "Business Development Manager",
    location: "Singapore",
    department: "Sales"
  },
  {
    title: "Retail Operations Specialist",
    location: "Hong Kong",
    department: "Operations"
  }
];

const Careers = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted to-background opacity-50" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
            Join Our Team
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Be part of our mission to transform luxury retail across Asia
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
          >
            {featuredJobs.map((job, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 border-primary/10 hover:border-primary bg-background/50 backdrop-blur-sm"
              >
                <Link to="/careers" className="block p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                        {job.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {job.location} · {job.department}
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-primary transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </Card>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex justify-center"
          >
            <Link
              to="/careers"
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-primary hover:bg-primary-dark text-primary-foreground rounded-full transition-all duration-500 hover:shadow-xl text-lg font-medium overflow-hidden"
            >
              <span className="relative z-10">View All Opportunities</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary-dark to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Careers;