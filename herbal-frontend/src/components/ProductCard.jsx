import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HERBALIFE_CDN = 'https://www.herbalife.com/dmassets';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  if (!product) return null;

  const formatImageUrl = (url) => {
    if (!url) return null;
    if (url.startsWith('http')) return url;
    const cleanPath = url.replace('/content/dam', '');
    return `${HERBALIFE_CDN}${cleanPath}`;
  };

  const imageUrl =
    hovered && product.hover_image?.desktopImage?._publishUrl
      ? formatImageUrl(product.hover_image.desktopImage._publishUrl)
      : product.thumbnail_image?.desktopImage?._publishUrl
      ? formatImageUrl(product.thumbnail_image.desktopImage._publishUrl)
      : null;

  const price = product.price;

  // Map flavors to colors for the dot
  const flavorColors = {
    'Mango': '#fbbf24',
    'Orange': '#f97316',
    'Rose Kheer': '#f472b6',
    'Vanilla': '#fef3c7',
    'Chocolate': '#78350f',
    'Kulfi': '#fde68a',
    'Strawberry': '#f43f5e'
  };
  const dotColor = flavorColors[product.flavours] || '#2d5a27';

  return (
    <div
      className="group bg-[#f8f9f8] rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer flex flex-col h-full"
      onClick={() => navigate(`/products/${product.sku}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image Area */}
      <div className="relative p-6 pt-10 flex-shrink-0 flex items-center justify-center bg-transparent">
        {product.variant_tag && (
          <span className="absolute top-6 left-6 z-10 bg-[#234e1d] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
            {product.variant_tag}
          </span>
        )}
        
        <div className="w-full aspect-square relative flex items-center justify-center">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt=""
              className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="text-4xl opacity-20">🌿</div>
          )}
        </div>

        {/* Flavor Indicator */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
          <div 
            className="w-2.5 h-2.5 rounded-full" 
            style={{ background: dotColor }}
          />
          <span className="text-[10px] font-bold text-gray-700 capitalize">{product.flavours || 'Original'}</span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 pt-2 flex flex-col flex-1 bg-white">
        <h3 className="font-bold text-gray-900 text-sm mb-1 line-clamp-2 leading-snug h-10">
          {product.product_name}
        </h3>
        
        <p className="text-[11px] text-gray-500 mb-4">
          {product.variant_size} {product.size_count > 1 ? `| + ${product.size_count - 1} Size(s)` : ''}
        </p>

        <div className="mt-auto">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-black text-gray-900">
              ₹{price?.toLocaleString('en-IN')}.00
            </span>
            <span className="text-[9px] text-gray-400 font-medium uppercase tracking-tighter">
              MRP (excl. of all taxes)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
