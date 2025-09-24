import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import BookPage from './pages/BookPage';
import AboutUs from './pages/AboutUs';
import './index.css';
import Books from './pages/Books';
import Authors from './pages/Authors';
import AuthorPage from './pages/AuthorPage';
import Publishers from './pages/Publishers';
import PublisherPage from './pages/PublisherPage';
import UserProfile from './pages/UserProfile';
import Accessibility from './pages/Accessibility';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/books/:id" element={<BookPage />} />
      <Route path="/books" element={<Books />} />
      <Route path="/aboutUs" element={<AboutUs />} />
      <Route path="/authors" element={<Authors />} />
      <Route path="/authors/:id" element={<AuthorPage />} />
      <Route path="/publishers" element={<Publishers />} />
      <Route path="/publishers/:id" element={<PublisherPage />} />
      <Route path="/userProfile" element={<UserProfile />} />
      <Route path="/accessibility" element={<Accessibility/>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </BrowserRouter>
);
