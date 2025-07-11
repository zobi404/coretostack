import { PortfolioForm } from '@/components/admin/PortfolioForm';
import { getPortfolioItem } from "@/lib/services/portfolio-service";
import { notFound } from 'next/navigation';

export default async function EditPortfolioItemPage({ params }: { params: { id: string } }) {
  const project = await getPortfolioItem(params.id);

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
