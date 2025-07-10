import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const pricingPlans = [
  {
    title: "Starter",
    price: "$999",
    description: "For small businesses and startups.",
    features: [
      "Landing Page",
      "Basic Branding",
      "Contact Form",
      "3-Month Support",
    ],
    isRecommended: false,
  },
  {
    title: "Business",
    price: "$2,499",
    description: "For growing businesses needing a full web presence.",
    features: [
      "5-Page Website",
      "Full Branding Package",
      "CMS Integration",
      "Basic SEO",
      "6-Month Support",
    ],
    isRecommended: true,
  },
  {
    title: "Enterprise",
    price: "Custom",
    description: "For large organizations with custom needs.",
    features: [
      "Unlimited Pages",
      "Custom Web Application",
      "Advanced E-commerce",
      "Dedicated Support",
      "Full SEO & Marketing",
    ],
    isRecommended: false,
  },
];

export default function PricingPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <section className="text-center mb-16">
        <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4">Our Pricing</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Choose a plan that fits your needs. All plans can be customized.
        </p>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {pricingPlans.map((plan) => (
          <Card key={plan.title} className={cn(
            "flex flex-col",
            plan.isRecommended && "border-primary shadow-lg scale-105"
          )}>
            {plan.isRecommended && (
              <div className="bg-primary text-primary-foreground text-center text-sm font-bold py-1 rounded-t-lg">
                Recommended
              </div>
            )}
            <CardHeader className="text-center">
              <CardTitle className="font-headline text-3xl">{plan.title}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="text-center mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.price.startsWith('$') && <span className="text-muted-foreground">/one-time</span>}
              </div>
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant={plan.isRecommended ? "default" : "outline"}>
                {plan.title === 'Enterprise' ? 'Contact Us' : 'Get Started'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </section>
    </div>
  );
}
