import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Sitemap() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the actual sitemap.xml file
    router.replace('/sitemap.xml');
  }, [router]);

  return null; // This component doesn't render anything
}
