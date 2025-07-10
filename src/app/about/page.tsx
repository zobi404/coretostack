import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Users, Target } from "lucide-react";

const teamMembers = [
  {
    name: "Jane Doe",
    role: "CEO & Founder",
    imageUrl: "https://placehold.co/400x400.png",
    hint: "professional woman",
  },
  {
    name: "John Smith",
    role: "Lead Designer",
    imageUrl: "https://placehold.co/400x400.png",
    hint: "professional man",
  },
  {
    name: "Emily White",
    role: "Lead Developer",
    imageUrl: "https://placehold.co/400x400.png",
    hint: "software developer",
  },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <section className="text-center mb-16">
        <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4">About CodeToStack</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          We are a passionate team of designers, developers, and strategists dedicated to creating digital experiences that are not only beautiful but also effective.
        </p>
      </section>

      <section className="mb-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="aspect-square w-full max-w-lg mx-auto rounded-full overflow-hidden shadow-lg">
                <Image
                  src="https://placehold.co/600x600.png"
                  alt="Team collaboration"
                  width={600}
                  height={600}
                  data-ai-hint="team collaboration"
                  className="object-cover w-full h-full"
                />
            </div>
            <div className="absolute -bottom-8 left-0 bg-gradient-to-br from-red-500 to-primary text-primary-foreground p-6 rounded-3xl transform -rotate-12 shadow-xl">
                <h3 className="text-4xl font-bold">25+</h3>
                <p className="font-semibold uppercase tracking-wider text-sm">Professional Advisors</p>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-4">
                <span className="h-2 w-2 bg-primary rounded-full"></span>
                <p className="text-sm font-bold tracking-widest text-primary">WHO WE ARE</p>
                <span className="h-2 w-2 bg-primary rounded-full"></span>
            </div>
            <h2 className="font-headline text-4xl font-bold mb-6">10+ years of experience in providing digital consultation to companies of all sizes</h2>
            <p className="text-muted-foreground leading-relaxed">
                CodeToStack is a software development and design agency recognized globally. We provide digital transformation services to companies all over the world. We pride ourselves in assisting our clients transition into the digital world smoothly.
            </p>
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-8 mb-20 text-center">
        <Card>
          <CardHeader>
            <div className="mx-auto bg-primary/10 rounded-full p-3 w-fit mb-2">
              <Target className="w-6 h-6 text-primary"/>
            </div>
            <CardTitle className="font-headline">Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">To empower businesses by crafting innovative and user-centric digital solutions that drive growth and create lasting value.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="mx-auto bg-primary/10 rounded-full p-3 w-fit mb-2">
              <Users className="w-6 h-6 text-primary"/>
            </div>
            <CardTitle className="font-headline">Our Vision</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">To be a leading digital agency recognized for our creativity, quality, and commitment to client success.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="mx-auto bg-primary/10 rounded-full p-3 w-fit mb-2">
              <Award className="w-6 h-6 text-primary"/>
            </div>
            <CardTitle className="font-headline">Our Values</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Innovation, Collaboration, Integrity, and Excellence are the core principles that guide our work and culture.</p>
          </CardContent>
        </Card>
      </section>

      <section className="text-center">
        <h2 className="font-headline text-3xl md:text-4xl font-bold mb-10">Meet the Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <Card key={member.name} className="overflow-hidden group">
              <Image
                src={member.imageUrl}
                alt={member.name}
                width={400}
                height={400}
                data-ai-hint={member.hint}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <CardContent className="p-4">
                <h3 className="font-headline text-xl font-semibold">{member.name}</h3>
                <p className="text-primary">{member.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
