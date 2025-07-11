"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { JobForm } from '@/components/admin/JobForm';
import { getJobOpening } from "@/lib/services/job-service";
import type { JobOpening } from '@/lib/types';

export default function EditJobOpeningPage() {
  const params = useParams();
  const id = params.id as string;
  const [job, setJob] = useState<JobOpening | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchJob = async () => {
      try {
        setLoading(true);
        const jobData = await getJobOpening(id);
        if (jobData) {
          setJob(jobData);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error("Failed to fetch job opening:", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (notFound) {
    return <div>Job Opening not found.</div>;
  }
  
  if (!job) {
    return null;
  }

  return (
    <div>
      <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight font-headline">Edit Job Opening</h1>
          <p className="text-muted-foreground">Make changes to an existing job posting.</p>
      </div>
      <JobForm job={job} />
    </div>
  );
}
