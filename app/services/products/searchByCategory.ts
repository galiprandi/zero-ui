import products from "../../data/products.json";
import type { Product } from "./types";

export function searchByCategory(categoryId: number): Product[] {
  const allProducts = products as Product[];
  return allProducts.filter((product) => product.categoryId === categoryId);
}
