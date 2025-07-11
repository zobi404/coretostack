
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
import { Textarea } from "../ui/textarea"

const portfolioFormSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters.").max(100, "Title must not be longer than 100 characters."),
  category: z.string({ required_error: "Please select a category." }),
  projectUrl: z.string().url("Please enter a valid URL.").optional().or(z.literal('')),
  description: z.string().min(10, "Description must be at least 10 characters long."),
  bannerImageUrl: z.any().optional(),
  bannerImageHint: z.string().optional(),
  carouselImageUrls: z.any().optional(),
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
    projectUrl: project?.projectUrl || "",
    description: project?.description || "",
    bannerImageHint: project?.bannerImageHint || "",
  }
  
  const form = useForm<PortfolioFormValues>({
    resolver: zodResolver(portfolioFormSchema),
    defaultValues,
    mode: "onChange",
  })
  
  const bannerImageRef = form.register("bannerImageUrl");
  const carouselImagesRef = form.register("carouselImageUrls");

  async function uploadImagesViaApi(imageFiles: FileList): Promise<{ urls: string[] } | null> {
    const formData = new FormData();
    Array.from(imageFiles).forEach(file => {
      formData.append("images", file);
    });

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
      const errorMessage = error instanceof Error ? error.message : "Could not upload images.";
      toast({
        variant: "destructive",
        title: "Image Upload Failed",
        description: errorMessage,
      });
      return null;
    }
  }

  async function onSubmit(data: PortfolioFormValues) {
    let finalBannerUrl = project?.bannerImageUrl;
    let finalCarouselUrls = project?.carouselImageUrls || [];

    const bannerFile = data.bannerImageUrl?.[0];
    const carouselFiles = data.carouselImageUrls;

    try {
      if (bannerFile && bannerFile.size > 0) {
        const uploadResult = await uploadImagesViaApi(data.bannerImageUrl);
        if (uploadResult?.urls?.[0]) {
          finalBannerUrl = uploadResult.urls[0];
        } else {
          return; // Stop form submission if image upload fails
        }
      }

      if (carouselFiles && carouselFiles.length > 0) {
        const uploadResult = await uploadImagesViaApi(carouselFiles);
        if (uploadResult?.urls) {
          // If editing, add new images to existing ones.
          finalCarouselUrls = project ? [...finalCarouselUrls, ...uploadResult.urls] : uploadResult.urls;
        } else {
            return;
        }
      }

      if (!project && !finalBannerUrl) {
        toast({
          variant: "destructive",
          title: "Banner Image Required",
          description: "Please upload a banner image before submitting.",
        });
        return;
      }

      const projectData = { 
          ...data, 
          projectUrl: data.projectUrl || '',
          bannerImageUrl: finalBannerUrl, 
          carouselImageUrls: finalCarouselUrls,
      };

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
            <div className="grid md:grid-cols-2 gap-8">
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
                    name="projectUrl"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Project URL (Optional)</FormLabel>
                        <FormControl>
                            <Input placeholder="https://example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
            </div>
             <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                        <Textarea placeholder="Describe the project..." className="min-h-[120px]" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
             <div className="grid md:grid-cols-2 gap-8">
                <FormField
                control={form.control}
                name="bannerImageUrl"
                render={() => (
                    <FormItem>
                    <FormLabel>Banner Image</FormLabel>
                    <FormControl>
                        <Input type="file" accept="image/*" {...bannerImageRef} />
                    </FormControl>
                    <FormDescription>The main image for the portfolio grid.</FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="bannerImageHint"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Banner Image AI Hint</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g. corporate office" {...field} />
                    </FormControl>
                     <FormDescription>Keywords for AI image suggestions.</FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
            <FormField
              control={form.control}
              name="carouselImageUrls"
              render={() => (
                <FormItem>
                  <FormLabel>Carousel Images (Optional)</FormLabel>
                  <FormControl>
                    <Input type="file" accept="image/*" multiple {...carouselImagesRef} />
                  </FormControl>
                  <FormDescription>Upload multiple images for the project detail page.</FormDescription>
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
