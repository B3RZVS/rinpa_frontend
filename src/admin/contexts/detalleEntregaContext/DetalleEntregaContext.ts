import { createContext } from "react";
import type { DetalleEntregaContextType } from "./DetalleEntregaContext.type";

export const DetalleEntregaContext = createContext<
  DetalleEntregaContextType | undefined
>(undefined);
