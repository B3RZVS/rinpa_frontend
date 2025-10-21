import { createContext } from "react";
import type { EntregaContextType } from "./EntregaContext.type";

export const EntregaContext = createContext<EntregaContextType | undefined>(
  undefined
);
