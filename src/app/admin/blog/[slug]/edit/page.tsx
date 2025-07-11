
"use client";

import { useEffect, useState } from 'react';
import { BlogForm } from '@/components/admin/BlogForm';
import { getPostById } from "@/lib/services/blog-service";
import type { Post } from '@/lib/types';

export default function EditBlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        // The slug is actually the document ID here
        const postData = await getPostById(slug);
        if (postData) {
          setPost(postData);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error("Failed to fetch post:", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (notFound) {
    return <div>Post not found.</div>;
  }

  if (!post) {
     return null;
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
