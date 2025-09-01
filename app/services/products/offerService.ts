import products from "../../data/products.json";
import type { Product } from "./types";

export function getRandomOffers(): Product[] {
  const allProducts = products as Product[];
  const shuffled = [...allProducts].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 10);
}
