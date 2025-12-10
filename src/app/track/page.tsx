'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import {
  Search,
  CheckCircle,
  Clock,
  Truck,
  Package,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  AlertCircle
} from 'lucide-react';

// Form validation schema
const trackingSchema = z.object({
  orderNumber: z.string().min(1, 'Order number is required'),
});

type TrackingFormData = z.infer<typeof trackingSchema>;

// Mock order data
const mockOrders: Record<string, any> = {
  'ORD-8K9P2M': {
    orderNumber: 'ORD-8K9P2M',
    status: 'shipped',
    statusText: 'Shipped',
    timeline: [
      {
        step: 'Order Placed',
        date: 'Dec 5, 2024, 2:30 PM',
        completed: true,
        description: 'Your order has been received and is being processed.'
      },
      {
        step: 'Processing',
        date: 'Dec 6, 2024, 10:15 AM',
        completed: true,
        description: 'We are preparing your items for shipment.'
      },
      {
        step: 'Shipped',
        date: 'Dec 7, 2024, 8:45 AM',
        completed: true,
        description: 'Your order has been shipped and is on its way.'
      },
      {
        step: 'Out for Delivery',
        date: 'Dec 9, 2024',
        completed: false,
        description: 'Your package is out for delivery and will arrive today.'
      },
      {
        step: 'Delivered',
        date: 'Dec 9, 2024',
        completed: false,
        description: 'Your order has been delivered successfully.'
      }
    ],
    tracking: {
      number: '1Z999AA1234567890',
      carrier: 'UPS',
      url: 'https://www.ups.com/track?trackingNumber=1Z999AA1234567890'
    },
    delivery: {
      estimated: 'Dec 9, 2024',
      address: '123 Main St, New York, NY 10001'
    },
    items: [
      {
        id: '1',
        name: 'iPad Pro 13" Display Assembly',
        price: 299.99,
        quantity: 1,
        image: '/images/products/ipad-display.jpg'
      },
      {
        id: '2',
        name: 'Battery Replacement Kit',
        price: 89.99,
        quantity: 1,
        image: '/images/products/battery.jpg'
      }
    ],
    total: 389.98
  },
  'ORD-7H4N9L': {
    orderNumber: 'ORD-7H4N9L',
    status: 'delivered',
    statusText: 'Delivered',
    timeline: [
      {
        step: 'Order Placed',
        date: 'Nov 28, 2024, 4:20 PM',
        completed: true,
        description: 'Your order has been received and is being processed.'
      },
      {
        step: 'Processing',
        date: 'Nov 29, 2024, 11:30 AM',
        completed: true,
        description: 'We are preparing your items for shipment.'
      },
      {
        step: 'Shipped',
        date: 'Nov 30, 2024, 9:15 AM',
        completed: true,
        description: 'Your order has been shipped and is on its way.'
      },
      {
        step: 'Out for Delivery',
        date: 'Dec 2, 2024, 2:45 PM',
        completed: true,
        description: 'Your package was out for delivery.'
      },
      {
        step: 'Delivered',
        date: 'Dec 2, 2024, 4:30 PM',
        completed: true,
        description: 'Your order has been delivered successfully.'
      }
    ],
    tracking: {
      number: '9405511899223197428490',
      carrier: 'FedEx',
      url: 'https://www.fedex.com/en-us/tracking.html'
    },
    delivery: {
      estimated: 'Dec 2, 2024',
      address: '456 Oak Ave, Los Angeles, CA 90210'
    },
    items: [
      {
        id: '3',
        name: 'MacBook Pro Logic Board',
        price: 599.99,
        quantity: 1,
        image: '/images/products/macbook-logic.jpg'
      }
    ],
    total: 599.99
  },
  'ORD-3R6T8P': {
    orderNumber: 'ORD-3R6T8P',
    status: 'processing',
    statusText: 'Processing',
    timeline: [
      {
        step: 'Order Placed',
        date: 'Dec 8, 2024, 6:45 PM',
        completed: true,
        description: 'Your order has been received and is being processed.'
      },
      {
        step: 'Processing',
        date: 'Dec 9, 2024',
        completed: true,
        description: 'We are preparing your items for shipment.'
      },
      {
        step: 'Shipped',
        date: null,
        completed: false,
        description: 'Your order will be shipped soon.'
      },
      {
        step: 'Out for Delivery',
        date: null,
        completed: false,
        description: 'Your package will be out for delivery soon.'
      },
      {
        step: 'Delivered',
        date: null,
        completed: false,
        description: 'Your order will be delivered soon.'
      }
    ],
    tracking: null,
    delivery: {
      estimated: 'Dec 12, 2024',
      address: '789 Pine St, Chicago, IL 60601'
    },
    items: [
      {
        id: '4',
        name: 'iPhone Battery + Tools Kit',
        price: 49.99,
        quantity: 2,
        image: '/images/products/iphone-battery.jpg'
      }
    ],
    total: 99.98
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'processing': return 'bg-yellow-100 text-yellow-800';
    case 'shipped': return 'bg-blue-100 text-blue-800';
    case 'delivered': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'processing': return <Clock className="w-5 h-5" />;
    case 'shipped': return <Truck className="w-5 h-5" />;
    case 'delivered': return <CheckCircle className="w-5 h-5" />;
    default: return <Package className="w-5 h-5" />;
  }
};

export default function TrackPage() {
  const [orderData, setOrderData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TrackingFormData>({
    resolver: zodResolver(trackingSchema),
    defaultValues: {
      orderNumber: 'ORD-8K9P2M' // Pre-filled example
    }
  });

  const onSubmit = async (data: TrackingFormData) => {
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const order = mockOrders[data.orderNumber];

    if (order) {
      setOrderData(order);
      toast.success('Order found!', {
        description: `Tracking order ${data.orderNumber}`
      });
    } else {
      setOrderData(null);
      toast.error('Order not found', {
        description: 'Please check your order number and try again.'
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Track Your Order</h1>
            <p className="text-gray-600">Enter your order number to see real-time updates on your shipment.</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Search Form */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-700 mb-2">
                Order Number
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <input
                    {...register('orderNumber')}
                    type="text"
                    id="orderNumber"
                    placeholder="e.g. ORD-8K9P2M"
                    className={`w-full px-4 py-3 border rounded-lg text-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.orderNumber ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.orderNumber && (
                    <p className="text-sm text-red-600 mt-1">{errors.orderNumber.message}</p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <Search className="w-5 h-5" />
                  )}
                  Track Order
                </button>
              </div>
            </div>

            <div className="text-sm text-gray-500">
              <p>Example: Try <code className="bg-gray-100 px-2 py-1 rounded text-xs">ORD-8K9P2M</code> or <code className="bg-gray-100 px-2 py-1 rounded text-xs">ORD-7H4N9L</code> or <code className="bg-gray-100 px-2 py-1 rounded text-xs">ORD-3R6T8P</code></p>
            </div>
          </form>
        </div>

        {/* Order Tracking Results */}
        {orderData && (
          <div className="space-y-6">
            {/* Order Header */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Order {orderData.orderNumber}</h2>
                  <p className="text-gray-600">Ordered on {orderData.timeline[0]?.date}</p>
                </div>
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(orderData.status)}`}>
                  {getStatusIcon(orderData.status)}
                  {orderData.statusText}
                </div>
              </div>

              {/* Delivery Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Delivery Address</p>
                    <p className="text-sm text-gray-600">{orderData.delivery.address}</p>
                  </div>
                </div>

                {orderData.tracking && (
                  <div className="flex items-start gap-3">
                    <Truck className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Tracking Number</p>
                      <p className="text-sm text-gray-600">{orderData.tracking.number}</p>
                      <p className="text-sm text-blue-600">via {orderData.tracking.carrier}</p>
                      <a
                        href={orderData.tracking.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 mt-1"
                      >
                        Track with {orderData.tracking.carrier} <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <Package className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Estimated Delivery</p>
                    <p className="text-sm text-gray-600">{orderData.delivery.estimated}</p>
                    {orderData.status === 'shipped' && (
                      <p className="text-sm text-green-600 font-medium">On time</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Order Timeline</h3>

              <div className="space-y-6">
                {orderData.timeline.map((step: any, index: number) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      step.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                    }`}>
                      {step.completed ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <Clock className="w-5 h-5" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className={`text-sm font-medium ${step.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                          {step.step}
                        </h4>
                        {step.date && (
                          <span className="text-sm text-gray-500">{step.date}</span>
                        )}
                      </div>
                      <p className={`text-sm ${step.completed ? 'text-gray-600' : 'text-gray-400'}`}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Order Summary</h3>

              <div className="space-y-4 mb-6">
                {orderData.items.map((item: any) => (
                  <div key={item.id} className="flex items-center gap-4 py-4 border-b border-gray-100 last:border-b-0">
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover rounded-lg"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/images/products/placeholder.svg';
                        }}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>

                    <div className="text-sm font-medium text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>${orderData.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Support Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="text-center">
                <AlertCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Need Help?</h3>
                <p className="text-gray-600 mb-6">
                  Have questions about your order? Our support team is here to help.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="tel:+1-800-NEXUS-01"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    Call Support
                  </a>

                  <a
                    href="mailto:support@nexustechhub.com"
                    className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    Email Support
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Help Text */}
        {!orderData && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">How to find your order number</h3>
            <div className="text-sm text-gray-600 space-y-2 max-w-md mx-auto">
              <p>• Check your order confirmation email</p>
              <p>• Look in your account order history</p>
              <p>• Order numbers start with "ORD-" followed by 6 characters</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
