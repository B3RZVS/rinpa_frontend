import { createContext } from "react";
import type { ProductoContextType } from "./ProductoContext.type";

export const ProductoContext = createContext<ProductoContextType | undefined>(
  undefined
);
