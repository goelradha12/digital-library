import { Outlet, Navigate, useLocation } from 'react-router';
import { useAuthStore } from '../stores/auth.Stores';

const ProtectedLayout = () => {
  const { Visitor } = useAuthStore();
  const location = useLocation();

  // If Visitor not logged in → redirect to login
  if (!Visitor) {
    alert('Login to continue');
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Otherwise → render all protected pages
  return <Outlet />;
};

export default ProtectedLayout;
