import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { authState } = useAuth();

  return authState.token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
