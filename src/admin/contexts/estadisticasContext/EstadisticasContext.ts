import { createContext } from "react";
import type { EstadisticasContextType } from "./EstadisticasContext.type";

export const EstadisticasContext = createContext<
  EstadisticasContextType | undefined
>(undefined);
