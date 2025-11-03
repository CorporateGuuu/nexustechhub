import { supabaseServer } from '../../../../lib/supabase/server';

export default async function UsersPage() {
  const { data: users } = await supabaseServer
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">User Management</h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users?.map((u: any) => (
              <tr key={u.id}>
                <td className="px-6 py-4">{u.first_name} {u.last_name}</td>
                <td className="px-6 py-4">{u.email}</td>
                <td className="px-6 py-4">{u.role || 'retail'}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    u.role === 'admin' ? 'bg-red-100 text-red-800' :
                    u.role === 'wholesale' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {u.role || 'retail'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    {u.role !== 'admin' && (
                      <form action="/api/admin/users/role" method="POST" className="inline">
                        <input type="hidden" name="userId" value={u.id} />
                        <input type="hidden" name="role" value={u.role === 'wholesale' ? 'retail' : 'wholesale'} />
                        <button
                          type="submit"
                          className="text-sm text-blue-600 hover:underline"
                        >
                          {u.role === 'wholesale' ? 'Demote' : 'Promote'}
                        </button>
                      </form>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
