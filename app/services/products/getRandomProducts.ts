import products from "../../data/products.json";
import type { Product } from "./types";

export function getRandomProducts(count: number): Product[] {
  const allProducts = products as Product[];
  if (count >= allProducts.length) {
    return allProducts;
  }
  const shuffled = allProducts.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
