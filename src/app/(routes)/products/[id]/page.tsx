import ProductDetail from 'src/components/Product/ProductDetail';
import { getProduct } from 'src/lib/api';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const client = await import('src/lib/mongodb').then(m => m.default);
  const db = (await client).db('nexus');
  const products = await db.collection('products').find({}).toArray();
  return products.map(p => ({ id: p.id }));
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);
  if (!product) notFound();

  return <ProductDetail product={product} />;
}
