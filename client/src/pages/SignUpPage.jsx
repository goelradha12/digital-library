import React, { useState } from 'react';
import { ChevronLeft, Eye, EyeOff } from 'lucide-react';
import Footer from '../components/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { axiosInstance } from '../utils/axios';

const Signup = () => {
  const navigate = useNavigate();
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    avatar: null,
    country: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'avatar') {
      setSignupData({ ...signupData, avatar: files[0] });
    } else {
      setSignupData({ ...signupData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(signupData);
      const response = await axiosInstance.post('/users/registerVisitor', signupData);
      console.log(response.data);
      if (response.data.statusCode == 200) {
        setSuccessMessage('Signup successful! 🎉');
        setSignupData({ name: '', email: '', password: '', avatar: null, country: '' });
        navigate('/login');
      } else setSuccessMessage('Signup failed. Please try again.');
    } catch (error) {
      console.log(error);
      setSuccessMessage('Signup failed. Please try again.');
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col justify-center items-center px-6 py-10 relative">
        {/* Navigation to home */}
        <div className="flex items-center space-x-4 absolute top-4 left-4 z-10">
          <ChevronLeft className="h-4 w-4  cursor-pointer" />
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

        {/* Signup Box */}
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 relative z-10">
          <h1
            className="text-4xl font-serif text-center mb-4 animate-fadeIn"
            style={{ color: '#A56F6E' }}
          >
            Sign Up
          </h1>
          <p className="text-center text-gray-600 mb-6">
            Create your <b>Digital Library</b> account
          </p>

          {/* Success Message */}
          {successMessage && <p className="text-center text-green-600 mb-4">{successMessage}</p>}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={signupData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A56F6E]"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={signupData.email}
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
                  value={signupData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A56F6E] pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-[#A56F6E]"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Country */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">Country</label>
              <select
                name="country"
                value={signupData.country}
                onChange={handleChange}
                className="w-full pl-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A56F6E]"
                required
              >
                <option value="">Select your country</option>
                <option value="India">India</option>
                <option value="USA">United States</option>
                <option value="UK">Italy</option>
                <option value="Canada">France</option>
              </select>
            </div>

            {/* Avatar */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">Avatar</label>
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A56F6E]"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="mt-3 w-full px-6 py-3 text-lg font-semibold text-white rounded-full shadow-lg transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#A56F6E] focus:ring-opacity-50"
              style={{ backgroundColor: '#A56F6E' }}
            >
              Sign Up
            </button>
          </form>

          {/* Login link */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{' '}
            <a href="/login" className="text-[#A56F6E] font-medium hover:underline">
              Log in
            </a>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Signup;
