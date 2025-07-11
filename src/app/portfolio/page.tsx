
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getPortfolioItems } from "@/lib/services/portfolio-service";
import PortfolioGrid from "./PortfolioGrid";

export const revalidate = 60; // Revalidate every 60 seconds

const categories = ["All", "Web Development", "UI/UX Design", "Mobile App", "Branding"];

export default async function PortfolioPage() {
  const portfolioItems = await getPortfolioItems();

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <section className="text-center mb-16 md:mb-24">
        <h1 className="font-headline text-4xl md:text-6xl font-bold mb-4">Our Portfolio</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          We're proud of the work we've done. Explore our projects to see how we've helped businesses like yours succeed.
        </p>
      </section>

      <PortfolioGrid items={portfolioItems} categories={categories} />
    </div>
  );
}
