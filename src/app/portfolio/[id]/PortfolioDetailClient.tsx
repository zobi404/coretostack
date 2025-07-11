
"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getPortfolioItem } from '@/lib/services/portfolio-service';
import type { PortfolioItem } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function PortfolioDetailClient({ id }: { id: string }) {
  const [item, setItem] = useState<PortfolioItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchItem = async () => {
        try {
          const fetchedItem = await getPortfolioItem(id);
          setItem(fetchedItem);
        } catch (error) {
          console.error("Failed to load portfolio item:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchItem();
    }
  }, [id]);

  if (loading) {
    return <PortfolioDetailSkeleton />;
  }

  if (!item) {
    return (
        <div className="container mx-auto px-4 py-16 md:py-24 text-center">
             <h1 className="font-headline text-4xl font-bold">Project Not Found</h1>
             <p className="text-muted-foreground mt-4">The project you are looking for does not exist.</p>
             <Button asChild className="mt-8">
                 <Link href="/portfolio">Back to Portfolio</Link>
             </Button>
        </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="mb-12">
            <Button variant="outline" asChild>
                <Link href="/portfolio" className="inline-flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Portfolio
                </Link>
            </Button>
        </div>
      
      <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
        <div className="lg:col-span-2">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg mb-16 shadow-lg">
                <Image 
                    src={item.bannerImageUrl} 
                    alt={item.title} 
                    fill 
                    data-ai-hint={item.bannerImageHint}
                    className="object-cover" 
                    priority
                />
            </div>
        </div>
        
        <aside className="lg:col-span-1">
            <div className="sticky top-24">
                 <Badge variant="secondary" className="mb-4">{item.category}</Badge>
                <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4">{item.title}</h1>
                <div 
                    className="prose dark:prose-invert max-w-none text-muted-foreground mb-8"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                />
                {item.projectUrl && (
                    <Button asChild>
                        <a href={item.projectUrl} target="_blank" rel="noopener noreferrer">
                            Visit Project <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                    </Button>
                )}
            </div>
        </aside>
      </div>

       {item.carouselImageUrls && item.carouselImageUrls.length > 0 && (
         <div className="mt-24">
          <h2 className="font-headline text-3xl font-bold mb-8 text-center">Project Snapshots</h2>
          <Carousel className="w-full max-w-4xl mx-auto" opts={{ loop: true }}>
              <CarouselContent>
              {item.carouselImageUrls.map((url, index) => (
                  <CarouselItem key={index} className="md:basis-1/2">
                  <div className="p-1">
                      <div className="aspect-video relative overflow-hidden rounded-lg">
                          <Image
                              src={url}
                              alt={`${item.title} gallery image ${index + 1}`}
                              fill
                              className="object-cover"
                          />
                      </div>
                  </div>
                  </CarouselItem>
              ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
          </Carousel>
         </div>
       )}
    </div>
  );
}


function PortfolioDetailSkeleton() {
    return (
        <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="mb-12">
                 <Skeleton className="h-10 w-44" />
            </div>
          
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            <div className="lg:col-span-2">
                <Skeleton className="aspect-video w-full rounded-lg mb-16" />
            </div>
            
            <aside className="lg:col-span-1">
                <div className="sticky top-24 space-y-4">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                     <Skeleton className="h-12 w-36" />
                </div>
            </aside>
          </div>
    
           <div className="mt-24">
              <Skeleton className="h-8 w-1/3 mx-auto mb-8" />
              <div className="relative max-w-4xl mx-auto">
                 <Skeleton className="aspect-video w-full" />
              </div>
           </div>
        </div>
    );
}
