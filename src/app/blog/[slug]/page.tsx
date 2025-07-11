
import { notFound } from 'next/navigation';
import { getPosts } from '@/lib/services/blog-service';
import BlogPostDetailClient from './BlogPostDetailClient';

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const posts = await getPosts();
    return posts.map(post => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error("Failed to generate static params for blog posts:", error);
    return [];
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  if (!params.slug) {
    notFound();
  }

  return <BlogPostDetailClient slug={params.slug} />;
}
