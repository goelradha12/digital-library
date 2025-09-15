import React from 'react';
import Header from '../components/Header';
import BookCard from '../components/BookCard';
import Footer from '../components/Footer';
import books from '../components/Data.js';

const HomePage = () => {
  console.log(books)
  return (
    <div>
      <Header />
      <h1>Home Page</h1>
      <div className="flex-grow flex items-center justify-center px-6 py-16 bg-gradient-to-b from-gray-900 via-gray-950 to-black">
        <div className="max-w-6xl w-full bg-white/5 backdrop-blur-md rounded-2xl shadow-2xl p-10 border border-white/10">

      <BookCard book={books}/>
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
