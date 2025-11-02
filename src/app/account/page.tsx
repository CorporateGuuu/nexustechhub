import { getServerSession } from 'next-auth';
import { authOptions } from 'lib/auth';
import { redirect } from 'next/navigation';

export default async function AccountPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/auth/signin');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Account</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <p><strong>Email:</strong> {session.user?.email}</p>
        <p><strong>Role:</strong> {session.user?.role}</p>
        {session.user?.role !== 'retail' && (
          <p className="text-green-600">Wholesale pricing active</p>
        )}
      </div>
    </div>
  );
}
