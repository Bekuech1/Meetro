import { useAuthStore } from "@/stores/useAuthStore";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Get user from auth store
  const user = useAuthStore(state => state.user);
  // Get current location
  const location = useLocation();
  return user ? (
    children
  ) : (
    <Navigate to="/" replace state={{ from: location }} />
  );
};

export default ProtectedRoute;
