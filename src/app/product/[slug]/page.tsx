import { redirect } from 'next/navigation';

// Redirect old /product/[slug] URLs to new /products/[slug] URLs
export default function ProductRedirectPage({ params }: { params: { slug: string } }) {
  redirect(`/products/${params.slug}`);
}
