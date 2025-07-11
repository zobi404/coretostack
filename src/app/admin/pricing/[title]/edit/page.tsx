import { PricingForm } from '@/components/admin/PricingForm';
import { getPricingPlan } from "@/lib/services/pricing-service";
import { notFound } from 'next/navigation';


export default async function EditPricingPlanPage({ params }: { params: { title: string } }) {
  // The param is now the document ID, not the title
  const plan = await getPricingPlan(params.title);

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
