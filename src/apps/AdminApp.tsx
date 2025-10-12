import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../utils/ProtectedRoute";

//PAGES
import Home from "../admin/pages/Home/Home";
//PROVIDERS
import { MedidaProvider } from "../admin/contexts/medidaContext/MedidaProvider";
import { TipoProductoProvider } from "../admin/contexts/tipoProductoContext/TipoProductoProvider";
import { ClienteProvider } from "../admin/contexts/clienteContext/ClienteProvider";
import { PrecioNaftaProvider } from "../admin/contexts/precioNaftaContext/PrecioNaftaProvider";
function AdminApp() {
  return (
    <Routes>
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <MedidaProvider>
              <TipoProductoProvider>
                <ClienteProvider>
                  <PrecioNaftaProvider>
                    <Home />
                  </PrecioNaftaProvider>
                </ClienteProvider>
              </TipoProductoProvider>
            </MedidaProvider>
          </ProtectedRoute>
        }
      ></Route>
    </Routes>
  );
}

export default AdminApp;
