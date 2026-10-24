import { createBrowserRouter } from "react-router";
import Layout from "../layouts/Layout";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AdminCreateProduct from "../pages/AdminCreateProduct";
import AdminProducts from "../pages/AdminProducts";
import AdminEditProduct from "../pages/AdminEditProduct";
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
        path: "products/:id",
        element: <ProductDetails />,
      },
      {
        path: "cart",
        element: <Cart />,
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

      // Admin-only routes
      {
        element: <AdminRoute />,
        children: [
          {
            path: "admin/products",
            element: <AdminProducts />,
          },
          {
            path: "admin/products/create",
            element: <AdminCreateProduct />,
          },
          {
            path: "admin/products/edit/:id",
            element: <AdminEditProduct />,
          },
        ],
      },
    ],
  },
]);

export default router;
