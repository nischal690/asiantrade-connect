import { BlogList } from '@/components/BlogList';

export default function BlogPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Our Blog
        </h1>
        <p className="text-center text-muted-foreground mb-12">
          Latest news, updates, and insights from Asian Trade Connect
        </p>

        <BlogList />
      </div>
    </div>
  );
}
