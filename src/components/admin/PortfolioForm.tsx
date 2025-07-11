
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
    formData.append("image", imageFile);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || "Upload failed");
      }

      return result;
    } catch (error) {
      console.error("Image Upload Error:", error);
      const errorMessage = error instanceof Error ? error.message : "Could not upload image.";
      toast({
        variant: "destructive",
        title: "Image Upload Failed",
        description: errorMessage,
      });
      return null;
    }
  }

  async function onSubmit(data: PortfolioFormValues) {
    let finalImageUrl = project?.imageUrl;
    const imageFile = data.imageUrl?.[0];

    try {
      if (imageFile && imageFile.size > 0) {
        const uploadResult = await uploadImageViaApi(imageFile);
        if (uploadResult) {
          finalImageUrl = uploadResult.secure_url;
        } else {
          return; // Stop form submission if image upload fails
        }
      }

      if (!project && !finalImageUrl) {
        toast({
          variant: "destructive",
          title: "Image Required",
          description: "Please upload an image before submitting.",
        });
        return;
      }

      const projectData = { ...data, imageUrl: finalImageUrl };

      if (project) {
        await updatePortfolioItem(project.id, projectData);
        toast({
          title: "Project Updated",
          description: "The project has been updated successfully.",
        });
      } else {
        await addPortfolioItem(projectData);
        toast({
          title: "Project Added",
          description: "The project has been added to your portfolio.",
        });
      }

      router.push("/admin/portfolio");
      router.refresh();
    } catch (error) {
      console.error("Error saving project:", error);
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: "An error occurred while saving the project.",
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
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
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
                    <Input type="file" accept="image/*" {...imageUrlRef} />
                  </FormControl>
                  <FormDescription>Upload a project image.</FormDescription>
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
                    <Input placeholder="e.g. corporate office" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting
                ? "Saving..."
                : project
                ? "Update Project"
                : "Add Project"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
