
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent } from "@/components/ui/card"
import type { Post } from "@/lib/types"
import { addPost, updatePost } from "@/lib/services/blog-service"
import { useRouter } from "next/navigation"

const blogFormSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters.").max(100, "Title must not be longer than 100 characters."),
  author: z.string().min(2, "Author name is required."),
  tags: z.string().min(2, "Please add at least one tag."),
  content: z.string().min(100, "Content must be at least 100 characters long."),
  excerpt: z.string().min(10, "Excerpt is required.").max(200, "Excerpt too long."),
  imageUrl: z.any().optional(),
  imageHint: z.string().optional(),
  authorImage: z.any().optional(),
})

type BlogFormValues = z.infer<typeof blogFormSchema>

interface BlogFormProps {
  post?: Post & { tags: string }; // Allow post to be optional for creation
}

export function BlogForm({ post }: BlogFormProps) {
  const { toast } = useToast()
  const router = useRouter()
  
  const defaultValues: Partial<BlogFormValues> = {
    title: post?.title || "",
    author: post?.author || "",
    tags: post?.tags || "",
    content: post?.content || "",
    excerpt: post?.excerpt || "",
    imageHint: post?.imageHint || "",
  }
  
  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogFormSchema),
    defaultValues,
    mode: "onChange",
  })

  const imageUrlRef = form.register("imageUrl");
  const authorImageRef = form.register("authorImage");

  async function uploadImageViaApi(imageFile: File): Promise<{ secure_url: string } | null> {
      const formData = new FormData();
      formData.append('image', imageFile);

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
           const errorData = await response.json();
           throw new Error(errorData.error || 'Failed to upload image.');
        }

        return await response.json();
      } catch (error) {
        console.error("API Upload Error:", error);
        const errorMessage = error instanceof Error ? error.message : "Could not upload image via API.";
        toast({
          variant: "destructive",
          title: "Image Upload Failed",
          description: errorMessage,
        });
        return null;
      }
  }


  async function onSubmit(data: BlogFormValues) {
    let finalImageUrl = post?.imageUrl;
    let finalAuthorImageUrl = post?.authorImage;

    const postImageFile = data.imageUrl?.[0];
    const authorImageFile = data.authorImage?.[0];

    try {
        if (postImageFile && postImageFile.size > 0) {
          const postImageRes = await uploadImageViaApi(postImageFile);
          if (postImageRes) {
            finalImageUrl = postImageRes.secure_url;
          } else {
             return; // Stop submission if upload fails
          }
        }

        if (authorImageFile && authorImageFile.size > 0) {
          const authorAvatarRes = await uploadImageViaApi(authorImageFile);
          if (authorAvatarRes) {
            finalAuthorImageUrl = authorAvatarRes.secure_url;
          } else {
             return; // Stop submission if upload fails
          }
        }

        if (!post && (!finalImageUrl || !finalAuthorImageUrl)) {
          toast({
            variant: "destructive",
            title: "Image Error",
            description: "A post image and author image are required for new posts.",
          });
          return;
        }

        const postData = {
          ...data,
          imageUrl: finalImageUrl,
          authorImage: finalAuthorImageUrl,
          tags: data.tags.split(',').map(tag => tag.trim()),
          date: post?.date || new Date().toISOString().split('T')[0], // Keep original date or set new one
        };


        if (post) {
            await updatePost(post.id, postData);
            toast({
                title: "Blog Post Updated!",
                description: "Your blog post has been successfully updated.",
            });
        } else {
            await addPost(postData);
            toast({
                title: "Blog Post Submitted!",
                description: "Your new blog post has been saved.",
            });
        }
        router.push('/admin/blog');
        router.refresh(); // re-fetch server-side data
    } catch (error) {
        console.error("Failed to save post:", error);
        toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to save the blog post. Please try again.",
        });
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="The Art of Minimalist Design" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid md:grid-cols-2 gap-8">
               <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author</FormLabel>
                    <FormControl>
                      <Input placeholder="John Smith" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="authorImage"
                render={() => (
                  <FormItem>
                    <FormLabel>Author Image</FormLabel>
                    <FormControl>
                      <Input 
                        type="file"
                        accept="image/*"
                        {...authorImageRef}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <Input placeholder="UI/UX, Design" {...field} />
                  </FormControl>
                  <FormDescription>
                    Separate tags with commas.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid md:grid-cols-2 gap-8">
                <FormField
                control={form.control}
                name="imageUrl"
                render={() => (
                    <FormItem>
                    <FormLabel>Post Image</FormLabel>
                    <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          {...imageUrlRef}
                        />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="imageHint"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Image AI Hint</FormLabel>
                    <FormControl>
                        <Input placeholder="minimalist workspace" {...field} />
                    </FormControl>
                    <FormDescription>
                        One or two keywords for AI image generation.
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
             <FormField
              control={form.control}
              name="excerpt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Excerpt</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="A short summary of the post..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your blog post here... HTML is supported."
                      className="min-h-[300px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Saving..." : (post ? 'Update Post' : 'Create Post')}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
