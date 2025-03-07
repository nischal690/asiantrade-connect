interface HomepageContent {
  heroTitle: string;
  heroSubtitle: string;
  videoUrl: string;
  storyTitle: string;
  storyDescription: string;
}

interface ApiResponse {
  success: boolean;
  error?: string;
  data?: HomepageContent;
}

// In a real application, this would be fetched from a backend
const defaultContent: HomepageContent = {
  heroTitle: "Bridging Luxury Across Asia",
  heroSubtitle: "Since 1954, we've been crafting connections between prestigious global brands and discerning Asian markets.",
  videoUrl: "https://firebasestorage.googleapis.com/v0/b/xflowapp-fc4b6.appspot.com/o/Signing%20the%20CONTRACT%20Boonlapo%20and%20coya%20master%207NOV%20(1).mp4?alt=media&token=272bd224-6cd1-4147-9238-7a6e065b81cd",
  storyTitle: "Discover Our Story",
  storyDescription: "Experience how we're revolutionizing Asian trade connections through innovative solutions and strategic partnerships."
};

// Simulated local storage key
const STORAGE_KEY = 'homepage_content';

export async function getHomepageContent(): Promise<ApiResponse> {
  try {
    // In a real application, this would be an API call
    const storedContent = localStorage.getItem(STORAGE_KEY);
    const content = storedContent ? JSON.parse(storedContent) : defaultContent;
    
    return {
      success: true,
      data: content
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch homepage content'
    };
  }
}

export async function updateHomepageContent(content: HomepageContent): Promise<ApiResponse> {
  try {
    // In a real application, this would be an API call
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    
    return {
      success: true,
      data: content
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update homepage content'
    };
  }
}
