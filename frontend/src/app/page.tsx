'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthProvider';

export default function Home() {
  const router = useRouter();
  const { token, role, loading } = useAuth();

  useEffect(() => {
    if (loading) return;
    if (!token) {
      router.replace('/login');
      return;
    }
    router.replace(role === 'ADMIN' ? '/admin' : '/catalogo');
  }, [loading, token, role, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-500">Carregando...</p>
    </div>
  );
}
