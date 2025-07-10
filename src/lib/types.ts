export interface Post {
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
  author: string;
  authorImage: string;
  timestamp: string;
  text: string;
}
