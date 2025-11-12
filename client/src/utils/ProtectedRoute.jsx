import { Navigate } from "react-router-dom";
import { useAdminStore } from "../stores/admin.Stores.js";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAdminStore();
  return isAuthenticated ? children : <Navigate to="/admin/login" />;
};

export default ProtectedRoute;
