
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPortfolioItem, getPortfolioItems } from '@/lib/services/portfolio-service';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { ArrowLeft, ExternalLink } from 'lucide-react';

export const revalidate = 60; // Revalidate this page every 60 seconds

export async function generateStaticParams() {
  const items = await getPortfolioItems();
  return items.map(item => ({
    id: item.id,
  }));
}

export default async function PortfolioDetailPage({ params }: { params: { id: string } }) {
  const item = await getPortfolioItem(params.id);

  if (!item) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="mb-8">
            <Button variant="outline" asChild>
                <Link href="/portfolio" className="inline-flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Portfolio
                </Link>
            </Button>
        </div>
      
      <header className="mb-12 text-center">
        <Badge variant="secondary" className="mb-4">{item.category}</Badge>
        <h1 className="font-headline text-4xl md:text-6xl font-bold mb-4">{item.title}</h1>
        {item.projectUrl && (
             <Button variant="link" asChild>
                <a href={item.projectUrl} target="_blank" rel="noopener noreferrer">
                    Visit Project <ExternalLink className="ml-2 h-4 w-4" />
                </a>
            </Button>
        )}
      </header>

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

      <div className="max-w-4xl mx-auto mb-16">
        <h2 className="font-headline text-3xl font-bold mb-4">About the Project</h2>
        <div 
            className="prose dark:prose-invert max-w-none text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: item.description }}
        />
      </div>

       <div className="max-w-6xl mx-auto">
        <h2 className="font-headline text-3xl font-bold mb-8 text-center">Project Gallery</h2>
        <Carousel className="w-full" opts={{ loop: true }}>
            <CarouselContent>
            {item.carouselImageUrls.map((url, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                    <div className="aspect-square relative overflow-hidden rounded-lg">
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
    </div>
  );
}
