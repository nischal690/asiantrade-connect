// This file acts as our local database

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  photos: string[];
  publishedAt: Date;
}

export interface Brand {
  name: string;
  description: string;
  images: string[];
  website?: string;
}

export interface JobPost {
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
    images: ["https://qfeevhgjgwkyfdxulziz.supabase.co/storage/v1/object/public/brands/cova/cova1.png", "https://qfeevhgjgwkyfdxulziz.supabase.co/storage/v1/object/public/brands/cova/cova2.png", "https://qfeevhgjgwkyfdxulziz.supabase.co/storage/v1/object/public/brands/cova/cova3.png", "https://qfeevhgjgwkyfdxulziz.supabase.co/storage/v1/object/public/brands/cova/covalogo.png"]
  },
  {
    name: "MISSONI",
    description: "Founded in 1953, Missoni revolutionized Italian fashion with its distinctive knitwear and bold, colorful patterns. A symbol of timeless craftsmanship, the brand blends tradition with modern luxury. Missoni continues to set the standard for elegance and innovation in the fashion world.",
    images: ["https://qfeevhgjgwkyfdxulziz.supabase.co/storage/v1/object/public/brands/MISSONI/missoni1.png", "https://qfeevhgjgwkyfdxulziz.supabase.co/storage/v1/object/public/brands/MISSONI/missoni2.png"]
  },
  {
    name: "N°21",
    description: "Since its launch in 2010, N°21 has become a beacon of contemporary Italian fashion. Combining sophisticated tailoring with modern, edgy details, the brand is effortlessly cool. N°21 is the go-to for those seeking understated yet powerful style.",
    images: ["https://qfeevhgjgwkyfdxulziz.supabase.co/storage/v1/object/public/brands/N21/n21(1).png", "https://qfeevhgjgwkyfdxulziz.supabase.co/storage/v1/object/public/brands/N21/n21(2).png"]
  },
  {
    name: "BENEDETTA BRUZZICHES",
    description: "Since 2009, Benedetta Bruzziches has been enchanting the world with whimsical, artistic handbag designs. Each piece is a masterpiece of Italian craftsmanship, blending creativity with functionality. The brand transforms accessories into wearable works of art.",
    images: ["https://qfeevhgjgwkyfdxulziz.supabase.co/storage/v1/object/public/brands/BENEDETTA%20BRUZZICHES/benedetta%20bruzziches1.png", "https://qfeevhgjgwkyfdxulziz.supabase.co/storage/v1/object/public/brands/BENEDETTA%20BRUZZICHES/benedetta%20bruzziches2.png"]
  },
  {
    name: "CAREL PARIS",
    description: "Established in 1952, Carel Paris epitomizes French sophistication with its chic, timeless footwear. Known for impeccable craftsmanship and elegance, the brand has become a favorite for generations. Carel's designs continue to embody Parisian charm and refinement.",
    images: ["https://qfeevhgjgwkyfdxulziz.supabase.co/storage/v1/object/public/brands/CAREL%20PARIS/carel.png", "https://qfeevhgjgwkyfdxulziz.supabase.co/storage/v1/object/public/brands/CAREL%20PARIS/carel2.png"]
  },
  {
    name: "FEAR OF GOD",
    description: "Established in 2013, Fear of God has quickly become a defining voice in luxury streetwear. Known for its impeccable craftsmanship and innovative designs, the brand seamlessly blends athletic influences with sophisticated tailoring.",
    images: ["https://qfeevhgjgwkyfdxulziz.supabase.co/storage/v1/object/public/brands/FEAR%20OF%20GOD/FEAR%20OF%20GOD1.png", "https://qfeevhgjgwkyfdxulziz.supabase.co/storage/v1/object/public/brands/FEAR%20OF%20GOD/FEAR%20OF%20GOD2.png"]
  },
  {
    name: "MUGLER",
    description: "Since 1974, Mugler has been at the forefront of avant-garde fashion. The brand is renowned for its architectural designs and futuristic aesthetics, creating pieces that empower and transform.",
    images: ["https://qfeevhgjgwkyfdxulziz.supabase.co/storage/v1/object/public/brands/MUGLER/MUGLER1.png", "https://qfeevhgjgwkyfdxulziz.supabase.co/storage/v1/object/public/brands/MUGLER/MUGLER2.png"]
  },
  {
    name: "SOPHIA WEBSTER",
    description: "Launched in 2012, Sophia Webster brings whimsy and innovation to luxury footwear. Each design is a masterpiece of creativity, combining playful elements with sophisticated craftsmanship.",
    images: ["https://qfeevhgjgwkyfdxulziz.supabase.co/storage/v1/object/public/brands/SOPHIA%20WEBSTER/Sophia%20Webster1.png", "https://qfeevhgjgwkyfdxulziz.supabase.co/storage/v1/object/public/brands/SOPHIA%20WEBSTER/Sophia%20Webster2.png"]
  },
  {
    name: "ASPESI",
    description: "ASPESI is an Italian clothing brand that is minimalist, sophisticated, and timeless. Founded in 1969 by Alberto Aspesi as a shirt manufacturer, over the years it has become a reference point for ready-to-wear for men and women.",
    images: ["https://qfeevhgjgwkyfdxulziz.supabase.co/storage/v1/object/public/brands/ASPESI/ASPESI.png", "https://qfeevhgjgwkyfdxulziz.supabase.co/storage/v1/object/public/brands/ASPESI/aspesi2.png"],
    website: "https://aspesi.com/"
  },
  {
    name: "CASADEI",
    description: "Since 1958, Casadei has been crafting iconic Italian footwear known for its bold designs and impeccable craftsmanship. The family-owned brand combines traditional shoemaking techniques with innovative design, creating distinctive silhouettes that have become synonymous with Italian luxury. Casadei continues to push boundaries with its architectural heels and luxurious materials.",
    images: ["https://qfeevhgjgwkyfdxulziz.supabase.co/storage/v1/object/public/brands/CASADEI/casadei.png", "https://qfeevhgjgwkyfdxulziz.supabase.co/storage/v1/object/public/brands/CASADEI/casadei2.png"]
  },
  {
    name: "DODO",
    description: "DoDo is a pioneering Italian luxury jewelry brand, redefining personalization since 1994. As the first high-end brand to introduce composable jewelry to a broad, unisex audience, DoDo blends playful aesthetics with meaningful expression. Each piece is crafted from sustainably sourced precious metals and stones, combining expert artisanal craftsmanship with the creativity of Italian design. Celebrate individuality with DoDo's unique, customizable collections.",
    images: ["https://qfeevhgjgwkyfdxulziz.supabase.co/storage/v1/object/public/brands/Dodo/DOdo1.png", "https://qfeevhgjgwkyfdxulziz.supabase.co/storage/v1/object/public/brands/Dodo/Dodo2.png"],
    website: "https://www.dodo.it/"
  },
  {
    name: "ICEBERG",
    description: "Founded in 1974, Iceberg has been a pioneer in blurring the lines between fashion and art. With bold designs and a distinct pop culture influence, the brand redefines luxury streetwear. Iceberg continues to inspire with its playful and innovative approach.",
    images: ["https://qfeevhgjgwkyfdxulziz.supabase.co/storage/v1/object/public/brands/ICEBERG/iceberg.png", "https://qfeevhgjgwkyfdxulziz.supabase.co/storage/v1/object/public/brands/ICEBERG/iceberg2.png"],
    website: "https://www.iceberg.com/"
  },
  {
    name: "PHILIPP PLEIN",
    description: "PHILIPP PLEIN embodies \"haute couture with a glamorous gothic touch,\" as defined by the designer. Bold, unconventional, and trend-focused, the brand blends fashion, design, and architecture. Its global presence is amplified by strong ties with celebrities and influencers, driving international recognition.",
    images: ["https://qfeevhgjgwkyfdxulziz.supabase.co/storage/v1/object/public/brands/PHILIPP%20PLEIN/PHILIPP%20PLEIN.png", "https://qfeevhgjgwkyfdxulziz.supabase.co/storage/v1/object/public/brands/PHILIPP%20PLEIN/PHILIPP%20PLEIN2.png"],
    website: "https://www.plein.com/"
  },
  {
    name: "THE ANTIPODE",
    description: "Founded in 2015, The Antipode challenges conventional luxury with its bold and unconventional approach. Rooted in creativity and modernity, the brand crafts designs that defy the ordinary. It's a celebration of innovation for those who embrace the unexpected.",
    images: ["https://qfeevhgjgwkyfdxulziz.supabase.co/storage/v1/object/public/brands/THE%20ANTIPODE/Antipode.png", "https://qfeevhgjgwkyfdxulziz.supabase.co/storage/v1/object/public/brands/THE%20ANTIPODE/antipode2.png"],
    website: "https://www.the-antipode.com/"
  },
  {
    name: "VISIONNAIRE",
    description: "Founded in Bologna in 1959, Visionnaire is a meta-luxury brand redefining Made in Italy interior design. Renowned for its bespoke creations, the brand blends art, design, and craftsmanship to deliver exclusive, tailor-made environments. With a focus on innovation and sustainability, Visionnaire collaborates with top artisans and designers, crafting interiors that embody elegance, uniqueness, and timeless luxury.",
    images: ["https://qfeevhgjgwkyfdxulziz.supabase.co/storage/v1/object/public/brands/Visionnaire/Visionnaire%20.png", "https://qfeevhgjgwkyfdxulziz.supabase.co/storage/v1/object/public/brands/Visionnaire/Visionnaire%202.png"],
    website: "https://www.visionnaire-home.com/"
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
export const convertImageToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};
