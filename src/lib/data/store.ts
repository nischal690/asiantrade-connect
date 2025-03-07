// This file acts as our local database
interface BlogPost {
  id: string;
  title: string;
  content: string;
  photos: string[]; // Base64 encoded images
  publishedAt: Date;
}

interface Brand {
  name: string;
  description: string;
  images: string[]; // Base64 encoded images
}

interface JobPost {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  location: string;
  type: 'full-time' | 'part-time' | 'contract';
  createdAt: Date;
}

// Admin credentials
export const ADMIN_PASSWORD = "admin123"; // You can change this password

// In-memory storage
let blogPosts: BlogPost[] = [];
let brands: Brand[] = [
  {
    name: "COVA",
    description: "Established in 1817, Cova is one of the oldest and most prestigious luxury patisseries in Milan, blending heritage and indulgence. With over 30 stores worldwide, the brand is expanding strongly across Asia, bringing its timeless Italian elegance to new markets. Known for its artisanal pastries and refined atmosphere, Cova continues to set the standard for excellence in taste and experience.",
    images: ["/brands/cova/cova1.png", "/brands/cova/cova2.png", "/brands/cova/cova3.png"]
  },
  {
    name: "MISSONI",
    description: "Founded in 1953, Missoni revolutionized Italian fashion with its distinctive knitwear and bold, colorful patterns. A symbol of timeless craftsmanship, the brand blends tradition with modern luxury. Missoni continues to set the standard for elegance and innovation in the fashion world.",
    images: ["/brands/MISSONI/missoni1.png", "/brands/MISSONI/missoni2.png"]
  }
];
let jobPosts: JobPost[] = [];

// Blog post operations
export const getBlogPosts = () => blogPosts;

export const createBlogPost = (post: Omit<BlogPost, 'id'>) => {
  const newPost = {
    ...post,
    id: Date.now().toString()
  };
  blogPosts = [newPost, ...blogPosts];
  return newPost;
};

export const deleteBlogPost = (id: string) => {
  blogPosts = blogPosts.filter(post => post.id !== id);
};

// Brand operations
export const getBrands = () => brands;

export const createBrand = (brand: Brand) => {
  brands = [...brands, brand];
  return brand;
};

export const updateBrand = (updatedBrand: Brand) => {
  brands = brands.map(brand => 
    brand.name === updatedBrand.name ? updatedBrand : brand
  );
  return updatedBrand;
};

export const deleteBrand = (brandName: string) => {
  brands = brands.filter(brand => brand.name !== brandName);
};

// Job post operations
export const getJobPosts = () => jobPosts;

export const createJobPost = (post: Omit<JobPost, 'id'>) => {
  const newPost = {
    ...post,
    id: Date.now().toString()
  };
  jobPosts = [newPost, ...jobPosts];
  return newPost;
};

export const deleteJobPost = (id: string) => {
  jobPosts = jobPosts.filter(post => post.id !== id);
};

// Image utilities
export const convertImageToBase64 = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};
