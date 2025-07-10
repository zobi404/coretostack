import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { mockPosts } from "@/lib/mock-data";

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <section className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4">PixelGlint Blog</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Insights, tutorials, and stories from the world of design and development.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockPosts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
            <Card className="h-full flex flex-col transition-shadow hover:shadow-xl">
              <CardHeader>
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    data-ai-hint={post.imageHint}
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="mb-2">
                  {post.tags.map(tag => <Badge key={tag} variant="secondary" className="mr-2">{tag}</Badge>)}
                </div>
                <CardTitle className="font-headline text-2xl leading-tight mb-2">{post.title}</CardTitle>
                <CardDescription>{post.excerpt}</CardDescription>
              </CardContent>
              <CardFooter>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={post.authorImage} alt={post.author} />
                    <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold">{post.author}</p>
                    <p className="text-xs text-muted-foreground">{post.date}</p>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </section>
    </div>
  );
}
