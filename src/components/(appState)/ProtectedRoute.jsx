import { useAuthStore } from "@/stores/useAuthStore";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const idToken = useAuthStore((state) => state.idToken);
  return idToken ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
