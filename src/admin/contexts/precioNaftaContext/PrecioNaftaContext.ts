import { createContext } from "react";
import type { PrecioNaftaContextType } from "./PrecioNaftaContext.type";

export const PrecioNaftaContext = createContext<
  PrecioNaftaContextType | undefined
>(undefined);
