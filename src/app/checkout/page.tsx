'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../../stores/cartStore';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Loader2, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const createCheckoutSession = async () => {
      try {
        // Check if cart is empty
        if (items.length === 0) {
          router.push('/');
          return;
        }

        const response = await fetch('/api/checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            items: items,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to create checkout session');
        }

        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } catch (err) {
        console.error('Checkout error:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
        setIsLoading(false);
        toast.error('Failed to start checkout. Please try again.');
      }
    };

    createCheckoutSession();
  }, [items, router]);

  const handleRetry = () => {
    setError(null);
    setIsLoading(true);
    window.location.reload();
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-red-600">Checkout Error</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-center text-gray-600">{error}</p>
            <div className="flex gap-2">
              <Button onClick={handleRetry} className="flex-1">
                Try Again
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push('/')}
                className="flex-1"
              >
                Go Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center flex items-center justify-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Preparing Checkout
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-red-600" />
          </div>
          <p className="text-center text-gray-600">
            Please wait while we redirect you to secure checkout...
          </p>
          <div className="text-sm text-gray-500 text-center">
            You will be redirected to Stripe's secure payment page.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
