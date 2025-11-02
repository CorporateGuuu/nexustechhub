'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function Hero() {
  const slides = [
    {
      title: 'Free Shipping on Orders Over $250',
      subtitle: 'Across UAE & GCC',
      cta: 'Shop Now',
      link: '/products',
      bg: 'from-blue-600 to-blue-800'
    },
    {
      title: 'iPhone 16 Parts Now Available',
      subtitle: 'OLED Screens, Batteries, Cameras',
      cta: 'Explore iPhone 16',
      link: '/products/iphone-parts',
      bg: 'from-purple-600 to-purple-800'
    },
    {
      title: 'Wholesale Pricing',
      subtitle: 'Login to See Exclusive Rates',
      cta: 'Login Now',
      link: '/login',
      bg: 'from-red-600 to-red-800'
    }
  ];

  return (
    <section className="relative">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 5000 }}
        loop
        className="h-96"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div className={`h-full bg-gradient-to-r ${slide.bg} flex items-center justify-center text-white`}>
              <div className="container mx-auto px-4 text-center">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">{slide.title}</h1>
                <p className="text-xl mb-8">{slide.subtitle}</p>
                <Link href={slide.link} className="bg-white text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition inline-flex items-center gap-2">
                  {slide.cta} →
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Trust Badges */}
      <div className="container mx-auto px-4 -mt-8 relative z-10">
        <div className="bg-white rounded-xl shadow-lg p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {['100% Quality Tested', 'Fast UAE Shipping', '30-Day Returns'].map((text, i) => (
            <div key={i} className="flex items-center gap-3 justify-center md:justify-start">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <span className="font-medium">{text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
