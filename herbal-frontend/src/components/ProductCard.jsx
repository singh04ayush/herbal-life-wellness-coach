import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HERBALIFE_CDN = 'https://www.herbalife.com/dmassets';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  if (!product) return null;

  const formatImageUrl = (url) => {
    if (!url) return null;
    // Replace /content/dam or /content/dam/herbalife with the correct CDN path
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
  const listPrice = product.list_price;
  const hasDiscount = listPrice && price > listPrice;

  return (
    <div
      className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border border-green-50"
      onClick={() => navigate(`/products/${product.sku}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Badge */}
      {product.variant_tag && (
        <span
          className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide text-white"
          style={{ background: '#2d5a27' }}
        >
          {product.variant_tag}
        </span>
      )}

      {/* Image area */}
      <div
        className="relative overflow-hidden bg-green-50"
        style={{ aspectRatio: '1' }}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt=""
            className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-5xl">🌿</span>
          </div>
        )}

        {/* Hover overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4"
          style={{ background: 'linear-gradient(to top, rgba(45,90,39,0.8), transparent)' }}
        >
          <span className="text-white text-sm font-semibold px-4 py-2 rounded-full border border-white/40 backdrop-blur-sm">
            View Details →
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide" style={{ color: '#4a8c42' }}>
          {product.flavours || '—'}
        </p>
        <h3 className="font-semibold text-gray-800 text-sm leading-tight line-clamp-2">
          {product.product_name}
        </h3>
        {product.variant_size && (
          <p className="text-xs text-gray-400">{product.variant_size}</p>
        )}

        {/* Price */}
        <div className="flex items-center gap-2 pt-1">
          <span className="font-bold text-base" style={{ color: '#2d5a27' }}>
            ₹{price?.toLocaleString('en-IN')}
          </span>
          {hasDiscount && (
            <span className="text-xs text-gray-400 line-through">
              ₹{listPrice?.toLocaleString('en-IN')}
            </span>
          )}
        </div>

        {/* Category pills */}
        {product.size_count > 1 && (
          <p className="text-xs text-gray-400">{product.size_count} sizes available</p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
