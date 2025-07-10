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
    description: "Be it unique logo designs or complete brand identity, we assist in taking your business to new digital heights. CodeToStack provides your business with a unique brand persona, reinvents logos, mockups and so much more.",
  },
  {
    icon: <Code className="w-8 h-8 text-primary" />,
    title: "Web Development",
    description: "Here at CodeToStack, we take your ideas and empower your business through various digital strategies. We help our clients establish their online presence by developing unique and functional websites.",
  },
  {
    icon: <PenTool className="w-8 h-8 text-primary" />,
    title: "UI/UX Development",
    description: "CodeToStack aims at providing complete digital solutions to its clients. Our development and design team work closely to bring the best of both worlds to the table. We have highly trained professionals who work to provide the best.",
  },
  {
    icon: <Smartphone className="w-8 h-8 text-primary" />,
    title: "Mobile App Development",
    description: "CodeToStack has a strong mobile app development team that works on scalable mobile apps. We have experts who take every challenge with a new perspective and propose unique solutions.",
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
  {
    name: "Next.js",
    logo: (
      <svg width="48" height="48" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="64" cy="64" r="64" fill="black" />
        <path
          d="M107.421 111.415C99.8518 114.932 91.4828 117 82.6074 117C64.637 117 49.3335 108.638 39.3683 94.634L64.7179 53.0416V117C69.6556 117 74.4533 116.143 78.8514 114.613L107.421 111.415Z"
          fill="url(#paint0_linear_1_2)"
        />
        <path
          d="M83.4062 17.0001L39.3672 94.6341C48.1328 108.038 63.8349 117 82.6063 117C83.0053 117 83.4062 116.974 83.8043 116.95L83.4062 17.0001Z"
          fill="url(#paint1_linear_1_2)"
        />
        <defs>
          <linearGradient id="paint0_linear_1_2" x1="107.421" y1="111.415" x2="33.8293" y2="88.2407" gradientUnits="userSpaceOnUse">
            <stop stopColor="white" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="paint1_linear_1_2" x1="83.8043" y1="116.95" x2="63.8349" y2="53.0416" gradientUnits="userSpaceOnUse">
            <stop stopColor="white" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    name: "React",
    logo: (
      <svg width="48" height="48" viewBox="-11.5 -10.23174 23 20.46348" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
        <g stroke="#61DAFB" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    ),
  },
  {
    name: "JavaScript",
    logo: (
      <svg width="48" height="48" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill="#F7DF1E" d="M0 0h256v256H0z"/>
        <path d="M68 83h31l4 21h-25l-4-21zm72 71c0 14-8 23-22 23s-22-9-22-23c0-15 8-23 22-23s22 8 22 23zm-11-1c0-9-5-14-11-14s-11 5-11 14 5 14 11 14 11-5 11-14zm-30-29h20v-10h-29l4 47h22v-10h-13l-3-27zm-27-21c0-9 5-13 12-13s12 4 12 13c0 8-4 13-12 13s-12-5-12-13zm11-1c0-4-2-6-4-6s-5 2-5 6 2 6 5 6 4-2 4-6z"/>
      </svg>
    ),
  },
  {
    name: "Tailwind CSS",
    logo: (
        <svg width="48" height="48" viewBox="0 0 256 154" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill="#38BDF8" d="M128 0c-43.3 0-66.6 20-76 37.3C62.6 57.3 84.7 77.3 128 77.3s65.4-20 76-37.3C194.6 20 171.3 0 128 0zM128 76.8c-43.3 0-66.6 20-76 37.3C62.6 136.8 84.7 154 128 154s65.4-17.2 76-37.3C194.6 96.8 171.3 76.8 128 76.8z"/>
        </svg>
    ),
  },
  {
    name: "Firebase",
    logo: (
      <svg width="48" height="48" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.8,53.8a2,2,0,0,1-1.9-2.9L24.8,5.1a2,2,0,0,1,3.8,1L11.7,51.9A2,2,0,0,1,9.8,53.8Z" fill="#FFC24A"/>
        <path d="M42.3,62,9.8,53.8a2,2,0,0,1,1.9-3.5L52.5,58a2,2,0,0,1-1.3,3.8A2,2,0,0,1,49.4,62Z" fill="#F4BD62"/>
        <path d="M26.2,6.1,10.1,51.4,42.3,62,54,16.5Z" fill="#FFA000"/>
        <path d="M11.7,51.9,9.8,53.8,42.3,62l-1-2.2Z" fill="#F57C00"/>
        <path d="M54,16.5,24.8,5.1a2,2,0,0,1,1.4-3.8,2,2,0,0,1,2.4,2.5L54.4,14.6A2.1,2.1,0,0,1,54,16.5Z" fill="#FFCA28"/>
      </svg>
    ),
  },
  {
    name: "Genkit",
    logo: (
      <svg width="48" height="48" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
        <path fill="#4285F4" d="M896 128H128v768h768V128z"/>
        <path fill="#FFF" d="m480.9 618.3l-105-105.1l-105 105.1l-60.3-60.3l105.1-105.1l-105.1-105l60.3-60.3l105 105l105.1-105l60.3 60.3l-105.1 105l105.1 105.1zM736 512h-96v-64h96v64zm-96 128h96v-64h-96v64zm-256-64H128v64h256v-64z"/>
      </svg>
    ),
  },
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
          <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tighter mb-4 animate-fade-in-up">
            CodeToStack Studios
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in-up animation-delay-300">
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

      {/* Our Process Section */}
      <section id="process" className="w-full py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16 animate-fade-in-up">
            <Badge variant="outline" className="text-sm font-semibold tracking-wider">OUR PROCESS</Badge>
            <h2 className="font-headline text-3xl md:text-4xl font-bold mt-2">
              Linear Path to Digital Transformation
            </h2>
          </div>

          <div className="relative">
            {/* Desktop View: Numbered steps with lines */}
            <div className="hidden md:flex justify-between items-center w-full max-w-4xl mx-auto mb-16">
              {processSteps.map((step, index) => (
                <div key={step.step} className="flex items-center z-10 animate-fade-in" style={{ animationDelay: `${index * 200}ms` }}>
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
              {processSteps.map((step, index) => (
                <div key={step.step} className="flex flex-col items-center animate-fade-in-up" style={{ animationDelay: `${index * 200}ms` }}>
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
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Our Services</h2>
            <p className="text-muted-foreground max-w-xl mx-auto mt-2">
              From concept to launch, we provide end-to-end solutions.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="bg-background shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fade-in-up" style={{ animationDelay: `${index * 150}ms` }}>
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
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Why Choose Us</h2>
            <p className="text-muted-foreground max-w-xl mx-auto mt-2">
              We combine expertise and passion to deliver outstanding results.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-from-left">
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
            <div className="relative animate-slide-in-from-right">
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

          <div className="text-center mt-24 animate-fade-in-up">
            <p className="text-sm font-semibold tracking-widest text-muted-foreground mb-2">• TECHNOLOGIES •</p>
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Technologies We Work On</h2>
            <div className="mt-8 flex justify-center items-center flex-wrap gap-x-8 gap-y-6">
              {technologies.map((tech, index) => (
                <div key={tech.name} className="flex flex-col items-center gap-2 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  {tech.logo}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="w-full py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Featured Work</h2>
            <p className="text-muted-foreground max-w-xl mx-auto mt-2">
              We are proud of our work. Here are some of our recent projects.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {portfolioItems.map((item, index) => (
              <Link href="/portfolio" key={item.id}>
                <Card className="group overflow-hidden bg-background animate-fade-in-up" style={{ animationDelay: `${index * 150}ms` }}>
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
          <div className="text-center mt-12 animate-fade-in">
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
        <div className="container mx-auto px-4 text-center animate-fade-in">
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
