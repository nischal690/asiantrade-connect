import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const NavLink = ({ to, children, onClick }: { to: string; children: React.ReactNode; onClick?: () => void }) => (
  <Link
    to={to}
    onClick={onClick}
    className="relative px-3 py-2 text-sm font-medium text-primary-foreground/90 hover:text-primary-foreground transition-colors after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
  >
    {children}
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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "backdrop-blur-md bg-primary/80 border-b border-primary-dark/10 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="text-2xl font-heading font-bold text-primary-foreground">
          ATC
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About Us</NavLink>
          <NavLink to="/services">Our Services</NavLink>
          <NavLink to="/news">News</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </div>

        <button
          className="md:hidden text-primary-foreground"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 backdrop-blur-md bg-primary/90 py-4 animate-fade-in border-t border-primary-dark/10">
          <div className="flex flex-col space-y-4 px-6">
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
        </div>
      )}
    </nav>
  );
};

export default Navbar;