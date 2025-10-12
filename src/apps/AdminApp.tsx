import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../utils/ProtectedRoute";

//PAGES
import Home from "../admin/pages/Home/Home";
//PROVIDERS
import { MedidaProvider } from "../admin/contexts/medidaContext/MedidaProvider";
import { TipoProductoProvider } from "../admin/contexts/tipoProductoContext/TipoProductoProvider";
import { ClienteProvider } from "../admin/contexts/clienteContext/ClienteProvider";

import { PrecioNaftaProvider } from "../admin/contexts/precioNaftaContext/PrecioNaftaProvider";

import { ProductoProvider } from "../admin/contexts/productoContext/ProductoProvider";

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

                  <ProductoProvider>
                    <PrecioNaftaProvider>
                      <Home />
                     </PrecioNaftaProvider>
                  </ProductoProvider>

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
