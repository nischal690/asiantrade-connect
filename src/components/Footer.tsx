import { Link } from "react-router-dom";
import { Linkedin } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className="bg-primary/10 mt-24"
    >
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-lg font-heading font-semibold">Asian Trade Connect</h3>
            <p className="text-sm text-muted-foreground">
              Connecting luxury brands with Asian markets since 1954.
            </p>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-lg font-heading font-semibold">Contact Us</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>123 Business Avenue</p>
              <p>Singapore, 123456</p>
              <p>Phone: +65 6789 0123</p>
              <p>Email: contact@asiantrade.com</p>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-lg font-heading font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <Link to="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary-foreground transition-colors">
                  Privacy Policy
                </Link>
              </motion.div>
              <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary-foreground transition-colors">
                  Terms of Service
                </Link>
              </motion.div>
              <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <Link to="/careers" className="text-sm text-muted-foreground hover:text-primary-foreground transition-colors">
                  Careers
                </Link>
              </motion.div>
              <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <Link to="/news" className="text-sm text-muted-foreground hover:text-primary-foreground transition-colors">
                  News
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Social Media */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-lg font-heading font-semibold">Follow Us</h3>
            <motion.div 
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
              className="flex space-x-4"
            >
              <a
                href="https://linkedin.com/company/asian-trade-connect"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </a>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          className="mt-12 pt-8 border-t border-primary-dark/10"
        >
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Asian Trade Connect. All rights reserved.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;