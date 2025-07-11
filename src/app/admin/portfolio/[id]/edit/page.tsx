
"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { PortfolioForm } from '@/components/admin/PortfolioForm';
import { getPortfolioItem } from "@/lib/services/portfolio-service";
import type { PortfolioItem } from '@/lib/types';

export default function EditPortfolioItemPage() {
  const params = useParams();
  const id = params.id as string;
  const [project, setProject] = useState<PortfolioItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchProject = async () => {
      try {
        setLoading(true);
        const projectData = await getPortfolioItem(id);
        if (projectData) {
          setProject(projectData);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error("Failed to fetch project:", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (notFound) {
    return <div>Project not found.</div>;
  }
  
  if (!project) {
    return null;
  }

  return (
    <div>
      <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight font-headline">Edit Project</h1>
          <p className="text-muted-foreground">Make changes to your existing portfolio project.</p>
      </div>
      <PortfolioForm project={project} />
    </div>
  );
}
