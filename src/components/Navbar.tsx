import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const NavLink = ({ to, children, onClick }: { to: string; children: React.ReactNode; onClick?: () => void }) => (
  <Link
    to={to}
    onClick={onClick}
    className="relative group px-4 py-2 text-sm font-medium text-primary-foreground/90 hover:text-primary-foreground transition-colors"
  >
    <span className="relative z-10">{children}</span>
    <motion.div
      className="absolute inset-0 bg-primary-dark/10 rounded-lg -z-0"
      initial={{ scale: 0, opacity: 0 }}
      whileHover={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.2 }}
    />
  </Link>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, type: "spring" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "backdrop-blur-md bg-primary/90 shadow-lg border-b border-primary-dark/10 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="relative group"
          >
            <motion.span 
              className="text-2xl font-heading font-bold text-primary-foreground"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              ATC
            </motion.span>
            <motion.div
              className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.2 }}
            />
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About Us</NavLink>
            <NavLink to="/services">Our Services</NavLink>
            <NavLink to="/news">News</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </div>

          <motion.button
            className="md:hidden relative z-50 w-10 h-10 flex items-center justify-center rounded-lg bg-primary-dark/10 text-primary-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-6 w-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-6 w-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-0 right-0 backdrop-blur-md bg-primary/95 py-6 border-t border-primary-dark/10 shadow-lg"
          >
            <div className="flex flex-col space-y-2 px-6">
              <NavLink to="/" onClick={() => setIsMenuOpen(false)}>
                Home
              </NavLink>
              <NavLink to="/about" onClick={() => setIsMenuOpen(false)}>
                About Us
              </NavLink>
              <NavLink to="/services" onClick={() => setIsMenuOpen(false)}>
                Our Services
              </NavLink>
              <NavLink to="/news" onClick={() => setIsMenuOpen(false)}>
                News
              </NavLink>
              <NavLink to="/contact" onClick={() => setIsMenuOpen(false)}>
                Contact
              </NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;