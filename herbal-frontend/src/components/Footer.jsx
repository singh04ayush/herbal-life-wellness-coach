import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.webp';
import doodle2 from '../assets/doodle2.png';

const Footer = () => {
  const links = [
    { label: 'Home', to: '/' },
    { label: 'Products', to: '/products' },
    { label: 'About', to: '/about' },
    { label: 'Journey', to: '/journey' },
  ];

  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #1a3a16, #2d5a27)' }}
    >
      <img src={doodle2} alt="" className="absolute bottom-4 right-12 w-16 opacity-10" />
      <div className="absolute top-0 left-0 w-full h-px bg-white/10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="Herbalife" className="h-8" />
              <span className="text-white font-bold text-lg">Herbalife</span>
            </Link>
            <p className="text-green-200 text-sm leading-relaxed max-w-xs">
              Science-backed nutrition for healthy, active living. Join millions worldwide on their wellness journey.
            </p>
            {/* Social */}
            <div className="flex gap-3">
              {['🐦', '📘', '📸', '▶️'].map((icon, i) => (
                <button
                  key={i}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all text-sm"
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Navigate</h3>
            <ul className="space-y-2">
              {links.map(l => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-green-300 hover:text-white text-sm transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Contact</h3>
            <ul className="space-y-2 text-green-300 text-sm">
              <li>Mumbai, India</li>
              <li>+91 1800 123 4567</li>
              <li>support@herbalife.in</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-green-400 text-xs">
            © 2026 Herbalife International of America, Inc. All rights reserved.
          </p>
          <p className="text-green-400 text-xs" style={{ fontFamily: '"Indie Flower", cursive' }}>
            Made with 🌿 for a healthier world
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
