"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import type { PortfolioItem } from "@/lib/types";

interface PortfolioGridProps {
    items: PortfolioItem[];
    categories: string[];
}

export default function PortfolioGrid({ items, categories }: PortfolioGridProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredItems = selectedCategory === "All"
    ? items
    : items.filter(item => item.category === selectedCategory);

  return (
    <>
      <div className="flex justify-center flex-wrap gap-2 mb-16">
        {categories.map(category => (
          <Button 
            key={category} 
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
            className="px-6 py-2"
          >
            {category}
          </Button>
        ))}
      </div>

      <section className="[column-count:1] sm:[column-count:2] lg:[column-count:3] gap-8 space-y-8">
        {filteredItems.map((item) => (
          <a href="#" key={item.id} className="group block [break-inside:avoid]">
            <div className="overflow-hidden rounded-lg shadow-lg hover:shadow-primary/20 transition-shadow duration-300 bg-card border-none">
              <Image
                src={item.imageUrl}
                alt={item.title}
                width={600}
                height={400} // Default height, actual will be determined by image aspect ratio
                data-ai-hint={item.hint}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
              />
            </div>
             <div className="mt-4">
              <h3 className="font-headline text-2xl font-bold">{item.title}</h3>
              <p className="text-primary font-semibold tracking-wider uppercase text-sm mt-1">{item.category}</p>
            </div>
          </a>
        ))}
      </section>
    </>
  );
}
