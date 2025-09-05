import { getRandomProducts } from "./getRandomProducts";
import type { Product } from "./types";

export function getRandomOffers(): Product[] {
  const offers = getRandomProducts(12);
  return offers;
}
