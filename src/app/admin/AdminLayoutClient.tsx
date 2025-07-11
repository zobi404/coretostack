"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar, SidebarProvider } from '@/components/ui/sidebar';
import AdminSidebarContent from '@/components/layout/AdminSidebarContent';
import AdminHeader from '@/components/layout/AdminHeader';
import { Toaster } from '@/components/ui/toaster';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

export default function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push('/login');
      } else {
        setUser(currentUser);
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    // This will be shown briefly before the redirect to /login happens
    return null; 
  }

  return (
    <SidebarProvider>
        <Sidebar>
            <AdminSidebarContent />
        </Sidebar>
        <main className="flex flex-1 flex-col">
            <AdminHeader />
            <div className="flex-1 p-4 md:p-6 lg:p-8">
                {children}
            </div>
        </main>
      <Toaster />
    </SidebarProvider>
  );
}
