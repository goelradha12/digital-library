import { useNavigate } from "react-router-dom";
import { useAdminStore } from "../../stores/admin.Stores";

const AdminHeader = () => {
  const navigate = useNavigate();
  const { logoutAdmin } = useAdminStore();

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (!confirmLogout) return;
    await logoutAdmin();
    navigate("/admin/login");
  };

  return (
    <header className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
      <h1
        className="text-2xl font-serif cursor-pointer"
        style={{ color: "#A56F6E" }}
        onClick={() => navigate("/admin/dashboard")}
      >
        Library Admin Panel
      </h1>

      <div className="flex gap-4">
        <button
          onClick={() => navigate("/")}
          className="text-gray-700 hover:text-[#A56F6E] font-medium transition-colors"
        >
          Visit Library
        </button>
        <button
          onClick={handleLogout}
          className="text-gray-700 hover:text-[#A56F6E] font-medium transition-colors"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
