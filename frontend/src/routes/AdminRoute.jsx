import { Navigate, Outlet } from "react-router";
import { useAuth } from "../hooks/useAuth";

const AdminRoute = () => {
  const { user } = useAuth();
  
   console.log("AdminRoute user:", user);
  console.log("AdminRoute role:", user?.role);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
