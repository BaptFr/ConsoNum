'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push('/calculator');
    }, 3000);
  }, [router]);

  return (
    <div className="max-w-md mx-auto mt-16 p-8 border rounded-xl shadow text-center">
      <h1 className="text-xl font-semibold mb-4">Paiement confirmé !</h1>
      <p className="text-sm text-gray-600">
        Vous allez être redirigé vers le questionnaire dans quelques secondes...
      </p>
    </div>
  );
}