'use client';
import { useRouter } from 'next/navigation';

import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment/succes`,
      },
    });

    if (error) {
      setError(error.message ?? 'Une erreur est survenue.');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <PaymentElement />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        type="submit"
        disabled={loading || !stripe}
        className="bg-blue-600 text-white py-2 px-4 rounded disabled:opacity-50"
      >
        {loading ? 'Traitement...' : 'Payer 1,99 €'}
      </button>
    </form>
  );
}

export default function PaymentPage() {
  const router = useRouter();
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  

 useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
        router.push('/login');
        return;
    }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payment/intent`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));
}, [router]);
  if (!clientSecret) return <p className="p-8">Chargement...</p>;

  return (
    <div className="max-w-md mx-auto mt-16 p-8 border rounded-xl shadow">
      <h1 className="text-xl font-semibold mb-6">Accéder au questionnaire</h1>
      <p className="text-sm text-gray-600 mb-6">
        Un accès unique à 1,99 € pour évaluer vos habitudes numériques.
      </p>
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}
