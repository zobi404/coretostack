
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { getPricingPlans, deletePricingPlan } from "@/lib/services/pricing-service";
import type { PricingPlan } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

export default function AdminPricingPage() {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [planToDelete, setPlanToDelete] = useState<PricingPlan | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchPlans() {
      try {
        const fetchedPlans = await getPricingPlans();
        setPlans(fetchedPlans);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load pricing plans.",
        });
      } finally {
        setLoading(false);
      }
    }
    fetchPlans();
  }, [toast]);

  const handleDelete = async () => {
    if (planToDelete) {
      try {
        await deletePricingPlan(planToDelete.id);
        setPlans(plans.filter(p => p.id !== planToDelete.id));
        toast({
          title: "Success",
          description: "Pricing plan deleted.",
        });
      } catch (error) {
         toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to delete pricing plan.",
        });
      } finally {
        setPlanToDelete(null);
      }
    }
  };

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
          <h1 className="text-3xl font-bold tracking-tight font-headline">Pricing Plans</h1>
          <p className="text-muted-foreground">Manage your service pricing tiers.</p>
        </div>
        <Button asChild>
          <Link href="/admin/pricing/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Plan
          </Link>
        </Button>
      </div>
      
      <AlertDialog>
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Plan Title</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead><span className="sr-only">Actions</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {plans.map((plan) => (
                  <TableRow key={plan.id}>
                    <TableCell className="font-medium">{plan.title}</TableCell>
                    <TableCell>{plan.price}</TableCell>
                    <TableCell>
                      {plan.recommended && <Badge>Recommended</Badge>}
                    </TableCell>
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
                              <Link href={`/admin/pricing/${plan.id}/edit`}>Edit</Link>
                           </DropdownMenuItem>
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem
                              className="text-destructive"
                              onSelect={() => setPlanToDelete(plan)}
                            >
                              Delete
                            </DropdownMenuItem>
                          </AlertDialogTrigger>
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
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the "{planToDelete?.title}" pricing plan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setPlanToDelete(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
