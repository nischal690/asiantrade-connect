import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Pioneers from "@/components/Pioneers";
import About from "@/components/About";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Pioneers />
      <About />
    </main>
  );
};

export default Index;