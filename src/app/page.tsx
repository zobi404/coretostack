import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, Code, PenTool, Gem, Smartphone, Briefcase, Lightbulb } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const services = [
  {
    icon: <Lightbulb className="w-8 h-8 text-primary" />,
    title: "Understanding Your Company's DNA",
    description: "Be it unique logo designs or complete brand identity, we assist in taking your business to new digital heights. PixelGlint provides your business with a unique brand persona, reinvents logos, mockups and so much more.",
  },
  {
    icon: <Code className="w-8 h-8 text-primary" />,
    title: "Web Development",
    description: "Here at PixelGlint, we take your ideas and empower your business through various digital strategies. We help our clients establish their online presence by developing unique and functional websites.",
  },
  {
    icon: <PenTool className="w-8 h-8 text-primary" />,
    title: "UI/UX Development",
    description: "PixelGlint aims at providing complete digital solutions to its clients. Our development and design team work closely to bring the best of both worlds to the table. We have highly trained professionals who work to provide the best.",
  },
  {
    icon: <Smartphone className="w-8 h-8 text-primary" />,
    title: "Mobile App Development",
    description: "PixelGlint has a strong mobile app development team that works on scalable mobile apps. We have experts who take every challenge with a new perspective and propose unique solutions.",
  }
];

const portfolioItems = [
  {
    id: 1,
    title: "Project Alpha",
    category: "Web App",
    imageUrl: "https://placehold.co/600x400.png",
    hint: "abstract gradients",
  },
  {
    id: 2,
    title: "Project Beta",
    category: "Mobile Design",
    imageUrl: "https://placehold.co/600x400.png",
    hint: "modern cityscape",
  },
  {
    id: 3,
    title: "Project Gamma",
    category: "Branding",
    imageUrl: "https://placehold.co/600x400.png",
    hint: "minimalist design",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full bg-card py-20 md:py-32 text-center">
        <div className="container mx-auto px-4">
          <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tighter mb-4">
            PixelGlint Studios
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Innovation by Design. We build stunning web and mobile experiences that captivate your audience and grow your business.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/contact">Get Started</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/portfolio">Our Work</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="w-full py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Our Services</h2>
            <p className="text-muted-foreground max-w-xl mx-auto mt-2">
              From concept to launch, we provide end-to-end solutions.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="bg-card shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="flex flex-row items-start gap-4 space-y-0 text-left">
                  <div className="bg-primary/10 rounded-lg p-3">
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="font-headline text-xl">{service.title}</CardTitle>
                    <CardDescription className="mt-2 text-sm">{service.description}</CardDescription>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="w-full py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Featured Work</h2>
            <p className="text-muted-foreground max-w-xl mx-auto mt-2">
              We are proud of our work. Here are some of our recent projects.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {portfolioItems.map((item) => (
              <Link href="/portfolio" key={item.id}>
                <Card className="group overflow-hidden">
                  <div className="overflow-hidden">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      width={600}
                      height={400}
                      data-ai-hint={item.hint}
                      className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-headline text-xl font-semibold">{item.title}</h3>
                    <Badge variant="secondary" className="mt-1">{item.category}</Badge>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="link">
              <Link href="/portfolio">
                View All Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-bold mb-4">
            Have a project in mind?
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
            Let's build something amazing together. Reach out to us for a free consultation.
          </p>
          <Button asChild size="lg">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
