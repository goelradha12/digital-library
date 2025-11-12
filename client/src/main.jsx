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
import SubscriptionPage from './pages/SubscriptionPage';
import PDFPage from './pages/PDFPage';
import ProtectedLayout from './components/ProtectedLayout';
import ProtectedRoute from './utils/ProtectedRoute';
import AdminLogin from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import BooksAdmin from './pages/admin/BooksAdmin';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/aboutUs" element={<AboutUs />} />
      <Route path="/books" element={<Books />} />
      <Route element={<ProtectedLayout />}>
        <Route path="/books/:id" element={<BookPage />} />
        <Route path="/authors" element={<Authors />} />
        <Route path="/authors/:id" element={<AuthorPage />} />
        <Route path="/publishers" element={<Publishers />} />
        <Route path="/publishers/:id" element={<PublisherPage />} />
        <Route path="/userProfile" element={<UserProfile />} />
        <Route path="/subscription" element={<SubscriptionPage />} />
        <Route path="/readBook/:bookid" element={<PDFPage />} />
      </Route>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/books"
        element={
          <ProtectedRoute>
            <BooksAdmin />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </BrowserRouter>
);
