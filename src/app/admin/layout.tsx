
import AdminLayoutClient from './AdminLayoutClient';

export const metadata = {
  title: 'Admin Dashboard',
};

export const dynamic = 'force-dynamic';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
