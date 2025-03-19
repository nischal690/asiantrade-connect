import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import { Timestamp } from 'firebase/firestore';
import { getFirestore, getDoc, doc } from 'firebase/firestore';
import { app } from '@/firebase/config';
import { BlogPost } from '@/lib/firebase/firestore';

// Initialize Firestore
const db = getFirestore(app);

export default function BlogPostPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) {
        setError('Blog post not found');
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const docRef = doc(db, 'blogs', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setPost({
            id: docSnap.id,
            ...docSnap.data() as Omit<BlogPost, 'id'>
          });
        } else {
          setError('Blog post not found');
        }
      } catch (error) {
        console.error('Error fetching blog post:', error);
        setError('Failed to load blog post');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const formatDate = (date: Date | Timestamp | undefined) => {
    if (!date) return '';
    
    if (date instanceof Timestamp) {
      return format(date.toDate(), 'MMMM dd, yyyy');
    }
    return format(date, 'MMMM dd, yyyy');
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-12 px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <Skeleton className="h-10 w-2/3 mx-auto mb-4" />
          <Skeleton className="h-5 w-1/3 mx-auto mb-12" />
          
          <div className="aspect-video w-full mb-8">
            <Skeleton className="h-full w-full rounded-lg" />
          </div>
          
          <div className="space-y-4">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-4/5" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container mx-auto py-12 px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Oops! {error || 'Something went wrong'}</h1>
          <p className="text-muted-foreground mb-8">
            We couldn't find the blog post you were looking for.
          </p>
          <Button onClick={() => navigate('/blog')}>
            Back to Blog
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="max-w-3xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/blog')}
          className="mb-6 -ml-2"
        >
          ← Back to Blog
        </Button>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          {post.title}
        </h1>
        <p className="text-muted-foreground mb-8">
          Published on {formatDate(post.publishedAt)}
        </p>
        
        {post.photoUrls && post.photoUrls.length > 0 && (
          <div className="mb-8">
            <img 
              src={post.photoUrls[0]} 
              alt={post.title}
              className="w-full h-auto rounded-lg object-cover"
            />
          </div>
        )}
        
        <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
          {post.content.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        
        {post.photoUrls && post.photoUrls.length > 1 && (
          <div className="mt-8">
            <h3 className="text-xl font-medium mb-4">Gallery</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {post.photoUrls.slice(1).map((url, index) => (
                <img 
                  key={index}
                  src={url} 
                  alt={`${post.title} image ${index + 2}`}
                  className="w-full h-40 object-cover rounded-md border hover:opacity-90 transition-opacity cursor-pointer"
                  onClick={() => window.open(url, '_blank')}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
