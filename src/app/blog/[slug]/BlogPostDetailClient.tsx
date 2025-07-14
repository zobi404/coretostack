"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { getPost } from '@/lib/services/blog-service';
import type { Post } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import BlogPostClient from '@/components/blog/BlogPostClient';
import { Skeleton } from '@/components/ui/skeleton';

export default function BlogPostDetailClient({ slug }: { slug: string }) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (slug) {
      const fetchPost = async () => {
        try {
          setError(null);
          const fetchedPost = await getPost(slug);
          setPost(fetchedPost);
        } catch (error) {
          console.error("Failed to load blog post:", error);
          setError("Failed to load blog post. Please try again.");
        } finally {
          setLoading(false);
        }
      };
      fetchPost();
    }
  }, [slug]);

  const handleGoBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/blog');
    }
  };

  if (loading) {
    return <BlogPostSkeleton />;
  }

  if (error) {
    return (
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <Button 
          variant="ghost" 
          onClick={handleGoBack}
          className="mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div className="text-center">
          <h1 className="font-headline text-4xl font-bold mb-4">Error Loading Post</h1>
          <p className="text-muted-foreground mb-6">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <Button 
          variant="ghost" 
          onClick={handleGoBack}
          className="mb-8 hover:bg-muted hover:text-white"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div className="text-center">
          <h1 className="font-headline text-4xl font-bold">Post Not Found</h1>
          <p className="text-muted-foreground mt-4">The post you are looking for does not exist.</p>
        </div>
      </div>
    );
  }

  return (
    <article className="container max-w-4xl mx-auto px-4 py-12">
      <Button 
        variant="ghost" 
        onClick={handleGoBack}
        className="mb-8 transition-colors border-2 border-primary hover:bg-primary hover:text-black"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Blog
      </Button>

      <header className="mb-8">
        <div className="mb-4">
          {post.tags?.map(tag => (
            <Badge key={tag} variant="outline" className="mr-2">
              {tag}
            </Badge>
          ))}
        </div>
        <h1 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          {post.title}
        </h1>
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage 
                src={post.authorImage} 
                alt={post.author}
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  img.style.display = 'none';
                }}
              />
              <AvatarFallback>
                {post.author?.charAt(0)?.toUpperCase() || 'A'}
              </AvatarFallback>
            </Avatar>
            <span>{post.author}</span>
          </div>
          <span>•</span>
          <time dateTime={post.date}>
            {post.date ? new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }) : 'No date'}
          </time>
        </div>
      </header>
      
      <div className="relative aspect-video w-full overflow-hidden rounded-lg mb-8">
        {post.imageUrl ? (
          <Image 
            src={post.imageUrl} 
            alt={post.title} 
            fill 
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover" 
            priority
            onError={(e) => {
              const img = e.target as HTMLImageElement;
              img.src = '/images/placeholder-blog.jpg'; // Fallback image
            }}
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <span className="text-muted-foreground">No image available</span>
          </div>
        )}
      </div>

      <BlogPostClient postId={post.id} content={post.content} />

    </article>
  );
}

function BlogPostSkeleton() {
  return (
    <article className="container max-w-4xl mx-auto px-4 py-12">
      <Skeleton className="h-10 w-32 mb-8" />
      
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
          <Skeleton className="h-5 w-2" />
          <Skeleton className="h-5 w-32" />
        </div>
      </header>
      
      <Skeleton className="aspect-video w-full rounded-lg mb-8" />
      
      <div className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </article>
  );
}