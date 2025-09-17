import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to signin page
    router.replace('/auth/signin');
  }, [router]);

  return null; // This component doesn't render anything
}

export async function getServerSideProps() {
  return {
    redirect: {
      destination: '/auth/signin',
      permanent: true,
    },
  };
}
