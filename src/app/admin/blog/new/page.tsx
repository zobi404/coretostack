import { BlogForm } from '@/components/admin/BlogForm';

export default function NewBlogPostPage() {
  return (
    <div>
      <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight font-headline">Create New Post</h1>
          <p className="text-muted-foreground">Fill in the details below to add a new blog post.</p>
      </div>
      <BlogForm />
    </div>
  );
}
