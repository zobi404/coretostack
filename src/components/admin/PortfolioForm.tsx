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

// Add your Cloudinary configuration here
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || 'dfda4qsko';
const CLOUDINARY_UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET || 'coretostack';

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

  // Function to upload single image to Cloudinary
  async function uploadToCloudinary(file: File): Promise<string | null> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    formData.append('folder', 'portfolio'); // Optional: organize uploads in folders

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      return null;
    }
  }

  // Function to upload multiple images to Cloudinary
  async function uploadMultipleImages(files: FileList): Promise<string[]> {
    const uploadPromises = Array.from(files).map(file => uploadToCloudinary(file));
    const results = await Promise.allSettled(uploadPromises);
    
    const successfulUploads = results
      .filter((result): result is PromiseFulfilledResult<string> => 
        result.status === 'fulfilled' && result.value !== null
      )
      .map(result => result.value);

    const failedUploads = results.filter(result => result.status === 'rejected').length;
    
    if (failedUploads > 0) {
      toast({
        variant: "destructive",
        title: "Some uploads failed",
        description: `${failedUploads} out of ${files.length} images failed to upload.`,
      });
    }

    return successfulUploads;
  }

  async function onSubmit(data: PortfolioFormValues) {
    let finalBannerUrl = project?.bannerImageUrl;
    let finalCarouselUrls = project?.carouselImageUrls || [];

    const bannerFile = data.bannerImageUrl?.[0];
    const carouselFiles = data.carouselImageUrls;

    try {
      // Upload banner image if provided
      if (bannerFile && bannerFile.size > 0) {
        toast({
          title: "Uploading banner image...",
          description: "Please wait while we upload your banner image.",
        });

        const uploadedBannerUrl = await uploadToCloudinary(bannerFile);
        if (uploadedBannerUrl) {
          finalBannerUrl = uploadedBannerUrl;
        } else {
          toast({
            variant: "destructive",
            title: "Banner Upload Failed",
            description: "Could not upload banner image. Please try again.",
          });
          return;
        }
      }

      // Upload carousel images if provided
      if (carouselFiles && carouselFiles.length > 0) {
        toast({
          title: "Uploading carousel images...",
          description: "Please wait while we upload your carousel images.",
        });

        const uploadedCarouselUrls = await uploadMultipleImages(carouselFiles);
        if (uploadedCarouselUrls.length > 0) {
          // If editing, add new images to existing ones
          finalCarouselUrls = project 
            ? [...finalCarouselUrls, ...uploadedCarouselUrls] 
            : uploadedCarouselUrls;
        } else {
          toast({
            variant: "destructive",
            title: "Carousel Upload Failed",
            description: "Could not upload carousel images. Please try again.",
          });
          return;
        }
      }

      // Check if banner image is required for new projects
      if (!project && !finalBannerUrl) {
        toast({
          variant: "destructive",
          title: "Banner Image Required",
          description: "Please upload a banner image before submitting.",
        });
        return;
      }

      // Prepare project data
      const projectData = { 
          ...data, 
          projectUrl: data.projectUrl || '',
          bannerImageUrl: finalBannerUrl, 
          carouselImageUrls: finalCarouselUrls,
      };

      // Save to Firebase
      toast({
        title: "Saving project...",
        description: "Please wait while we save your project.",
      });

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