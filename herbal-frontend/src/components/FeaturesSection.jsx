import React, { useState, useEffect, useRef } from 'react';
import img2 from '../assets/2.png';
import img3 from '../assets/3.png';
import img4 from '../assets/4.png';
import img5 from '../assets/5.png';
import sustainable from '../assets/sustainable.png';

const tabs = [
  {
    id: 'healthy-weight',
    label: 'Healthy Weight',
    heading: 'Achieve your nutrition goals',
    body: 'No matter your wellness goals, we have the nutritional products and support to help you succeed and build healthy habits. Our meal plans and shakes are scientifically formulated to keep you energised while supporting healthy weight management.',
    image: img2,
    icon: '🥗',
    color: '#2d5a27',
  },
  {
    id: 'fitness',
    label: 'Fitness & Performance',
    heading: 'Step up your fitness',
    body: 'Whether you\'re looking to be more active, conquer new athletic challenges or beat your personal best, we\'ve got your back. Our fitness products can be personalised to meet your unique needs.',
    image: img3,
    icon: '💪',
    color: '#3a7a32',
  },
  {
    id: 'daily-nutrition',
    label: 'Daily Nutrition & Health',
    heading: 'Nourish your body right',
    body: 'Explore our product range and discover how you can enjoy balanced nutrition with our Core, Targeted, Sports Nutrition, Energy & Ayurvedic Nutrition that support your nutritional requirement on everyday basis.',
    image: img4,
    icon: '🌿',
    color: '#4a8c42',
  },
  {
    id: 'skin-body-care',
    label: 'Skin & Body Care',
    heading: 'Glow from within',
    body: 'Explore our product range and discover how you can enjoy balanced nutrition with our Core, Targeted, Sports Nutrition, Energy & Ayurvedic Nutrition that support your nutritional requirement on everyday basis.',
    image: img5,
    icon: '✨',
    color: '#5e9e55',
  },
];

const FeaturesSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState('right');
  const sectionRef = useRef(null);

  const handleTabChange = (idx) => {
    if (idx === activeTab || animating) return;
    setDirection(idx > activeTab ? 'right' : 'left');
    setAnimating(true);
    setTimeout(() => {
      setActiveTab(idx);
      setAnimating(false);
    }, 300);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const current = tabs[activeTab];

  return (
    <section ref={sectionRef} className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="reveal text-center mb-16">
          <span
            className="inline-block px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ background: '#e8f5e2', color: '#2d5a27' }}
          >
            What We Offer
          </span>
          <h2
            className="text-4xl sm:text-5xl font-bold mb-4"
            style={{ color: '#1a3a16', fontFamily: '"Caveat", cursive' }}
          >
            A complete wellness ecosystem
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Four pillars of health, one brand you can trust.
          </p>
        </div>

        {/* Tabs — matching reference image style */}
        <div className="reveal mb-12 overflow-x-auto">
          <div className="flex min-w-max border-b border-gray-200">
            {tabs.map((tab, idx) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(idx)}
                className={`relative flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  activeTab === idx
                    ? 'text-[#2d5a27]'
                    : 'text-gray-500 hover:text-[#2d5a27]'
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
                {activeTab === idx && (
                  <span
                    className="absolute bottom-0 left-0 right-0 h-0.5 rounded-t"
                    style={{ background: '#2d5a27' }}
                  />
                )}
                {activeTab === idx && (
                  <span
                    className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-2 h-2 rounded-full border-2 border-white"
                    style={{ background: '#2d5a27' }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab content with slide animation */}
        <div className="overflow-hidden">
          <div
            className="flex transition-all duration-300"
            style={{
              opacity: animating ? 0 : 1,
              transform: animating
                ? `translateX(${direction === 'right' ? '-30px' : '30px'})`
                : 'translateX(0)',
            }}
          >
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Text */}
              <div className="space-y-6 order-2 lg:order-1">
                <div
                  className="inline-flex items-center gap-2 text-4xl"
                >
                  {current.icon}
                </div>
                <h3
                  className="text-3xl sm:text-4xl font-bold"
                  style={{ color: '#1a3a16', fontFamily: '"Caveat", cursive' }}
                >
                  {current.heading}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {current.body}
                </p>

                {/* Feature bullets */}
                <ul className="space-y-3">
                  {['Scientifically formulated', 'Trusted by millions', 'Personalised to you'].map(item => (
                    <li key={item} className="flex items-center gap-3 text-gray-700">
                      <span
                        className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0"
                        style={{ background: '#2d5a27' }}
                      >
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>

                <a
                  href="/products"
                  className="inline-flex items-center gap-2 font-semibold text-sm transition-all hover:gap-4"
                  style={{ color: '#2d5a27' }}
                >
                  Explore {current.label} Products
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </div>

              {/* Image */}
              <div className="order-1 lg:order-2 flex justify-center">
                <div className="relative">
                  <div
                    className="absolute -inset-4 rounded-3xl opacity-10"
                    style={{ background: `radial-gradient(circle, ${current.color}, transparent)` }}
                  />
                  <img
                    src={current.image}
                    alt={current.label}
                    className="relative w-full max-w-md rounded-3xl shadow-xl object-cover"
                    style={{ aspectRatio: '4/3' }}
                  />
                  <div
                    className="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl shadow-lg flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #2d5a27, #6abf69)' }}
                  >
                    <img src={sustainable} alt="" className="w-12 h-12 object-contain brightness-0 invert" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-12">
          {tabs.map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleTabChange(idx)}
              className={`rounded-full transition-all duration-200 ${
                activeTab === idx ? 'w-8 h-2.5' : 'w-2.5 h-2.5'
              }`}
              style={{
                background: activeTab === idx ? '#2d5a27' : '#a8d5a2',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
