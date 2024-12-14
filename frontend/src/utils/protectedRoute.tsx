import { useAuth } from "../components/context/authContext";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }: any) => {
  const { isAuthenticated } = useAuth();
  console.log({ isAuthenticated });
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
