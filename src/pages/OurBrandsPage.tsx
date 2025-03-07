import OurBrands from "@/components/OurBrands";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const OurBrandsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <OurBrands />
      </main>
      <Footer />
    </div>
  );
};

export default OurBrandsPage;
