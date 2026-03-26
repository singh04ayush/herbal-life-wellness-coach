import React, { useState, useEffect, useRef } from 'react';
import { useHerbal } from '../context/HerbalContext';
import ProductCard from '../components/ProductCard';
import searchIconImg from '../assets/search_icon.png';
import doodle2 from '../assets/doodle2.png';

const Products = () => {
  const {
    filteredProducts,
    categories,
    categoryResults,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
  } = useHerbal();

  const [sortOrder, setSortOrder] = useState('featured');
  const pageRef = useRef(null);

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

  const currentCategory = categoryResults?.find(c => c.category_id === selectedCategory);

  return (
    <div ref={pageRef} className="pt-16 min-h-screen" style={{ background: '#fafdf9' }}>
      {/* Header */}
      <section
        className="py-16 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #e8f5e2 0%, #f0faf0 100%)' }}
      >
        <img src={doodle2} alt="" className="absolute top-6 right-10 w-16 opacity-15" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal text-center space-y-4">
            <span
              className="inline-block px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-widest"
              style={{ background: '#2d5a27', color: 'white' }}
            >
              All Products
            </span>
            <h1
              className="text-5xl sm:text-6xl font-bold"
              style={{ color: '#1a3a16', fontFamily: '"Caveat", cursive' }}
            >
              {currentCategory?.category_name || 'All Products'}
            </h1>
            {currentCategory?.category_description && (
              <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
                {currentCategory.category_description}
              </p>
            )}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Search & Sort bar */}
        <div className="reveal flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <img src={searchIconImg} alt="" className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-green-200 bg-white focus:outline-none focus:ring-2 text-gray-800 text-sm"
            />
          </div>
          <select
            value={sortOrder}
            onChange={e => setSortOrder(e.target.value)}
            className="px-4 py-3 rounded-xl border border-green-200 bg-white text-gray-700 text-sm focus:outline-none cursor-pointer"
          >
            <option value="featured">Featured</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </div>

        {/* Category tabs — scrollable */}
        <div className="reveal mb-8 overflow-x-auto pb-2">
          <div className="flex gap-2 min-w-max">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'text-white shadow-md'
                    : 'border text-gray-600 hover:border-green-400 hover:text-[#2d5a27]'
                }`}
                style={
                  selectedCategory === cat.id
                    ? { background: 'linear-gradient(135deg, #2d5a27, #4a8c42)', borderColor: 'transparent' }
                    : { background: 'white', borderColor: '#d1e7cc' }
                }
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Products count */}
        <p className="text-sm text-gray-400 mb-6">
          Showing <span className="font-semibold text-gray-600">{sortedProducts.length}</span> products
        </p>

        {/* Products grid using .map() */}
        {sortedProducts.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-5xl mb-4">🌿</p>
            <p className="text-gray-500 text-lg">No products found.</p>
            <button
              onClick={() => { setSelectedCategory('all-products'); setSearchQuery(''); }}
              className="mt-4 px-6 py-2 rounded-full text-white text-sm"
              style={{ background: '#2d5a27' }}
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {sortedProducts.map(product => (
              <ProductCard
                key={product.product_id || product.sku}
                product={product}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
