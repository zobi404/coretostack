export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import RootLayoutClient from "./RootLayoutClient";
import { PT_Sans, Playfair_Display } from 'next/font/google';
import { cn } from "@/lib/utils";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import React, { Suspense, useEffect, useState } from 'react';

const ptSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-pt-sans',
  display: 'swap',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "CoreToStack",
  description: "Innovation by Design. We build stunning web and mobile experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("font-body antialiased", ptSans.variable, playfairDisplay.variable)}>
        <GoogleAnalytics />
        <Suspense fallback={null}>
          <RootLayoutClient>{children}</RootLayoutClient>
        </Suspense>
        <Toaster />
      </body>
    </html>
  );
}
