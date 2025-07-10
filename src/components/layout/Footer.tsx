import Link from 'next/link';
import { Logo } from '@/components/ui/logo';
import { Button } from '@/components/ui/button';
import { Twitter, Linkedin, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-card text-card-foreground border-t">
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <Logo />
            <p className="mt-4 text-sm text-muted-foreground">
              Innovation by Design.
            </p>
            <div className="flex mt-4 space-x-4">
              <Button variant="ghost" size="icon" asChild>
                <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <Twitter className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="#" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Github className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
          <div>
            <h3 className="font-headline font-semibold">Company</h3>
            <nav className="mt-4 flex flex-col space-y-2">
              <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</Link>
              <Link href="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">Blog</Link>
              <Link href="/careers" className="text-sm text-muted-foreground hover:text-primary transition-colors">Careers</Link>
            </nav>
          </div>
          <div>
            <h3 className="font-headline font-semibold">Services</h3>
            <nav className="mt-4 flex flex-col space-y-2">
              <Link href="/services" className="text-sm text-muted-foreground hover:text-primary transition-colors">Web Development</Link>
              <Link href="/services" className="text-sm text-muted-foreground hover:text-primary transition-colors">UI/UX Design</Link>
              <Link href="/services" className="text-sm text-muted-foreground hover:text-primary transition-colors">Mobile App Development</Link>
            </nav>
          </div>
           <div>
            <h3 className="font-headline font-semibold">Connect</h3>
            <nav className="mt-4 flex flex-col space-y-2">
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link>
              <Link href="/pricing" className="text-sm text-muted-foreground hover:text-primary transition-colors">Pricing</Link>
              <Link href="/admin" className="text-sm text-muted-foreground hover:text-primary transition-colors">Admin</Link>
            </nav>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} CodeToStack Studios. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
