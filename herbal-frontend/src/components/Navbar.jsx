import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import logo from '../assets/logo.webp';
import menuIcon from '../assets/menu_icon.png';
import crossIcon from '../assets/cross_icon.png';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Products' },
    { to: '/about', label: 'About' },
    { to: '/journey', label: 'Journey' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-green-100'
          : 'bg-white/90 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <img src={logo} alt="Herbalife" className="h-8 w-auto" />
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-md group ${
                    isActive
                      ? 'text-[#2d5a27] font-semibold'
                      : 'text-gray-600 hover:text-[#2d5a27]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {label}
                    <span
                      className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-[#2d5a27] rounded-full transition-all duration-300 ${
                        isActive ? 'w-4/5' : 'w-0 group-hover:w-4/5'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </ul>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <Link
              to="/products"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-white text-sm font-medium transition-all duration-200 hover:opacity-90 hover:shadow-md"
              style={{ background: 'linear-gradient(135deg, #2d5a27, #4a8c42)' }}
            >
              Shop Now
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-[#2d5a27]"
            >
              <img
                src={menuOpen ? crossIcon : menuIcon}
                alt="menu"
                className="w-5 h-5"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 bg-white border-t border-green-100 ${
          menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="px-4 py-3 space-y-1">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `block px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-green-50 text-[#2d5a27] font-semibold'
                    : 'text-gray-600 hover:bg-green-50 hover:text-[#2d5a27]'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          <Link
            to="/products"
            className="block w-full mt-2 px-4 py-2.5 rounded-full text-center text-white text-sm font-medium"
            style={{ background: 'linear-gradient(135deg, #2d5a27, #4a8c42)' }}
          >
            Shop Now
          </Link>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
