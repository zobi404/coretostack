"use client";

import dynamic from 'next/dynamic';
import type { Post, Comment } from '@/lib/types';

const CommentSection = dynamic(() => import('@/components/blog/CommentSection'), { 
  ssr: false,
  loading: () => <p>Loading comments...</p> 
});

interface BlogPostClientProps {
  post: Post;
  initialComments: Comment[];
}

export default function BlogPostClient({ post, initialComments }: BlogPostClientProps) {
  return (
    <>
      <div 
        className="prose dark:prose-invert max-w-none text-foreground prose-p:text-muted-foreground prose-headings:text-foreground prose-strong:text-foreground"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      <CommentSection initialComments={initialComments} postId={post.id} />
    </>
  );
}
