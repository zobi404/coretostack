import Link from 'next/link';
import { Logo } from '@/components/ui/logo';
import { Button } from '@/components/ui/button';
import { Twitter, Linkedin, Github, Facebook } from 'lucide-react';

const companyLinks = [
    { href: "/about", label: "About Us" },
    { href: "/careers", label: "Careers" },
    { href: "/contact", label: "Contact Us" },
];

const serviceLinks = [
    { href: "/services", label: "Web Development" },
    { href: "/services", label: "UI/UX Design" },
    { href: "/services", label: "Mobile App Development" },
];

export default function Footer() {
  return (
    <footer className="bg-card text-muted-foreground">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <Logo />
            <p className="mt-4 text-sm">
              Innovation by Design. We build stunning web and mobile experiences that captivate your audience and grow your business.
            </p>
          </div>
          <div>
            <h3 className="font-headline font-semibold text-xl text-foreground">Company</h3>
            <nav className="mt-4 flex flex-col space-y-3">
              {companyLinks.map(link => (
                <Link key={link.href} href={link.href} className="text-sm hover:text-primary transition-colors flex items-center gap-2">
                   <span className="w-1.5 h-1.5 rounded-full border border-muted-foreground block"></span>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
           <div>
            <h3 className="font-headline font-semibold text-xl text-foreground">Services</h3>
            <nav className="mt-4 flex flex-col space-y-3">
               {serviceLinks.map(link => (
                <Link key={`${link.href}-${link.label}`} href={link.href} className="text-sm hover:text-primary transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full border border-muted-foreground block"></span>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
           <div>
            <h3 className="font-headline font-semibold text-xl text-foreground">Let's Connect!</h3>
            <p className="mt-4 text-sm">
                Connect with entrepreneurs, build your network, make great business.
            </p>
            <div className="flex mt-4 space-x-2">
              <Button variant="outline" size="icon" className="rounded-full" asChild>
                <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <Twitter className="h-5 w-5" />
                </a>
              </Button>
               <Button variant="outline" size="icon" className="rounded-full" asChild>
                <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <Facebook className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full" asChild>
                <a href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full" asChild>
                <a href="#" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Github className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} CoreToStack. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
