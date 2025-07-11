import { PortfolioForm } from '@/components/admin/PortfolioForm';

export default function NewPortfolioProjectPage() {
  return (
    <div>
      <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight font-headline">Add New Project</h1>
          <p className="text-muted-foreground">Fill in the details below to add a new project to your portfolio.</p>
      </div>
      <PortfolioForm />
    </div>
  );
}
