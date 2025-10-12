import type {
  CreatePrecioNaftaInterface,
  PrecioNaftaInterfaceResponse,
} from "../../interface/precioNafta.interface";

export interface PrecioNaftaContextType {
  loading: boolean;
  preciosNafta: PrecioNaftaInterfaceResponse[];
  getPreciosNafta: () => void;
  registerPrecioNafta: (data: CreatePrecioNaftaInterface) => Promise<void>;
}
