
"use client";

import { useEffect, useState } from 'react';
import { PricingForm } from '@/components/admin/PricingForm';
import { getPricingPlan } from "@/lib/services/pricing-service";
import type { PricingPlan } from '@/lib/types';


export default function EditPricingPlanPage({ params }: { params: { title: string } }) {
  const [plan, setPlan] = useState<PricingPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  
  useEffect(() => {
    const fetchPlan = async () => {
      try {
        setLoading(true);
        // The param is the document ID
        const planData = await getPricingPlan(params.title);
        if (planData) {
          setPlan(planData);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error("Failed to fetch pricing plan:", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    fetchPlan();
  }, [params.title]);

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (notFound) {
    return <div>Pricing plan not found.</div>;
  }

  if (!plan) {
    return null;
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
