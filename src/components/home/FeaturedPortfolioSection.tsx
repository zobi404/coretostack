"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { getPortfolioItems } from '@/lib/services/portfolio-service';
import type { PortfolioItem } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export function FeaturedPortfolioSection() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadItems() {
      try {
        const fetchedItems = await getPortfolioItems();
        setItems(fetchedItems.slice(0, 2));
      } catch (error) {
        console.error("Failed to load portfolio items:", error);
      } finally {
        setLoading(false);
      }
    }
    loadItems();
  }, []);

  return (
    <section id="portfolio" className="w-full py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">Featured Work</h2>
          <p className="text-muted-foreground max-w-xl mx-auto mt-4 text-lg">
            We are proud of our work. Here are some of our recent projects.
          </p>
        </div>
        
        {loading ? (
          <PortfolioSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {items.map((item, index) => (
              <Link href={`/portfolio/${item.id}`} key={item.id} className="group">
                <div className="overflow-hidden rounded-lg bg-background animate-fade-in-up shadow-lg hover:shadow-primary/10 transition-shadow duration-300" style={{ animationDelay: `${index * 150}ms` }}>
                  <div className="mx-auto max-w-[400px]">
                    <Image
                      src={item.bannerImageUrl || "https://placehold.co/400x300.png"}
                      alt={item.title}
                      width={400}
                      height={300}
                      data-ai-hint={item.bannerImageHint}
                      className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
                <div className="py-4 text-center">
                  <h3 className="font-headline text-xl font-semibold">{item.title}</h3>
                  <p className="text-sm text-primary">{item.category}</p>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="text-center mt-12 animate-fade-in">
          <Button asChild variant="link" className="text-lg text-primary">
            <Link href="/portfolio">
              View All Projects <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}


function PortfolioSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {[...Array(2)].map((_, index) => (
        <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 150}ms` }}>
          <div className="overflow-hidden rounded-lg bg-background shadow-lg">
             <Skeleton className="w-full h-[300px]" />
          </div>
          <div className="py-4 text-center space-y-2">
            <Skeleton className="h-6 w-1/2 mx-auto" />
            <Skeleton className="h-4 w-1/4 mx-auto" />
          </div>
        </div>
      ))}
    </div>
  );
}
