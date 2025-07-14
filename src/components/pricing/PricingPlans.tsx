"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { getPricingPlans } from "@/lib/services/pricing-service";
import type { PricingPlan } from "@/lib/types";
import { Skeleton } from '@/components/ui/skeleton';

export function PricingPlans() {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPlans() {
      try {
        const fetchedPlans = await getPricingPlans();
        setPlans(fetchedPlans);
      } catch (error) {
        console.error("Failed to load pricing plans:", error);
      } finally {
        setLoading(false);
      }
    }
    loadPlans();
  }, []);

  if (loading) {
    return <PricingSkeleton />;
  }

  function isDesktop() {
    return typeof window !== "undefined" && window.innerWidth >= 1024;
  }

  function getWebmailURL(plan: PricingPlan) {
    const to = "coretostack@gmail.com";
    const subject = `Inquiry about ${plan.title} - ${plan.price}`;
    const body = `${plan.description}\n\nHi, I am interested in this pricing plan. Could you please share more details?`;

    
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }


  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      {plans.map((plan) => (
        <Card key={plan.id} className={cn(
          "flex flex-col bg-card border-1 shadow-md border-primary shadow-primary",
          plan.recommended && "border-2 border-primary shadow-primary/20 scale-105"
        )}>
          {plan.recommended && (
            <div className="bg-primary text-primary-foreground text-center text-sm font-bold py-2 rounded-t-lg">
              Recommended
            </div>
          )}
          <CardHeader className="text-center pt-8">
            <CardTitle className="font-headline text-3xl">{plan.title}</CardTitle>
            <CardDescription className="text-base">{plan.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="text-center my-6">
              <span className="text-5xl font-bold">{plan.price}</span>
              {plan.price.startsWith('$') && <span className="text-muted-foreground">/one-time</span>}
            </div>
            <ul className="space-y-4">
              {plan.features.split('\n').map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-500 shrink-0" />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="p-6">
            <a
              href={
                isDesktop()
                  ? getWebmailURL(plan)
                  : `mailto:coretostack@gmail.com?subject=Inquiry about ${encodeURIComponent(plan.title)} - ${encodeURIComponent(plan.price)}&body=${encodeURIComponent(`${plan.description}\n\nHi, I am interested in this pricing plan. Could you please share more details?`)}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              <Button
                size="lg"
                className="w-full border-2 border-primary hover:bg-primary hover:text-black"
                variant={plan.recommended ? "default" : "outline"}
              >
                {plan.title === 'Enterprise' ? 'Contact Us' : 'Get Started'}
              </Button>
            </a>
          </CardFooter>


        </Card>
      ))}
    </section>
  );
}


function PricingSkeleton() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      {[...Array(3)].map((_, i) => (
        <Card key={i} className="flex flex-col bg-card border-none shadow-lg">
          <CardHeader className="text-center pt-8 space-y-4">
            <Skeleton className="h-8 w-1/2 mx-auto" />
            <Skeleton className="h-4 w-3/4 mx-auto" />
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="text-center my-6">
              <Skeleton className="h-12 w-1/3 mx-auto" />
            </div>
            <ul className="space-y-4">
              {[...Array(4)].map((_, j) => (
                <li key={j} className="flex items-center gap-3">
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <Skeleton className="h-4 w-full" />
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="p-6">
            <Skeleton className="h-12 w-full" />
          </CardFooter>
        </Card>
      ))}
    </section>
  )
}
