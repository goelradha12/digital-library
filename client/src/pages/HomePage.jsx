import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuthStore } from '../stores/auth.Stores';
import SubscriptionModal from '../components/SubscriptionModal';
import { useState } from 'react';

const HomePage = () => {
  const navigate = useNavigate();
  const { Visitor, checkUserAuth, User } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    async function checkUser() {
      await checkUserAuth(Visitor.Visitor_ID);
    }
    if (Visitor) {
      checkUser();
      console.log('User: ', User);
    }
  }, []);

  useEffect(() => {
    if (!User) {
      setIsModalOpen(true);
    }
    if (User && new Date(User.subscription_end_date) < new Date()) {
      console.log('Subscription ended');
      setIsModalOpen(true);
    }
  }, [User]);
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col justify-center items-center pt-18 relative">
        {/* Absolute-positioned div for the SVG background layer */}
        <div
          className="absolute inset-0 bg-repeat"
          style={{
            backgroundImage: "url('/bookshelf-pattern.svg')",
            backgroundSize: '100px',
            opacity: 0.4,
            zIndex: 0,
          }}
        ></div>

        {/* Main content layer, positioned on top of the background */}
        <div className="max-w-4xl mx-auto text-center px-6 py-16 relative z-10">
          <h1
            className="text-5xl md:text-6xl font-serif leading-tight mb-4 animate-fadeIn"
            style={{ color: '#A56F6E' }}
          >
            Find Your Next Chapter
          </h1>
          <p className="text-lg md:text-xl font-sans text-gray-600 mb-8 animate-fadeIn delay-500">
            Discover a library built for you, with personalized recommendations, gamified reading
            goals, and a community to share your journey.
          </p>

          <button
            className="mt-3 px-8 py-3 text-lg font-semibold text-white bg-[#A56F6E] rounded-full shadow-lg transition-transform duration-300 hover:scale-105 hover:bg-[#8F5B5A] focus:outline-none focus:ring-2 focus:ring-[#A56F6E] focus:ring-opacity-50 cursor-pointer"
            onClick={() => navigate('/books')}
          >
            Explore Our Collection
          </button>
        </div>
      </div>
      <SubscriptionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <Footer />
    </>
  );
};

export default HomePage;
