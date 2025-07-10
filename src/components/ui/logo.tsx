import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-3 text-xl font-bold", className)}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 text-primary"
      >
        <path d="M50 5L15 25V35L50 55L85 35V25L50 5Z" fill="currentColor" fillOpacity="0.2" />
        <path d="M50 5L15 25L50 45L85 25L50 5Z" fill="currentColor" />
        <path d="M15 38V75L50 95V58L15 38Z" fill="currentColor" fillOpacity="0.6" />
        <path d="M85 38V75L50 95V58L85 38Z" fill="currentColor" fillOpacity="0.8" />
        <path d="M10 22L10 38" stroke="currentColor" strokeWidth="2" />
        <path d="M90 22L90 38" stroke="currentColor" strokeWidth="2" />
        <path d="M7 30H23" stroke="currentColor" strokeWidth="2" />
        <path d="M77 30H93" stroke="currentColor" strokeWidth="2" />
        <circle cx="27" cy="30" r="2" fill="currentColor" />
        <circle cx="73" cy="30" r="2" fill="currentColor" />
      </svg>
      <span className="font-headline">CoreToStack</span>
    </Link>
  );
}
