import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import CommentSection from '@/components/blog/CommentSection';
import { mockPosts, mockComments } from '@/lib/mock-data';

// This function would fetch data from a CMS in a real app
async function getPost(slug: string) {
  return mockPosts.find(post => post.slug === slug);
}

export async function generateStaticParams() {
  return mockPosts.map(post => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
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
          <time dateTime={post.date}>{post.date}</time>
        </div>
      </header>
      
      <div className="relative aspect-video w-full overflow-hidden rounded-lg mb-8">
        <Image 
            src={post.imageUrl} 
            alt={post.title} 
            fill 
            data-ai-hint={post.imageHint}
            className="object-cover" 
        />
      </div>

      <div 
        className="prose dark:prose-invert max-w-none text-foreground prose-p:text-muted-foreground prose-headings:text-foreground prose-strong:text-foreground"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <CommentSection initialComments={mockComments} postId={post.slug} />
    </article>
  );
}
