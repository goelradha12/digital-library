import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/books'); // Navigate to books page when clicked
  };

  return (<>
    <Header />

    <div className="home-container">
      <h1 className="welcome-text">Welcome to Digital Library</h1>
      <button className="start-button" onClick={handleStart}>
        Start Exploring
      </button>

      {/* Decorative Elements */}
      <div className="decoration book book1" />
      <div className="decoration book book2" />
      <div className="decoration book book3" />
      <div className="decoration lamp lamp1" />
      <div className="decoration lamp lamp2" />
      <div className="decoration table table1" />
    </div>
    <Footer />
  </>
  );
};

export default HomePage;
