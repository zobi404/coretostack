
"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getInquiry } from "@/lib/services/inquiry-service";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, User, Mail, Calendar } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Inquiry } from '@/lib/types';

export default function InquiryDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [inquiry, setInquiry] = useState<Inquiry | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchInquiry = async () => {
      try {
        setLoading(true);
        const inquiryData = await getInquiry(id);
        if (inquiryData) {
          setInquiry(inquiryData);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error("Failed to fetch inquiry:", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    fetchInquiry();
  }, [id]);


  if (loading) {
    return (
       <div className="flex h-full w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (notFound || !inquiry) {
    return <div>Inquiry not found.</div>;
  }

  return (
    <div>
      <div className="mb-6 flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/admin/inquiries">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to Inquiries</span>
          </Link>
        </Button>
        <div>
            <h1 className="text-3xl font-bold tracking-tight font-headline">Inquiry Details</h1>
            <p className="text-muted-foreground">Full message from {inquiry.name}.</p>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">{inquiry.subject}</CardTitle>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{inquiry.name}</span>
              </div>
              <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                   <a href={`mailto:${inquiry.email}`} className="hover:underline">{inquiry.email}</a>
              </div>
               <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={inquiry.createdAt}>
                      {new Date(inquiry.createdAt).toLocaleString()}
                  </time>
              </div>
          </div>
        </CardHeader>
        <CardContent>
            <div className="prose dark:prose-invert max-w-none text-foreground whitespace-pre-wrap pt-4 border-t">
                {inquiry.message}
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
