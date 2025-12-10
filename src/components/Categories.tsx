'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Categories() {
  const categories = [
    {
      name: 'iPhone Parts',
      description: 'iPhone 5 to iPhone 16 series',
      image: 'https://images.unsplash.com/photo-1592286131072-82af6b3a8f1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      count: '500+ products',
      link: '/products/iphone-parts',
      color: '#007AFF'
    },
    {
      name: 'Samsung Parts',
      description: 'Galaxy S, A, Note, Tab series',
      image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      count: '600+ products',
      link: '/products/samsung-parts',
      color: '#00D4AA'
    },
    {
      name: 'iPad Parts',
      description: 'iPad, iPad Air, iPad Pro',
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      count: '200+ products',
      link: '/products/ipad-parts',
      color: '#5856D6'
    },
    {
      name: 'Repair Tools',
      description: 'Professional equipment',
      image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      count: '150+ products',
      link: '/products/repair-tools',
      color: '#FF9500'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Product Range</h2>
          <p className="text-gray-600">Complete range of repair parts for all major brands</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link key={index} href={category.link} className="group">
              <div className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-gray-200">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-xl mx-auto mb-4 overflow-hidden shadow-md">
                    <Image
                      src={category.image}
                      alt={category.name}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                      quality={85}
                    />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-red-600 transition">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">{category.description}</p>
                  <span className="text-red-600 font-medium text-sm">{category.count}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
