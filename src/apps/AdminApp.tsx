import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../utils/ProtectedRoute";

//PAGES
import Home from "../admin/pages/Home/Home";
//PROVIDERS
import { MedidaProvider } from "../admin/contexts/medidaContext/MedidaProvider";
import { TipoProductoProvider } from "../admin/contexts/tipoProductoContext/TipoProductoProvider";

function AdminApp() {
  return (
    <Routes>
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <MedidaProvider>
              <TipoProductoProvider>
                <Home />
              </TipoProductoProvider>
            </MedidaProvider>
          </ProtectedRoute>
        }
      ></Route>
    </Routes>
  );
}

export default AdminApp;
