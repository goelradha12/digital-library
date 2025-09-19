import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Footer from "../components/Footer";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: null,
    country: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "avatar" && files.length > 0) {
      const file = files[0];
      if (file.size > 2 * 1024 * 1024) {
        alert("Image size must be less than 2MB");
        return;
      }
      setFormData({ ...formData, avatar: file });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, country } = formData;

    if (!name || !email || !password || !country) {
      setSuccessMessage("");
      alert("Please fill in all required fields!");
      return;
    }

    // ✅ Log the form data to the console
    console.log("Signup Data:", formData);

    // Show inline success message
    setSuccessMessage("Signup successful! 🎉");

    // Reset form
    setFormData({
      name: "",
      email: "",
      password: "",
      avatar: null,
      country: "",
    });
  };

  return (
    <div>
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-200 min-h-screen flex flex-col items-center justify-center px-6">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-purple-900 bg-clip-text">
            Sign Up
          </h1>
          <p className="mt-3 text-gray-400 text-sm md:text-base">
            Create your account to explore the <b>Digital Library Management System</b>
          </p>
        </header>

        {/* Signup Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/5 backdrop-blur-md p-8 rounded-xl shadow-lg w-full max-w-md space-y-6"
        >
          {/* Success Message */}
          {successMessage && (
            <p className="text-green-400 text-center font-medium">{successMessage}</p>
          )}

          {/* Name */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-transparent px-3 py-3 rounded-lg text-gray-200 placeholder-gray-500 border border-gray-600 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
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
              value={formData.password}
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

          {/* Avatar */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">Avatar</label>
            <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={handleChange}
              className="w-full text-gray-300 bg-transparent border border-gray-600 rounded-lg px-3 py-2 focus:outline-none"
            />
            <p className="text-xs text-gray-500 mt-1">Max size: 2MB</p>
          </div>

          {/* Country */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">Country</label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full bg-transparent px-3 py-3 rounded-lg text-gray-200 border border-gray-600 focus:outline-none focus:border-purple-500"
              required
            >
              <option value="" disabled>
                Select your country
              </option>
              <option value="India">India</option>
              <option value="USA">USA</option>
              <option value="UK">United Kingdom</option>
              <option value="Canada">Canada</option>
              <option value="Australia">Australia</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 rounded-lg shadow-lg hover:opacity-90 transition"
          >
            Sign Up
          </button>

          {/* Already have account */}
          <p className="text-center text-sm text-gray-400">
            Already have an account?{" "}
            <a href="/login" className="text-blue-400 hover:underline">
              Log in
            </a>
          </p>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default Signup;
