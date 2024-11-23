import Navbar from "@/components/Navbar";

const NewsPage = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl font-heading font-bold text-center mb-8">
            News & Updates
          </h1>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-muted-foreground text-center">
              Stay up to date with our latest news, announcements, and industry insights.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NewsPage;