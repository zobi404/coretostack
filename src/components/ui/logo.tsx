import Link from 'next/link';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-3 text-xl font-bold", className)}>
      <Image 
        src="/logo.png" 
        alt="CoreToStack Logo" 
        width={80} 
        height={80} 
        className="h-20 w-20"
      />
      {/* <span className="font-headline">CoreToStack</span> */}
    </Link>
  );
}
