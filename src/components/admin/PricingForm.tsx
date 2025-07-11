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
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent } from "@/components/ui/card"
import type { PricingPlan } from "@/lib/types"
import { addPricingPlan, updatePricingPlan } from "@/lib/services/pricing-service"
import { useRouter } from "next/navigation"

const pricingFormSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters."),
  price: z.string().min(1, "Price is required (e.g., $99, Custom)."),
  description: z.string().min(10, "Description is required."),
  features: z.string().min(10, "Please list at least one feature."),
  recommended: z.boolean().default(false).optional(),
})

type PricingFormValues = z.infer<typeof pricingFormSchema>

interface PricingFormProps {
  plan?: PricingPlan;
}

export function PricingForm({ plan }: PricingFormProps) {
  const { toast } = useToast()
  const router = useRouter()
  
  const defaultValues: Partial<PricingFormValues> = {
    title: plan?.title || "",
    price: plan?.price || "",
    description: plan?.description || "",
    features: plan?.features || "", // Stored as a single string, split by newlines
    recommended: plan?.recommended || false,
  }

  const form = useForm<PricingFormValues>({
    resolver: zodResolver(pricingFormSchema),
    defaultValues,
    mode: "onChange",
  })

  async function onSubmit(data: PricingFormValues) {
    try {
        if (plan) {
            await updatePricingPlan(plan.id, data);
            toast({
                title: "Pricing Plan Updated!",
                description: "Your pricing plan has been updated.",
            });
        } else {
            await addPricingPlan(data);
            toast({
                title: "Pricing Plan Submitted!",
                description: "Your new pricing plan has been saved.",
            });
        }
        router.push('/admin/pricing');
        router.refresh();
    } catch (error) {
        console.error("Failed to save pricing plan:", error);
        toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to save the pricing plan. Please try again.",
        });
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Plan Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Business" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input placeholder="$2,499 or Custom" {...field} />
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
                      <Input placeholder="For growing businesses..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            <FormField
              control={form.control}
              name="features"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Features</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="List each feature on a new line."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Separate each feature with a new line.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
                control={form.control}
                name="recommended"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Mark as Recommended
                      </FormLabel>
                      <FormDescription>
                        This will highlight the plan on the pricing page.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Saving..." : (plan ? 'Update Plan' : 'Create Plan')}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
