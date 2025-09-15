import React from 'react';
import Header from '../components/Header';
import BookCard from '../components/BookCard';
import Footer from '../components/Footer';
import books from '../components/Data.js';
import BookCarousel from '../components/BookCarousel';
import NavBar from '../components/NavBar.jsx'

const HomePage = () => {
  return (
    <div>
      <Header />
      <h1>Home Page</h1>
      <div>
         <NavBar />
      </div>
          <BookCarousel books={books} />
      <Footer />
    </div>
  );
};

export default HomePage;
