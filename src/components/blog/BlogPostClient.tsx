"use client";

import dynamic from 'next/dynamic';

// Use dynamic import for the comment section to avoid SSR
const CommentSection = dynamic(() => import('@/components/blog/CommentSection'), { 
  ssr: false,
  loading: () => <div className="mt-12">Loading comments...</div> 
});

interface BlogPostClientProps {
  content: string;
  postId: string;
}

export default function BlogPostClient({ content, postId }: BlogPostClientProps) {
  return (
    <>
      <div 
        className="prose dark:prose-invert max-w-none text-foreground prose-p:text-muted-foreground prose-headings:text-foreground prose-strong:text-foreground"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <CommentSection postId={postId} />
    </>
  );
}
