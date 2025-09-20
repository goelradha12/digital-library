import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Books', path: '/books' },
    { name: 'Categories', path: '/categories' },
    { name: 'About Us', path: '/aboutUs' },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <header
      className={`bg-gray-800 text-gray-100 shadow-lg fixed top-0 w-full z-50 transition-transform duration-300 ${
        isVisible ? 'transform translate-y-0' : 'transform -translate-y-full'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Brand */}
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-serif font-light">DigitalLibrary</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                className="relative group text-gray-200 hover:text-[#A56F6E] transition-colors duration-300 cursor-pointer font-sans"
                onClick={() => handleNavigation(item.path)}
              >
                {item.name}
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#A56F6E] transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Right Side (Login Button) */}
          <div className="hidden md:flex items-center">
            <button
              onClick={() => navigate('/login')}
              className="px-6 py-2 rounded-full border-2 border-[#A56F6E] text-white bg-[#A56F6E] cursor-pointer hover:opacity-80 transition-all duration-300 font-sans font-semibold"
            >
              Login
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none text-gray-300 hover:text-[#A56F6E] transition-colors duration-300"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800/95 backdrop-blur-md px-4 pb-4 space-y-3 shadow-lg">
          {navItems.map((item) => (
            <a
              key={item.name}
              className="block text-gray-300 hover:text-[#A56F6E] transition-colors duration-300 font-sans pt-3"
              onClick={() => handleNavigation(item.path)}
            >
              {item.name}
            </a>
          ))}
          <button
            onClick={() => navigate('/login')}
            className="w-full mt-2 px-6 py-2 rounded-full border border-[#A56F6E] text-[#A56F6E] hover:bg-[#A56F6E] hover:text-white transition-all duration-300 font-sans font-semibold"
          >
            Login
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
