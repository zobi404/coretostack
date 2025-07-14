import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Users, Target } from "lucide-react";
import DynamicStat from "@/components/about/DynamicStat";
import FAQSection from "@/components/about/FAQSection";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const stats = [
  { label: "Active Clients", value: 2, suffix: "+" },
  { label: "Projects Done", value: 30, suffix: "+" },
  { label: "Team Members", value: 5, suffix: "+" },
  { label: "Glorious Years", value: 3, suffix: "+" },
];

const faqs = [
  {
    question: "What services does CoreToStack offer?",
    answer:
      "• Web development\n• Mobile app development\n• ChatBot development\n• DevOps services\n• Team hiring\n• UI/UX design\n• Strategic consulting",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "• Simple applications: 2-4 weeks\n• Complex applications: 3-6 months\n• Detailed timelines provided during consultation\n• Regular updates throughout development",
  },
  {
    question: "Do you work with startups or only established companies?",
    answer:
      "• Work with all business sizes\n• Startups to enterprise organizations\n• Flexible approach for unique needs\n• Adaptable to different budgets",
  },
  {
    question: "What is your development process?",
    answer:
      "• Agile methodology with client feedback\n• Discovery and planning phase\n• Design and development stages\n• Thorough testing\n• Ongoing support after launch",
  },
  {
    question: "Do you provide ongoing support after project completion?",
    answer:
      "• Comprehensive post-launch support\n• Maintenance and updates\n• Bug fixes and feature enhancements\n• Long-term partnership approach",
  },
  {
    question: "How do you ensure project quality?",
    answer:
      "• Industry best practices\n• Thorough testing at each stage\n• Code reviews and documentation\n• Latest technologies and methodologies",
  },
  {
    question: "What are your payment terms and options?",
    answer:
      "• Milestone-based payment structure\n• Custom payment plans available\n• Flexible terms based on project needs\n• Payment schedule discussed during consultation",
  },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="text-center mb-16 md:mb-24">
        <h1 className="font-headline text-3xl sm:text-4xl md:text-6xl font-bold mb-4">
          About CoreToStack
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          We are a passionate team of designers, developers, and strategists dedicated to creating
          digital experiences that are not only beautiful but also effective.
        </p>
      </section>

      {/* Story Section */}
      <section className="mb-20 md:mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="relative w-full">
            <Image
              src="/about.jpg"
              alt="Team collaboration"
              width={600}
              height={600}
              className="rounded-lg object-cover w-full h-auto max-h-[500px] shadow-lg"
            />
          </div>
          <div className="space-y-6 text-center md:text-left">
            <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl font-bold">
              Our story is one of passion, innovation, and a relentless pursuit of excellence.
            </h2>
            <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
              CoreToStack is a software development and design agency recognized globally. We
              provide digital transformation services to companies all over the world. We pride
              ourselves in assisting our clients transition into the digital world smoothly.
            </p>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-20 md:mb-32 text-center">
        <Card className="bg-card border-none shadow-lg">
          <CardHeader>
            <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit mb-4">
              <Target className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="font-headline text-2xl">Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              To empower businesses by crafting innovative and user-centric digital solutions that
              drive growth and create lasting value.
            </p>
          </CardContent>
        </Card>
        <Card className="bg-card border-none shadow-lg">
          <CardHeader>
            <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit mb-4">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="font-headline text-2xl">Our Vision</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              To be a leading digital agency recognized for our creativity, quality, and commitment
              to client success.
            </p>
          </CardContent>
        </Card>
        <Card className="bg-card border-none shadow-lg">
          <CardHeader>
            <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit mb-4">
              <Award className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="font-headline text-2xl">Our Values</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Innovation, Collaboration, Integrity, and Excellence are the core principles that
              guide our work and culture.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Stats Section */}
      <section className="mb-20 md:mb-32">
        <div className="relative bg-primary text-primary-foreground rounded-2xl overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1440 300">
              <path
                fill="currentColor"
                d="M 1440 300 L 1440 0 C 1200 150 800 200 0 0 L 0 300 Z"
              ></path>
            </svg>
          </div>
          <div className="relative grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 p-6 sm:p-12 text-center items-center justify-center">
            {stats.map((stat) => (
              <DynamicStat key={stat.label} stat={stat} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection faqs={faqs} />

      {/* CTA Section */}
      <section className="w-full py-16 sm:py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 text-center animate-fade-in">
          <h2 className="font-headline text-2xl sm:text-3xl md:text-5xl font-bold mb-6">
            Have a project in mind?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10">
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
