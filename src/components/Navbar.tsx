import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const NavLink = ({ to, children, onClick }: { to: string; children: React.ReactNode; onClick?: () => void }) => (
  <Link
    to={to}
    onClick={onClick}
    className="relative group px-4 py-2 text-sm font-medium text-black/90 hover:text-black transition-all duration-300"
  >
    <span className="relative z-10">{children}</span>
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-black/5 to-black/2 rounded-lg -z-0"
      initial={{ scale: 0, opacity: 0 }}
      whileHover={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    />
    <motion.div
      className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-accent via-accent/80 to-accent/50"
      initial={{ width: "0%", opacity: 0 }}
      whileHover={{ width: "100%", opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
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
      transition={{ duration: 0.8, type: "spring", bounce: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "backdrop-blur-xl bg-white/80 shadow-lg border-b border-black/5 py-4"
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
              className="text-2xl font-heading font-bold bg-clip-text text-transparent bg-gradient-to-r from-black to-black/80"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              ATC
            </motion.span>
            <motion.div
              className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-accent via-accent/80 to-transparent"
              initial={{ scaleX: 0, opacity: 0 }}
              whileHover={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
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
            className="md:hidden relative z-50 w-10 h-10 flex items-center justify-center rounded-lg bg-gradient-to-br from-black/10 to-black/5 backdrop-blur-lg border border-black/10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileHover={{ scale: 1.05, backgroundColor: "rgba(0,0,0,0.1)" }}
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
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <X className="h-6 w-6 text-black" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <Menu className="h-6 w-6 text-black" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="md:hidden absolute top-full left-0 right-0 backdrop-blur-xl bg-white/90 border-t border-black/5 shadow-lg"
          >
            <div className="flex flex-col space-y-4 p-6">
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