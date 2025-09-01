import { searchByEan } from "../products/searchByEan";
import categories from "../../data/categories.json";

export function printReceipt(ean: string, price: string): void {
  const product = searchByEan(ean);
  if (!product) {
    console.log(`Producto con EAN ${ean} no encontrado.`);
    return;
  }

  const category = categories.find((cat) => cat.id === product.categoryId);
  const categoryName = category ? category.name : "Desconocida";

  console.log(`
======== RECIBO ========
Producto: ${product.name}
EAN: ${ean}
Precio: ${price}
Categoría: ${categoryName}
========================
  `);
}

export function printLabel(ean: string): void {
  const product = searchByEan(ean);
  if (!product) {
    console.log(`Producto con EAN ${ean} no encontrado.`);
    return;
  }

  console.log(`Etiqueta: ${product.name} - ${ean}`);
}

export function printText(text: string): void {
  console.log(text);
}
