
"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import React, { Suspense } from 'react';
import dynamic from "next/dynamic";

const ProgressBar = dynamic(() => import('next-nprogress-bar').then(m => m.AppProgressBar), { ssr: false });

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith('/admin');
  const isLoginPage = pathname === '/login';

  return (
    <div className="flex flex-col min-h-screen">
       <Suspense fallback={null}>
        <ProgressBar
          height="3px"
          color="hsl(var(--primary))"
          options={{ showSpinner: false }}
          shallowRouting
        />
      </Suspense>
      {!isAdminPage && !isLoginPage && <Header />}
      <main className="flex-grow">{children}</main>
      {!isAdminPage && !isLoginPage && <Footer />}
    </div>
  );
}
