
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent } from "@/components/ui/card"
import type { PortfolioItem } from "@/lib/types"
import { addPortfolioItem, updatePortfolioItem } from "@/lib/services/portfolio-service"
import { useRouter } from "next/navigation"

const portfolioFormSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters.").max(100, "Title must not be longer than 100 characters."),
  category: z.string({ required_error: "Please select a category." }),
  imageUrl: z.any().optional(),
  hint: z.string().optional(),
})

type PortfolioFormValues = z.infer<typeof portfolioFormSchema>

interface PortfolioFormProps {
    project?: PortfolioItem;
}

const categories = ["Web Development", "UI/UX Design", "Mobile App", "Branding"];

export function PortfolioForm({ project }: PortfolioFormProps) {
  const { toast } = useToast()
  const router = useRouter()
  
  const defaultValues: Partial<PortfolioFormValues> = {
    title: project?.title || "",
    category: project?.category || undefined,
    hint: project?.hint || "",
  }
  
  const form = useForm<PortfolioFormValues>({
    resolver: zodResolver(portfolioFormSchema),
    defaultValues,
    mode: "onChange",
  })
  
  const imageUrlRef = form.register("imageUrl");

  async function uploadImageViaApi(imageFile: File): Promise<{ secure_url: string } | null> {
      const formData = new FormData();
      formData.append('image', imageFile);

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Failed to upload image.');
        }

        return await response.json();
      } catch (error) {
        console.error("API Upload Error:", error);
        toast({
          variant: "destructive",
          title: "Image Upload Failed",
          description: "Could not upload image via API.",
        });
        return null;
      }
  }


  async function onSubmit(data: PortfolioFormValues) {
    let finalImageUrl = project?.imageUrl;
    const imageFile = data.imageUrl?.[0];

    try {

        if (imageFile && imageFile.size > 0) {
          const res = await uploadImageViaApi(imageFile);
          if (res) {
            finalImageUrl = res.secure_url;
          } else {
             return; // Stop submission if upload fails
          }
        }

        if (!project && !finalImageUrl) {
          toast({
            variant: "destructive",
            title: "Image Error",
            description: "Please upload an image for the project.",
          });
          return;
        }

        const projectData = { ...data, imageUrl: finalImageUrl };

        if (project) {
            await updatePortfolioItem(project.id, projectData);
            toast({
                title: "Project Updated!",
                description: "Your portfolio project has been updated.",
            });
        } else {
            await addPortfolioItem(projectData);
            toast({
                title: "Project Submitted!",
                description: "Your portfolio project has been saved.",
            });
        }
        router.push('/admin/portfolio');
        router.refresh();
    } catch (error) {
        console.error("Failed to save project:", error);
        toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to save the project. Please try again.",
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
                  <FormLabel>Project Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Innovate Inc. Website" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageUrl"
              render={() => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input
                     type="file"
                     accept="image/*"
                     {...imageUrlRef}
                     />
                  </FormControl>
                   <FormDescription>
                      Upload an image for the project.
                    </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="hint"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image AI Hint</FormLabel>
                  <FormControl>
                    <Input placeholder="corporate office" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Saving..." : (project ? 'Update Project' : 'Add Project')}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
