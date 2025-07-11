import { PortfolioForm } from '@/components/admin/PortfolioForm';
import { mockPortfolioItems } from "@/lib/mock-data";
import { notFound } from 'next/navigation';

// This would fetch real data in a real app
async function getProject(id: string) {
    const projectId = parseInt(id, 10);
    return mockPortfolioItems.find(p => p.id === projectId);
}

export default async function EditPortfolioItemPage({ params }: { params: { id: string } }) {
  const project = await getProject(params.id);

  if (!project) {
    return notFound();
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
