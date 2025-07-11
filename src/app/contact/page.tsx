import { ContactForm } from "@/components/contact/ContactForm";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <section className="text-center mb-16 md:mb-24">
        <h1 className="font-headline text-4xl md:text-6xl font-bold mb-4">Get in Touch</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Have a question or a project in mind? We'd love to hear from you. Fill out the form below or reach out to us directly.
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-12 md:gap-24">
        <div className="space-y-12">
            <h2 className="font-headline text-3xl font-bold">Contact Information</h2>
            <div className="space-y-8">
                <div className="flex items-start gap-4">
                    <div className="bg-primary/10 rounded-full p-4 w-fit">
                        <MapPin className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold">Our Office</h3>
                        <p className="text-muted-foreground text-lg">123 Innovation Drive, Tech City, 10001</p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                     <div className="bg-primary/10 rounded-full p-4 w-fit">
                        <Mail className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold">Email Us</h3>
                        <p className="text-muted-foreground text-lg">coretostack@gmail.com</p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                     <div className="bg-primary/10 rounded-full p-4 w-fit">
                        <Phone className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold">Call Us</h3>
                        <p className="text-muted-foreground text-xl">(+92) 333-789090</p>
                    </div>
                </div>
            </div>
        </div>

        <div>
            <Card className="bg-card border-none shadow-xl">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Send us a Message</CardTitle>
                    <p className="text-muted-foreground text-sm">(Expected reply within 12 hours.)</p>
                </CardHeader>
                <CardContent>
                   <ContactForm />
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
