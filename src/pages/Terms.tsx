import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-6 py-24">
        <h1 className="text-4xl font-heading font-bold mb-8">Terms of Service</h1>
        <div className="prose max-w-none">
          <p className="text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          <p className="mt-6">
            Welcome to Asian Trade Connect. By accessing our website and using our services,
            you agree to comply with and be bound by the following terms and conditions of use.
          </p>
          {/* Add more terms of service content here */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Terms;