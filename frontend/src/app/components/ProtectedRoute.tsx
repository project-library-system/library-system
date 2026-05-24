'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthProvider';
import type { UserRole } from '@/types';

export function ProtectedRoute({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}) {
  const router = useRouter();
  const { token, role, loading } = useAuth();

  useEffect(() => {
    if (loading) return;
    if (!token) {
      router.replace('/login');
      return;
    }
    if (allowedRoles && role && !allowedRoles.includes(role)) {
      router.replace(role === 'ADMIN' ? '/admin' : '/catalogo');
    }
  }, [loading, token, role, allowedRoles, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center ml-64">
        <p className="text-gray-500">Carregando...</p>
      </div>
    );
  }

  if (!token) return null;
  if (allowedRoles && role && !allowedRoles.includes(role)) return null;

  return <>{children}</>;
}
