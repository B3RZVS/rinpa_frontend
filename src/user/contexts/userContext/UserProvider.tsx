import { useEffect, useState, type ReactNode } from "react";
import { UserContext } from "./UserContext";
import type { UserContextType } from "./UserContext.type";
import { LoginService } from "../../services/Login/LoginService";
import type { LoginPayload } from "../../services/Login/LoginService";
import type { Role } from "../../../utils/ProtectedRoute";
import { roleLandingRoutes } from "../../../utils/roleLandingRoutes";
import { useToaster } from "../../../shared/hooks/useToaster";
import AuthService from "../../services/auth/AuthService";

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [role, setRole] = useState<Role>(localStorage.getItem("role") as Role);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    localStorage.getItem("token") ? true : false
  );
  const { showToast } = useToaster();
  const authService = AuthService.getInstance();
  useEffect(() => {
    authService.setOnSessionExpiredCallback(() => setIsAuthenticated(false));
  }, []);

  const login = async (data: LoginPayload): Promise<string | null> => {
    setLoading(true);
    try {
      const response = await LoginService.loginApi(data);
      const userRole = response.user.rol.nombre as Role;

      authService.setTokens(response.accessToken, response.refreshToken);
      localStorage.setItem("role", response.user.rol.nombre);
      localStorage.setItem("nombreUser", response.user.nombre);
      localStorage.setItem("idUser", response.user.id);

      setIsAuthenticated(true);
      setRole(response.user.rol.nombre);

      return roleLandingRoutes[userRole];
    } catch (error) {
      console.error(error);
      showToast({
        title: "Credenciales incorrectas, intente nuevamente.",
        type: "error",
        position: "top-center",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const logout = (): void => {
    authService.logout();
    setIsAuthenticated(false);
  };

  //FUNCION QUE DEVUELVE EL ROL PARA VALIDACIONES MAS CONCRETAS
  const hasRole = (allowed: Role[]): boolean => {
    if (!role) return false;
    return allowed.includes(role);
  };

  const contextValue: UserContextType = {
    loading,
    isAuthenticated,
    login,
    logout,
    role,
    hasRole,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
