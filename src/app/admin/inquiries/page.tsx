
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { MoreHorizontal, Trash2, Eye } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { getInquiries, deleteInquiry } from "@/lib/services/inquiry-service";
import type { Inquiry } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [inquiryToDelete, setInquiryToDelete] = useState<Inquiry | null>(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    async function fetchInquiries() {
      try {
        const fetchedInquiries = await getInquiries();
        setInquiries(fetchedInquiries);
      } catch (error) {
        console.error("Failed to fetch inquiries:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load inquiries. Check permissions.",
        });
      } finally {
        setLoading(false);
      }
    }
    fetchInquiries();
  }, [toast]);

  const handleDelete = async () => {
    if (inquiryToDelete) {
      try {
        await deleteInquiry(inquiryToDelete.id);
        setInquiries(inquiries.filter(i => i.id !== inquiryToDelete.id));
        toast({
          title: "Success",
          description: "Inquiry deleted successfully.",
        });
      } catch (error) {
        console.error("Failed to delete inquiry:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to delete inquiry.",
        });
      } finally {
        setInquiryToDelete(null);
        setIsAlertOpen(false);
      }
    }
  };

  const openDeleteDialog = (inquiry: Inquiry) => {
    setInquiryToDelete(inquiry);
    setIsAlertOpen(true);
  }

  if (loading) {
    return (
       <div className="flex h-full w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">Contact Inquiries</h1>
          <p className="text-muted-foreground">Manage messages from your clients.</p>
        </div>
      </div>
      
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Received</TableHead>
                  <TableHead><span className="sr-only">Actions</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inquiries.map((inquiry) => (
                  <TableRow key={inquiry.id}>
                    <TableCell className="font-medium">{inquiry.name}</TableCell>
                    <TableCell>{inquiry.email}</TableCell>
                    <TableCell>{inquiry.subject}</TableCell>
                    <TableCell>{new Date(inquiry.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                       <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                           <DropdownMenuItem asChild>
                              <Link href={`/admin/inquiries/${inquiry.id}`} className="flex items-center gap-2">
                                <Eye className="h-4 w-4" /> View Message
                              </Link>
                           </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-destructive flex items-center gap-2"
                              onSelect={() => openDeleteDialog(inquiry)}
                            >
                              <Trash2 className="h-4 w-4" /> Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the inquiry from "{inquiryToDelete?.name}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsAlertOpen(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
