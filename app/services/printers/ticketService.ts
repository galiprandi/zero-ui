import categories from "../../data/categories.json";
import { searchByEan } from "../products/searchByEan";

export function printTicket(ean: string, price: string) {
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

  return {
    ok: true,
    printer: "Impresora de ticket N° 12453",
  };
}
