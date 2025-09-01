import products from "../../data/products.json";
import type { Product } from "./types";

export function searchByName(query: string): Product[] {
  const allProducts = products as Product[];
  const lowerQuery = query.toLowerCase();
  return allProducts.filter((product) =>
    product.name.toLowerCase().includes(lowerQuery),
  );
}
