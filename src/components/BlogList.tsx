import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getBlogPosts, BlogPost } from '@/lib/firebase/firestore';
import { format } from 'date-fns';
import { Timestamp } from 'firebase/firestore';

export function BlogList() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const fetchedPosts = await getBlogPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const formatDate = (date: Date | Timestamp) => {
    if (date instanceof Timestamp) {
      return format(date.toDate(), 'MMM dd, yyyy');
    }
    return format(date, 'MMM dd, yyyy');
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="overflow-hidden">
            <div className="aspect-video w-full bg-muted">
              <Skeleton className="h-full w-full" />
            </div>
            <CardHeader>
              <Skeleton className="h-6 w-2/3" />
              <Skeleton className="h-4 w-1/3 mt-2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-20 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12 border rounded-lg bg-muted/20">
        <h3 className="text-xl font-medium">No blog posts yet</h3>
        <p className="text-muted-foreground mt-2">Check back soon for updates!</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {posts.map((post) => (
        <Card key={post.id} className="overflow-hidden group hover:shadow-md transition-all duration-300">
          {post.photoUrls && post.photoUrls.length > 0 && (
            <div className="aspect-video w-full overflow-hidden">
              <img 
                src={post.photoUrls[0]} 
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          )}
          <CardHeader>
            <CardTitle className="text-2xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {post.title}
            </CardTitle>
            <CardDescription>Published on {formatDate(post.publishedAt)}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm dark:prose-invert">
              <p className="line-clamp-3">{post.content}</p>
            </div>
            {post.photoUrls && post.photoUrls.length > 1 && (
              <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                {post.photoUrls.slice(1).map((url, index) => (
                  <img 
                    key={index}
                    src={url} 
                    alt={`${post.title} image ${index + 2}`}
                    className="h-16 w-16 object-cover rounded-md border"
                  />
                ))}
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-end">
            <a 
              href={`/blog/${post.id}`} 
              className="text-sm font-medium text-primary hover:underline"
            >
              Read more →
            </a>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
