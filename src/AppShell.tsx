import { useAuth } from "./user/hooks/useAuth";
import AdminApp from "./apps/AdminApp";
import RepartidorApp from "./apps/RepartidorApp";
import { Navigate } from "react-router-dom";

const AppShell: React.FC = () => {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  switch (role) {
    case "admin":
      return <AdminApp />;
    case "repartidor":
      return <RepartidorApp />;

    default:
      return <Navigate to="/unauthorized" replace />;
  }
};

export default AppShell;
