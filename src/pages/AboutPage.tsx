import Navbar from "@/components/Navbar";

const AboutPage = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-16 bg-muted">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl font-heading font-bold text-center mb-8 animate-fade-up">
            Our Story
          </h1>
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-up delay-100">
            <p className="text-lg text-muted-foreground">
              Founded in 1954, Asian Trade Connect has been a pioneer in luxury retail across Asia. 
              Our journey began with a vision to bring the world's finest brands to Asian consumers, 
              and today, we continue to be at the forefront of luxury retail innovation.
            </p>
            
            <p className="text-lg text-muted-foreground">
              We pride ourselves on our deep understanding of both global luxury brands and local Asian markets. 
              Our expertise lies in creating seamless connections between prestigious international brands and 
              discerning Asian consumers, ensuring that each brand's unique identity is preserved while adapting 
              to local preferences and cultural nuances.
            </p>
            
            <p className="text-lg text-muted-foreground">
              With decades of experience and a presence across major Asian markets, we offer unparalleled insights 
              and strategic partnerships that help luxury brands thrive in this dynamic region. Our commitment to 
              excellence, innovation, and authentic relationships continues to drive our success and that of our partners.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AboutPage;