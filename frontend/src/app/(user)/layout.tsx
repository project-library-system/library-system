import Sidebar from '@/app/components/Sidebar';
import { ProtectedRoute } from '@/app/components/ProtectedRoute';

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={['USER']}>
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 ml-64">{children}</main>
      </div>
    </ProtectedRoute>
  );
}
