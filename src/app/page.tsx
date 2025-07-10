import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, Code, PenTool, Smartphone } from "lucide-react";
import { LogoCarousel } from "@/components/ui/logo-carousel";
import TypedHeading from "@/components/home/TypedHeading";

const services = [
  {
    icon: <Code className="w-8 h-8 text-primary" />,
    title: "Web Development",
    description: "We help clients establish their online presence by developing unique, functional, and beautiful websites.",
  },
  {
    icon: <PenTool className="w-8 h-8 text-primary" />,
    title: "UI/UX Development",
    description: "Our design team works to bring the best of both worlds, creating stunning and intuitive user interfaces.",
  },
  {
    icon: <Smartphone className="w-8 h-8 text-primary" />,
    title: "Mobile App Development",
    description: "Our strong mobile app development team builds scalable and engaging mobile applications.",
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
];

const processSteps = [
  {
    step: "01",
    title: "Discovery",
    description: "We start by understanding your vision, goals, and requirements for the project.",
  },
  {
    step: "02",
    title: "Design & Develop",
    description: "Our team brings your vision to life with stunning design and robust development.",
  },
  {
    step: "03",
    title: "Launch & Grow",
    description: "We deploy your project and provide support to ensure its continued success and growth.",
  },
]

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-24 md:py-48 text-center">
        <div className="container mx-auto px-4">
          <TypedHeading />
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 animate-fade-in-up animation-delay-300">
            Innovation by Design. We build stunning web and mobile experiences that captivate your audience and grow your business.
          </p>
          <div className="flex justify-center gap-4 animate-fade-in-up animation-delay-600">
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
      <section id="services" className="w-full py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">What We Do</h2>
            <p className="text-muted-foreground max-w-xl mx-auto mt-4 text-lg">
              From concept to launch, we provide end-to-end solutions.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="bg-background shadow-lg hover:shadow-primary/10 transition-shadow duration-300 animate-fade-in-up p-4 text-center border-none" style={{ animationDelay: `${index * 150}ms` }}>
                <CardHeader className="items-center">
                  <div className="bg-primary/10 rounded-full p-4 w-fit mb-4">
                    {service.icon}
                  </div>
                  <CardTitle className="font-headline text-2xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Why Choose Us Section */}
      <section className="w-full py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-24 items-center">
            <div className="relative animate-slide-in-from-left">
              <Image
                src="https://placehold.co/600x700.png"
                width={600}
                height={700}
                alt="Digital Presence"
                data-ai-hint="team collaboration"
                className="rounded-lg object-cover shadow-2xl"
              />
            </div>
            <div className="animate-slide-in-from-right space-y-8">
              <h2 className="font-headline text-3xl md:text-4xl font-bold">Combine expertise and passion to deliver outstanding results.</h2>
               <p className="text-muted-foreground leading-relaxed text-lg">
                We are a passionate team of designers, developers, and strategists dedicated to creating digital experiences that are not only beautiful but also effective. Our focus is on delivering high-quality solutions that drive growth and create lasting value for our clients.
               </p>
              <Button size="lg" asChild>
                <Link href="/about">
                  More About Us <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section id="process" className="w-full py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">
              Our Simple, Linear Process
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mt-4 text-lg">
              A clear path to digital transformation, from idea to launch.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 text-center">
            {processSteps.map((step, index) => (
              <div key={step.step} className="flex flex-col items-center animate-fade-in-up" style={{ animationDelay: `${index * 200}ms` }}>
                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary text-primary-foreground font-bold text-3xl shadow-lg mb-6 font-headline">
                  {step.step}
                </div>
                <h3 className="font-headline text-2xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground max-w-xs">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="w-full py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 text-center animate-fade-in-up">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Technologies We Work With</h2>
             <LogoCarousel />
        </div>
      </section>


      {/* Portfolio Section */}
      <section id="portfolio" className="w-full py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Featured Work</h2>
            <p className="text-muted-foreground max-w-xl mx-auto mt-4 text-lg">
              We are proud of our work. Here are some of our recent projects.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {portfolioItems.map((item, index) => (
              <Link href="/portfolio" key={item.id}>
                <Card className="group overflow-hidden bg-background animate-fade-in-up border-none shadow-lg" style={{ animationDelay: `${index * 150}ms` }}>
                  <div className="overflow-hidden rounded-t-lg">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      width={600}
                      height={400}
                      data-ai-hint={item.hint}
                      className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-headline text-xl font-semibold">{item.title}</h3>
                    <p className="text-sm text-primary">{item.category}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12 animate-fade-in">
            <Button asChild variant="link" className="text-lg text-primary">
              <Link href="/portfolio">
                View All Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4 text-center animate-fade-in">
          <h2 className="font-headline text-3xl md:text-5xl font-bold mb-6">
            Have a project in mind?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10">
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
