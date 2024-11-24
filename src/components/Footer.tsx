import { Link } from "react-router-dom";
import { Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary/10 mt-24">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-heading font-semibold">Asian Trade Connect</h3>
            <p className="text-sm text-muted-foreground">
              Connecting luxury brands with Asian markets since 1954.
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-heading font-semibold">Contact Us</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>123 Business Avenue</p>
              <p>Singapore, 123456</p>
              <p>Phone: +65 6789 0123</p>
              <p>Email: contact@asiantrade.com</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-heading font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <div>
                <Link to="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary-foreground transition-colors">
                  Privacy Policy
                </Link>
              </div>
              <div>
                <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary-foreground transition-colors">
                  Terms of Service
                </Link>
              </div>
              <div>
                <Link to="/careers" className="text-sm text-muted-foreground hover:text-primary-foreground transition-colors">
                  Careers
                </Link>
              </div>
              <div>
                <Link to="/news" className="text-sm text-muted-foreground hover:text-primary-foreground transition-colors">
                  News
                </Link>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-lg font-heading font-semibold">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://linkedin.com/company/asian-trade-connect"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-dark/10">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Asian Trade Connect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;