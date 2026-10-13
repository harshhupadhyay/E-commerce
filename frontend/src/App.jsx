import React from 'react'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router";
import Layout from './layouts/Layout';
import Products from './pages/Products';
import Login from './pages/Login';
import Register from './pages/Register';


const router =  createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Products />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
])


const App = () => {
  return <RouterProvider  router={router} />
}

export default App
