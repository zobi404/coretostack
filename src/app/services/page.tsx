import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PenTool, Code, Gem, Megaphone, Server, Smartphone } from "lucide-react";

const services = [
  {
    icon: <PenTool className="w-10 h-10 text-primary" />,
    title: "UI/UX Design",
    description: "We design beautiful, intuitive, and user-friendly interfaces for web and mobile applications. Our process is centered around user research and testing to ensure a seamless experience.",
  },
  {
    icon: <Code className="w-10 h-10 text-primary" />,
    title: "Web Development",
    description: "From single-page applications to large-scale enterprise platforms, we build robust, scalable, and high-performance web solutions using the latest technologies.",
  },
  {
    icon: <Smartphone className="w-10 h-10 text-primary" />,
    title: "Mobile App Development",
    description: "We create native and cross-platform mobile apps for iOS and Android that are fast, engaging, and provide a rich user experience.",
  },
  {
    icon: <Server className="w-10 h-10 text-primary" />,
    title: "Cloud & DevOps",
    description: "We provide cloud infrastructure setup and management, along with CI/CD pipelines to streamline your development and deployment processes for maximum efficiency.",
  },
];

export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <section className="text-center mb-16">
        <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          We offer a complete suite of digital services to bring your ideas to life and help your business thrive in the digital world.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <Card key={index} className="flex flex-col">
            <CardHeader className="flex items-start gap-4">
              <div className="bg-primary/10 rounded-lg p-3">
                {service.icon}
              </div>
              <div>
                <CardTitle className="font-headline text-2xl">{service.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription>{service.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
