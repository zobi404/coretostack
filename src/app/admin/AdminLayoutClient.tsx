"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SidebarProvider, Sidebar, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import AdminSidebarContent from '@/components/layout/AdminSidebarContent';
import AdminHeader from '@/components/layout/AdminHeader';
import { Toaster } from '@/components/ui/toaster';

export default function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Mock authentication check
    const authStatus = localStorage.getItem('user-authenticated');
    if (authStatus !== 'true') {
      router.push('/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (!isAuthenticated) {
    // Render a loader or a blank screen while checking auth
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <AdminSidebarContent />
      </Sidebar>
      <div className="flex-1">
        <AdminHeader />
        <main className="p-4 md:p-6">
          {children}
        </main>
      </div>
      <Toaster />
    </SidebarProvider>
  );
}
