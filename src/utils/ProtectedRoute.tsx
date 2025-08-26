import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../user/hooks/useAuth";

export type Role = "admin" | "ROLE_TEACHER" | "estudiante";

const ProtectedRoute = ({ allowedRoles }: { allowedRoles: Role[] }) => {
  // const { isAuthenticated, role } = useAuth();

  // if (!isAuthenticated) return <Navigate to="/login" replace />;

  // if (!allowedRoles.includes(role!))
  //   return <Navigate to="/unauthorized" replace />;

  return (
    <>
      <Outlet />
    </>
  );
};
export default ProtectedRoute;
