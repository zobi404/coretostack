"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Briefcase, ArrowRight } from "lucide-react";
import { getJobOpenings } from "@/lib/services/job-service";
import type { JobOpening } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";

export default function CareersPage() {
  const [jobOpenings, setJobOpenings] = useState<JobOpening[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const jobs = await getJobOpenings();
        setJobOpenings(jobs);
      } catch (error) {
        console.error("Failed to fetch job openings:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, []);

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <section className="text-center mb-16 md:mb-24">
        <h1 className="font-headline text-4xl md:text-6xl font-bold mb-4">Join Our Team</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          We're always looking for talented individuals who are passionate about creating amazing digital experiences. Explore our open positions below.
        </p>
      </section>

      <section className="max-w-4xl mx-auto">
        {loading ? (
          <div className="space-y-8">
            {[...Array(3)].map((_, index) => <JobCardSkeleton key={index} />)}
          </div>
        ) : jobOpenings.length > 0 ? (
          <div className="space-y-8">
            {jobOpenings.map((job) => (
              <Card key={job.id} className="bg-card border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="font-headline text-2xl">{job.title}</CardTitle>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                    <div className="flex items-center gap-1.5">
                      <Briefcase className="w-4 h-4" />
                      <span>{job.type}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" />
                      <span>{job.location}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>{job.description}</CardDescription>
                </CardContent>
                <CardFooter>
                  <Button>
                    Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="font-headline text-2xl font-semibold">No Open Positions</h2>
            <p className="text-muted-foreground mt-2">
              There are currently no open positions. Please check back later.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

function JobCardSkeleton() {
  return (
    <Card className="bg-card border-none shadow-lg">
      <CardHeader>
        <Skeleton className="h-7 w-1/2" />
        <div className="flex items-center gap-4 mt-2">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-5 w-24" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </CardContent>
      <CardFooter>
        <Skeleton className="h-10 w-32" />
      </CardFooter>
    </Card>
  );
}
