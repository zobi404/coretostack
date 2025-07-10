"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const portfolioItems = [
  { id: 1, title: "Innovate Inc. Website", category: "Web Development", imageUrl: "https://placehold.co/600x400.png", hint: "corporate office" },
  { id: 2, title: "ConnectApp UI/UX", category: "UI/UX Design", imageUrl: "https://placehold.co/600x400.png", hint: "mobile app" },
  { id: 4, title: "DataDash Analytics", category: "Web Development", imageUrl: "https://placehold.co/600x400.png", hint: "data dashboard" },
  { id: 5, title: "HealthTrack Mobile App", category: "Mobile App", imageUrl: "https://placehold.co/600x400.png", hint: "fitness tracker" },
  { id: 7, title: "FutureTech Conference", category: "Web Development", imageUrl: "https://placehold.co/600x400.png", hint: "tech conference" },
  { id: 8, title: "FinSavvy App Design", category: "UI/UX Design", imageUrl: "https://placehold.co/600x400.png", hint: "finance app" },
];

const categories = ["All", "Web Development", "UI/UX Design", "Mobile App"];

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredItems = selectedCategory === "All"
    ? portfolioItems
    : portfolioItems.filter(item => item.category === selectedCategory);

  return (
    <div className="container mx-auto px-4 py-16">
      <section className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4">Our Portfolio</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          We're proud of the work we've done. Explore our projects to see how we've helped businesses like yours succeed.
        </p>
      </section>

      <div className="flex justify-center flex-wrap gap-2 mb-12">
        {categories.map(category => (
          <Button 
            key={category} 
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map((item) => (
          <Card key={item.id} className="overflow-hidden group transition-shadow hover:shadow-xl">
            <div className="overflow-hidden">
              <Image
                src={item.imageUrl}
                alt={item.title}
                width={600}
                height={400}
                data-ai-hint={item.hint}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
              />
            </div>
            <CardContent className="p-6">
              <Badge variant="secondary" className="mb-2">{item.category}</Badge>
              <h3 className="font-headline text-2xl font-semibold">{item.title}</h3>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
