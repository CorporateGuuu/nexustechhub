'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Package, Truck, Mail, Home, ShoppingBag } from 'lucide-react';
import { useCart } from '../../../stores/cartStore';

export default function CheckoutSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const sessionId = searchParams.get('session_id');
  const orderId = searchParams.get('order_id');

  useEffect(() => {
    const handleSuccess = async () => {
      try {
        // Clear the cart on successful checkout
        clearCart();

        // Simulate order details (in real app, fetch from API)
        setOrderDetails({
          orderNumber: orderId || `ORD-${Date.now().toString().slice(-8)}`,
          total: 299.99,
          items: 3,
          email: 'customer@example.com'
        });

      } catch (error) {
        console.error('Order processing error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    handleSuccess();
  }, [clearCart, orderId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Processing your order...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              NEXUS TECH
            </Link>
            <Link href="/" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="text-center mb-8">
          {/* Success Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Order Confirmed!
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Thank you for your purchase. Your order has been successfully placed and is being processed.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Order Details</h2>
          </div>

          <div className="px-6 py-6 space-y-6">
            {/* Order Number */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Package className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-900">Order Number</span>
              </div>
              <span className="text-gray-900 font-mono text-sm bg-gray-100 px-3 py-1 rounded">
                {orderDetails?.orderNumber}
              </span>
            </div>

            {/* Order Status */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="font-medium text-gray-900">Order Status</span>
              </div>
              <span className="text-green-700 font-medium">Confirmed</span>
            </div>

            {/* Total Amount */}
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-900">Total Amount</span>
              <span className="text-xl font-bold text-gray-900">
                ${orderDetails?.total?.toFixed(2) || '299.99'}
              </span>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* What's Next */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-600" />
                What happens next?
              </h3>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-sm font-semibold">1</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Order Confirmation</p>
                    <p className="text-sm text-gray-600">You'll receive an email confirmation within the next few minutes.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-sm font-semibold">2</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Processing</p>
                    <p className="text-sm text-gray-600">We'll process your order and prepare it for shipping (1-2 business days).</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-sm font-semibold">3</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Shipping</p>
                    <p className="text-sm text-gray-600">Track your package once it ships. Free shipping on orders over $99.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Link
                href="/account/orders"
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <Package className="w-4 h-4" />
                View Orders
              </Link>
              <Link
                href="/parts"
                className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 mb-4">
            Questions about your order? Contact our support team at{' '}
            <a href="mailto:support@nexustechhub.com" className="text-blue-600 hover:text-blue-800">
              support@nexustechhub.com
            </a>
          </p>
          <p className="text-xs text-gray-500">
            By completing this purchase, you agree to our terms of service and privacy policy.
          </p>
        </div>
      </div>
    </div>
  );
}
