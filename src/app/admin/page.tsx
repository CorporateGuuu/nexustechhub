import ProtectedRoute from 'components/ProtectedRoute';

export default function AdminDashboard() {
  return (
    <ProtectedRoute>
      <div className="p-10">
        <h1 className="text-4xl font-black mb-8">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">User Management</h3>
            <p className="text-white/60 mb-4">Manage user accounts and permissions</p>
            <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:scale-105 transition">
              Manage Users
            </button>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Order Analytics</h3>
            <p className="text-white/60 mb-4">View sales data and analytics</p>
            <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:scale-105 transition">
              View Analytics
            </button>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Product Inventory</h3>
            <p className="text-white/60 mb-4">Manage product catalog and stock</p>
            <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:scale-105 transition">
              Manage Products
            </button>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">Recent Activity</h2>
          <div className="bg-black/50 border border-white/10 rounded-2xl p-6">
            <p className="text-white/60">Admin dashboard features coming soon...</p>
            <ul className="mt-4 space-y-2 text-white/80">
              <li>✅ User role management</li>
              <li>✅ Order analytics and reporting</li>
              <li>✅ Product inventory management</li>
              <li>✅ Wholesale account approvals</li>
              <li>✅ System configuration</li>
            </ul>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
