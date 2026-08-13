import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { useLoadUserQuery } from "@/features/api/authApi";
import { RootState } from "@/app/store";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useSelector((store: RootState) => store.auth);
  const { isLoading } = useLoadUserQuery();
  const location = useLocation();

  if (isLoading) return <div className="flex items-center justify-center min-h-[50vh] text-sm text-gray-500 font-bold">Loading...</div>;

  if (!isAuthenticated) {
    const redirectUrl = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/login?redirect=${redirectUrl}`} replace />;
  }

  return <>{children}</>;
};

export const AuthenticatedUser: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useSelector((store: RootState) => store.auth);
  const { isLoading } = useLoadUserQuery();

  if (isLoading) return null;

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export const AdminRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, user } = useSelector((store: RootState) => store.auth);
  const { isLoading } = useLoadUserQuery();

  if (isLoading) return <div>Loading...</div>;

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (user?.role !== "instructor" && user?.role !== "admin") {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};
