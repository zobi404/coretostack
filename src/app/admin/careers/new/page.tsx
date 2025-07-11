import { JobForm } from '@/components/admin/JobForm';

export default function NewJobOpeningPage() {
  return (
    <div>
      <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight font-headline">Create New Job Opening</h1>
          <p className="text-muted-foreground">Fill in the details below to add a new job posting.</p>
      </div>
      <JobForm />
    </div>
  );
}
