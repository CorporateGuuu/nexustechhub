import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../components/Layout/Layout';
import { supabase, getProducts } from '../../lib/supabase';
import styles from '../../styles/ProductGrid.module.css';

export default function CategoryPage() {
  const router = useRouter();
  const { slug } = router.query;

  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    sort_by: 'name',
    sort_order: 'asc',
    min_price: '',
    max_price: '',
    brand: ''
  });

  useEffect(() => {
    if (slug) {
      fetchCategoryData();
    }
  }, [slug]);

  const fetchCategoryData = async () => {
    try {
      setLoading(true);

      // Get main category
      const { data: categoryData, error: categoryError } = await supabase
        .from('categories')
        .select('*')
        .eq('slug', slug)
        .single();

      if (categoryError) {
        console.error('Error fetching category:', categoryError);
        return;
      }

      setCategory(categoryData);

      // Get subcategories
      const { data: subcategoryData, error: subcategoryError } = await supabase
        .from('categories')
        .select('*')
        .eq('parent_id', categoryData.id)
        .order('name');

      if (subcategoryError) {
        console.error('Error fetching subcategories:', subcategoryError);
      } else {
        setSubcategories(subcategoryData || []);
      }

      // Get products for this category and all its subcategories
      const subcategoryIds = subcategoryData ? subcategoryData.map(sub => sub.id) : [];
      const allCategoryIds = [categoryData.id, ...subcategoryIds];

      const { data: productsData, error: productsError } = await getProducts({
        category: allCategoryIds,
        ...filters
      });

      if (productsError) {
        console.error('Error fetching products:', productsError);
      } else {
        setProducts(productsData || []);
      }
    } catch (error) {
      console.error('Error in fetchCategoryData:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    // Refetch products with new filters
    fetchCategoryData();
  };

  const handleSubcategoryClick = (subcategorySlug) => {
    router.push(`/products/${slug}/${subcategorySlug}`);
  };

  if (loading) {
    return (
      <Layout title="Loading...">
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          <div>Loading...</div>
        </div>
      </Layout>
    );
  }

  if (!category) {
    return (
      <Layout title="Category Not Found">
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          <h1>Category Not Found</h1>
          <Link href="/products">← Back to Products</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      title={`${category.name} - Nexus Tech Hub`}
      description={category.description}
    >
      {/* Category Header */}
      <section className="category-hero">
        <div className="container">
          <div className="category-header">
            <div className="breadcrumb">
              <Link href="/products">Products</Link>
              <span>→</span>
              <span>{category.name}</span>
            </div>
            <h1 className="category-title">{category.name}</h1>
            <p className="category-description">{category.description}</p>
            <div className="category-stats">
              <span className="product-count">{products.length} products available</span>
            </div>
          </div>
        </div>
      </section>

      {/* Subcategories */}
      {subcategories.length > 0 && (
        <section className="subcategories-section">
          <div className="container">
            <h2>Categories</h2>
            <div className="subcategories-grid">
              {subcategories.map((subcategory) => (
                <div
                  key={subcategory.id}
                  className="subcategory-card"
                  onClick={() => handleSubcategoryClick(subcategory.slug)}
                >
                  <h3>{subcategory.name}</h3>
                  <p>{subcategory.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Filters */}
      <section className="filters-section">
        <div className="container">
          <div className="filters-bar">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search products..."
                value={filters.search}
                onChange={(e) => handleFilterChange({ search: e.target.value })}
              />
            </div>
            <div className="filter-controls">
              <select
                value={filters.sort_by}
                onChange={(e) => handleFilterChange({ sort_by: e.target.value })}
              >
                <option value="name">Name</option>
                <option value="price">Price</option>
                <option value="created_at">Newest</option>
              </select>
              <select
                value={filters.sort_order}
                onChange={(e) => handleFilterChange({ sort_order: e.target.value })}
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="products-section">
        <div className="container">
          {products.length === 0 ? (
            <div className="no-products">
              <h3>No products found</h3>
              <p>Try adjusting your filters or check back later for new products.</p>
            </div>
          ) : (
            <div className={styles.product_grid}>
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className={styles.product_card}
                >
                  <div className={styles.product_image}>
                    <img
                      src={product.image || '/images/products/placeholder.jpg'}
                      alt={product.name}
                      onError={(e) => {
                        e.target.src = '/images/products/placeholder.jpg';
                      }}
                    />
                    {product.is_featured && (
                      <div className="featured-badge">Featured</div>
                    )}
                    {product.discount_percentage > 0 && (
                      <div className="discount-badge">-{product.discount_percentage}%</div>
                    )}
                  </div>
                  <div className={styles.product_info}>
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-brand">{product.brand}</p>
                    <div className="product-price">
                      {product.discount_percentage > 0 ? (
                        <>
                          <span className="original-price">${product.price}</span>
                          <span className="discounted-price">
                            ${(product.price * (1 - product.discount_percentage / 100)).toFixed(2)}
                          </span>
                        </>
                      ) : (
                        <span className="current-price">${product.price}</span>
                      )}
                    </div>
                    <div className="product-stock">
                      {product.stock > 0 ? (
                        <span className="in-stock">In Stock ({product.stock})</span>
                      ) : (
                        <span className="out-of-stock">Out of Stock</span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <style jsx>{`
        .category-hero {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 4rem 0;
        }

        .category-header {
          text-align: center;
        }

        .breadcrumb {
          margin-bottom: 1rem;
          font-size: 0.875rem;
          opacity: 0.8;
        }

        .breadcrumb a {
          color: white;
          text-decoration: none;
        }

        .breadcrumb a:hover {
          text-decoration: underline;
        }

        .category-title {
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 1rem;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .category-description {
          font-size: 1.25rem;
          opacity: 0.9;
          max-width: 600px;
          margin: 0 auto 2rem;
        }

        .category-stats {
          font-size: 1.125rem;
          opacity: 0.8;
        }

        .subcategories-section {
          padding: 3rem 0;
          background: #f8fafc;
        }

        .subcategories-section h2 {
          text-align: center;
          margin-bottom: 2rem;
          color: #1e293b;
          font-size: 2rem;
          font-weight: 700;
        }

        .subcategories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
        }

        .subcategory-card {
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          cursor: pointer;
          transition: all 0.3s ease;
          border: 1px solid #e5e7eb;
        }

        .subcategory-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
        }

        .subcategory-card h3 {
          margin: 0 0 0.5rem 0;
          color: #1e293b;
          font-size: 1.25rem;
          font-weight: 600;
        }

        .subcategory-card p {
          margin: 0;
          color: #64748b;
          font-size: 0.875rem;
          line-height: 1.5;
        }

        .filters-section {
          padding: 2rem 0;
          background: white;
          border-bottom: 1px solid #e5e7eb;
        }

        .filters-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 2rem;
        }

        .search-box input {
          padding: 0.75rem 1rem;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 1rem;
          width: 300px;
        }

        .filter-controls {
          display: flex;
          gap: 1rem;
        }

        .filter-controls select {
          padding: 0.75rem 1rem;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 0.875rem;
        }

        .products-section {
          padding: 3rem 0;
          background: #f8fafc;
        }

        .no-products {
          text-align: center;
          padding: 4rem 2rem;
        }

        .no-products h3 {
          color: #1e293b;
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }

        .no-products p {
          color: #64748b;
          font-size: 1rem;
        }

        .featured-badge {
          position: absolute;
          top: 10px;
          left: 10px;
          background: #ef4444;
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .discount-badge {
          position: absolute;
          top: 10px;
          right: 10px;
          background: #10b981;
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .product-name {
          font-size: 1rem;
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 0.25rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .product-brand {
          font-size: 0.875rem;
          color: #64748b;
          margin-bottom: 0.5rem;
        }

        .product-price {
          margin-bottom: 0.5rem;
        }

        .original-price {
          text-decoration: line-through;
          color: #9ca3af;
          font-size: 0.875rem;
          margin-right: 0.5rem;
        }

        .discounted-price,
        .current-price {
          font-size: 1.125rem;
          font-weight: 700;
          color: #059669;
        }

        .product-stock {
          font-size: 0.875rem;
        }

        .in-stock {
          color: #059669;
        }

        .out-of-stock {
          color: #dc2626;
        }

        @media (max-width: 768px) {
          .category-title {
            font-size: 2rem;
          }

          .filters-bar {
            flex-direction: column;
            align-items: stretch;
          }

          .search-box input {
            width: 100%;
          }

          .filter-controls {
            justify-content: center;
          }

          .subcategories-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </Layout>
  );
}
