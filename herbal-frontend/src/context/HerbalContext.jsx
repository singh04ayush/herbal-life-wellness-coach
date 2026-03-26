import React, { createContext, useContext, useState, useMemo } from 'react';
import rawData from '../data/data.json';

export const HerbalContext = createContext();

export const HerbalProvider = ({ children }) => {
  const allProducts = rawData[0].products;
  const categories = rawData[0].tabs;
  const categoryResults = rawData[0].category_results;
  const facets = rawData[0].facets;

  const [selectedCategory, setSelectedCategory] = useState('all-products');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Facet Filters
  const [selectedFlavors, setSelectedFlavors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]); // [500, 1500, 3000]

  const filteredProducts = useMemo(() => {
    let products = allProducts;

    // 1. Category Filter
    if (selectedCategory !== 'all-products') {
      products = products.filter(p =>
        Array.isArray(p.category_id)
          ? p.category_id.includes(selectedCategory)
          : p.category_id === selectedCategory
      );
    }

    // 2. Search Query Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      products = products.filter(p =>
        p.product_name?.toLowerCase().includes(q) ||
        p.flavours?.toLowerCase().includes(q)
      );
    }

    // 3. Flavor Filter
    if (selectedFlavors.length > 0) {
      products = products.filter(p => selectedFlavors.includes(p.flavours));
    }

    // 4. Size Filter
    if (selectedSizes.length > 0) {
      products = products.filter(p => selectedSizes.includes(p.variant_size));
    }

    // 5. Price Filter (Multi-threshold)
    if (selectedPriceRanges.length > 0) {
      const maxThreshold = Math.max(...selectedPriceRanges);
      products = products.filter(p => (p.price || 0) > maxThreshold);
    }

    return products;
  }, [allProducts, selectedCategory, searchQuery, selectedFlavors, selectedSizes, selectedPriceRanges]);

  const togglePriceRange = (range) => {
    setSelectedPriceRanges(prev => 
      prev.includes(range) ? prev.filter(r => r !== range) : [...prev, range]
    );
  };

  const toggleFlavor = (flavor) => {
    setSelectedFlavors(prev => 
      prev.includes(flavor) ? prev.filter(f => f !== flavor) : [...prev, flavor]
    );
  };

  const toggleSize = (size) => {
    setSelectedSizes(prev => 
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const getProductBySku = (sku) => {
    return allProducts.find(p => p.sku === sku || p.product_id === sku);
  };

  return (
    <HerbalContext.Provider value={{
      allProducts,
      filteredProducts,
      categories,
      categoryResults,
      facets,
      selectedCategory,
      setSelectedCategory,
      searchQuery,
      setSearchQuery,
      selectedFlavors,
      setSelectedFlavors,
      toggleFlavor,
      selectedSizes,
      setSelectedSizes,
      toggleSize,
      selectedPriceRanges,
      togglePriceRange,
      getProductBySku,
    }}>
      {children}
    </HerbalContext.Provider>
  );
};

export const useHerbal = () => useContext(HerbalContext);
