import { Navigate, Outlet } from "react-router";
import useFetchUser from "../hooks/useAuthCheck";

const ProtectedRoute = () => {
  const { user, isLoading, error } = useFetchUser();
  // console.log("🚀 ~ ProtectedRoute ~ user:", user);
  // console.log("🚀 ~ ProtectedRoute ~ isLoading:", isLoading);
  // console.log("🚀 ~ ProtectedRoute ~ error:", error);

  if (isLoading) {
    return <div>Loading user...</div>;
  }

  if (error || !user) {
    console.warn(
      "No user found or error fetching user, redirecting to sign-in.",
    );
    return <Navigate to="/sign-in" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
