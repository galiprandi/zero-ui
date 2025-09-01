import products from "../../data/products.json";
import type { Product } from "./types";

export function getProductByEan(ean: string): Product | null {
  const allProducts = products as Product[];
  const product = allProducts.find((product) => product.ean === ean) || null;
  if (product) product.image = "https://placehold.co/100x100.jpg";
  return product;
}
