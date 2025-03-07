import { z } from 'zod';

// Helper function to generate UUID using Web Crypto API
async function generateUUID() {
  return await crypto.randomUUID();
}

// Validation schema for blog posts
export const blogPostSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, 'Title is required').max(200, 'Title is too long'),
  content: z.string().min(1, 'Content is required'),
  excerpt: z.string().max(200, 'Excerpt is too long').optional(),
  author: z.string().optional(),
  image: z.string().optional(),
  publishedAt: z.date().optional(),
});

export type BlogPost = z.infer<typeof blogPostSchema>;

// In-memory storage for blog posts (replace with database in production)
let posts: BlogPost[] = [];

export async function createPost(data: BlogPost) {
  try {
    // Generate a unique ID
    const id = await generateUUID();
    
    // Create excerpt from content if not provided
    const excerpt = data.excerpt || data.content.slice(0, 150) + '...';
    
    // Validate the input data
    const validatedData = blogPostSchema.parse({
      ...data,
      id,
      excerpt,
      publishedAt: data.publishedAt || new Date(),
    });

    // In a real application, you would save this to a database
    posts.push(validatedData);

    return {
      success: true,
      data: validatedData,
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to create post',
    };
  }
}

export async function getPosts() {
  // Sort posts by publishedAt in descending order (newest first)
  const sortedPosts = [...posts].sort((a, b) => {
    const dateA = a.publishedAt || new Date(0);
    const dateB = b.publishedAt || new Date(0);
    return dateB.getTime() - dateA.getTime();
  });

  return {
    success: true,
    data: sortedPosts,
  };
}

export async function getPost(id: string) {
  const post = posts.find(p => p.id === id);
  
  if (!post) {
    return {
      success: false,
      error: 'Post not found',
    };
  }

  return {
    success: true,
    data: post,
  };
}
