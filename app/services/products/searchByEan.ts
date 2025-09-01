import products from "../../data/products.json";
import type { Product } from "./types";

export function searchByEan(ean: string): Product | null {
  const allProducts = products as Product[];
  return allProducts.find((product) => product.ean === ean) || null;
}
