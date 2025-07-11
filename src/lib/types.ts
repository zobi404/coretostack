export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  authorImage: string;
  date: string;
  imageUrl: string;
  imageHint: string;
  content: string;
  tags: string[];
}

export interface Comment {
  id: string;
  postId: string;
  author: string;
  authorImage: string;
  text: string;
  createdAt: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  projectUrl?: string;
  bannerImageUrl: string;
  bannerImageHint: string;
  carouselImageUrls: string[];
  description: string;
}

export interface PricingPlan {
  id: string;
  title: string;
  price: string;
  description: string;
  features: string; // Comma-separated
  recommended: boolean;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}
