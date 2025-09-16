import React from 'react';
import { useNavigate } from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Custom animation styles (these need to be added to your Tailwind config or as inline styles)
const customStyles = `
  @keyframes float {
    0% { transform: translateY(0); opacity: 0.8; }
    50% { transform: translateY(-20px); opacity: 1; }
    100% { transform: translateY(0); opacity: 0.8; }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes pulse-custom {
    0% { box-shadow: 0 0 0 0 rgba(233, 69, 96, 0.4); }
    70% { box-shadow: 0 0 0 10px rgba(233, 69, 96, 0); }
    100% { box-shadow: 0 0 0 0 rgba(233, 69, 96, 0); }
  }
  
  .animate-float { animation: float 3s ease-in-out infinite; }
  .animate-fadeIn { animation: fadeIn 1.5s ease-in; }
  .animate-pulse-custom { animation: pulse-custom 2s infinite; }
  
  .animation-delay-0 { animation-delay: 0s; }
  .animation-delay-500 { animation-delay: 0.5s; }
  .animation-delay-700 { animation-delay: 0.7s; }q
  .animation-delay-1000 { animation-delay: 1s; }
  .animation-delay-1500 { animation-delay: 1.5s; }
  .animation-delay-2000 { animation-delay: 2s; }
`;


const HomePage = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/books'); // Navigate to books page when clicked
  };

  return (
    <>
    <Header />
      <style>{customStyles}</style>
      
      {/* Main Content */}
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center relative overflow-hidden">
        {/* Welcome Text */}
        <h1 className="text-white text-5xl lg:text-6xl text-center my-8 animate-fadeIn drop-shadow-lg font-bold mt-90">
          Welcome to Digital Library
        </h1>
        
        {/* Start Button */}
        <button 
          className="px-10 py-4 text-xl bg-rose-500 text-white border-none rounded-full cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-rose-500/50 hover:shadow-2xl animate-pulse-custom mt-8 font-semibold"
          onClick={handleStart}
        >
          Start Exploring
        </button>

        {/* Decorative Elements */}
        {/* Books */}
        <div className="absolute w-16 h-20 bg-rose-500 rounded-md shadow-lg opacity-80 animate-float delay-0 top-[20%] left-[20%]" />
        <div className="absolute w-16 h-20 bg-rose-500 rounded-md shadow-lg opacity-80 animate-float delay-500 top-[30%] right-[25%]" />
        <div className="absolute w-16 h-20 bg-rose-500 rounded-md shadow-lg opacity-80 animate-float delay-1000 bottom-[25%] left-[30%]" />
        
        {/* Lamps */}
        <div className="absolute w-10 h-20 bg-yellow-400 rounded-full opacity-80 animate-float delay-1500 top-[15%] right-[20%]" style={{boxShadow: '0 0 20px #ffd700'}} />
        <div className="absolute w-10 h-20 bg-yellow-400 rounded-full opacity-80 animate-float delay-2000 bottom-[20%] right-[35%]" style={{boxShadow: '0 0 20px #ffd700'}} />
        
        {/* Table */}
        <div className="absolute w-32 h-10 bg-purple-700 rounded-lg opacity-80 animate-float delay-700 bottom-[15%] left-[15%]" />
      </div>
      
      <Footer />
    </>
  );
};
export default HomePage;