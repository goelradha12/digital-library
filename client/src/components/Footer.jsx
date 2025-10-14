import React from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Instagram,
  Linkedin,
  BookOpen,
  User,
  Star,
  Award,
  Search,
  Compass,
  Book,
  Home,
  LucideBookOpen,
} from 'lucide-react';
import { useNavigate } from 'react-router';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className="bottom-0 w-full">
      <footer className="bg-gray-900 text-gray-300 py-12 relative overflow-hidden font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Main Content Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            {/* Digital Library Section */}
            <div className="space-y-4">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">DigitalLibrary</h3>
              <p className="text-base text-gray-400 leading-relaxed">
                A curated world of knowledge and stories, personalized for you. Find your next
                chapter and share your journey.
              </p>
              <div className="pt-2">
                <a
                  href="https://github.com/goelradha12/dlms"
                  className="text-gray-400 hover:text-white transition-colors duration-200 flex gap-2"
                  aria-label="Github"
                >
                  <Github className="w-5 h-5" />
                  Github
                </a>
              </div>
            </div>

            {/* Quick Links Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-[#A56F6E] mb-2">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    onClick={() => navigate('/')}
                    className="text-base text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2 cursor-pointer"
                  >
                    <Home className="w-4 h-4" />
                    Home
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => navigate('/books')}
                    className="text-base text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2 cursor-pointer"
                  >
                    <LucideBookOpen className="w-4 h-4" />
                    Browse Books
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => navigate('/aboutUs')}
                    className="text-base text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2 cursor-pointer"
                  >
                    <User className="w-4 h-4" />
                    About Us
                  </a>
                </li>
              </ul>
            </div>

            {/* Explore Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-[#A56F6E] mb-2">Explore</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    onClick={() => navigate('/books')}
                    className="text-base text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2"
                  >
                    <Book className="w-4 h-4" />
                    Browse Books
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => {
                      navigate('/authors');
                    }}
                    className="text-base text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2"
                  >
                    <Search className="w-4 h-4" />
                    Discover Authors
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => {
                      navigate('/publishers');
                    }}
                    className="text-base text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2"
                  >
                    <Search className="w-4 h-4" />
                    Find Publishers
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => {
                      navigate('/subscription');
                    }}
                  >
                    Buy Subscription
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-[#A56F6E] mb-2">Contact Us</h3>
              <div className="space-y-3">
                <a
                  href="mailto:contact@digitallibrary.com"
                  className="text-base text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  contact@digitallibrary.com
                </a>
                <a
                  href="tel:+1234567890"
                  className="text-base text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  +91 6006575633
                </a>
                <div className="text-base text-gray-300 flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-1" />
                  <span>
                    MANIT Bhopal,
                    <br />
                    Madhya Pradesh, India
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-gray-700 pt-8 mt-8 text-base text-gray-400">
            <div className="grid md:grid-cols-2 gap-4 items-center">
              <div className="text-center md:text-left">
                <p>&copy; 2025 Digital Library. All rights reserved.</p>
              </div>
              <div className="text-center md:text-right">
                <p>Developed by Team Radha, Akriti, Surbhi, Shivangi, Hariom, & Ankit</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
