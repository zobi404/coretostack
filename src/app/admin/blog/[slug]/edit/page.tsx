import { BlogForm } from '@/components/admin/BlogForm';
import { getPostById } from "@/lib/services/blog-service";
import { notFound } from 'next/navigation';

export default async function EditBlogPostPage({ params }: { params: { slug: string } }) {
  // Use slug as the ID for fetching
  const post = await getPostById(params.slug);

  if (!post) {
    return notFound();
  }

  // Convert tags array back to a comma-separated string for the form
  const postForForm = { ...post, tags: post.tags.join(', ') };

  return (
    <div>
      <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight font-headline">Edit Post</h1>
          <p className="text-muted-foreground">Make changes to your existing blog post.</p>
      </div>
      <BlogForm post={postForForm} />
    </div>
  );
}
