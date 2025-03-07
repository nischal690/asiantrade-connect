import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Search, Globe } from "lucide-react";
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
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  const navVariants = {
    visible: { 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 20,
        when: "beforeChildren",
        staggerChildren: 0.1 
      } 
    },
    hidden: { 
      y: -100,
      transition: { 
        ease: "easeInOut",
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      } 
    }
  };

  const itemVariants = {
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 }
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
      animate="visible"
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
                transition={{ delay: 0.2, duration: 0.6 }}
              />
              <motion.div 
                className="absolute -bottom-1 left-0 h-0.5 w-full bg-gradient-to-r from-purple-500 via-indigo-400 to-blue-500"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "100%", opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
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
              <NavLink to="/news">News</NavLink>
            </motion.div>
            <motion.div variants={itemVariants}>
              <NavLink to="/contact">Contact</NavLink>
            </motion.div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <motion.div
              className="relative"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <motion.button 
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/10 to-blue-500/10 hover:from-purple-500/20 hover:to-blue-500/20 backdrop-blur-lg border border-white/20 text-black/80 transition-all duration-300"
                whileTap={{ scale: 0.95 }}
              >
                <Search size={18} />
              </motion.button>
            </motion.div>
            
            <motion.div
              className="relative"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <motion.button 
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/10 to-blue-500/10 hover:from-purple-500/20 hover:to-blue-500/20 backdrop-blur-lg border border-white/20 text-black/80 transition-all duration-300"
                whileTap={{ scale: 0.95 }}
              >
                <Globe size={18} />
              </motion.button>
            </motion.div>
          </div>

          <motion.button
            className="md:hidden relative z-50 w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-500/10 to-blue-500/10 backdrop-blur-lg border border-black/10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileHover={{ scale: 1.05, boxShadow: "0 0 8px rgba(120, 120, 255, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle menu"
            variants={itemVariants}
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
            initial={{ opacity: 0, height: 0, backdropFilter: "blur(0px)" }}
            animate={{ 
              opacity: 1, 
              height: "100vh", 
              backdropFilter: "blur(20px)"
            }}
            exit={{ 
              opacity: 0, 
              height: 0, 
              backdropFilter: "blur(0px)",
              transition: { 
                height: { delay: 0.2 },
                backdropFilter: { duration: 0.3 } 
              }
            }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden fixed inset-0 top-[5rem] bg-gradient-to-b from-white/90 to-white/80 backdrop-blur-xl border-t border-black/5 shadow-2xl"
          >
            <div className="flex flex-col h-full">
              <div className="flex flex-col space-y-6 p-8">
                {[
                  { path: "/", name: "Home" },
                  { path: "/about", name: "About Us" },
                  { path: "/our-brands", name: "Our Brands" },
                  { path: "/services", name: "Our Services" },
                  { path: "/news", name: "News" },
                  { path: "/contact", name: "Contact" }
                ].map((item, i) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ 
                      delay: 0.1 + i * 0.05, 
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                  >
                    <Link 
                      to={item.path} 
                      onClick={() => setIsMenuOpen(false)}
                      className="text-3xl font-medium text-black/90 hover:text-purple-600 transition-colors"
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-auto p-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  className="flex justify-center space-x-4 pt-6"
                >
                  <motion.button 
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/10 to-blue-500/10 hover:from-purple-500/20 hover:to-blue-500/20 border border-white/20 text-black/80"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Search size={20} />
                  </motion.button>
                  <motion.button 
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/10 to-blue-500/10 hover:from-purple-500/20 hover:to-blue-500/20 border border-white/20 text-black/80"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Globe size={20} />
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;