'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import FormLogin from '@/app/components/FormLogin';
import { useAuth } from '@/contexts/AuthProvider';

export default function LoginPage() {
  const router = useRouter();
  const { token, role, loading } = useAuth();

  useEffect(() => {
    if (loading || !token) return;
    router.replace(role === 'ADMIN' ? '/admin' : '/catalogo');
  }, [loading, token, role, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Carregando...</p>
      </div>
    );
  }

  if (token) return null;

  return <FormLogin />;
}
