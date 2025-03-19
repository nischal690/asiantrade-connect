import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { getBlogPosts, deleteBlogPost, BlogPost } from '@/lib/firebase/firestore';
import { format } from 'date-fns';
import { Timestamp } from 'firebase/firestore';

export function BlogManager() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const fetchedPosts = await getBlogPosts();
      setPosts(fetchedPosts);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      toast({
        title: "Error",
        description: "Failed to load blog posts",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!id) return;
    
    setIsDeleting(id);
    try {
      await deleteBlogPost(id);
      setPosts(posts.filter(post => post.id !== id));
      toast({
        title: "Success",
        description: "Blog post deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting blog post:', error);
      toast({
        title: "Error",
        description: "Failed to delete blog post",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(null);
    }
  };

  const formatDate = (date: Date | Timestamp) => {
    if (date instanceof Timestamp) {
      return format(date.toDate(), 'MMM dd, yyyy');
    }
    return format(date, 'MMM dd, yyyy');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Blog Posts</h2>
        <Button onClick={fetchPosts} variant="outline" size="sm">
          Refresh
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-2/3" />
                <Skeleton className="h-4 w-1/3 mt-2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-20 w-full" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-9 w-20" />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-12 border rounded-lg bg-muted/20">
          <p className="text-lg text-muted-foreground">No blog posts found</p>
          <p className="text-sm text-muted-foreground mt-1">Create your first blog post using the form above</p>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>Published on {formatDate(post.publishedAt)}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="line-clamp-3 text-sm text-muted-foreground">
                  {post.content}
                </div>
                {post.photoUrls && post.photoUrls.length > 0 && (
                  <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                    {post.photoUrls.map((url, index) => (
                      <img 
                        key={index}
                        src={url} 
                        alt={`Blog image ${index + 1}`}
                        className="h-20 w-20 object-cover rounded-md border"
                      />
                    ))}
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button 
                  variant="destructive" 
                  size="sm"
                  disabled={isDeleting === post.id}
                  onClick={() => handleDelete(post.id!)}
                >
                  {isDeleting === post.id ? 'Deleting...' : 'Delete'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
