'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Pencil,
  Briefcase,
  DollarSign,
  Settings,
  LogOut,
  Home,
} from 'lucide-react';
import { Logo } from '../ui/logo';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { auth } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

const adminNavLinks = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/blog', label: 'Blog', icon: Pencil },
  { href: '/admin/portfolio', label: 'Portfolio', icon: Briefcase },
  { href: '/admin/pricing', label: 'Pricing', icon: DollarSign },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminSidebarContent() {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({
        title: 'Logged Out',
        description: 'You have been successfully logged out.',
      });
      router.push('/login');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Logout Failed',
        description: 'An error occurred while logging out.',
      });
    }
  };

  return (
    <>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {adminNavLinks.map((link) => (
            <SidebarMenuItem key={link.href}>
              <Link href={link.href} className="w-full">
                <SidebarMenuButton
                  isActive={
                    pathname === link.href ||
                    (link.href !== '/admin' && pathname.startsWith(link.href))
                  }
                  className="w-full"
                >
                  <link.icon className="h-5 w-5" />
                  <span className="group-data-[collapsible=icon]:hidden">
                    {link.label}
                  </span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="flex-col gap-2 p-2">
        <SidebarSeparator />
        <div className="flex items-center justify-between group-data-[collapsible=icon]:justify-center">
           <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 w-full p-2 rounded-md hover:bg-sidebar-accent">
                    <Avatar className="h-8 w-8">
                    <AvatarImage
                        src={auth.currentUser?.photoURL || 'https://placehold.co/100x100.png'}
                        alt="Admin"
                    />
                    <AvatarFallback>
                        {auth.currentUser?.email?.charAt(0).toUpperCase() || 'A'}
                    </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium group-data-[collapsible=icon]:hidden truncate">
                        {auth.currentUser?.email}
                    </span>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" side="right">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost" size="icon" asChild className="group-data-[collapsible=icon]:hidden">
                <Link href="/" aria-label="Go to homepage">
                    <Home className="h-4 w-4" />
                </Link>
            </Button>
        </div>
      </SidebarFooter>
    </>
  );
}
