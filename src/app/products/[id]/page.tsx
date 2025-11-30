'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../../../stores/cartStore';
import { Button } from '../../../components/ui/button';
import { Card, CardContent } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Separator } from '../../../components/ui/separator';
import { Loader2, ShoppingCart, ArrowLeft, Star } from 'lucide-react';
import { toast } from 'sonner';

interface Product {
  id: string;
  name: string;
  description: string;
  category_id?: string;
  brand_id?: string;
  categories?: { name: string };
  brands?: { name: string };
  price: number;
  discount_percentage?: number;
  image_url?: string;
  stock_quantity: number;
  tags?: string[];
  reviews?: { count: number; averageRating: number };
}

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const { addItem } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${productId}`);
        if (!response.ok) {
          throw new Error('Product not found');
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image_url || '/placeholder.png',
        condition: 'New', // Default condition
      });
      toast.success('Added to cart!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin h-8 w-8 mx-auto mb-4" />
          <p>Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="text-center py-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-6">{error || 'The product you\'re looking for doesn\'t exist.'}</p>
            <Link href="/products">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Products
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const images = [product.image_url || '/placeholder.png'];
  const hasDiscount = product.discount_percentage && product.discount_percentage > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-gray-900">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-gray-900">Products</Link>
            <span>/</span>
            <span className="text-gray-900">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100">
              <Image
                src={images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            {images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 relative rounded border-2 ${
                      selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover rounded"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="secondary">{product.brands?.name || 'Unknown Brand'}</Badge>
                <Badge variant="outline">{product.categories?.name || 'Unknown Category'}</Badge>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-sm text-gray-600 ml-1">
                    ({product.reviews?.averageRating || 0})
                  </span>
                </div>
                <span className={`text-sm font-medium ${product.stock_quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {product.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
              {hasDiscount && (
                <>
                  <span className="text-xl text-gray-500 line-through">
                    ${(product.price / (1 - product.discount_percentage! / 100)).toFixed(2)}
                  </span>
                  <Badge variant="destructive">
                    {product.discount_percentage}% OFF
                  </Badge>
                </>
              )}
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {product.tags && product.tags.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <Badge key={tag} variant="outline">{tag}</Badge>
                  ))}
                </div>
              </div>
            )}

            <Separator />

            <div className="space-y-4">
              <Button
                onClick={handleAddToCart}
                disabled={product.stock_quantity <= 0}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-6 text-lg"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {product.stock_quantity > 0 ? 'Add to Cart' : 'Out of Stock'}
              </Button>

              <div className="flex space-x-4">
                <Button variant="outline" className="flex-1">
                  Add to Wishlist
                </Button>
                <Button variant="outline" className="flex-1">
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
