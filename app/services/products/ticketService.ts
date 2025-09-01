import categories from "../../data/categories.json";
import { searchByEan } from "./searchByEan";

export function printTicket(ean: string, price: string): void {
  const product = searchByEan(ean);
  if (!product) {
    console.log(`Producto con EAN ${ean} no encontrado.`);
    return;
  }

  const category = categories.find((cat) => cat.id === product.categoryId);
  const categoryName = category ? category.name : "Desconocida";

  console.log(`
======== TICKET ========
Producto: ${product.name}
EAN: ${ean}
Precio: ${price}
Categoría: ${categoryName}
========================
  `);
}
