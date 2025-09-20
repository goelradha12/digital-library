import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Footer from '../components/Footer';
import axios from 'axios';

const Login = () => {
  const [user, setUser] = useState({});
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = loginData;

    if (!email || !password) {
      setSuccessMessage('');
      alert('Please fill in all required fields!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/users', loginData);
      setUser(response.data);
      setSuccessMessage('Login successful! 🎉');
      setLoginData({ email: '', password: '' });
    } catch (error) {
      console.log(error);
      setSuccessMessage('Login failed. Please try again.');
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col justify-center items-center px-6 relative">
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

          {/* Success Message */}
          {successMessage && (
            <p className="text-center text-green-600 mb-4">{successMessage}</p>
          )}

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
                  className="absolute right-3 top-3 text-gray-500 hover:text-[#A56F6E]"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="mt-3 w-full px-6 py-3 text-lg font-semibold text-white rounded-full shadow-lg transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#A56F6E] focus:ring-opacity-50"
              style={{ backgroundColor: '#A56F6E' }}
            >
              Log In
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
    </div>
  );
};

export default Login;
