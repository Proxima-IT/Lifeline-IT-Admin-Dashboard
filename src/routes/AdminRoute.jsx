// src/components/AdminRoute.jsx
import { Navigate } from "react-router-dom";
import { useDashboard } from "../hooks/useDashboard";

const AdminRoute = ({ children }) => {
  const { data, isLoading, error } = useDashboard();
  console.log(data);

  // 🔄 While data is loading
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // ❌ Authentication failed (user not logged in or API error)
  if (error || !data?.id) {
    console.warn("Unauthenticated access attempt.");
    return window.location.href = import.meta.env.VITE_PUBLIC_PAGE;
  }

  // ❌ Authorization failed (not an admin)
  if (data?.role !== "admin") {
    console.warn(`Unauthorized access. Role: ${data.role}`);
    return window.location.href = import.meta.env.VITE_PUBLIC_PAGE;
  }

  // ✅ Authenticated and authorized
  return children;
};

export default AdminRoute;
