import Link from 'next/link';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-3 text-xl font-bold", className)}>
      <Image 
        src="/logo.png" 
        alt="CoreToStack Logo" 
        width={32} 
        height={32} 
        className="h-8 w-8"
      />
      <span className="font-headline">CoreToStack</span>
    </Link>
  );
}
