import { getInquiry } from "@/lib/services/inquiry-service";
import { notFound } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, User, Mail, Calendar } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function InquiryDetailPage({ params }: { params: { id: string } }) {
  const inquiry = await getInquiry(params.id);

  if (!inquiry) {
    return notFound();
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
          <CardDescription>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-sm">
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
          </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="prose dark:prose-invert max-w-none text-foreground whitespace-pre-wrap">
                {inquiry.message}
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
