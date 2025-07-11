import { notFound } from 'next/navigation';
import { getPortfolioItems } from '@/lib/services/portfolio-service';
import PortfolioDetailClient from './PortfolioDetailClient';

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const items = await getPortfolioItems();
    return items.map(item => ({
      id: item.id,
    }));
  } catch (error) {
    console.error("Failed to generate static params for portfolio items:", error);
    return [];
  }
}

export default function PortfolioDetailPage({ params }: { params: { id: string } }) {
  if (!params.id) {
    notFound();
  }

  return <PortfolioDetailClient id={params.id} />;
}
