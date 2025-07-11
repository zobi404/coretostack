"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

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
       <ProgressBar
        height="3px"
        color="hsl(var(--primary))"
        options={{ showSpinner: false }}
        shallowRouting
      />
      {!isAdminPage && !isLoginPage && <Header />}
      <main className="flex-grow">{children}</main>
      {!isAdminPage && !isLoginPage && <Footer />}
    </div>
  );
}
