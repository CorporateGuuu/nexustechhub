import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import SEOHead from '../../components/SEOHead';
import UnifiedHeader from '../../components/UnifiedHeader/UnifiedHeader';
import Footer from '../../components/Footer';
import WhatsAppButton from '../../components/WhatsAppButton';
import SkeletonProductDetail from '../../components/skeleton/SkeletonProductDetail';
import { supabase } from '../../lib/db';
import styles from '../../styles/ProductDetail.module.css';

export default function ProductDetail() {
  const router = useRouter();
  const { slug } = router.query;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  const fetchProduct = async () => {
    try {
      setLoading(true);

      // Get product with all related data
      const { data: productData, error } = await supabase
        .from('products')
        .select(`
          *,
          categories (
            name,
            slug
          ),
          product_images (
            image_url,
            is_primary,
            display_order
          ),
          product_specifications (*),
          reviews (
            id,
            rating,
            title,
            comment,
            created_at,
            user_id
          )
        `)
        .eq('slug', slug)
        .single();

      if (error) throw error;

      setProduct(productData);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const getProductImages = () => {
    if (!product?.product_images?.length) {
      return [product?.image_url || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=400&fit=crop'];
    }

    return product.product_images
      .sort((a, b) => (a.display_order || 0) - (b.display_order || 0))
      .map(img => img.image_url);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED'
    }).format(price);
  };

  const calculateDiscountedPrice = () => {
    if (!product?.discount_percentage) return product?.price;
    return product.price * (1 - product.discount_percentage / 100);
  };

  const handleQuantityChange = (change) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  const handleAddToCart = () => {
    // TODO: Implement cart functionality
    alert(`Added ${quantity} ${product.name}(s) to cart`);
  };

  const handleBuyNow = () => {
    // TODO: Implement buy now functionality
    alert(`Proceeding to checkout with ${quantity} ${product.name}(s)`);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? styles.starFilled : styles.starEmpty}>
          ★
        </span>
      );
    }
    return stars;
  };

  const averageRating = product?.reviews?.length
    ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length
    : 0;

  if (loading) {
    return (
      <>
        <UnifiedHeader />
        <div className={styles.loading}>
          <SkeletonProductDetail />
        </div>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <UnifiedHeader />
        <div className={styles.notFound}>
          <h1>Product Not Found</h1>
          <p>The product you're looking for doesn't exist.</p>
          <button onClick={() => router.push('/products')} className={styles.backButton}>
            Back to Products
          </button>
        </div>
        <Footer />
      </>
    );
  }

  const images = getProductImages();

  return (
    <>
      <SEOHead
        title={`${product.name} | Nexus TechHub UAE`}
        description={product.description}
        keywords={`${product.name}, ${product.categories?.name}, iPhone parts, mobile repair, UAE`}
        image={images[0]}
      />

      <UnifiedHeader />

      <main className={styles.main}>
        <div className={styles.container}>
          {/* Breadcrumb */}
          <nav className={styles.breadcrumb}>
            <a href="/">Home</a> /
            <a href="/products">Products</a> /
            <a href={`/products?category=${product.category_id}`}>{product.categories?.name}</a> /
            <span>{product.name}</span>
          </nav>

          <div className={styles.productDetail}>
            {/* Product Images */}
            <div className={styles.imageSection}>
              <div className={styles.mainImage}>
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=400&fit=crop';
                  }}
                />
              </div>

              {images.length > 1 && (
                <div className={styles.thumbnailGrid}>
                  {images.map((image, index) => (
                    <div
                      key={index}
                      className={`${styles.thumbnail} ${selectedImage === index ? styles.active : ''}`}
                      onClick={() => setSelectedImage(index)}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=80&fit=crop';
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className={styles.infoSection}>
              <div className={styles.productHeader}>
                <h1>{product.name}</h1>
                <div className={styles.productMeta}>
                  <span className={styles.category}>{product.categories?.name}</span>
                  <span className={styles.sku}>SKU: {product.sku}</span>
                </div>

                {/* Rating */}
                {product.reviews?.length > 0 && (
                  <div className={styles.rating}>
                    <div className={styles.stars}>
                      {renderStars(Math.round(averageRating))}
                    </div>
                    <span className={styles.ratingText}>
                      {averageRating.toFixed(1)} ({product.reviews.length} reviews)
                    </span>
                  </div>
                )}
              </div>

              {/* Price */}
              <div className={styles.priceSection}>
                <div className={styles.priceContainer}>
                  <span className={styles.currentPrice}>
                    {formatPrice(calculateDiscountedPrice())}
                  </span>
                  {product.discount_percentage > 0 && (
                    <>
                      <span className={styles.originalPrice}>
                        {formatPrice(product.price)}
                      </span>
                      <span className={styles.discountBadge}>
                        {product.discount_percentage}% OFF
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Stock Status */}
              <div className={styles.stockStatus}>
                {product.stock_quantity > 0 ? (
                  <span className={styles.inStock}>
                    ✅ In Stock ({product.stock_quantity} available)
                  </span>
                ) : (
                  <span className={styles.outOfStock}>
                    ❌ Out of Stock
                  </span>
                )}
              </div>

              {/* Description */}
              <div className={styles.description}>
                <h3>Description</h3>
                <p>{product.description}</p>
              </div>

              {/* Specifications */}
              {product.product_specifications && product.product_specifications.length > 0 && (
                <div className={styles.specifications}>
                  <h3>Specifications</h3>
                  <div className={styles.specGrid}>
                    {Object.entries(product.product_specifications[0])
                      .filter(([key]) => !['id', 'product_id', 'created_at', 'updated_at'].includes(key))
                      .map(([key, value]) => (
                        <div key={key} className={styles.specItem}>
                          <span className={styles.specLabel}>
                            {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}:
                          </span>
                          <span className={styles.specValue}>{value || 'N/A'}</span>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* Quantity and Actions */}
              {product.stock_quantity > 0 && (
                <div className={styles.purchaseSection}>
                  <div className={styles.quantitySelector}>
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                      className={styles.quantityButton}
                    >
                      -
                    </button>
                    <span className={styles.quantity}>{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= product.stock_quantity}
                      className={styles.quantityButton}
                    >
                      +
                    </button>
                  </div>

                  <div className={styles.actionButtons}>
                    <button
                      onClick={handleAddToCart}
                      className={styles.addToCartButton}
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={handleBuyNow}
                      className={styles.buyNowButton}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              )}

              {/* Badges */}
              <div className={styles.badges}>
                {product.is_featured && <span className={styles.featuredBadge}>Featured Product</span>}
                {product.is_new && <span className={styles.newBadge}>New Arrival</span>}
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          {product.reviews && product.reviews.length > 0 && (
            <div className={styles.reviewsSection}>
              <h2>Customer Reviews</h2>
              <div className={styles.reviewsGrid}>
                {product.reviews.map((review) => (
                  <div key={review.id} className={styles.reviewCard}>
                    <div className={styles.reviewHeader}>
                      <div className={styles.reviewStars}>
                        {renderStars(review.rating)}
                      </div>
                      <span className={styles.reviewDate}>
                        {new Date(review.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    {review.title && (
                      <h4 className={styles.reviewTitle}>{review.title}</h4>
                    )}
                    <p className={styles.reviewComment}>{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Products */}
          <div className={styles.relatedSection}>
            <h2>Related Products</h2>
            <p>Check out similar products in the {product.categories?.name} category</p>
            <button
              onClick={() => router.push(`/products?category=${product.category_id}`)}
              className={styles.viewAllButton}
            >
              View All {product.categories?.name}
            </button>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
