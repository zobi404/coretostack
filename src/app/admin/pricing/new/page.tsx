import { PricingForm } from '@/components/admin/PricingForm';

export default function NewPricingPlanPage() {
  return (
    <div>
      <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight font-headline">Add New Pricing Plan</h1>
          <p className="text-muted-foreground">Fill in the details below to create a new pricing tier.</p>
      </div>
      <PricingForm />
    </div>
  );
}
