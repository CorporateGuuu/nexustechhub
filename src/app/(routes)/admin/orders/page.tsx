import { Suspense } from 'react';
import DataTable from '../components/DataTable';

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Orders Management</h1>
        <p className="text-gray-600">View and manage customer orders</p>
      </div>

      <Suspense fallback={<div>Loading orders...</div>}>
        <DataTable
          title="Orders"
          endpoint="/api/admin/orders"
          columns={[
            { key: 'id', label: 'Order ID' },
            { key: 'user_email', label: 'Customer' },
            { key: 'total_amount', label: 'Total' },
            { key: 'status', label: 'Status' },
            { key: 'created_at', label: 'Date' },
          ]}
        />
      </Suspense>
    </div>
  );
}
