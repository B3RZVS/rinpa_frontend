import { describe, it, expect, vi } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";
import MedidasModal from "./MedidasModal";
import { MedidaProvider } from "../../../contexts/medidaContext/MedidaProvider";
import { ToasterProvider } from "../../../../shared/contexts/toasterContext/ToasterProvider";

describe("HU26 - Registrar medida (CU26)", () => {
  const renderWithProviders = (ui: React.ReactNode) => {
    return render(
      <ToasterProvider>
        <MedidaProvider>{ui}</MedidaProvider>
      </ToasterProvider>
    );
  };

  // CP61: registrar medida con valor y unidad válidos y únicos
  it("CP61: registra medida con valor numérico y unidad válidos y únicos", () => {
    const onSaveMock = vi.fn(() => undefined);

    renderWithProviders(
      <MedidasModal isOpen={true} onClose={vi.fn()} onSave={onSaveMock} />
    );

    fireEvent.change(screen.getByPlaceholderText("Ej: 500, 1, 250"), {
      target: { value: "250" },
    });
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: 1 },
    });

    fireEvent.click(screen.getByText("Guardar"));

    expect(onSaveMock).toHaveBeenCalledWith({ cantidad: "250", unidad: 1 });
  });

  // CP62: intentar registrar medida duplicada
  it("CP62: muestra error al intentar registrar medida duplicada", async () => {
    const onSaveMock = vi.fn(() => "Medida duplicada"); // retorna string de error

    renderWithProviders(
      <MedidasModal isOpen={true} onClose={vi.fn()} onSave={onSaveMock} />
    );

    fireEvent.change(screen.getByPlaceholderText("Ej: 500, 1, 250"), {
      target: { value: "500" },
    });

    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "ml" },
    });

    fireEvent.click(screen.getByText("Guardar"));

    expect(onSaveMock).toHaveBeenCalledWith({ cantidad: "500", unidad: "ml" });

    const error = await screen.findByText("Medida duplicada");
    expect(error).toBeTruthy();
  });

  // CP63: validar campos obligatorios
  it("CP63: muestra error si se dejan campos obligatorios vacíos", async () => {
    renderWithProviders(
      <MedidasModal isOpen={true} onClose={vi.fn()} onSave={vi.fn()} />
    );
    fireEvent.click(screen.getByText("Guardar"));

    expect(await screen.findByText("La cantidad es requerida")).toBeTruthy();
    expect(await screen.findByText("La unidad es requerida")).toBeTruthy();
  });
});
