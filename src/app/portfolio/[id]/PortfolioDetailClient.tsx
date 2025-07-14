"use client";

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getPortfolioItem } from '@/lib/services/portfolio-service';
import type { PortfolioItem } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { ArrowLeft, ExternalLink, Play, Pause } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function PortfolioDetailClient({ id }: { id: string }) {
  const [item, setItem] = useState<PortfolioItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [carouselApi, setCarouselApi] = useState<any>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [autoScrollInterval, setAutoScrollInterval] = useState<NodeJS.Timeout | null>(null);

  // Auto-scroll functionality
  const startAutoScroll = useCallback(() => {
    if (!carouselApi || !item?.carouselImageUrls || item.carouselImageUrls.length <= 1) return;
    
    // Clear existing interval first
    if (autoScrollInterval) {
      clearInterval(autoScrollInterval);
    }
    
    const interval = setInterval(() => {
      if (carouselApi.canScrollNext()) {
        carouselApi.scrollNext();
      } else {
        carouselApi.scrollTo(0);
      }
    }, 4000); // Change slide every 4 seconds
    
    setAutoScrollInterval(interval);
  }, [carouselApi, item?.carouselImageUrls, autoScrollInterval]);

  const stopAutoScroll = useCallback(() => {
    if (autoScrollInterval) {
      clearInterval(autoScrollInterval);
      setAutoScrollInterval(null);
    }
  }, [autoScrollInterval]);

  const toggleAutoPlay = () => {
    if (isAutoPlaying) {
      if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
        setAutoScrollInterval(null);
      }
    } else {
      startAutoScroll();
    }
    setIsAutoPlaying(!isAutoPlaying);
  };

  // Set up carousel API and auto-scroll
  useEffect(() => {
    if (!carouselApi) return;

    const onSelect = () => {
      setCurrentSlide(carouselApi.selectedScrollSnap());
    };

    carouselApi.on('select', onSelect);
    onSelect();

    return () => {
      carouselApi.off('select', onSelect);
    };
  }, [carouselApi]);

  // Handle auto-scroll based on state changes
  useEffect(() => {
    if (carouselApi && isAutoPlaying && item?.carouselImageUrls && item.carouselImageUrls.length > 1) {
      startAutoScroll();
    } else if (!isAutoPlaying && autoScrollInterval) {
      clearInterval(autoScrollInterval);
      setAutoScrollInterval(null);
    }
    
    return () => {
      if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
      }
    };
  }, [carouselApi, isAutoPlaying, item?.carouselImageUrls]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
      }
    };
  }, []);

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
        <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16 lg:py-24 text-center">
             <h1 className="font-headline text-2xl sm:text-3xl md:text-4xl font-bold">Project Not Found</h1>
             <p className="text-muted-foreground mt-2 sm:mt-4 text-sm sm:text-base">The project you are looking for does not exist.</p>
             <Button asChild className="mt-4 sm:mt-6 md:mt-8">
                 <Link href="/portfolio">Back to Portfolio</Link>
             </Button>
        </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16 lg:py-24">
        {/* Back Button */}
        <div className="mb-6 sm:mb-8 md:mb-12">
            <Button variant="outline" asChild size="sm" className="sm:size-default border-2 border-primary hover:bg-primary hover:text-black">
                <Link href="/portfolio" className="inline-flex items-center gap-2">
                    <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="text-sm sm:text-base">Back to Portfolio</span>
                </Link>
            </Button>
        </div>
      
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12 lg:gap-16">
        {/* Banner Image */}
        <div className="lg:col-span-2 order-2 lg:order-1">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg mb-8 sm:mb-12 md:mb-16 shadow-lg">
                <Image 
                    src={item.bannerImageUrl} 
                    alt={item.title} 
                    fill 
                    data-ai-hint={item.bannerImageHint}
                    className="object-cover" 
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 66vw"
                />
            </div>
        </div>
        
        {/* Project Info Sidebar */}
        <aside className="lg:col-span-1 order-1 lg:order-2">
            <div className="lg:sticky lg:top-24">
                <Badge variant="secondary" className="mb-3 sm:mb-4 text-xs sm:text-sm">{item.category}</Badge>
                <h1 className="font-headline text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 leading-tight">
                    {item.title}
                </h1>
                <div 
                    className="prose prose-sm sm:prose-base dark:prose-invert max-w-none text-muted-foreground mb-6 sm:mb-8 [&>p]:mb-3 [&>p]:leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                />
                {item.projectUrl && (
                    <Button asChild className="w-full sm:w-auto">
                        <a href={item.projectUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2">
                            <span>Visit Project</span>
                            <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
                        </a>
                    </Button>
                )}
            </div>
        </aside>
      </div>

      {/* Project Gallery Carousel */}
      {item.carouselImageUrls && item.carouselImageUrls.length > 0 && (
         <div className="mt-16 sm:mt-20 md:mt-24">
          <div className="flex items-center justify-center gap-4 mb-6 sm:mb-8">
            <h2 className="font-headline text-xl sm:text-2xl md:text-3xl font-bold text-center">
              Project Snapshots
            </h2>
            {item.carouselImageUrls.length > 1 && (
              <Button
                variant="outline"
                size="sm"
                onClick={toggleAutoPlay}
                className="flex items-center gap-2"
              >
                {isAutoPlaying ? (
                  <>
                    <Pause className="h-3 w-3" />
                    <span className="hidden sm:inline">Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="h-3 w-3" />
                    <span className="hidden sm:inline">Play</span>
                  </>
                )}
              </Button>
            )}
          </div>
          
          <Carousel 
            className="w-full max-w-sm sm:max-w-2xl md:max-w-4xl mx-auto" 
            opts={{ loop: true, align: "start" }}
            setApi={setCarouselApi}
            onMouseEnter={() => {
              if (autoScrollInterval) {
                clearInterval(autoScrollInterval);
                setAutoScrollInterval(null);
              }
            }}
            onMouseLeave={() => {
              if (isAutoPlaying) {
                startAutoScroll();
              }
            }}
          >
              <CarouselContent className="-ml-2 sm:-ml-4">
              {item.carouselImageUrls.map((url, index) => (
                  <CarouselItem key={index} className="pl-2 sm:pl-4 basis-full sm:basis-1/2 md:basis-1/2">
                  <div className="p-1">
                      <div className="aspect-video relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                          <Image
                              src={url}
                              alt={`${item.title} gallery image ${index + 1}`}
                              fill
                              className="object-cover hover:scale-105 transition-transform duration-300"
                              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                          />
                      </div>
                  </div>
                  </CarouselItem>
              ))}
              </CarouselContent>
              {/* Hide navigation buttons on very small screens */}
              <CarouselPrevious 
                className="hidden sm:flex" 
              />
              <CarouselNext 
                className="hidden sm:flex"
              />
          </Carousel>
          
          {/* Slide Indicators */}
          {item.carouselImageUrls.length > 1 && (
            <div className="flex justify-center gap-2 mt-4 sm:mt-6">
              {item.carouselImageUrls.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-primary w-6' 
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                  onClick={() => {
                    carouselApi?.scrollTo(index);
                    if (isAutoPlaying) {
                      if (autoScrollInterval) {
                        clearInterval(autoScrollInterval);
                        setAutoScrollInterval(null);
                      }
                      setTimeout(() => {
                        if (isAutoPlaying) {
                          startAutoScroll();
                        }
                      }, 1000);
                    }
                  }}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
         </div>
       )}
    </div>
  );
}

function PortfolioDetailSkeleton() {
    return (
        <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16 lg:py-24">
            {/* Back Button Skeleton */}
            <div className="mb-6 sm:mb-8 md:mb-12">
                 <Skeleton className="h-8 sm:h-10 w-32 sm:w-44" />
            </div>
          
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12 lg:gap-16">
            {/* Banner Image Skeleton */}
            <div className="lg:col-span-2 order-2 lg:order-1">
                <Skeleton className="aspect-video w-full rounded-lg mb-8 sm:mb-12 md:mb-16" />
            </div>
            
            {/* Project Info Skeleton */}
            <aside className="lg:col-span-1 order-1 lg:order-2">
                <div className="lg:sticky lg:top-24 space-y-3 sm:space-y-4">
                    <Skeleton className="h-5 sm:h-6 w-20 sm:w-24" />
                    <Skeleton className="h-8 sm:h-10 md:h-12 w-full" />
                    <Skeleton className="h-3 sm:h-4 w-full" />
                    <Skeleton className="h-3 sm:h-4 w-full" />
                    <Skeleton className="h-3 sm:h-4 w-4/5" />
                    <Skeleton className="h-9 sm:h-10 md:h-12 w-full sm:w-36" />
                </div>
            </aside>
          </div>
    
          {/* Gallery Skeleton */}
          <div className="mt-16 sm:mt-20 md:mt-24">
              <Skeleton className="h-6 sm:h-7 md:h-8 w-48 sm:w-64 mx-auto mb-6 sm:mb-8" />
              <div className="relative max-w-sm sm:max-w-2xl md:max-w-4xl mx-auto">
                 <Skeleton className="aspect-video w-full rounded-lg" />
              </div>
          </div>
        </div>
    );
}