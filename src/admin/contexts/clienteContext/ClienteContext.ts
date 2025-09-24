import { createContext } from "react";
import type { ClienteContextType } from "./ClienteContext.type";

export const ClienteContext = createContext<ClienteContextType | undefined>(
  undefined
);
