import React, { useEffect, useRef } from 'react';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import TestimonialSection from '../components/TestimonialSection';
import ContactUsSection from '../components/ContactUsSection';
import ProductCard from '../components/ProductCard';
import { useHerbal } from '../context/HerbalContext';
import { Link } from 'react-router-dom';
import doodle1 from '../assets/doodle1.png';

const Home = () => {
  const { allProducts } = useHerbal();
  const sectionRef = useRef(null);

  // Show 8 featured products
  const featured = allProducts.slice(0, 8);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.05 }
    );
    sectionRef.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <HeroSection />
      <FeaturesSection />

      {/* Featured Products Section */}
      <section ref={sectionRef} className="py-24 relative" style={{ background: '#fafdf9' }}>
        <img src={doodle1} alt="" className="absolute top-8 left-8 w-16 opacity-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
            <div>
              <span
                className="inline-block px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-3"
                style={{ background: '#e8f5e2', color: '#2d5a27' }}
              >
                Top Picks
              </span>
              <h2
                className="text-4xl sm:text-5xl font-bold"
                style={{ color: '#1a3a16', fontFamily: '"Caveat", cursive' }}
              >
                Our bestsellers
              </h2>
            </div>
            <Link
              to="/products"
              className="flex items-center gap-2 font-semibold text-sm transition-all hover:gap-4"
              style={{ color: '#2d5a27' }}
            >
              View all products
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>

          <div className="reveal grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {featured.map(product => (
              <ProductCard key={product.product_id || product.sku} product={product} />
            ))}
          </div>
        </div>
      </section>

     

      <TestimonialSection />
      <ContactUsSection />
    </div>
  );
};

export default Home;
