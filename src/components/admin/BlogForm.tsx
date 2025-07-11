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

const blogFormSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters.").max(100, "Title must not be longer than 100 characters."),
  author: z.string().min(2, "Author name is required."),
  tags: z.string().min(2, "Please add at least one tag."),
  content: z.string().min(100, "Content must be at least 100 characters long."),
})

type BlogFormValues = z.infer<typeof blogFormSchema>

interface BlogFormProps {
  post?: Partial<Post> & { tags: string }; // Allow post to be optional for creation
}

export function BlogForm({ post }: BlogFormProps) {
  const { toast } = useToast()
  
  const defaultValues: Partial<BlogFormValues> = {
    title: post?.title || "",
    author: post?.author || "",
    tags: post?.tags || "",
    content: post?.content || "",
  }
  
  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogFormSchema),
    defaultValues,
    mode: "onChange",
  })

  function onSubmit(data: BlogFormValues) {
    toast({
      title: `Blog Post ${post ? 'Updated' : 'Submitted'}!`,
      description: `Your blog post has been ${post ? 'updated' : 'saved'}.`,
    })
    console.log(data)
    // Here you would typically call an API to save the data
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
            </div>
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your blog post here... Markdown is supported."
                      className="min-h-[200px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">{post ? 'Update Post' : 'Create Post'}</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
