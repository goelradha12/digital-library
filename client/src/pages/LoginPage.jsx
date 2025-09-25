import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, Eye, EyeOff } from 'lucide-react';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router';
import { useAuthStore } from '../stores/auth.Stores';

const Login = () => {
  const navigate = useNavigate();
  const { checkUserAuth, isLoading, User } = useAuthStore();
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (User) {
      navigate('/profile');
    }

    console.log(
      "('Evelyn Lewis', 'evelyn.lewis@example.com', '2025-04-07', 'FinalStep123!', NULL, 'United States'),"
    );
  }, [User, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    const { email, password } = loginData;

    if (!email || !password) {
      setErrorMessage('Please fill in all required fields!');
      return;
    }

    try {
      await checkUserAuth(loginData);
      setLoginData({ email: '', password: '' });
    } catch (error) {
      setErrorMessage('Login failed. Please check your credentials.');
      console.error(error);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col justify-center items-center px-6 py-10 relative">
        {/* Navigation to home */}
        <div className="flex items-center space-x-4 absolute top-4 left-4 z-10">
          <ChevronLeft className="h-4 w-4 cursor-pointer" onClick={() => navigate('/')} />
          <span onClick={() => navigate('/')} className="text-[#A56F6E] cursor-pointer">
            Home
          </span>
        </div>
        {/* Background pattern */}
        <div
          className="absolute inset-0 bg-repeat"
          style={{
            backgroundImage: "url('/bookshelf-pattern.svg')",
            backgroundSize: '100px',
            opacity: 0.2,
            zIndex: 0,
          }}
        ></div>

        {/* Login Box */}
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 relative z-10">
          <h1
            className="text-4xl font-serif text-center mb-4 animate-fadeIn"
            style={{ color: '#A56F6E' }}
          >
            Log In
          </h1>
          <p className="text-center text-gray-600 mb-6">
            Access your <b>Digital Library</b> account
          </p>

          {/* Error Message */}
          {errorMessage && <p className="text-center text-red-500 mb-4">{errorMessage}</p>}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A56F6E]"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={loginData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A56F6E] pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#A56F6E] cursor-pointer"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className={`mt-3 w-full px-6 py-3 text-lg font-semibold text-white rounded-full shadow-lg transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#A56F6E] focus:ring-opacity-50 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              style={{ backgroundColor: '#A56F6E' }}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  <span className="ml-2">Logging in...</span>
                </div>
              ) : (
                <>
                  Log In <ArrowRight className="inline-block h-5 w-5 ml-2" />
                </>
              )}
            </button>
          </form>

          {/* Sign up link */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Don’t have an account?{' '}
            <a href="/signup" className="text-[#A56F6E] font-medium hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
