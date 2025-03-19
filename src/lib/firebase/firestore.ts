import { collection, addDoc, getDocs, deleteDoc, doc, getFirestore, updateDoc, query, orderBy, Timestamp, getDoc } from 'firebase/firestore';
import { app } from '@/firebase/config';
import { deleteBlogImages } from './storage';

// Initialize Firestore
const db = getFirestore(app);

export interface BlogPost {
  id?: string;
  title: string;
  content: string;
  photoUrls: string[];
  publishedAt: Date | Timestamp;
}

// Blog post operations
export const getBlogPosts = async (): Promise<BlogPost[]> => {
  const blogPostsCollection = collection(db, 'blogs');
  const q = query(blogPostsCollection, orderBy('publishedAt', 'desc'));
  const snapshot = await getDocs(q);
  
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data() as Omit<BlogPost, 'id'>
  }));
};

export const createBlogPost = async (post: Omit<BlogPost, 'id'>): Promise<BlogPost> => {
  const blogPostsCollection = collection(db, 'blogs');
  
  // Convert Date to Firestore Timestamp
  const postData = {
    ...post,
    publishedAt: Timestamp.fromDate(post.publishedAt instanceof Date ? post.publishedAt : new Date())
  };
  
  const docRef = await addDoc(blogPostsCollection, postData);
  
  return {
    id: docRef.id,
    ...post
  };
};

export const updateBlogPost = async (id: string, post: Partial<Omit<BlogPost, 'id'>>): Promise<void> => {
  const docRef = doc(db, 'blogs', id);
  
  // Convert Date to Firestore Timestamp if present
  const postData = { ...post };
  if (post.publishedAt && post.publishedAt instanceof Date) {
    postData.publishedAt = Timestamp.fromDate(post.publishedAt);
  }
  
  await updateDoc(docRef, postData);
};

export const deleteBlogPost = async (id: string): Promise<void> => {
  // First, get the blog post to extract image paths
  const docRef = doc(db, 'blogs', id);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    const post = docSnap.data() as Omit<BlogPost, 'id'>;
    
    // Extract image paths from URLs
    // The URL format from Supabase is typically like:
    // https://[project-ref].supabase.co/storage/v1/object/public/blogs/path/to/image.jpg
    const imagePaths = post.photoUrls.map(url => {
      // Extract the path after the bucket name
      const match = url.match(/\/blogs\/(.+)$/);
      return match ? match[1] : null;
    }).filter(Boolean) as string[];
    
    // Delete images from Supabase if there are any
    if (imagePaths.length > 0) {
      try {
        await deleteBlogImages(imagePaths);
      } catch (error) {
        console.error('Error deleting blog images:', error);
        // Continue with post deletion even if image deletion fails
      }
    }
  }
  
  // Delete the blog post document
  await deleteDoc(docRef);
};
