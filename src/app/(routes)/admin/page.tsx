import StatsCard from './components/StatsCard';
import { supabaseServer } from '../../../lib/supabase/server';

export default async function AdminDashboard() {
  const [users, products, orders, pending] = await Promise.all([
    supabaseServer.from('profiles').select('id', { count: 'exact' }),
    supabaseServer.from('products').select('id', { count: 'exact' }),
    supabaseServer.from('orders').select('id', { count: 'exact' }),
    supabaseServer.from('profiles').select('id', { count: 'exact' }).eq('role', 'pending'),
  ]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatsCard title="Total Users" value={users.count || 0} icon="👥" color="blue" />
        <StatsCard title="Products" value={products.count || 0} icon="📦" color="green" />
        <StatsCard title="Orders" value={orders.count || 0} icon="📋" color="purple" />
        <StatsCard title="Pending Approval" value={pending.count || 0} icon="⏳" color="yellow" />
      </div>
    </div>
  );
}
