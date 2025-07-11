
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Users, Target } from "lucide-react";
import DynamicStat from "@/components/about/DynamicStat";

const stats = [
    { label: "Active Clients", value: 2, suffix: "+" },
    { label: "Projects Done", value: 30, suffix: "+" },
    { label: "Team Members", value: 5, suffix: "+" },
    { label: "Glorious Years", value: 3, suffix: "+" },
]

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <section className="text-center mb-16 md:mb-24">
        <h1 className="font-headline text-4xl md:text-6xl font-bold mb-4">About CoreToStack</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          We are a passionate team of designers, developers, and strategists dedicated to creating digital experiences that are not only beautiful but also effective.
        </p>
      </section>

      <section className="mb-20 md:mb-32">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="relative">
             <Image
              src="/about.jpg"
              alt="Team collaboration"
              width={600}
              height={600}
              data-ai-hint="team collaboration"
              className="rounded-lg object-cover w-full h-full shadow-lg"
            />
          </div>
          <div className="space-y-6">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Our story is one of passion, innovation, and a relentless pursuit of excellence.</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
                CoreToStack is a software development and design agency recognized globally. We provide digital transformation services to companies all over the world. We pride ourselves in assisting our clients transition into the digital world smoothly.
            </p>
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-8 mb-20 md:mb-32 text-center">
        <Card className="bg-card border-none shadow-lg">
          <CardHeader>
            <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit mb-4">
              <Target className="w-8 h-8 text-primary"/>
            </div>
            <CardTitle className="font-headline text-2xl">Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">To empower businesses by crafting innovative and user-centric digital solutions that drive growth and create lasting value.</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-none shadow-lg">
          <CardHeader>
            <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit mb-4">
              <Users className="w-8 h-8 text-primary"/>
            </div>
            <CardTitle className="font-headline text-2xl">Our Vision</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">To be a leading digital agency recognized for our creativity, quality, and commitment to client success.</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-none shadow-lg">
          <CardHeader>
            <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit mb-4">
              <Award className="w-8 h-8 text-primary"/>
            </div>
            <CardTitle className="font-headline text-2xl">Our Values</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Innovation, Collaboration, Integrity, and Excellence are the core principles that guide our work and culture.</p>
          </CardContent>
        </Card>
      </section>

      <section className="mb-20 md:mb-32">
        <div className="relative bg-primary text-primary-foreground rounded-2xl overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1440 300">
                <path fill="currentColor" d="M 1440 300 L 1440 0 C 1200 150 800 200 0 0 L 0 300 Z"></path>
            </svg>
          </div>
          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-8 p-12 text-center items-center justify-center">
            {stats.map((stat) => (
              <DynamicStat key={stat.label} stat={stat} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
