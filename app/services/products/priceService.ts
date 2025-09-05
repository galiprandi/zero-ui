import { searchByEan } from "./searchByEan";

function parsePrice(input: string) {
  // Acepta formatos como "$9.99", "9,99", "9.99"
  const cleaned = input.replace(/[^0-9.,]/g, "").replace(",", ".");
  const value = Number.parseFloat(cleaned);
  return Number.isFinite(value) ? value : null;
}

function formatPrice(value: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(value);
}

export type ChangePriceInput = { ean: string; newPrice?: string };

export type ChangePriceOutput =
  | { error: string }
  | { message: string }
  | { message: string; updatedPrice: string };

export function changePriceService({
  ean,
  newPrice,
}: ChangePriceInput): ChangePriceOutput {
  const product = searchByEan(ean);
  if (!product) {
    return { error: "Producto no encontrado por EAN." } as const;
  }

  // Precio actual desde dataset (string), intentamos parsear a número para normalizar
  const currentNumeric = parsePrice(product.price);
  const currentLabel =
    currentNumeric != null ? formatPrice(currentNumeric) : product.price;

  if (!newPrice) {
    const promptMessage = `Precio actual de ${product.name}: ${currentLabel}. ¿Cuál es el nuevo precio?`;
    return { message: promptMessage } as const;
  }

  const numeric = parsePrice(newPrice);
  if (numeric == null || numeric <= 0) {
    return {
      error: "Precio inválido. Ingresá un número mayor a 0 (ej.: 1234.56).",
    } as const;
  }

  // Simular actualización (no hay persistencia). Devolver confirmación.
  const updatedLabel = formatPrice(numeric);
  const confirmationMessage = `Precio actualizado para ${product.name} (${ean}): ${currentLabel} → ${updatedLabel}.`;

  return {
    message: confirmationMessage,
    updatedPrice: updatedLabel,
  } as const;
}
