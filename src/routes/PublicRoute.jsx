// src/utils/PublicRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../utils/context/AuthContext";

export default function PublicRoute({ children }) {
  const { isLogin } = useAuth();

  if (isLogin) {
    return <Navigate to="/admin/home" replace />;
  }

  return children;
}
