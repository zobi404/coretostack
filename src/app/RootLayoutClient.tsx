
"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import React, { Suspense, useEffect, useState } from 'react';

function NavigationProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [progress, setProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setProgress(0);
    setIsAnimating(false);
  }, [pathname, searchParams]);
  
  // This is a simplified simulation of a progress bar.
  // In a real app, you might use a more sophisticated library
  // or listen to router events if they were available in App Router.
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isAnimating) {
      timer = setInterval(() => {
        setProgress(p => {
          if (p >= 95) {
            clearInterval(timer);
            return p;
          }
          return p + 5;
        });
      }, 100);
    }
    return () => {
      clearInterval(timer);
    };
  }, [isAnimating]);

  useEffect(() => {
    // This effect is a dummy to trigger the progress bar on navigation.
    // A more robust solution would integrate with Next.js router events.
    setIsAnimating(true);
    const timeout = setTimeout(() => {
        setProgress(100);
        setTimeout(() => {
            setIsAnimating(false);
            setProgress(0);
        }, 500);
    }, 1000); // Simulate page load time

    return () => clearTimeout(timeout);
  }, [pathname, searchParams]);


  return (
    <div
      className="fixed top-0 left-0 z-50 w-full h-[3px] bg-primary/20"
      style={{
        opacity: isAnimating ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out',
      }}
    >
      <div
        className="h-full bg-primary"
        style={{
          width: `${progress}%`,
          transition: 'width 0.3s ease-out',
        }}
      />
    </div>
  );
}


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
        <NavigationProgressBar />
      </Suspense>
      {!isAdminPage && !isLoginPage && <Header />}
      <main className="flex-grow">{children}</main>
      {!isAdminPage && !isLoginPage && <Footer />}
    </div>
  );
}
