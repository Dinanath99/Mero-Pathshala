import React from "react";
import { useGetCourseDetailWithStatusQuery } from "@/features/api/purchaseApi";
import { useParams, Navigate } from "react-router-dom";

interface PurchaseCourseProtectedRouteProps {
  children: React.ReactNode;
}

const PurchaseCourseProtectedRoute: React.FC<PurchaseCourseProtectedRouteProps> = ({ children }) => {
  const { courseId } = useParams<{ courseId: string }>();
  const { data, isLoading } = useGetCourseDetailWithStatusQuery(courseId || "");

  if (isLoading) return <p>Loading...</p>;

  return data?.purchased ? <>{children}</> : <Navigate to={`/course-detail/${courseId}`} />;
};

export default PurchaseCourseProtectedRoute;
