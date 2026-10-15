
import { createBrowserRouter } from "react-router";
import Layout from "../layouts/Layout";
import Products from "../pages/Products";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Products />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },

      // Protected routes: logged-in users only
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "profile",
            element: <div>Profile page coming soon</div>,
          },
        ],
      },

      // ADD THIS BLOCK: admin-only routes
      {
        element: <AdminRoute />,
        children: [
          {
            path: "admin/products",
            element: <div>Admin product management coming soon</div>,
          },
        ],
      },
    ],
  },
]);

export default router;
