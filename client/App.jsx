
import React from 'react';
import BookCarousel from './components/BookCarouse.jsx';
import Data from './Data.js';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import NavBar from './components/NavBar.jsx';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-300">

      <NavBar />
      <div className="flex-grow flex items-center justify-center px-6 py-16 bg-gradient-to-b from-gray-900 via-gray-950 to-black">
        <div className="max-w-6xl w-full bg-white/5 backdrop-blur-md rounded-2xl shadow-2xl p-10 border border-white/10">

          <BookCarousel books={Data} />
        </div>
      </div>
    </div>
  );
}
