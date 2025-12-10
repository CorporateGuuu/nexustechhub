'use client';

import Link from 'next/link';
import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function CategoriesGrid() {
  const categories = [
    { name: 'iPhone Parts', image: 'https://images.unsplash.com/photo-1592286131072-82af6b3a8f1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80', link: '/categories/iphone-parts' },
    { name: 'iPad Parts', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80', link: '/categories/ipad-parts' },
    { name: 'MacBook Parts', image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80', link: '/categories/macbook-parts' },
    { name: 'Watch Parts', image: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80', link: '/categories/watch-parts' },
    { name: 'AirPods Parts', image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80', link: '/categories/airpods-parts' },
    { name: 'Samsung Parts', image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80', link: '/categories/samsung-parts' },
    { name: 'Game Console', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80', link: '/categories/game-console' },
    { name: 'Motorola Parts', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80', link: '/categories/motorola-parts' },
    { name: 'Google Parts', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80', link: '/categories/google-parts' },
    { name: 'OnePlus Parts', image: 'https://images.unsplash.com/photo-1592286131072-82af6b3a8f1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80', link: '/categories/oneplus-parts' },
    { name: 'Sony Parts', image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80', link: '/categories/sony-parts' },
    { name: 'Other Brands', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80', link: '/categories/other-brands' }
  ];

  return (
    <section className="py-5" style={{ backgroundColor: 'white', height: '400px', margin: '20px' }}>
      <div className="container">
        <div className="row g-3">
          {categories.map((category, index) => (
            <div key={index} className="col-lg-3 col-md-4 col-sm-6 col-12">
              <div className="category-card h-100">
                <Link href={category.link} className="text-decoration-none">
                  <div
                    className="card border-0 shadow-sm h-100 category-card-inner"
                    style={{
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                    }}
                  >
                    <div
                      className="card-img-top d-flex align-items-center justify-content-center bg-light overflow-hidden"
                      style={{
                        height: '200px',
                        width: '100%',
                        backgroundColor: '#f8f9fa',
                        borderTopLeftRadius: '0.375rem',
                        borderTopRightRadius: '0.375rem'
                      }}
                    >
                      <Image
                        src={category.image}
                        alt={category.name}
                        width={300}
                        height={200}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        quality={85}
                      />
                    </div>
                    <div className="card-body text-center p-3">
                      <h6
                        className="card-title mb-0"
                        style={{
                          color: '#007bff',
                          fontWeight: '600',
                          fontSize: '16px'
                        }}
                      >
                        {category.name}
                      </h6>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .category-card {
          margin-bottom: 1rem;
        }

        .category-card-inner {
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          border-radius: 0.375rem;
          overflow: hidden;
        }

        .category-card-inner:hover {
          text-decoration: none;
        }

        @media (max-width: 575.98px) {
          .category-card {
            margin-bottom: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}
