import type { Role } from "./ProtectedRoute";

export const roleLandingRoutes: Record<Role, string> = {
  admin: "/dashboard",
  repartidor: "/dashboard/repartidor",
};
