import { createBrowserRouter, Navigate } from "react-router-dom";
import { AppLayout } from "../layout/AppLayout";
import Home from "../pages/components/Home";
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import NotFound from "../layout/NotFound";
import Dashboard from "../pages/admin/Dashboard";
import UserDashboard from "../pages/users/pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import Users from "../pages/admin/users/Users";
import Products from "../pages/admin/products/Products";
import ManageProduct from "../pages/admin/products/ManageProduct";
import ManageUser from "../pages/admin/users/ManageUser";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <Navigate to="/login" replace /> },
      { path: "/home", element: <Home /> },
      {
        path: "/login",
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },
      {
        path: "signup",
        element: (
          <PublicRoute>
            <SignUp />
          </PublicRoute>
        ),
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "user-dashboard",
        element: (
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "admin",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="home" replace /> },
      { path: "home", element: <Dashboard /> },
      { path: "users", element: <Users /> },
      { path: "users/:id", element: <ManageUser /> },
      { path: "users/add", element: <ManageUser /> },
      { path: "orders", element: <Users /> },
      { path: "products", element: <Products /> },
      { path: "products/:id", element: <ManageProduct /> },
      { path: "products/add", element: <ManageProduct /> },
      { path: "customers", element: <Users /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);
