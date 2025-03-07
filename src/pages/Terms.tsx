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
import { Scale, Clock, AlertCircle, ArrowUp, CheckCircle2 } from "lucide-react";

const termsContent = [
  {
    title: "Acceptance of Terms",
    content: [
      {
        subtitle: "Agreement to Terms",
        text: "By accessing or using Asian Trade Connect's platform, you agree to be bound by these Terms of Service and all applicable laws and regulations."
      },
      {
        subtitle: "Eligibility",
        text: "You must be at least 18 years old and have the legal authority to enter into this agreement to use our services."
      }
    ]
  },
  {
    title: "Service Description",
    content: [
      {
        subtitle: "Platform Access",
        text: "We provide a platform connecting luxury brands with Asian market opportunities. Our services include market analysis, partnership facilitation, and business networking."
      },
      {
        subtitle: "Account Creation",
        text: "To access certain features, you must create an account. You are responsible for maintaining the confidentiality of your account credentials."
      },
      {
        subtitle: "Service Availability",
        text: "We strive to maintain platform availability but do not guarantee uninterrupted access. Maintenance or technical issues may occasionally affect service."
      }
    ]
  },
  {
    title: "User Obligations",
    content: [
      {
        subtitle: "Acceptable Use",
        text: "You agree to use our platform only for lawful purposes and in accordance with these terms. Any misuse may result in immediate termination."
      },
      {
        subtitle: "Content Guidelines",
        text: "You are responsible for any content you post or share through our platform. Content must be accurate, legal, and respect intellectual property rights."
      },
      {
        subtitle: "Account Security",
        text: "You must maintain account security and notify us immediately of any unauthorized access or security breaches."
      }
    ]
  },
  {
    title: "Intellectual Property",
    content: [
      {
        subtitle: "Ownership",
        text: "All platform content, features, and functionality are owned by Asian Trade Connect and protected by international copyright laws."
      },
      {
        subtitle: "License",
        text: "We grant you a limited, non-exclusive license to use our platform for its intended purpose while you maintain an active account."
      }
    ]
  },
  {
    title: "Liability and Disclaimers",
    content: [
      {
        subtitle: "Limitation of Liability",
        text: "We are not liable for any indirect, incidental, special, or consequential damages arising from your use of our platform."
      },
      {
        subtitle: "Service Warranty",
        text: "Our services are provided 'as is' without any warranties, express or implied."
      }
    ]
  }
];

const Terms = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

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
                <Scale className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                Terms of Service
              </h1>
              <p className="text-lg text-muted-foreground">
                Please read these terms carefully before using our platform.
              </p>
              <div className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Last updated: January 15, 2024</span>
              </div>
            </div>

            {/* Important Notice */}
            <div className="bg-warning/10 border border-warning/20 rounded-lg p-6 mb-8">
              <div className="flex items-start gap-4">
                <AlertCircle className="h-6 w-6 text-warning flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-lg font-semibold mb-2">Important Notice</h2>
                  <p className="text-muted-foreground">
                    By using Asian Trade Connect, you agree to these terms and conditions. 
                    If you do not agree with any part of these terms, you must not use our platform.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-muted/50 rounded-lg p-6 mb-8">
              <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {termsContent.map((section) => (
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
                  {termsContent.map((section) => (
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

                {/* Terms Acceptance */}
                <div className="mt-8 pt-8 border-t">
                  <div className="flex items-start gap-4 p-4 bg-muted rounded-lg">
                    <Button
                      variant={acceptedTerms ? "default" : "outline"}
                      className="gap-2"
                      onClick={() => setAcceptedTerms(!acceptedTerms)}
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      {acceptedTerms ? "Terms Accepted" : "Accept Terms"}
                    </Button>
                    <p className="text-sm text-muted-foreground">
                      By clicking "Accept Terms", you acknowledge that you have read and agree to these Terms of Service.
                    </p>
                  </div>
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

export default Terms;