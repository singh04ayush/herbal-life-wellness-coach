import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useHerbal } from '../context/HerbalContext';
import ProductCard from '../components/ProductCard';
import SidebarFilter from '../components/SidebarFilter';

const Products = () => {
  const {
    filteredProducts,
    categories,
    selectedCategory,
    setSelectedCategory,
  } = useHerbal();

  const [sortOrder, setSortOrder] = useState('featured');
  const [showFilters, setShowFilters] = useState(true);
  const pageRef = useRef(null);
  const tabsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.05 }
    );
    pageRef.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [filteredProducts]);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === 'price_asc') return (a.price || 0) - (b.price || 0);
    if (sortOrder === 'price_desc') return (b.price || 0) - (a.price || 0);
    return 0;
  });

  const scrollTabs = (dir) => {
    if (tabsRef.current) {
      tabsRef.current.scrollBy({ left: dir === 'right' ? 200 : -200, behavior: 'smooth' });
    }
  };

  return (
    <div ref={pageRef} className="pt-20 min-h-screen bg-white">
      {/* Top Navigation Tabs */}
      <div className="border-b border-gray-100 sticky top-16 bg-white z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative group">
          <div 
            ref={tabsRef}
            className="flex items-center gap-12 overflow-x-auto no-scrollbar scroll-smooth py-4"
          >
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`relative pb-4 text-sm font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'text-[#2d5a27]'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                {cat.name}
                {selectedCategory === cat.id && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2d5a27]"
                  />
                )}
              </button>
            ))}
          </div>
          
          {/* Scroll Arrows */}
          <button 
            onClick={() => scrollTabs('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-full bg-gradient-to-r from-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-start pl-2"
          >
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button 
            onClick={() => scrollTabs('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-full bg-gradient-to-l from-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-end pr-2"
          >
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter/Sort Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-gray-200 bg-gray-50/50 hover:bg-gray-100 transition-all text-sm font-semibold text-gray-700"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h7"/></svg>
            Filter
          </button>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400 font-medium">{sortedProducts.length} Products</span>
            <div className="relative">
              <select
                value={sortOrder}
                onChange={e => setSortOrder(e.target.value)}
                className="appearance-none pl-4 pr-10 py-2.5 rounded-lg border border-gray-200 bg-white text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-100 cursor-pointer min-w-[180px]"
              >
                <option value="featured">Sort by: Featured</option>
                <option value="price_asc">Sort by: Price: Low to High</option>
                <option value="price_desc">Sort by: Price: High to Low</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <AnimatePresence>
            {showFilters && (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full lg:w-64 flex-shrink-0"
              >
                <SidebarFilter />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Product Grid */}
          <div className="flex-1">
            {sortedProducts.length === 0 ? (
              <div className="text-center py-24 bg-gray-50 rounded-3xl">
                <p className="text-5xl mb-4">🌿</p>
                <p className="text-gray-500 text-lg font-medium">No products match your filters.</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 px-8 py-3 rounded-full text-white text-sm font-bold shadow-lg shadow-green-100/50 hover:-translate-y-0.5 transition-all"
                  style={{ background: '#2d5a27' }}
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {sortedProducts.map(product => (
                  <div key={product.product_id || product.sku} className="reveal">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
