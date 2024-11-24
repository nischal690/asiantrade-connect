import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Pioneers from "@/components/Pioneers";
import About from "@/components/About";
import Services from "@/components/Services";
import NewsSection from "@/components/NewsSection";
import Careers from "@/components/Careers";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Pioneers />
      <About />
      <Services />
      <NewsSection />
      <Careers />
      <Footer />
    </main>
  );
};

export default Index;