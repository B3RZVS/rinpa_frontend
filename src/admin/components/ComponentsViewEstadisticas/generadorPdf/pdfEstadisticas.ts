import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type {
  ReporteClientes,
  ReporteEntrega,
  ReporteGeneral,
} from "../../../interface/estadisticas.interface";

// Configuración de colores Rinpa
const COLORS = {
  primary: "#013464",
  secondary: "#3cb371",
  accent: "#ffd700",
  dark: "#333333",
  light: "#f5f5f5",
};

// Función auxiliar para agregar header al PDF
const addHeader = (doc: jsPDF, title: string) => {
  doc.setFillColor(COLORS.primary);
  doc.rect(0, 0, doc.internal.pageSize.width, 40, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text("RINPA", 20, 20);

  doc.setFontSize(14);
  doc.setFont("helvetica", "normal");
  doc.text(title, 20, 32);
};

// Función auxiliar para agregar footer al PDF
const addFooter = (doc: jsPDF) => {
  const pageCount = doc.getNumberOfPages();
  const pageHeight = doc.internal.pageSize.height;

  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.setTextColor(COLORS.dark);
    doc.text(
      `Página ${i} de ${pageCount}`,
      doc.internal.pageSize.width / 2,
      pageHeight - 10,
      { align: "center" }
    );
    doc.text(
      `Generado: ${new Date().toLocaleDateString()}`,
      doc.internal.pageSize.width - 20,
      pageHeight - 10,
      {
        align: "right",
      }
    );
  }
};

// Generar PDF del Reporte General
export const generarPDFReporteGeneral = (reporte: ReporteGeneral) => {
  const doc = new jsPDF();

  addHeader(doc, "Reporte General");

  // Información del periodo
  doc.setTextColor(COLORS.dark);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Período:", 20, 55);
  doc.setFont("helvetica", "normal");
  doc.text(reporte.periodo, 60, 55);

  doc.setFont("helvetica", "bold");
  doc.text("Fecha Emisión:", 20, 65);
  doc.setFont("helvetica", "normal");
  doc.text(new Date(reporte.fechaEmision).toLocaleDateString(), 60, 65);

  // Tabla de resumen
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("Resumen General", 20, 80);

  autoTable(doc, {
    startY: 85,
    head: [["Concepto", "Valor"]],
    body: [
      ["Total Entregas", reporte.totalEntregas.toString()],
      ["Productos Diferentes", reporte.productosEntregados.length.toString()],
      ["Clientes Atendidos", reporte.clientesConEntrega.length.toString()],
      ["Consumo Total Nafta", `${reporte.consumoTotalNafta.toFixed(1)} L`],
      ["Costo Total Nafta", `$${reporte.costoTotalNafta.toLocaleString()}`],
    ],
    theme: "grid",
    headStyles: { fillColor: COLORS.primary, textColor: 255 },
    alternateRowStyles: { fillColor: COLORS.light },
  });

  // Productos entregados
  const yAfterResumen = (doc as any).lastAutoTable.finalY + 15;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("Productos Entregados", 20, yAfterResumen);

  autoTable(doc, {
    startY: yAfterResumen + 5,
    head: [["#", "Producto"]],
    body: reporte.productosEntregados.map((producto, index) => [
      (index + 1).toString(),
      producto,
    ]),
    theme: "striped",
    headStyles: { fillColor: COLORS.secondary, textColor: 255 },
  });

  // Clientes con entregas
  const yAfterProductos = (doc as any).lastAutoTable.finalY + 15;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("Clientes con Entregas", 20, yAfterProductos);

  autoTable(doc, {
    startY: yAfterProductos + 5,
    head: [["#", "Cliente"]],
    body: reporte.clientesConEntrega.map((item, index) => [
      (index + 1).toString(),
      `${item.cliente.nombre} ${item.cliente.apellido}`,
    ]),
    theme: "striped",
    headStyles: { fillColor: COLORS.secondary, textColor: 255 },
  });

  addFooter(doc);

  doc.save(`Reporte_General_${reporte.periodo.replace(/\s/g, "_")}.pdf`);
};

// Generar PDF del Reporte de Entregas
export const generarPDFReporteEntrega = (reporte: ReporteEntrega) => {
  const doc = new jsPDF();

  addHeader(doc, "Reporte de Entregas");

  // Información del periodo
  doc.setTextColor(COLORS.dark);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Período:", 20, 55);
  doc.setFont("helvetica", "normal");
  doc.text(reporte.periodo, 60, 55);

  // Tabla de entregas
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("Detalle de Entregas", 20, 70);

  autoTable(doc, {
    startY: 75,
    head: [
      [
        "N° Entrega",
        "Fecha",
        "Cliente",
        "Cant.",
        "Subtotal",
        "Nafta (L)",
        "Costo Nafta",
        "Total",
      ],
    ],
    body: reporte.entregas.map((entrega) => [
      entrega.numeroEntrega,
      new Date(entrega.fecha).toLocaleDateString(),
      entrega.cliente,
      entrega.cantidadProductosEntregados.toString(),
      `$${entrega.subtotal.toLocaleString()}`,
      entrega.naftaConsumida.toString(),
      `$${entrega.costoNafta.toLocaleString()}`,
      `$${entrega.total.toLocaleString()}`,
    ]),
    theme: "grid",
    headStyles: { fillColor: COLORS.primary, textColor: 255, fontSize: 9 },
    bodyStyles: { fontSize: 8 },
    alternateRowStyles: { fillColor: COLORS.light },
    columnStyles: {
      2: { cellWidth: 30 },
      3: { halign: "center" },
      4: { halign: "right" },
      5: { halign: "center" },
      6: { halign: "right" },
      7: { halign: "right", fontStyle: "bold" },
    },
  });

  // Agregar nueva página si es necesario
  const yAfterTable = (doc as any).lastAutoTable.finalY;
  if (yAfterTable > doc.internal.pageSize.height - 80) {
    doc.addPage();
  }

  // Total General
  const startYTotal =
    yAfterTable > doc.internal.pageSize.height - 80 ? 20 : yAfterTable + 15;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setFillColor(COLORS.accent);
  doc.rect(20, startYTotal, doc.internal.pageSize.width - 40, 10, "F");
  doc.setTextColor(COLORS.dark);
  doc.text("TOTAL GENERAL", 25, startYTotal + 7);

  autoTable(doc, {
    startY: startYTotal + 12,
    head: [["Concepto", "Valor"]],
    body: [
      [
        "Cantidad Total de Productos",
        reporte.totalGeneral.cantidadProductosEntregados.toString(),
      ],
      ["Subtotal", `$${reporte.totalGeneral.subtotal.toLocaleString()}`],
      ["Litros de Nafta", `${reporte.totalGeneral.litrosNafta.toFixed(2)} L`],
      ["Costo Nafta", `$${reporte.totalGeneral.costoNafta.toLocaleString()}`],
      ["TOTAL", `$${reporte.totalGeneral.total.toLocaleString()}`],
    ],
    theme: "grid",
    headStyles: { fillColor: COLORS.primary, textColor: 255 },
    bodyStyles: { fontSize: 11 },
    columnStyles: {
      1: { halign: "right", fontStyle: "bold" },
    },
  });

  addFooter(doc);

  doc.save(`Reporte_Entregas_${reporte.periodo.replace(/\s/g, "_")}.pdf`);
};

// Generar PDF del Reporte de Clientes
export const generarPDFReporteCliente = (reporte: ReporteClientes) => {
  const doc = new jsPDF();

  addHeader(doc, "Reporte de Clientes");

  // Información del periodo
  doc.setTextColor(COLORS.dark);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Período:", 20, 55);
  doc.setFont("helvetica", "normal");
  doc.text(reporte.periodo, 60, 55);

  doc.setFont("helvetica", "bold");
  doc.text("Total Clientes:", 20, 65);
  doc.setFont("helvetica", "normal");
  doc.text(reporte.clientes.length.toString(), 60, 65);

  // Tabla de clientes
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("Detalle por Cliente", 20, 80);

  autoTable(doc, {
    startY: 85,
    head: [["Cliente", "Entregas", "Producto Más Pedido", "Total Facturado"]],
    body: reporte.clientes.map((cliente) => [
      cliente.nombre,
      cliente.entregasRealizadas.toString(),
      cliente.productoMasPedido,
      `$${cliente.totalFacturado.toLocaleString()}`,
    ]),
    theme: "grid",
    headStyles: { fillColor: COLORS.primary, textColor: 255 },
    alternateRowStyles: { fillColor: COLORS.light },
    columnStyles: {
      0: { cellWidth: 50 },
      1: { halign: "center" },
      2: { cellWidth: 60 },
      3: { halign: "right", fontStyle: "bold" },
    },
  });

  // Resumen total
  const totalEntregas = reporte.clientes.reduce(
    (sum, c) => sum + c.entregasRealizadas,
    0
  );
  const totalFacturado = reporte.clientes.reduce(
    (sum, c) => sum + c.totalFacturado,
    0
  );

  const yAfterTable = (doc as any).lastAutoTable.finalY + 15;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setFillColor(COLORS.accent);
  doc.rect(20, yAfterTable, doc.internal.pageSize.width - 40, 10, "F");
  doc.setTextColor(COLORS.dark);
  doc.text("RESUMEN TOTAL", 25, yAfterTable + 7);

  autoTable(doc, {
    startY: yAfterTable + 12,
    head: [["Concepto", "Valor"]],
    body: [
      ["Total Clientes", reporte.clientes.length.toString()],
      ["Total Entregas", totalEntregas.toString()],
      ["Facturación Total", `$${totalFacturado.toLocaleString()}`],
      [
        "Promedio por Cliente",
        `$${(totalFacturado / reporte.clientes.length).toLocaleString()}`,
      ],
    ],
    theme: "grid",
    headStyles: { fillColor: COLORS.secondary, textColor: 255 },
    bodyStyles: { fontSize: 11 },
    columnStyles: {
      1: { halign: "right", fontStyle: "bold" },
    },
  });

  addFooter(doc);

  doc.save(`Reporte_Clientes_${reporte.periodo.replace(/\s/g, "_")}.pdf`);
};
