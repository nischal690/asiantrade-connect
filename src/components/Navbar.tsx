import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";

const NavLink = ({ to, children, hasDropdown = false, onClick }: { 
  to: string; 
  children: React.ReactNode; 
  hasDropdown?: boolean;
  onClick?: () => void 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        to={to}
        onClick={onClick}
        className="relative flex items-center px-4 py-2 text-sm font-medium text-black/90 hover:text-black transition-all duration-300"
      >
        <motion.span 
          className="relative z-10"
          animate={{ y: isHovered ? -2 : 0 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {children}
        </motion.span>
        
        {hasDropdown && (
          <motion.div
            animate={{ rotate: isHovered ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="ml-1"
          >
            <ChevronDown size={14} />
          </motion.div>
        )}
        
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/5 rounded-lg -z-0"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: isHovered ? 1 : 0, opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
        
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 via-indigo-400 to-blue-500"
          initial={{ width: "0%", opacity: 0 }}
          animate={{ 
            width: isHovered ? "100%" : "0%", 
            opacity: isHovered ? 1 : 0 
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </Link>
    </div>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isLoaded, setIsLoaded] = useState(false);
  const { scrollY } = useScroll();

  // Reduced motion for initial load
  useEffect(() => {
    // Delay setting loaded state slightly for smoother startup
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  const navVariants = {
    visible: { 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 70, // Reduced stiffness for smoother motion
        damping: 20,
        when: "beforeChildren",
        staggerChildren: 0.05 // Reduced stagger timing
      } 
    },
    hidden: { 
      y: -100,
      transition: { 
        ease: "easeInOut",
        when: "afterChildren",
        staggerChildren: 0.03, // Reduced stagger timing
        staggerDirection: -1
      } 
    }
  };

  const itemVariants = {
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 200, damping: 20 }
    },
    hidden: { 
      y: -20, 
      opacity: 0,
      transition: { duration: 0.2, ease: "easeInOut" }
    }
  };

  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      animate={isLoaded ? "visible" : "hidden"}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "backdrop-blur-xl bg-white/85 shadow-lg border-b border-black/5 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="relative group"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <motion.img 
                src="/logo.png"
                alt="AsianTrade Connect Logo"
                className="h-32 w-auto"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
              />
              <motion.div 
                className="absolute -bottom-1 left-0 h-0.5 w-full bg-gradient-to-r from-purple-500 via-indigo-400 to-blue-500"
                initial={{ width: 0, opacity: 0 }}
                animate={isLoaded ? { width: "100%", opacity: 1 } : { width: 0, opacity: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              />
            </motion.div>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            <motion.div className="flex" variants={itemVariants}>
              <NavLink to="/">Home</NavLink>
            </motion.div>
            <motion.div variants={itemVariants}>
              <NavLink to="/about" hasDropdown>About Us</NavLink>
            </motion.div>
            <motion.div variants={itemVariants}>
              <NavLink to="/our-brands">Our Brands</NavLink>
            </motion.div>
            <motion.div variants={itemVariants}>
              <NavLink to="/services" hasDropdown>Our Services</NavLink>
            </motion.div>
            <motion.div variants={itemVariants}>
              <NavLink to="/blog">Blog</NavLink>
            </motion.div>
            <motion.div variants={itemVariants}>
              <NavLink to="/news">News</NavLink>
            </motion.div>
            <motion.div variants={itemVariants}>
              <NavLink to="/contact">Contact</NavLink>
            </motion.div>
          </div>

          <motion.button
            className="md:hidden relative z-50 w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-500/10 to-blue-500/10 backdrop-blur-lg border border-black/10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileHover={{ scale: 1.05, boxShadow: "0 0 8px rgba(120, 120, 255, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile menu with optimized animations */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-white/90 backdrop-blur-xl z-40 flex flex-col pt-32 px-6 pb-16 overflow-y-auto"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="flex flex-col space-y-2">
              {[
                { to: "/", label: "Home" },
                { to: "/about", label: "About Us", hasDropdown: true },
                { to: "/our-brands", label: "Our Brands" },
                { to: "/services", label: "Our Services", hasDropdown: true },
                { to: "/blog", label: "Blog" },
                { to: "/news", label: "News" },
                { to: "/contact", label: "Contact" },
              ].map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <NavLink to={link.to} hasDropdown={link.hasDropdown} onClick={() => setIsMenuOpen(false)}>
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
            </div>

            <motion.div 
              className="mt-auto pt-8 border-t border-gray-200/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 0.5, duration: 0.3 }}
            >
              <p className="text-sm text-center text-gray-500">
                {new Date().getFullYear()} AsianTrade Connect<br />
                Connecting Asian Trade to the World
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;