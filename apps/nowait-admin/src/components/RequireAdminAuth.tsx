import { Navigate, Outlet } from "react-router-dom";

export default function RequireAdminAuth() {
  const token = localStorage.getItem("adminToken"); // 또는 localStorage

  if (!token) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}
