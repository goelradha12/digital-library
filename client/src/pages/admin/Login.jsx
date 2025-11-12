// src/pages/admin/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminStore } from "../../stores/admin.Stores.js";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { loginAdmin, loading } = useAdminStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await loginAdmin(email, password);
    if (result.success) {
      navigate("/admin/dashboard");
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 text-gray-800 relative">
      {/* Background pattern */}
      <div
        className="absolute inset-0 bg-repeat"
        style={{
          backgroundImage: "url('/bookshelf-pattern.svg')",
          backgroundSize: "100px",
          opacity: 0.4,
          zIndex: 0,
        }}
      ></div>

      {/* Login card */}
      <div className="relative z-10 bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-serif mb-6 text-center" style={{ color: "#A56F6E" }}>
          Admin Login
        </h1>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Admin Email"
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A56F6E]"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A56F6E]"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-[#A56F6E] text-white py-3 rounded-lg font-medium hover:bg-[#8F5B5A] transition-transform duration-200 hover:scale-105"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
