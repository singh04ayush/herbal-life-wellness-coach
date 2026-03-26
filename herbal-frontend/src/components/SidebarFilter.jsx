import React, { useState } from 'react';
import { useHerbal } from '../context/HerbalContext';

const FilterSection = ({ title, items, selectedItems, onToggle, showAllCount = 10 }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showAll, setShowAll] = useState(false);

  const displayedItems = showAll ? items : items.slice(0, showAllCount);

  return (
    <div className="border-b border-gray-100 py-6">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full mb-4 text-left group"
      >
        <h3 className="font-bold text-gray-800 text-sm tracking-tight uppercase">{title}</h3>
        <svg 
          className={`w-4 h-4 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isExpanded && (
        <div className="space-y-3">
          {displayedItems.map((item) => (
            <label key={item.value} className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.value)}
                  onChange={() => onToggle(item.value)}
                  className="peer appearance-none w-5 h-5 rounded border border-gray-300 checked:bg-[#2d5a27] checked:border-transparent transition-all cursor-pointer"
                />
                <svg className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none left-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className={`text-sm transition-colors ${selectedItems.includes(item.value) ? 'text-[#2d5a27] font-medium' : 'text-gray-600 group-hover:text-gray-900'}`}>
                {item.value}
              </span>
            </label>
          ))}
          
          {items.length > showAllCount && (
            <button 
              onClick={() => setShowAll(!showAll)}
              className="text-xs font-semibold text-[#2d5a27] hover:underline mt-2 flex items-center gap-1"
            >
              {showAll ? 'Show less' : `Show all ${title.toLowerCase()}`}
              <svg className={`w-3 h-3 transition-transform ${showAll ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

const SidebarFilter = () => {
  const { facets, selectedFlavors, toggleFlavor, selectedSizes, toggleSize, selectedPriceRanges, togglePriceRange } = useHerbal();

  if (!facets) return null;

  const flavors = facets.find(f => f.field === 'flavours')?.values || [];
  const sizes = facets.find(f => f.field === 'variant_size')?.values || [];

  const priceFilters = [
    { label: '> ₹500', value: 500 },
    { label: '> ₹1500', value: 1500 },
    { label: '> ₹3000', value: 3000 },
  ];

  return (
    <div className="w-full lg:w-64 flex-shrink-0">
      <div className="sticky top-24 space-y-2">
        {/* Flavour */}
        <FilterSection 
          title="Flavour" 
          items={flavors} 
          selectedItems={selectedFlavors} 
          onToggle={toggleFlavor} 
        />

        {/* Price */}
        <div className="border-b border-gray-100 py-6">
          <h3 className="font-bold text-gray-800 text-sm tracking-tight uppercase mb-4">MRP (excl. of all taxes)</h3>
          <div className="space-y-3">
            {priceFilters.map((filter) => (
              <label key={filter.value} className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedPriceRanges.includes(filter.value)}
                    onChange={() => togglePriceRange(filter.value)}
                    className="peer appearance-none w-5 h-5 rounded border border-gray-300 checked:bg-[#2d5a27] checked:border-transparent transition-all cursor-pointer"
                  />
                  <svg className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none left-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className={`text-sm transition-colors ${selectedPriceRanges.includes(filter.value) ? 'text-[#2d5a27] font-medium' : 'text-gray-600 group-hover:text-gray-900'}`}>
                  {filter.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Size */}
        <FilterSection 
          title="Size" 
          items={sizes} 
          selectedItems={selectedSizes} 
          onToggle={toggleSize} 
        />
      </div>
    </div>
  );
};

export default SidebarFilter;
