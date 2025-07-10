import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <section className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Have a question or a project in mind? We'd love to hear from you. Fill out the form below or reach out to us directly.
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Send us a Message</CardTitle>
              <CardDescription>We'll get back to you as soon as possible.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input placeholder="Your Name" />
                  <Input type="email" placeholder="Your Email" />
                </div>
                <Input placeholder="Subject" />
                <Textarea placeholder="Your Message" rows={6} />
                <Button type="submit" className="w-full">Send Message</Button>
              </form>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-8">
            <h2 className="font-headline text-3xl font-bold">Contact Information</h2>
            <div className="space-y-6">
                <div className="flex items-start gap-4">
                    <div className="bg-primary/10 rounded-full p-3 w-fit">
                        <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Our Office</h3>
                        <p className="text-muted-foreground">123 Innovation Drive, Tech City, 10001</p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                     <div className="bg-primary/10 rounded-full p-3 w-fit">
                        <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Email Us</h3>
                        <p className="text-muted-foreground">hello@pixelglint.com</p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                     <div className="bg-primary/10 rounded-full p-3 w-fit">
                        <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Call Us</h3>
                        <p className="text-muted-foreground">(123) 456-7890</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
