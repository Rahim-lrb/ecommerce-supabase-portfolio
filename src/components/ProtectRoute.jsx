import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const ProtectedRoute = ({ children }) => {
  const { session } = useAuth();

  if (!session) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
