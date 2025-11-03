import { Suspense } from 'react';
import DataTable from '../components/DataTable';

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Products Management</h1>
        <p className="text-gray-600">Manage product inventory and details</p>
      </div>

      <Suspense fallback={<div>Loading products...</div>}>
        <DataTable
          title="Products"
          endpoint="/api/products"
          columns={[
            { key: 'id', label: 'ID' },
            { key: 'name', label: 'Name' },
            { key: 'price', label: 'Price' },
            { key: 'category', label: 'Category' },
            { key: 'stock_quantity', label: 'Stock' },
            { key: 'created_at', label: 'Created' },
          ]}
        />
      </Suspense>
    </div>
  );
}
