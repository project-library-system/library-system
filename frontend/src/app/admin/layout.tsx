import SidebarAdmin from '@/app/components/SidebarAdmin';
import { ProtectedRoute } from '@/app/components/ProtectedRoute';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={['ADMIN']}>
      <div className="flex min-h-screen">
        <SidebarAdmin />
        <main className="flex-1 ml-64">{children}</main>
      </div>
    </ProtectedRoute>
  );
}
