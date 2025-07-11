import { PricingForm } from '@/components/admin/PricingForm';
import { mockPricingPlans } from "@/lib/mock-data";
import { notFound } from 'next/navigation';

// This would fetch real data in a real app
async function getPlan(title: string) {
    return mockPricingPlans.find(p => p.title === decodeURIComponent(title));
}

export default async function EditPricingPlanPage({ params }: { params: { title: string } }) {
  const plan = await getPlan(params.title);

  if (!plan) {
    return notFound();
  }

  return (
    <div>
      <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight font-headline">Edit Pricing Plan</h1>
          <p className="text-muted-foreground">Make changes to your existing pricing tier.</p>
      </div>
      <PricingForm plan={plan} />
    </div>
  );
}
