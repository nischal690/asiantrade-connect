interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  content: string;
  image: string;
  rating: number;
}

interface ApiResponse {
  success: boolean;
  error?: string;
  data?: Testimonial[];
}

// Default testimonials data
const defaultTestimonials: Testimonial[] = [
  {
    id: "1",
    name: "Paola Faccioli",
    position: "CEO",
    company: "Cova",
    content: "AsianTrade Connect has been instrumental in our successful expansion into the Southeast Asian market. Their deep understanding of local consumer preferences and regulatory landscapes saved us countless hours and resources. Within just six months of partnership, our brand awareness increased by 45% in Thailand and Singapore.",
    image: "/testimonals/Cova Ceo - Paola Faccioli.png",
    rating: 5
  },
  {
    id: "2",
    name: "Philipp Plein",
    position: "CEO",
    company: "Philipp Plein",
    content: "The team at AsianTrade Connect brings unparalleled expertise in navigating the complex Asian luxury market. Their strategic guidance helped us establish premium positioning in emerging markets while maintaining our brand integrity. Their attention to detail and commitment to excellence mirrors our own company values.",
    image: "/testimonals/Philipp Plein CEO.png",
    rating: 5
  },
  {
    id: "3",
    name: "Benedetta Bruzziches",
    position: "CEO & Designer",
    company: "Benedetta Bruzziches",
    content: "We've worked with several trade consultants before, but AsianTrade Connect truly stands out. Their tailored approach to each market entry strategy and their extensive network of retail partners gave us immediate credibility in the region. They don't just connect businesses; they build lasting relationships that drive sustainable growth.",
    image: "/testimonals/Benedetta Bruzziches - Ceo & Designer of Benedetta Bruzziches.png",
    rating: 4
  },
  {
    id: "4",
    name: "Arianna Casadei",
    position: "CEO",
    company: "Casadei",
    content: "Partnering with AsianTrade Connect transformed our approach to the Asian market. Their team's cultural insights and strategic vision helped us adapt our luxury footwear to local preferences while preserving our Italian heritage. The seamless market entry and consistent growth we've experienced are a testament to their expertise.",
    image: "/testimonals/Casadei - Arianna Casadei Ceo of Casadei.png",
    rating: 5
  }
];

// Simulated local storage key
const STORAGE_KEY = 'testimonials_data';

export async function getTestimonials(): Promise<ApiResponse> {
  try {
    // In a real application, this would be an API call
    const storedTestimonials = localStorage.getItem(STORAGE_KEY);
    const testimonials = storedTestimonials ? JSON.parse(storedTestimonials) : defaultTestimonials;
    
    return {
      success: true,
      data: testimonials
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch testimonials'
    };
  }
}

export async function updateTestimonials(testimonials: Testimonial[]): Promise<ApiResponse> {
  try {
    // In a real application, this would be an API call
    localStorage.setItem(STORAGE_KEY, JSON.stringify(testimonials));
    
    return {
      success: true,
      data: testimonials
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update testimonials'
    };
  }
}

export async function addTestimonial(testimonial: Omit<Testimonial, 'id'>): Promise<ApiResponse> {
  try {
    const storedTestimonials = localStorage.getItem(STORAGE_KEY);
    const currentTestimonials = storedTestimonials ? JSON.parse(storedTestimonials) : defaultTestimonials;
    
    const newTestimonial = {
      ...testimonial,
      id: Date.now().toString() // Simple ID generation
    };
    
    const updatedTestimonials = [...currentTestimonials, newTestimonial];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTestimonials));
    
    return {
      success: true,
      data: updatedTestimonials
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to add testimonial'
    };
  }
}

export async function deleteTestimonial(id: string): Promise<ApiResponse> {
  try {
    const storedTestimonials = localStorage.getItem(STORAGE_KEY);
    const currentTestimonials = storedTestimonials ? JSON.parse(storedTestimonials) : defaultTestimonials;
    
    const updatedTestimonials = currentTestimonials.filter(
      (testimonial: Testimonial) => testimonial.id !== id
    );
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTestimonials));
    
    return {
      success: true,
      data: updatedTestimonials
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete testimonial'
    };
  }
}
