import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-md fixed top-0 w-full z-50">
      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-purple-800/20 to-pink-700/20 animate-[gradientMove_8s_linear_infinite]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Brand */}
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-purple-900 bg-clip-text">
              DigitalLibrary
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-10">
            <a href="#home" className="relative group">
              <span className="text-gray-300 hover:text-gray-300 transition-colors duration-300">
                Home
              </span>
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-purple-900 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#books" className="relative group">
              <span className="text-gray-300 hover:text-gray-300 transition-colors duration-300">
                Books
              </span>
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-purple-900 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#categories" className="relative group">
              <span className="text-gray-300 hover:text-gray-00 transition-colors duration-300">
                Categories
              </span>
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-purple-900 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </nav>

          {/* Right Side (Login Button) */}
          <div className="hidden md:flex items-center">
            <a
              href="/login"
              className="px-6 py-2 rounded-xl bg-gray-300 shadow-lg hover:shadow-blue-500/60 transition-all duration-300 hover:scale-105 hover:bg-white"
            >
              <span className="font-semibold bg-gradient-to-r from-blue-500 via-purple-500 to-purple-900 bg-clip-text text-transparent">
                Login
              </span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none text-gray-300 hover:text-blue-400 transition-colors duration-300"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/5 backdrop-blur-md px-4 pb-4 space-y-3 shadow-lg">
          <a
            href="#home"
            className="block text-gray-300 hover:text-blue-400 transition-colors duration-300 pt-3"
          >
            Home
          </a>
          <a
            href="#books"
            className="block text-gray-300 hover:text-blue-400 transition-colors duration-300"
          >
            Books
          </a>
          <a
            href="#categories"
            className="block text-gray-300 hover:text-blue-400 transition-colors duration-300"
          >
            Categories
          </a>
          <a href="/login" className="block pt-2 pb-1">
            <div className="w-full px-6 py-2 bg-gray-300 rounded-xl shadow-lg hover:shadow-blue-500/60 transition-all duration-300 hover:bg-white">
              <span className="font-semibold bg-gradient-to-r from-blue-500 via-purple-500 to-purple-900 bg-clip-text text-transparent">
                Login
              </span>
            </div>
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;
