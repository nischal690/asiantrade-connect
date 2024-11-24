import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-6 py-24">
        <h1 className="text-4xl font-heading font-bold mb-8">Privacy Policy</h1>
        <div className="prose max-w-none">
          <p className="text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          <p className="mt-6">
            At Asian Trade Connect, we take your privacy seriously. This Privacy Policy explains how we collect,
            use, disclose, and safeguard your information when you visit our website or use our services.
          </p>
          {/* Add more privacy policy content here */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;