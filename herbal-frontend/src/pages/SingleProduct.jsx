import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useHerbal } from '../context/HerbalContext';
import singleProductData from '../data/singleProduct.json';

const HERBALIFE_CDN = 'https://www.herbalife.com/dmassets';

const SingleProduct = () => {
  const formatImageUrl = (url) => {
    if (!url) return null;
    const cleanPath = url.replace('/content/dam', '');
    return `${HERBALIFE_CDN}${cleanPath}`;
  };
  const { sku } = useParams();
  const navigate = useNavigate();
  const { getProductBySku, allProducts } = useHerbal();

  // Try to find product by SKU from context
  const productFromList = getProductBySku(sku);

  // Build a display product using the singleProduct.json structure (for tabs/images)
  // and the list product for pricing
  const variant = singleProductData.variant;
  const otherVariants = singleProductData.otherVariants;
  const productTabs = variant?.aemresponse?.productTabs || [];
  const additionalImages = variant?.aemresponse?.additionalImages || [];
  const defaultImage = variant?.aemresponse?.defaultImage;

  const displayProduct = productFromList || {
    product_name: variant?.productName,
    price: variant?.price?.centAmount,
    variant_size: '750 g',
    flavours: 'Mango',
    sku: sku,
  };

  // Image gallery
  const galleryImages = [
    defaultImage?.desktopImage?._publishUrl
      ? formatImageUrl(defaultImage.desktopImage._publishUrl)
      : null,
    ...additionalImages.map(img =>
      img.desktopImage?._publishUrl
        ? formatImageUrl(img.desktopImage._publishUrl)
        : null
    ),
  ].filter(Boolean);

  // Also pull thumbnail from list product
  const listThumb = productFromList?.thumbnail_image?.desktopImage?._publishUrl
    ? formatImageUrl(productFromList.thumbnail_image.desktopImage._publishUrl)
    : null;
  const allImages = listThumb ? [listThumb, ...galleryImages] : galleryImages;

  const [mainImage, setMainImage] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedFlavor, setSelectedFlavor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  const flavors = otherVariants?.flavor || [];
  const sizes = otherVariants?.size || [];

  // Deduplicate flavors by text
  const uniqueFlavors = flavors.filter(
    (f, i, arr) => arr.findIndex(x => x.text === f.text) === i
  );
  const uniqueSizes = sizes.filter(
    (s, i, arr) => arr.findIndex(x => x.text === s.text) === i
  );

  const price = displayProduct?.price;
  const listPrice = displayProduct?.list_price || variant?.price?.list_price;

  return (
    <div className="pt-16 min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <button onClick={() => navigate('/')} className="hover:text-[#2d5a27]">Home</button>
          <span>/</span>
          <button onClick={() => navigate('/products')} className="hover:text-[#2d5a27]">Products</button>
          <span>/</span>
          <span className="text-gray-700 font-medium">{displayProduct.product_name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main image */}
            <div
              className="relative rounded-3xl overflow-hidden bg-green-50 flex items-center justify-center"
              style={{ aspectRatio: '1' }}
            >
              {allImages.length > 0 ? (
                <img
                  src={allImages[mainImage] || allImages[0]}
                  alt=""
                  className="w-full h-full object-contain p-8"
                  onError={e => { e.target.style.display = 'none'; }}
                />
              ) : (
                <span className="text-6xl">🌿</span>
              )}

              {/* Nav arrows */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={() => setMainImage(prev => (prev - 1 + allImages.length) % allImages.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-green-50 transition"
                  >
                    ‹
                  </button>
                  <button
                    onClick={() => setMainImage(prev => (prev + 1) % allImages.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-green-50 transition"
                  >
                    ›
                  </button>
                </>
              )}

              {/* Badge */}
              {displayProduct.variant_tag && (
                <span
                  className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold text-white"
                  style={{ background: '#2d5a27' }}
                >
                  {displayProduct.variant_tag}
                </span>
              )}
            </div>

            {/* Thumbnails */}
            {allImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setMainImage(i)}
                    className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      mainImage === i ? 'border-[#2d5a27]' : 'border-transparent hover:border-green-300'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-contain p-2 bg-green-50" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#4a8c42' }}>
                {displayProduct.flavours}
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold leading-tight" style={{ color: '#1a3a16' }}>
                {displayProduct.product_name}
              </h1>
              {displayProduct.variant_size && (
                <p className="text-gray-400 mt-1 text-sm">{displayProduct.variant_size}</p>
              )}
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold" style={{ color: '#2d5a27' }}>
                ₹{price?.toLocaleString('en-IN') || '—'}
              </span>
              {listPrice && price !== listPrice && (
                <span className="text-lg text-gray-400 line-through">
                  ₹{listPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>

            {/* Flavor selector */}
            {uniqueFlavors.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  Flavour: <span className="font-normal text-gray-500">{selectedFlavor?.text || uniqueFlavors[0].text}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {uniqueFlavors.map(f => (
                    <button
                      key={f.value}
                      onClick={() => setSelectedFlavor(f)}
                      disabled={!f.isAvailable}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                        !f.isAvailable
                          ? 'opacity-40 cursor-not-allowed border-gray-200 text-gray-400'
                          : selectedFlavor?.value === f.value
                          ? 'text-white border-transparent'
                          : 'border-green-200 text-gray-700 hover:border-[#2d5a27]'
                      }`}
                      style={selectedFlavor?.value === f.value ? { background: '#2d5a27' } : {}}
                    >
                      {f.text}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size selector */}
            {uniqueSizes.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  Size: <span className="font-normal text-gray-500">{selectedSize?.text || uniqueSizes[0].text}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {uniqueSizes.map(s => (
                    <button
                      key={s.value}
                      onClick={() => setSelectedSize(s)}
                      disabled={!s.isAvailable}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                        !s.isAvailable
                          ? 'opacity-40 cursor-not-allowed border-gray-200 text-gray-400'
                          : selectedSize?.value === s.value
                          ? 'text-white border-transparent'
                          : 'border-green-200 text-gray-700 hover:border-[#2d5a27]'
                      }`}
                      style={selectedSize?.value === s.value ? { background: '#2d5a27' } : {}}
                    >
                      {s.text}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="flex gap-4 pt-2">
              <button
                className="flex-1 py-4 rounded-xl text-white font-semibold text-base shadow-lg hover:opacity-90 hover:-translate-y-0.5 transition-all"
                style={{ background: 'linear-gradient(135deg, #2d5a27, #4a8c42)' }}
              >
                Add to Cart
              </button>
              <button
                className="px-6 py-4 rounded-xl border-2 font-semibold text-sm hover:-translate-y-0.5 transition-all"
                style={{ borderColor: '#2d5a27', color: '#2d5a27' }}
              >
                ♥ Save
              </button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3 text-xs text-gray-500">
              {['🔬 Science-Backed', '🌿 Natural Ingredients', '🏆 FSSAI Approved', '🚀 Fast Delivery'].map(b => (
                <span key={b} className="px-3 py-1 rounded-full bg-green-50">{b}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        {productTabs.length > 0 && (
          <div className="mt-16">
            {/* Tab headers */}
            <div className="flex overflow-x-auto gap-0 border-b border-gray-200 mb-8">
              {productTabs.map((tab, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTab(i)}
                  className={`px-6 py-3 text-sm font-medium whitespace-nowrap transition-all relative ${
                    activeTab === i ? 'text-[#2d5a27]' : 'text-gray-500 hover:text-[#2d5a27]'
                  }`}
                >
                  {tab.title}
                  {activeTab === i && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-t" style={{ background: '#2d5a27' }} />
                  )}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div
              className="max-w-3xl"
              style={{ animation: 'fadeIn 0.3s ease' }}
            >
              {productTabs[activeTab]?.description?.html && (
                <div
                  className="prose prose-green max-w-none text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: productTabs[activeTab].description.html }}
                />
              )}
              {productTabs[activeTab]?.ingredients?.html && (
                <div className="mt-6">
                  <h4 className="font-semibold text-gray-800 mb-2">Ingredients</h4>
                  <div
                    className="text-sm text-gray-600 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: productTabs[activeTab].ingredients.html }}
                  />
                </div>
              )}
              {productTabs[activeTab]?.allergenInfo?.html && (
                <div
                  className="mt-4 p-4 rounded-xl text-sm font-medium"
                  style={{ background: '#fff8e1', color: '#795548' }}
                >
                  ⚠️ Allergen Info: <span dangerouslySetInnerHTML={{ __html: productTabs[activeTab].allergenInfo.html }} />
                </div>
              )}
              {/* Side image for two-column tabs */}
              {productTabs[activeTab]?.image?.desktopImage?._publishUrl && (
                <div className="mt-6">
                  <img
                    src={formatImageUrl(productTabs[activeTab].image.desktopImage._publishUrl)}
                    alt=""
                    className="rounded-2xl max-w-sm shadow-lg"
                    onError={e => (e.target.style.display = 'none')}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleProduct;
