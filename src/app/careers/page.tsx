import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Briefcase, ArrowRight } from "lucide-react";

const jobOpenings = [
  {
    title: "Senior Frontend Developer",
    location: "Remote",
    type: "Full-time",
    description: "We are looking for an experienced Frontend Developer to build beautiful and performant user interfaces with React and Next.js.",
  },
  {
    title: "Product Designer (UI/UX)",
    location: "New York, NY",
    type: "Full-time",
    description: "Join our design team to create intuitive and engaging experiences for our clients. A strong portfolio in UI/UX is required.",
  },
  {
    title: "Project Manager",
    location: "Remote",
    type: "Contract",
    description: "Seeking a highly organized Project Manager to oversee our client projects from conception to completion.",
  },
];

export default function CareersPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <section className="text-center mb-16">
        <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4">Join Our Team</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          We're always looking for talented individuals who are passionate about creating amazing digital experiences. Explore our open positions below.
        </p>
      </section>

      <section className="max-w-4xl mx-auto">
        <div className="space-y-8">
          {jobOpenings.map((job, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="font-headline text-2xl">{job.title}</CardTitle>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                  <div className="flex items-center gap-1.5">
                    <Briefcase className="w-4 h-4" />
                    <span>{job.type}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    <span>{job.location}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>{job.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <Button>
                  Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
