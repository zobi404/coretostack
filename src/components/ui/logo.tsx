import Link from 'next/link';
import { Gem } from 'lucide-react';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2 text-xl font-bold ${className}`}>
      <Gem className="h-6 w-6 text-primary" />
      <span className="font-headline">CodeToStack</span>
    </Link>
  );
}
