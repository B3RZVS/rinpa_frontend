import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute";
import { ToasterProvider } from "./contexts/toasterContext/ToasterProvider";
//PAGES
import Home from "./pages/Home/Home";
import LoginPage from "./user/pages/Login/LoginPage";
import { UserProvider } from "./user/contexts/userContext/UserProvider";
//PROVIDERS
import { MedidaProvider } from "./contexts/medidaContext/MedidaProvider";
import { TipoProductoProvider } from "./contexts/tipoProductoContext/TipoProductoProvider";
function App() {
  const router = createBrowserRouter([
    { path: "/login", element: <LoginPage /> },
    {
      path: "/",
      element: <Navigate to="/login" />, // Redirige a /home
    },
    {
      path: "/",
      element: <ProtectedRoute allowedRoles={["admin"]} />,
      children: [
        { path: "/home", element: <Home /> },
        // { path: "/ingredientes", element: <IngredientesView /> },
        // { path: "/packagings", element: <PackagingsView /> },
        // { path: "/productos", element: <ProductosView /> },
      ],
    },
  ]);
  return (
    <ToasterProvider>
      <UserProvider>
        <MedidaProvider>
          <TipoProductoProvider>
            <RouterProvider router={router} />
          </TipoProductoProvider>
        </MedidaProvider>
      </UserProvider>
    </ToasterProvider>
  );
}

export default App;
