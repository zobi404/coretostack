import { BlogList } from "@/components/blog/BlogList";

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <section className="text-center mb-16 md:mb-24">
        <h1 className="font-headline text-4xl md:text-6xl font-bold mb-4">CoreToStack Blog</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Insights, tutorials, and stories from the world of design and development.
        </p>
      </section>
      <BlogList />
    </div>
  );
}
