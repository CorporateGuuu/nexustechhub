import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-red-600 text-white p-6">
      <h2 className="text-xl font-bold mb-8">NEXUS ADMIN</h2>
      <nav className="space-y-2">
        <Link href="/admin" className="block py-2 px-4 rounded hover:bg-red-700">Dashboard</Link>
        <Link href="/admin/users" className="block py-2 px-4 rounded hover:bg-red-700">Users</Link>
        <Link href="/admin/products" className="block py-2 px-4 rounded hover:bg-red-700">Products</Link>
        <Link href="/admin/orders" className="block py-2 px-4 rounded hover:bg-red-700">Orders</Link>
      </nav>
    </aside>
  );
}
