import { PricingPlans } from "@/components/pricing/PricingPlans";

export default function PricingPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <section className="text-center mb-16 md:mb-24">
        <h1 className="font-headline text-4xl md:text-6xl font-bold mb-4">Our Pricing</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Choose a plan that fits your needs. All plans can be customized.
        </p>
      </section>
      <PricingPlans />
    </div>
  );
}
