import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { ArrowRight, Building2, Users2, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

const jobOpenings = [
  {
    title: "Business Development Manager",
    location: "Singapore",
    type: "Full-time",
    description: "Lead our expansion efforts across Southeast Asian luxury markets.",
    department: "Sales & Business Development"
  },
  {
    title: "Retail Operations Specialist",
    location: "Hong Kong",
    type: "Full-time",
    description: "Oversee and optimize retail operations for luxury brand partners.",
    department: "Operations"
  },
  {
    title: "Brand Strategy Consultant",
    location: "Tokyo",
    type: "Full-time",
    description: "Develop and execute brand strategies for luxury market entry.",
    department: "Strategy"
  }
];

const CareersPage = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h1 className="text-5xl font-heading font-bold mb-6">
              Join Our Team
            </h1>
            <p className="text-xl text-muted-foreground">
              Be part of our mission to transform luxury retail across Asia
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 rounded-xl bg-primary/10 text-center"
            >
              <Building2 className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Global Presence</h3>
              <p className="text-muted-foreground">Offices across major Asian cities</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-6 rounded-xl bg-secondary/10 text-center"
            >
              <Users2 className="w-12 h-12 mx-auto mb-4 text-secondary" />
              <h3 className="text-xl font-semibold mb-2">Diverse Teams</h3>
              <p className="text-muted-foreground">Inclusive and collaborative culture</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="p-6 rounded-xl bg-accent/10 text-center"
            >
              <GraduationCap className="w-12 h-12 mx-auto mb-4 text-accent" />
              <h3 className="text-xl font-semibold mb-2">Growth & Learning</h3>
              <p className="text-muted-foreground">Continuous development opportunities</p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-heading font-semibold mb-8 text-center">
              Current Openings
            </h2>
            <div className="space-y-6">
              {jobOpenings.map((job, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-primary/10 hover:border-primary">
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                            {job.title}
                          </h3>
                          <p className="text-muted-foreground">
                            {job.location} · {job.type}
                          </p>
                        </div>
                        <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                          {job.department}
                        </span>
                      </div>
                      <p className="text-muted-foreground mb-4">
                        {job.description}
                      </p>
                      <div className="flex justify-end">
                        <ArrowRight className="w-5 h-5 text-primary transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default CareersPage;