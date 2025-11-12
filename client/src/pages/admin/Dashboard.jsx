import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../../components/admin/AdminHeader";
import BooksAdmin from "./BooksAdmin";
import { useBookAdminStore } from "../../stores/bookAdmin.Stores";

const Dashboard = () => {
  const navigate = useNavigate();
  const {
    fetchBooks,
    fetchSupportData,
    getSummary,
    loading,
  } = useBookAdminStore();

  const [stats, setStats] = useState({
    users: 0,
    subscribers: 0,
    books: 0,
    authors: 0,
    publishers: 0,
    categories: 0,
    series: 0,
  });

  const loadDashboardData = async () => {
    try {
      await Promise.all([fetchBooks(), fetchSupportData()]);
      setStats(getSummary());
    } catch (err) {
      console.error("Dashboard data load failed:", err);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  useEffect(() => {
    // Reactively update stats when store changes
    setStats(getSummary());
  }, [getSummary]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col">
      <AdminHeader />

      <main className="flex-1 p-8 relative">
        {/* Background layer */}
        <div
          className="absolute inset-0 bg-repeat"
          style={{
            backgroundImage: "url('/bookshelf-pattern.svg')",
            backgroundSize: "100px",
            opacity: 0.2,
            zIndex: 0,
          }}
        ></div>

        {/* Content layer */}
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-8">
            <h1
              className="text-4xl font-serif"
              style={{ color: "#A56F6E" }}
            >
              Welcome, Admin
            </h1>

            <button
              onClick={loadDashboardData}
              className="px-5 py-2 bg-[#A56F6E] text-white rounded-full shadow-md hover:bg-[#8F5B5A] transition-transform hover:scale-105"
              disabled={loading}
            >
              {loading ? "Refreshing..." : "↻ Refresh Data"}
            </button>
          </div>

          {loading ? (
            <p className="text-gray-500">Loading statistics...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {Object.entries(stats).map(([key, value]) => (
                <div
                  key={key}
                  className="bg-white rounded-2xl shadow-md p-5 flex flex-col justify-center items-center hover:shadow-lg transition-all"
                >
                  <h2 className="text-lg font-medium capitalize text-gray-700">
                    {key}
                  </h2>
                  <p
                    className="text-3xl font-serif mt-2"
                    style={{ color: "#A56F6E" }}
                  >
                    {value}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Manage Books Section */}
          <div className="mt-12 text-center">
            <BooksAdmin />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
