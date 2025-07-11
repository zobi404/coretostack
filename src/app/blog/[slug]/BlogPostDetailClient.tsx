
"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getPost } from '@/lib/services/blog-service';
import type { Post } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import BlogPostClient from '@/components/blog/BlogPostClient';
import { Skeleton } from '@/components/ui/skeleton';

export default function BlogPostDetailClient({ slug }: { slug: string }) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      const fetchPost = async () => {
        try {
          const fetchedPost = await getPost(slug);
          setPost(fetchedPost);
        } catch (error) {
          console.error("Failed to load blog post:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchPost();
    }
  }, [slug]);

  if (loading) {
    return <BlogPostSkeleton />;
  }

  if (!post) {
    return (
        <div className="container max-w-4xl mx-auto px-4 py-12 text-center">
             <h1 className="font-headline text-4xl font-bold">Post Not Found</h1>
             <p className="text-muted-foreground mt-4">The post you are looking for does not exist.</p>
        </div>
    );
  }

  return (
    <article className="container max-w-4xl mx-auto px-4 py-12">
      <header className="mb-8">
        <div className="mb-4">
          {post.tags.map(tag => <Badge key={tag} variant="outline" className="mr-2">{tag}</Badge>)}
        </div>
        <h1 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tight mb-4">{post.title}</h1>
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={post.authorImage} alt={post.author} />
              <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
            </Avatar>
            <span>{post.author}</span>
          </div>
          <span>•</span>
          <time dateTime={post.date}>{new Date(post.date).toLocaleDateString()}</time>
        </div>
      </header>
      
      <div className="relative aspect-video w-full overflow-hidden rounded-lg mb-8">
        <Image 
            src={post.imageUrl} 
            alt={post.title} 
            fill 
            data-ai-hint={post.imageHint}
            className="object-cover" 
            priority
        />
      </div>

      <BlogPostClient postId={post.id} content={post.content} />

    </article>
  );
}


function BlogPostSkeleton() {
    return (
        <article className="container max-w-4xl mx-auto px-4 py-12">
            <header className="mb-8 space-y-4">
                 <div className="flex gap-2">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-24" />
                 </div>
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-10 w-3/4" />
                <div className="flex items-center space-x-4">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-5 w-24" />
                </div>
            </header>
            
            <Skeleton className="aspect-video w-full rounded-lg mb-8" />
            
            <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-full" />
            </div>
        </article>
    );
}
