import { createContext } from "react";
import type { MedidaContextType } from "./MedidaContext.type";

export const MedidaContext = createContext<MedidaContextType | undefined>(
  undefined
);
