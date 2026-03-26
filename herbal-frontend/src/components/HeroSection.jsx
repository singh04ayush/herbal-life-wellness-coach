import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import doodle1 from '../assets/doodle1.png';
import doodle2 from '../assets/doodle2.png';
import curveDoodle from '../assets/curveDoodle.png';
import curveArrow from '../assets/curve-arrow-doodle.png';
import heroImg from '../assets/1.png';

const HeroSection = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) e.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );
    heroRef.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden pt-16"
      style={{
        background: 'linear-gradient(135deg, #e8f5e2 0%, #f0faf0 40%, #ffffff 100%)',
      }}
    >
      {/* Doodle decorations */}
      <img
        src={doodle1}
        alt=""
        className="absolute top-20 right-10 w-24 opacity-30 animate-spin"
        style={{ animationDuration: '20s' }}
      />
      <img
        src={doodle2}
        alt=""
        className="absolute bottom-32 left-10 w-20 opacity-25 animate-bounce"
        style={{ animationDuration: '3s' }}
      />
      <img
        src={curveDoodle}
        alt=""
        className="absolute top-1/2 left-0 w-48 opacity-10 -translate-y-1/2"
      />
      <img
        src={curveArrow}
        alt=""
        className="absolute bottom-20 right-1/3 w-16 opacity-40"
      />

      {/* Decorative circles */}
      <div className="absolute top-32 left-1/4 w-64 h-64 rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #4a8c42, transparent)' }} />
      <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full opacity-15"
        style={{ background: 'radial-gradient(circle, #2d5a27, transparent)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-16">
          {/* Left content */}
          <div className="reveal space-y-6 text-center lg:text-left">
            {/* Badge */}
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest"
              style={{ background: '#e8f5e2', color: '#2d5a27' }}
            >
              🌿 India's Trusted Nutrition Brand
            </span>

            {/* Headline */}
            <h1
              className="text-5xl sm:text-6xl lg:text-7xl leading-tight"
              style={{ fontFamily: '"Caveat", cursive', color: '#1a3a16' }}
            >
              Nourish
              <span
                className="block"
                style={{
                  background: 'linear-gradient(90deg, #2d5a27, #6abf69)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Your Best Self
              </span>
            </h1>

            <p className="text-gray-600 text-lg leading-relaxed max-w-lg mx-auto lg:mx-0">
              Nutrition that works. Products that deliver. Science-backed supplements designed
              for real people with real goals — weight management, fitness & daily wellness.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-white font-semibold text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
                style={{ background: 'linear-gradient(135deg, #2d5a27, #4a8c42)' }}
              >
                Explore Products
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                to="/journey"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-base border-2 hover:-translate-y-0.5 transition-all duration-200"
                style={{ borderColor: '#2d5a27', color: '#2d5a27' }}
              >
                See Transformations
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 justify-center lg:justify-start pt-4">
              {[
                { value: '56+', label: 'Products' },
                { value: '90+', label: 'Countries' },
                { value: '40+', label: 'Years' },
              ].map(stat => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl font-bold" style={{ color: '#2d5a27' }}>{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right image */}
          <div className="reveal flex justify-center lg:justify-end relative">
            <div
              className="absolute inset-0 rounded-full blur-3xl opacity-30"
              style={{
                background: 'radial-gradient(circle, #a8d5a2, transparent 70%)',
                transform: 'scale(1.2)',
              }}
            />
            <div className="relative">
              <div
                className="absolute -inset-4 rounded-3xl opacity-20"
                style={{ background: 'linear-gradient(135deg, #2d5a27, #6abf69)' }}
              />
              <img
                src={heroImg}
                alt="Herbalife Products"
                className="relative w-full max-w-lg rounded-3xl shadow-2xl object-cover"
                style={{ aspectRatio: '4/5' }}
              />
              {/* Floating card */}
              <div
                className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3"
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xl"
                  style={{ background: '#2d5a27' }}
                >
                  ✓
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-800">Science-Backed</p>
                  <p className="text-xs text-gray-500">Trusted worldwide</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
