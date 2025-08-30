import { createContext } from "react";
import type { TipoProductoContextType } from "./TipoProductoContext.type";

export const TipoProductoContext = createContext<
  TipoProductoContextType | undefined
>(undefined);
