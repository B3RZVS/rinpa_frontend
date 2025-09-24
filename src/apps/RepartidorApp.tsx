import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../utils/ProtectedRoute";
//PAGES
import HomePageRepartidor from "../repartidor/pages/home/HomePageRepartidor";
//PROVIDERS
function RepartidorApp() {
  return (
    <Routes>
      <Route
        path="/dashboard/repartidor/*"
        element={
          <ProtectedRoute allowedRoles={["repartidor"]}>
            <HomePageRepartidor />
          </ProtectedRoute>
        }
      ></Route>
    </Routes>
  );
}

export default RepartidorApp;
