import type { LoginPayload } from "../../services/Login/LoginService";
import type { Role } from "../../../utils/ProtectedRoute";

export interface UserContextType {
  loading: boolean;
  isAuthenticated: boolean;
  login: (data: LoginPayload) => Promise<string | null>;
  logout: () => void;
  role: Role;
  hasRole: (allowed: Role[]) => boolean;
}
