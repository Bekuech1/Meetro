import { useAuthStore } from "@/stores/useAuthStore";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  // Get user from auth store
  const user = useAuthStore(state => state.user);
  // Get current location
  const location = useLocation();
  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace state={{ from: location }} />
  );
};

export default ProtectedRoute;
