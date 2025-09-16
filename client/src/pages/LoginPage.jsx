import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Footer from "../components/Footer";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = loginData;

    if (!email || !password) {
      setSuccessMessage("");
      alert("Please fill in all required fields!");
      return;
    }

    // ✅ Log login data to console
    console.log("Login Data:", loginData);

    // Show inline success message
    setSuccessMessage("Login successful! 🎉");

    // Optional: Reset form
    setLoginData({
      email: "",
      password: "",
    });
  };

  return (
    <div>
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-200 min-h-screen flex flex-col items-center justify-center px-6">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-purple-900 bg-clip-text">
            Log In
          </h1>
          <p className="mt-3 text-gray-400 text-sm md:text-base">
            Access your <b>Digital Library Management System</b> account
          </p>
        </header>

        {/* Login Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/5 backdrop-blur-md p-8 rounded-xl shadow-lg w-full max-w-md space-y-6"
        >
          {/* Success Message */}
          {successMessage && (
            <p className="text-green-400 text-center font-medium">{successMessage}</p>
          )}

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={loginData.email}
              onChange={handleChange}
              className="w-full bg-transparent px-3 py-3 rounded-lg text-gray-200 placeholder-gray-500 border border-gray-600 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-sm text-gray-300 mb-2">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={loginData.password}
              onChange={handleChange}
              className="w-full bg-transparent px-3 py-3 rounded-lg text-gray-200 placeholder-gray-500 border border-gray-600 focus:outline-none focus:border-blue-500 pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-10 text-gray-400 hover:text-gray-200"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 rounded-lg shadow-lg hover:opacity-90 transition"
          >
            Log In
          </button>

          {/* Sign up link */}
          <p className="text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-400 hover:underline">
              Sign up
            </a>
          </p>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
