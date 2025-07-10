import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, Code, PenTool, Gem, Smartphone, Briefcase, Lightbulb } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

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

const skills = [
  { name: "App Development", value: 90 },
  { name: "Web Development", value: 90 },
  { name: "UI/UX Development", value: 90 },
];

const technologies = [
  { name: "Next.js", logo: "/nextjs-logo.svg" },
  { name: "React", logo: "/react-logo.svg" },
  { name: "JavaScript", logo: "/js-logo.svg" },
  { name: "Tailwind CSS", logo: "/tailwind-logo.svg" },
  { name: "Firebase", logo: "/firebase-logo.svg" },
  { name: "Genkit", logo: "/genkit-logo.svg" },
];

const processSteps = [
  {
    step: "01",
    title: "Tell Us Your Requirements",
    description: "Fill out the form on our website, telling us about your project goals and vision.",
    imageUrl: "https://placehold.co/400x300.png",
    hint: "woman planning",
  },
  {
    step: "02",
    title: "Schedule a Call",
    description: "Provide your preferred schedule for the call and any specific agenda items you would like to cover.",
    imageUrl: "https://placehold.co/400x300.png",
    hint: "woman on call",
  },
  {
    step: "03",
    title: "Development & Launch",
    description: "Our team of experts will work closely with you to bring your project to life, from development to a successful launch.",
    imageUrl: "https://placehold.co/400x300.png",
    hint: "man with rocket",
  },
]

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

      {/* Our Process Section */}
      <section id="process" className="w-full py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <Badge variant="outline" className="text-sm font-semibold tracking-wider">OUR PROCESS</Badge>
            <h2 className="font-headline text-3xl md:text-4xl font-bold mt-2">
              Linear Path to Digital Transformation
            </h2>
          </div>

          <div className="relative">
            {/* Desktop View: Numbered steps with lines */}
            <div className="hidden md:flex justify-between items-center w-full max-w-4xl mx-auto mb-16">
              {processSteps.map((step, index) => (
                <div key={step.step} className="flex items-center z-10">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-purple-400 text-white font-bold text-2xl shadow-lg">
                    {step.step}
                  </div>
                  {index < processSteps.length - 1 && (
                    <svg className="w-32 h-6 text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 130 24" stroke="currentColor">
                      <path strokeDasharray="5, 5" strokeWidth="2" d="M0 12 C 43.33 12, 86.67 12, 130 12" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
            
            {/* Content grid */}
            <div className="grid md:grid-cols-3 gap-12 text-center">
              {processSteps.map((step) => (
                <div key={step.step} className="flex flex-col items-center">
                   {/* Mobile View: Numbered step */}
                  <div className="flex md:hidden items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-purple-400 text-white font-bold text-2xl shadow-lg mb-4">
                    {step.step}
                  </div>
                  <div className="mb-6">
                     <Image
                      src={step.imageUrl}
                      alt={step.title}
                      width={400}
                      height={300}
                      data-ai-hint={step.hint}
                      className="rounded-lg object-contain h-48 w-auto"
                    />
                  </div>
                  <h3 className="font-headline text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground max-w-xs">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="w-full py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Our Services</h2>
            <p className="text-muted-foreground max-w-xl mx-auto mt-2">
              From concept to launch, we provide end-to-end solutions.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="bg-background shadow-lg hover:shadow-xl transition-shadow duration-300">
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
      
      {/* Why Choose Us Section */}
      <section className="w-full py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Why Choose Us</h2>
            <p className="text-muted-foreground max-w-xl mx-auto mt-2">
              We combine expertise and passion to deliver outstanding results.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-6">
                {skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-1">
                      <p className="font-semibold">{skill.name}</p>
                      <p className="text-primary font-semibold">{skill.value}%</p>
                    </div>
                    <Progress value={skill.value} className="h-2 [&>div]:bg-primary" />
                  </div>
                ))}
              </div>
              <Button size="lg" className="mt-8 rounded-full px-8 py-3 font-bold">
                Hire Our Developers <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="relative">
              <Image
                src="https://placehold.co/600x500.png"
                width={600}
                height={500}
                alt="Digital Presence"
                data-ai-hint="team collaboration"
                className="rounded-lg object-cover"
              />
              <div className="absolute -bottom-8 -left-8 bg-primary rounded-3xl p-8 text-primary-foreground shadow-xl transform -rotate-12">
                <h3 className="font-headline text-2xl font-bold text-center">Boost your<br />Digital Presence</h3>
              </div>
            </div>
          </div>

          <div className="text-center mt-24">
            <p className="text-sm font-semibold tracking-widest text-muted-foreground mb-2">• TECHNOLOGIES •</p>
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Technologies We Work On</h2>
            <div className="mt-8 flex justify-center items-center flex-wrap gap-x-8 gap-y-6">
              {technologies.map(tech => (
                <div key={tech.name} className="flex flex-col items-center gap-2 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                  <Image src={tech.logo} alt={tech.name} width={48} height={48} />
                  {/* <span className="text-sm font-medium">{tech.name}</span> */}
                </div>
              ))}
            </div>
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
                <Card className="group overflow-hidden bg-background">
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
      <section className="w-full py-20 md:py-32 bg-background">
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
