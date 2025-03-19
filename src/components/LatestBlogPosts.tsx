import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getBlogPosts, BlogPost } from '@/lib/firebase/firestore';
import { format } from 'date-fns';
import { Timestamp } from 'firebase/firestore';
import { motion } from 'framer-motion';

export function LatestBlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const fetchedPosts = await getBlogPosts();
        // Get only the latest 3 posts
        setPosts(fetchedPosts.slice(0, 3));
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Latest from Our Blog
          </motion.h2>
          <motion.p 
            className="text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Stay updated with the latest news, insights, and developments from Asian Trade Connect
          </motion.p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
        ) : posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No blog posts available yet. Check back soon!</p>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {posts.map((post) => (
              <motion.div key={post.id} variants={itemVariants}>
                <Card className="h-full overflow-hidden group hover:shadow-md transition-all duration-300">
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
                    <CardTitle className="text-xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent line-clamp-2">
                      {post.title}
                    </CardTitle>
                    <CardDescription>Published on {formatDate(post.publishedAt)}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-3 text-sm text-muted-foreground">{post.content}</p>
                  </CardContent>
                  <CardFooter>
                    <Link 
                      to={`/blog/${post.id}`}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      Read more →
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        <div className="text-center mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Button asChild variant="outline" className="group">
              <Link to="/blog" className="flex items-center gap-2">
                View All Blog Posts
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
