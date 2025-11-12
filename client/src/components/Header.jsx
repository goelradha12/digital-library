import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useAuthStore } from '../stores/auth.Stores';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();

  const { Visitor: currentUser, User } = useAuthStore();
  const isAuthenticated = !!currentUser;

  // 🧠 Compute user initials safely
  const userInitials = currentUser?.Name
    ? currentUser.Name.split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
    : '';

  // 🧭 Hide/show header on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 10) setIsVisible(true);
      else if (currentScrollY > lastScrollY && currentScrollY > 100) setIsVisible(false);
      else if (currentScrollY < lastScrollY) setIsVisible(true);
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
    setIsMenuOpen(false);
    setIsProfileMenuOpen(false);
  };

  const handleLogout = () => {
    console.log('User logged out');
    setIsProfileMenuOpen(false);
    navigate('/');
  };

  return (
    <header
      className={`bg-gray-900 text-gray-100 shadow-md fixed top-0 w-full z-50 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div
            onClick={() => handleNavigation('/')}
            className="text-2xl font-serif font-light text-gray-200 cursor-pointer select-none"
          >
            DigitalLibrary
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.path)}
                className="relative group text-gray-300 hover:text-[#A56F6E] transition-colors duration-300 font-sans"
              >
                {item.name}
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#A56F6E] transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </nav>

          {/* Right Side - Auth Section */}
          <div className="hidden md:flex items-center relative ml-6">
            {/* Streak Display */}
            {User && (
              <div className="hidden md:flex items-center ml-6 text-sm font-medium text-gray-300">
                <span className="bg-[#A56F6E]/10 text-[#A56F6E] px-3 py-1 rounded-full">
                  🔥 Current Streak:{' '}
                  <span className="font-semibold">{User.current_streak || 0}</span> days
                </span>
              </div>
            )}
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="w-10 h-10 rounded-full bg-[#E0D4D3] border-2 border-[#A56F6E] flex items-center justify-center text-xl font-bold text-[#A56F6E] shadow-md transition-transform duration-200 hover:scale-105"
                >
                  {userInitials}
                </button>

                {isProfileMenuOpen && (
                  <div className="absolute top-12 right-0 mt-2 w-52 bg-white rounded-xl shadow-2xl z-50 py-2">
                    <button
                      onClick={() => handleNavigation('/UserProfile')}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 border-t border-gray-200 mt-2 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </>
            ) : (
              <button
                onClick={() => handleNavigation('/login')}
                className="px-6 py-2 rounded-full border-2 border-[#A56F6E] text-[#A56F6E] hover:bg-[#A56F6E] hover:text-white transition-all duration-300 font-sans font-semibold"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-300 hover:text-[#A56F6E] transition-colors duration-300"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-900/95 backdrop-blur-md px-4 pb-4 space-y-3 shadow-lg">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavigation(item.path)}
              className="block w-full text-left text-gray-300 hover:text-[#A56F6E] transition-colors duration-300 font-sans pt-3"
            >
              {item.name}
            </button>
          ))}

          {User && (
            <div className="mt-3 text-sm text-[#A56F6E] font-semibold">
              🔥 Streak: {User.current_streak || 0} days
            </div>
          )}

          {!isAuthenticated && (
            <button
              onClick={() => handleNavigation('/login')}
              className="w-full mt-3 px-6 py-2 rounded-full border border-[#A56F6E] text-[#A56F6E] hover:bg-[#A56F6E] hover:text-white transition-all duration-300 font-sans font-semibold"
            >
              Login
            </button>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
