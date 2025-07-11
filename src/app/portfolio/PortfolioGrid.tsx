"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { PortfolioItem } from "@/lib/types";
import { getPortfolioItems } from "@/lib/services/portfolio-service";
import { Skeleton } from "@/components/ui/skeleton";

export default function PortfolioGrid() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    async function loadData() {
      try {
        const fetchedItems = await getPortfolioItems();
        setItems(fetchedItems);
        const uniqueCategories = ["All", ...new Set(fetchedItems.map(item => item.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Failed to load portfolio items:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filteredItems = selectedCategory === "All"
    ? items
    : items.filter(item => item.category === selectedCategory);

  return (
    <>
      <div className="flex justify-center flex-wrap gap-2 mb-16">
        {loading ? (
            <div className="flex justify-center flex-wrap gap-2">
              {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-10 w-24" />)}
            </div>
        ) : (
          categories.map(category => (
            <Button 
              key={category} 
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="px-6 py-2"
            >
              {category}
            </Button>
          ))
        )}
      </div>

      {loading ? (
        <PortfolioGridSkeleton />
      ) : (
        <section className="[column-count:1] sm:[column-count:2] lg:[column-count:3] gap-8 space-y-8">
          {filteredItems.map((item) => (
            <Link href={`/portfolio/${item.id}`} key={item.id} className="group block [break-inside:avoid]">
              <div className="overflow-hidden rounded-lg shadow-lg hover:shadow-primary/20 transition-shadow duration-300 bg-card border-none">
                <Image
                  src={item.bannerImageUrl || "https://placehold.co/600x400.png"}
                  alt={item.title}
                  width={600}
                  height={400}
                  data-ai-hint={item.bannerImageHint || "abstract project"}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                />
              </div>
              <div className="mt-4">
                <h3 className="font-headline text-2xl font-bold">{item.title}</h3>
                <p className="text-primary font-semibold tracking-wider uppercase text-sm mt-1">{item.category}</p>
              </div>
            </Link>
          ))}
        </section>
      )}
    </>
  );
}

function PortfolioGridSkeleton() {
  return (
    <section className="[column-count:1] sm:[column-count:2] lg:[column-count:3] gap-8 space-y-8">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="[break-inside:avoid] space-y-4">
           <Skeleton className="h-64 w-full" />
           <div className="space-y-2">
             <Skeleton className="h-6 w-3/4" />
             <Skeleton className="h-4 w-1/4" />
           </div>
        </div>
      ))}
    </section>
  );
}
