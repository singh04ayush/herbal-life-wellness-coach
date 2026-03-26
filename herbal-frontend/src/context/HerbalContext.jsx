import React, { createContext, useContext, useState, useMemo } from 'react';
import rawData from '../data/data.json';

export const HerbalContext = createContext();

export const HerbalProvider = ({ children }) => {
  const allProducts = rawData[0].products;
  const categories = rawData[0].tabs;
  const categoryResults = rawData[0].category_results;

  const [selectedCategory, setSelectedCategory] = useState('all-products');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    let products = allProducts;
    if (selectedCategory !== 'all-products') {
      products = products.filter(p =>
        Array.isArray(p.category_id)
          ? p.category_id.includes(selectedCategory)
          : p.category_id === selectedCategory
      );
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      products = products.filter(p =>
        p.product_name?.toLowerCase().includes(q) ||
        p.flavours?.toLowerCase().includes(q)
      );
    }
    return products;
  }, [allProducts, selectedCategory, searchQuery]);

  const getProductBySku = (sku) => {
    return allProducts.find(p => p.sku === sku || p.product_id === sku);
  };

  return (
    <HerbalContext.Provider value={{
      allProducts,
      filteredProducts,
      categories,
      categoryResults,
      selectedCategory,
      setSelectedCategory,
      searchQuery,
      setSearchQuery,
      getProductBySku,
    }}>
      {children}
    </HerbalContext.Provider>
  );
};

export const useHerbal = () => useContext(HerbalContext);
