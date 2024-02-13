import { jwtDecode } from "jwt-decode";
import { Navigate, useNavigate } from "react-router-dom";
import { ReactNode, useEffect } from "react";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const token = localStorage.getItem("access_token") || null;
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      navigate("/");
    }
    if (token) {
      const { exp } = jwtDecode(token);
      if (exp && exp * 1000 < Date.now()) {
        localStorage.removeItem("access_token");
        navigate("/");
      }
    }
  }, []);

  if (!token) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
};

export default ProtectedRoute;
