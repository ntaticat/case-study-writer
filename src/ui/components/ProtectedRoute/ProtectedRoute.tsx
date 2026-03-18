import { Navigate, Outlet } from "react-router-dom";

const isTokenValid = (): boolean => {
  const token = localStorage.getItem("case-study-writer-token");
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const isNotExpired = payload.exp * 1000 > Date.now();

    if (!isNotExpired) {
      localStorage.removeItem("case-study-writer-token");
    }

    return isNotExpired;
  } catch {
    return false;
  }
};

const ProtectedRoute = () => {
  return isTokenValid() ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
