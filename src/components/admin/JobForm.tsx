"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent } from "@/components/ui/card"
import type { JobOpening } from "@/lib/types"
import { addJobOpening, updateJobOpening } from "@/lib/services/job-service"
import { useRouter } from "next/navigation"

const jobFormSchema = z.object({
  title: z.string().min(2, "Title is required."),
  location: z.string().min(2, "Location is required."),
  type: z.enum(['Full-time', 'Part-time', 'Contract', 'Internship'], {
    required_error: "You need to select a job type.",
  }),
  description: z.string().min(20, "Description must be at least 20 characters."),
})

type JobFormValues = z.infer<typeof jobFormSchema>

interface JobFormProps {
  job?: JobOpening;
}

export function JobForm({ job }: JobFormProps) {
  const { toast } = useToast()
  const router = useRouter()
  
  const defaultValues: Partial<JobFormValues> = {
    title: job?.title || "",
    location: job?.location || "",
    type: job?.type || undefined,
    description: job?.description || "",
  }
  
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues,
    mode: "onChange",
  })

  async function onSubmit(data: JobFormValues) {
    try {
        if (job) {
            await updateJobOpening(job.id, data);
            toast({
                title: "Job Opening Updated!",
                description: "The job posting has been successfully updated.",
            });
        } else {
            await addJobOpening(data);
            toast({
                title: "Job Opening Created!",
                description: "Your new job posting has been saved.",
            });
        }
        router.push('/admin/careers');
        router.refresh();
    } catch (error) {
        console.error("Failed to save job opening:", error);
        toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to save the job opening. Please try again.",
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
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Senior Frontend Developer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid md:grid-cols-2 gap-8">
               <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Remote" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a job type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Full-time">Full-time</SelectItem>
                          <SelectItem value="Part-time">Part-time</SelectItem>
                          <SelectItem value="Contract">Contract</SelectItem>
                          <SelectItem value="Internship">Internship</SelectItem>
                        </SelectContent>
                      </Select>
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
                    <Textarea
                      placeholder="Describe the role, responsibilities, and requirements..."
                      className="min-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Saving..." : (job ? 'Update Job' : 'Create Job')}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
