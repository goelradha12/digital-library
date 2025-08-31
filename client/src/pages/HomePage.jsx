import React from 'react';
import Header from '../components/Header';
import BookCard from '../components/BookCard';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div>
      <Header />
      <h1>Home Page</h1>
      <BookCard />
      <Footer />
    </div>
  );
};

export default HomePage;
