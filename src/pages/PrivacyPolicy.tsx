import { motion } from "framer-motion";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Shield, Clock, Mail, ArrowUp } from "lucide-react";

const privacyContent = [
  {
    title: "Information Collection",
    content: [
      {
        subtitle: "Personal Information",
        text: "We collect information that you provide directly to us, including name, email address, and company details when you register for our services or contact us."
      },
      {
        subtitle: "Usage Data",
        text: "We automatically collect certain information about your device and how you interact with our platform, including IP address, browser type, and pages visited."
      },
      {
        subtitle: "Cookies",
        text: "We use cookies and similar tracking technologies to enhance your experience and collect usage data. You can control cookie settings through your browser."
      }
    ]
  },
  {
    title: "Use of Information",
    content: [
      {
        subtitle: "Service Provision",
        text: "We use your information to provide and improve our services, process transactions, and communicate with you about your account."
      },
      {
        subtitle: "Analytics",
        text: "We analyze usage patterns to improve our platform's functionality and user experience."
      },
      {
        subtitle: "Marketing",
        text: "With your consent, we may send you marketing communications about our services and updates."
      }
    ]
  },
  {
    title: "Data Protection",
    content: [
      {
        subtitle: "Security Measures",
        text: "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access or disclosure."
      },
      {
        subtitle: "Data Retention",
        text: "We retain your information only for as long as necessary to fulfill the purposes outlined in this policy or as required by law."
      },
      {
        subtitle: "Third-Party Services",
        text: "We may share your information with trusted third-party service providers who assist us in operating our platform, subject to confidentiality obligations."
      }
    ]
  },
  {
    title: "Your Rights",
    content: [
      {
        subtitle: "Access and Control",
        text: "You have the right to access, correct, or delete your personal information. You can also object to or restrict certain processing activities."
      },
      {
        subtitle: "Data Portability",
        text: "You can request a copy of your personal information in a structured, commonly used format."
      },
      {
        subtitle: "Withdrawal of Consent",
        text: "You can withdraw your consent for processing your personal information at any time."
      }
    ]
  }
];

const PrivacyPolicy = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setShowScrollTop(e.currentTarget.scrollTop > 200);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-32 pb-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-block p-3 rounded-2xl bg-primary/10 mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                Privacy Policy
              </h1>
              <p className="text-lg text-muted-foreground">
                Your privacy is important to us. This policy outlines how we collect, use, and protect your information.
              </p>
              <div className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Last updated: January 15, 2024</span>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-muted/50 rounded-lg p-6 mb-8">
              <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {privacyContent.map((section) => (
                  <Button
                    key={section.title}
                    variant="ghost"
                    className="justify-start h-auto py-2"
                    onClick={() => document.getElementById(section.title)?.scrollIntoView({ behavior: "smooth" })}
                  >
                    {section.title}
                  </Button>
                ))}
              </div>
            </div>

            {/* Main Content */}
            <ScrollArea className="rounded-lg border bg-card" onScrollCapture={handleScroll}>
              <div className="p-6">
                <Accordion type="single" collapsible className="space-y-4">
                  {privacyContent.map((section) => (
                    <AccordionItem key={section.title} value={section.title} id={section.title}>
                      <AccordionTrigger className="text-xl font-heading hover:no-underline hover:text-primary">
                        {section.title}
                      </AccordionTrigger>
                      <AccordionContent className="space-y-6 pt-4">
                        {section.content.map((item) => (
                          <motion.div
                            key={item.subtitle}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <h3 className="text-lg font-semibold mb-2">{item.subtitle}</h3>
                            <p className="text-muted-foreground leading-relaxed">{item.text}</p>
                          </motion.div>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>

                {/* Contact Section */}
                <div className="mt-8 pt-8 border-t">
                  <h2 className="text-xl font-heading font-semibold mb-4">Questions or Concerns?</h2>
                  <p className="text-muted-foreground mb-4">
                    If you have any questions about our Privacy Policy, please contact our Data Protection Officer:
                  </p>
                  <Button variant="outline" className="gap-2">
                    <Mail className="h-4 w-4" />
                    privacy@asiantrade-connect.com
                  </Button>
                </div>
              </div>
            </ScrollArea>
          </motion.div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: showScrollTop ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className={`fixed bottom-8 right-8 p-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors ${
          showScrollTop ? "pointer-events-auto" : "pointer-events-none"
        }`}
        onClick={scrollToTop}
      >
        <ArrowUp className="h-5 w-5" />
      </motion.button>
    </main>
  );
};

export default PrivacyPolicy;